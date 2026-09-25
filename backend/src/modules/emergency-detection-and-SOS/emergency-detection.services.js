const prisma = require("../../config/prisma");
const { sendPushToUsers } = require("../../config/firebase");

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
const triggerEmergencyService = async (payload, patientId, io = null) => {
  let type = payload.eventType || payload.triggerType || "ONE_TAP_SOS";
  if (type === "MANUAL_SOS") type = "ONE_TAP_SOS";

  const {
    eventType = type,
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

  const patient = await prisma.user.findUnique({
    where: { id: patientId },
    select: { id: true, firstName: true, lastName: true, phone: true, email: true },
  });
  const patientLabel = patient ? `${patient.firstName} ${patient.lastName}` : "Patient";

  let dispatchedLogs = [];
  if (status === "ACTIVE_EMERGENCY") {
    // 1. Check escalation policy (if configured)
    const policy = await prisma.emergencyEscalationPolicy.findFirst({
      where: { patientId, isActive: true },
      include: { tiers: { include: { contactUser: true }, orderBy: { tierOrder: "asc" } } },
    });

    const notifiedUserIds = new Set();
    if (policy && policy.tiers.length > 0) {
      const tier1 = policy.tiers[0];
      const log = await dispatchTierNotifications(event, tier1);
      dispatchedLogs.push(log);
      if (tier1.contactUserId) notifiedUserIds.add(tier1.contactUserId);
    }

    // 2. Alert all members of this patient's Care Circle(s)
    const careCircles = await prisma.careCircle.findMany({
      where: { patientId },
      include: {
        memberships: {
          where: { status: "ACTIVE" },
          include: {
            user: { select: { id: true, firstName: true, lastName: true, phone: true, email: true } },
            role: true,
          },
        },
      },
    });

    for (const circle of careCircles) {
      if (circle.ownerId && circle.ownerId !== patientId && !notifiedUserIds.has(circle.ownerId)) {
        notifiedUserIds.add(circle.ownerId);
      }
      for (const m of circle.memberships) {
        if (m.user && m.user.id !== patientId && !notifiedUserIds.has(m.user.id)) {
          notifiedUserIds.add(m.user.id);
          const target = m.user.phone || m.user.email || "Push Device Token";
          const circleLog = await prisma.emergencyNotificationLog.create({
            data: {
              eventId: event.id,
              tierOrder: 1,
              recipientName: `${m.user.firstName} ${m.user.lastName}`,
              recipientTarget: target,
              channel: "PUSH_NOTIFICATION",
              deliveryStatus: "SENT",
              responsePayload: {
                message: `EMERGENCY ALERT: ${event.eventType} triggered for ${patientLabel}! Location: ${event.mapUrl || "Pending GPS"}`,
              },
            },
          });
          dispatchedLogs.push(circleLog);
        }
      }
    }

    // 2.1 Send FCM Push Notifications to device tokens
    if (notifiedUserIds.size > 0) {
      sendPushToUsers(Array.from(notifiedUserIds), {
        title: "🚨 EMERGENCY SOS ALERT",
        body: `${patientLabel} triggered an Emergency SOS!`,
        data: {
          type: "EMERGENCY_SOS",
          patientId,
          eventId: event.id,
          mapUrl: event.mapUrl || "",
        },
      }).catch((err) => console.error("[FCM Push Notification Error]:", err.message));
    }
  }

  // 3. Log into ActivityFeedItem for Unified Timeline
  let activityItem = null;
  try {
    activityItem = await prisma.activityFeedItem.create({
      data: {
        patientId,
        authorId: patientId,
        activityType: "EMERGENCY_SOS",
        title: "🚨 Emergency SOS Triggered",
        summary: `${patientLabel} triggered an Emergency SOS alert!`,
        metadata: {
          eventId: event.id,
          eventType: event.eventType,
          latitude: event.latitude,
          longitude: event.longitude,
          mapUrl: event.mapUrl,
        },
      },
    });
  } catch (_) {}

  // 4. Real-Time Socket.IO Alert broadcast
  if (io) {
    const alertPayload = {
      event,
      emergency: event,
      patient,
      patientName: patientLabel,
      activityItem,
      message: `🚨 EMERGENCY SOS ALERT: ${patientLabel} triggered an emergency SOS!`,
    };
    io.to(`circle_${patientId}`).emit("emergency_triggered", alertPayload);
    io.emit("emergency_triggered", alertPayload);
    if (activityItem) {
      io.to(`circle_${patientId}`).emit("activity_feed", activityItem);
      io.emit("activity_feed", activityItem);
    }
  }

  return {
    event,
    emergency: event,
    dispatchedLogs,
    message: isFall
      ? `Fall detected! Countdown of ${countdownSeconds}s active. Cancel to avoid false alarm.`
      : "Emergency SOS activated! Caregiver escalation dispatched.",
  };
};

/**
 * Patient cancels false alarm during countdown
 */
const cancelFallCountdownService = async (eventId, patientId, reason, io = null) => {
  const event = await prisma.emergencyEvent.findUnique({ where: { id: eventId } });
  if (!event) throw new Error("Emergency event not found");
  if (event.patientId !== patientId) throw new Error("Unauthorized to cancel this event");

  const updated = await prisma.emergencyEvent.update({
    where: { id: eventId },
    data: {
      status: "CANCELLED_FALSE_ALARM",
      resolutionNotes: reason || "Patient confirmed false alarm during countdown window.",
      resolvedAt: new Date(),
    },
  });

  if (io) {
    const payload = { eventId, patientId, reason, status: "CANCELLED_FALSE_ALARM" };
    io.to(`circle_${patientId}`).emit("emergency_resolved", payload);
    io.emit("emergency_resolved", payload);
  }

  return updated;
};

/**
 * Confirm fall emergency (or countdown timeout expiration)
 */
const confirmFallEmergencyService = async (eventId, io = null) => {
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

  if (io) {
    const alertPayload = {
      event: updatedEvent,
      emergency: updatedEvent,
      status: "ACTIVE_EMERGENCY",
    };
    io.to(`circle_${event.patientId}`).emit("emergency_triggered", alertPayload);
    io.emit("emergency_triggered", alertPayload);
  }

  return { event: updatedEvent, emergency: updatedEvent, dispatchedLogs };
};

/**
 * Auto-escalate to next tier if unacknowledged
 */
const escalateToNextTierService = async (eventId, io = null) => {
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
    return { event, emergency: event, message: "Reached highest escalation tier available." };
  }

  const updatedEvent = await prisma.emergencyEvent.update({
    where: { id: eventId },
    data: { currentTierIndex: nextTierIndex },
  });

  const log = await dispatchTierNotifications(updatedEvent, nextTier);

  if (io) {
    const payload = { event: updatedEvent, emergency: updatedEvent, currentTierIndex: nextTierIndex };
    io.to(`circle_${event.patientId}`).emit("emergency_escalated", payload);
    io.emit("emergency_escalated", payload);
  }

  return {
    event: updatedEvent,
    emergency: updatedEvent,
    escalatedToTier: nextTierIndex,
    notification: log,
  };
};

/**
 * Update live location coordinates during an active emergency
 */
const updateLiveLocationService = async (eventId, payload, io = null) => {
  const { latitude, longitude, accuracyMeters } = payload;
  const lat = Number(latitude);
  const lng = Number(longitude);
  const mapUrl = `https://www.google.com/maps?q=${lat},${lng}`;

  const updated = await prisma.emergencyEvent.update({
    where: { id: eventId },
    data: {
      latitude: lat,
      longitude: lng,
      accuracyMeters: accuracyMeters ? Number(accuracyMeters) : null,
      mapUrl,
    },
  });

  if (io) {
    io.to(`circle_${updated.patientId}`).emit("live_location_updated", {
      eventId,
      latitude: lat,
      longitude: lng,
      mapUrl,
    });
  }

  return updated;
};

/**
 * Caregiver acknowledges the emergency (halts further tier escalation)
 */
const acknowledgeEmergencyService = async (eventId, caregiverId, io = null) => {
  const updatedEvent = await prisma.emergencyEvent.update({
    where: { id: eventId },
    data: {
      status: "ACKNOWLEDGED",
      acknowledgedById: caregiverId,
      acknowledgedAt: new Date(),
    },
  });

  if (io) {
    const ackPayload = {
      eventId,
      patientId: updatedEvent.patientId,
      acknowledgedById: caregiverId,
      status: "ACKNOWLEDGED",
      event: updatedEvent,
      emergency: updatedEvent,
    };
    io.to(`circle_${updatedEvent.patientId}`).emit("emergency_acknowledged", ackPayload);
    io.emit("emergency_acknowledged", ackPayload);
  }

  return updatedEvent;
};

/**
 * Resolve the emergency with final incident review notes
 */
const resolveEmergencyService = async (eventId, caregiverId, resolutionNotes, io = null) => {
  const updatedEvent = await prisma.emergencyEvent.update({
    where: { id: eventId },
    data: {
      status: "RESOLVED",
      resolvedById: caregiverId,
      resolvedAt: new Date(),
      resolutionNotes: resolutionNotes || "Emergency resolved safely.",
    },
  });

  if (io) {
    const resPayload = {
      eventId,
      patientId: updatedEvent.patientId,
      resolvedById: caregiverId,
      status: "RESOLVED",
      event: updatedEvent,
      emergency: updatedEvent,
    };
    io.to(`circle_${updatedEvent.patientId}`).emit("emergency_resolved", resPayload);
    io.emit("emergency_resolved", resPayload);
  }

  return updatedEvent;
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
    event: activeEvent || null,
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
