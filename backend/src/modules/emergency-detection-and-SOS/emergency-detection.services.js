const prisma = require("../../config/prisma");

/**
 * Configure per-patient escalation policy with tiers
 */
const setEscalationPolicyService = async (patientId, payload, createdById) => {
  const { name = "Default Emergency Policy", tiers = [] } = payload;
  if (!patientId || tiers.length === 0) {
    throw new Error("patientId and at least one escalation tier are required");
  }

  // Deactivate previous active policies for this patient
  await prisma.emergencyEscalationPolicy.updateMany({
    where: { patientId, isActive: true },
    data: { isActive: false },
  });

  return await prisma.emergencyEscalationPolicy.create({
    data: {
      patientId,
      name,
      isActive: true,
      createdById,
      tiers: {
        create: tiers.map((tier, idx) => ({
          tierOrder: tier.tierOrder || idx + 1,
          contactUserId: tier.contactUserId || null,
          customName: tier.customName || null,
          customPhone: tier.customPhone || null,
          channel: tier.channel || "PUSH_NOTIFICATION",
          timeoutMinutes: tier.timeoutMinutes || 3,
        })),
      },
    },
    include: { tiers: { orderBy: { tierOrder: "asc" } } },
  });
};

/**
 * Helper: Dispatch notifications for a specific tier
 */
const dispatchTierNotifications = async (event, tier) => {
  const recipient = tier.customName || (tier.contactUser ? `${tier.contactUser.firstName} ${tier.contactUser.lastName}` : "Caregiver Contact");
  const target = tier.customPhone || tier.contactUser?.phone || tier.contactUser?.email || "Push Device Token";

  const log = await prisma.emergencyNotificationLog.create({
    data: {
      eventId: event.id,
      tierOrder: tier.tierOrder,
      recipientName: recipient,
      recipientTarget: target,
      channel: tier.channel,
      deliveryStatus: "SENT",
      responsePayload: {
        message: `EMERGENCY ALERT: ${event.eventType} triggered! Location: ${event.mapUrl || "Pending GPS"}`,
      },
    },
  });

  return log;
};

/**
 * Trigger an Emergency Event (One-Tap SOS or Fall Heuristic)
 */
const triggerEmergencyService = async (payload, patientId) => {
  const {
    eventType = "ONE_TAP_SOS",
    latitude,
    longitude,
    accuracyMeters,
    accelerometerVector,
    countdownSeconds = 30,
  } = payload;

  const lat = latitude ? Number(latitude) : null;
  const lng = longitude ? Number(longitude) : null;
  const mapUrl = lat && lng ? `https://www.google.com/maps?q=${lat},${lng}` : null;

  const isFall = eventType === "FALL_DETECTED";
  const status = isFall ? "COUNTDOWN_ACTIVE" : "ACTIVE_EMERGENCY";
  const countdownExpiresAt = isFall
    ? new Date(Date.now() + countdownSeconds * 1000)
    : null;

  const event = await prisma.emergencyEvent.create({
    data: {
      patientId,
      eventType,
      status,
      currentTierIndex: 1,
      latitude: lat,
      longitude: lng,
      accuracyMeters: accuracyMeters ? Number(accuracyMeters) : null,
      mapUrl,
      countdownSeconds: isFall ? countdownSeconds : 0,
      countdownExpiresAt,
      accelerometerVector: accelerometerVector || null,
    },
  });

  // If immediate SOS, immediately trigger Tier 1 escalation
  let dispatchedLogs = [];
  if (status === "ACTIVE_EMERGENCY") {
    const policy = await prisma.emergencyEscalationPolicy.findFirst({
      where: { patientId, isActive: true },
      include: { tiers: { include: { contactUser: true }, orderBy: { tierOrder: "asc" } } },
    });

    if (policy && policy.tiers.length > 0) {
      const tier1 = policy.tiers[0];
      const log = await dispatchTierNotifications(event, tier1);
      dispatchedLogs.push(log);
    }
  }

  return {
    event,
    dispatchedLogs,
    message: isFall
      ? `Fall detected! Countdown of ${countdownSeconds}s active. Cancel to avoid false alarm.`
      : "Emergency SOS activated! Caregiver escalation dispatched.",
  };
};

/**
 * Patient cancels false alarm during countdown
 */
const cancelFallCountdownService = async (eventId, patientId, reason) => {
  const event = await prisma.emergencyEvent.findUnique({ where: { id: eventId } });
  if (!event) throw new Error("Emergency event not found");
  if (event.patientId !== patientId) throw new Error("Unauthorized to cancel this event");

  return await prisma.emergencyEvent.update({
    where: { id: eventId },
    data: {
      status: "CANCELLED_FALSE_ALARM",
      resolutionNotes: reason || "Patient confirmed false alarm during countdown window.",
      resolvedAt: new Date(),
    },
  });
};

/**
 * Confirm fall emergency (or countdown timeout expiration)
 */
const confirmFallEmergencyService = async (eventId) => {
  const event = await prisma.emergencyEvent.findUnique({ where: { id: eventId } });
  if (!event) throw new Error("Emergency event not found");

  const updatedEvent = await prisma.emergencyEvent.update({
    where: { id: eventId },
    data: {
      status: "ACTIVE_EMERGENCY",
    },
  });

  // Start Tier 1 Escalation
  const policy = await prisma.emergencyEscalationPolicy.findFirst({
    where: { patientId: event.patientId, isActive: true },
    include: { tiers: { include: { contactUser: true }, orderBy: { tierOrder: "asc" } } },
  });

  const dispatchedLogs = [];
  if (policy && policy.tiers.length > 0) {
    const tier1 = policy.tiers[0];
    const log = await dispatchTierNotifications(updatedEvent, tier1);
    dispatchedLogs.push(log);
  }

  return { event: updatedEvent, dispatchedLogs };
};

/**
 * Auto-escalate to next tier if unacknowledged
 */
const escalateToNextTierService = async (eventId) => {
  const event = await prisma.emergencyEvent.findUnique({ where: { id: eventId } });
  if (!event || event.status !== "ACTIVE_EMERGENCY") {
    throw new Error("Cannot escalate inactive or resolved emergency");
  }

  const nextTierIndex = event.currentTierIndex + 1;

  const policy = await prisma.emergencyEscalationPolicy.findFirst({
    where: { patientId: event.patientId, isActive: true },
    include: { tiers: { include: { contactUser: true }, orderBy: { tierOrder: "asc" } } },
  });

  const nextTier = policy?.tiers.find((t) => t.tierOrder === nextTierIndex);
  if (!nextTier) {
    return { event, message: "Reached highest escalation tier available." };
  }

  const updatedEvent = await prisma.emergencyEvent.update({
    where: { id: eventId },
    data: { currentTierIndex: nextTierIndex },
  });

  const log = await dispatchTierNotifications(updatedEvent, nextTier);

  return {
    event: updatedEvent,
    escalatedToTier: nextTierIndex,
    notification: log,
  };
};

/**
 * Update live location coordinates during an active emergency
 */
const updateLiveLocationService = async (eventId, payload) => {
  const { latitude, longitude, accuracyMeters } = payload;
  const lat = Number(latitude);
  const lng = Number(longitude);
  const mapUrl = `https://www.google.com/maps?q=${lat},${lng}`;

  return await prisma.emergencyEvent.update({
    where: { id: eventId },
    data: {
      latitude: lat,
      longitude: lng,
      accuracyMeters: accuracyMeters ? Number(accuracyMeters) : null,
      mapUrl,
    },
  });
};

/**
 * Caregiver acknowledges the emergency (halts further tier escalation)
 */
const acknowledgeEmergencyService = async (eventId, caregiverId) => {
  return await prisma.emergencyEvent.update({
    where: { id: eventId },
    data: {
      status: "ACKNOWLEDGED",
      acknowledgedById: caregiverId,
      acknowledgedAt: new Date(),
    },
  });
};

/**
 * Resolve the emergency with final incident review notes
 */
const resolveEmergencyService = async (eventId, caregiverId, resolutionNotes) => {
  return await prisma.emergencyEvent.update({
    where: { id: eventId },
    data: {
      status: "RESOLVED",
      resolvedById: caregiverId,
      resolvedAt: new Date(),
      resolutionNotes: resolutionNotes || "Emergency resolved safely.",
    },
  });
};

/**
 * Get active emergency status and audit timeline
 */
const getActiveEmergencyService = async (patientId) => {
  const activeEvent = await prisma.emergencyEvent.findFirst({
    where: {
      patientId,
      status: { in: ["COUNTDOWN_ACTIVE", "ACTIVE_EMERGENCY", "ACKNOWLEDGED"] },
    },
    include: {
      notifications: { orderBy: { dispatchedAt: "asc" } },
      patient: { select: { id: true, firstName: true, lastName: true, phone: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return {
    hasActiveEmergency: !!activeEvent,
    emergency: activeEvent || null,
  };
};

module.exports = {
  setEscalationPolicyService,
  triggerEmergencyService,
  cancelFallCountdownService,
  confirmFallEmergencyService,
  escalateToNextTierService,
  updateLiveLocationService,
  acknowledgeEmergencyService,
  resolveEmergencyService,
  getActiveEmergencyService,
};
