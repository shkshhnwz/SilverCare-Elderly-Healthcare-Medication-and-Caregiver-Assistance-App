const prisma = require("../../config/prisma");

/**
 * Calculates Great-Circle distance between two coordinates in meters using the Haversine formula
 */
const calculateDistanceMeters = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};

/**
 * Caregiver creates a safe zone (e.g. Home, Walk Radius)
 */
const createSafeZoneService = async (payload, caregiverId) => {
  const { patientId, name, latitude, longitude, radiusMeters } = payload;
  if (!patientId || !name || latitude === undefined || longitude === undefined || !radiusMeters) {
    throw new Error("patientId, name, latitude, longitude, and radiusMeters are required");
  }

  return await prisma.safeZone.create({
    data: {
      patientId,
      name,
      latitude: Number(latitude),
      longitude: Number(longitude),
      radiusMeters: Number(radiusMeters),
      createdById: caregiverId,
    },
  });
};

/**
 * List active safe zones for a patient
 */
const listSafeZonesService = async (patientId) => {
  return await prisma.safeZone.findMany({
    where: { patientId, isActive: true },
    orderBy: { createdAt: "desc" },
  });
};

/**
 * Initiate or retrieve an active time-boxed tracking session
 */
const getOrCreateActiveSession = async (patientId, triggerReason, durationMinutes = 30, initiatorId = null) => {
  const now = new Date();

  // Check if there is already an active, non-expired session
  let session = await prisma.trackingSession.findFirst({
    where: {
      patientId,
      status: "ACTIVE",
      expiresAt: { gt: now },
    },
    orderBy: { startedAt: "desc" },
  });

  if (!session) {
    const expiresAt = new Date(now.getTime() + durationMinutes * 60 * 1000);
    session = await prisma.trackingSession.create({
      data: {
        patientId,
        initiatedById: initiatorId,
        triggerReason,
        status: "ACTIVE",
        expiresAt,
        disclosureSent: true, // Disclosed to the patient as privacy guarantee
        notes: `Time-boxed emergency tracking session initiated (${durationMinutes} min limit)`,
      },
    });
  }

  return session;
};

/**
 * Record location ping and run geofence breach evaluation
 */
const recordLocationPingService = async (payload) => {
  const { patientId, latitude, longitude, accuracyMeters, batteryLevel } = payload;
  if (!patientId || latitude === undefined || longitude === undefined) {
    throw new Error("patientId, latitude, and longitude are required");
  }

  const lat = Number(latitude);
  const lng = Number(longitude);

  // Fetch all active safe zones for this patient
  const safeZones = await prisma.safeZone.findMany({
    where: { patientId, isActive: true },
  });

  let isInsideAnyZone = false;
  let minDistanceToPerimeter = Infinity;

  for (const zone of safeZones) {
    const distToCenter = calculateDistanceMeters(lat, lng, zone.latitude, zone.longitude);
    if (distToCenter <= zone.radiusMeters) {
      isInsideAnyZone = true;
      break;
    } else {
      const breachDistance = distToCenter - zone.radiusMeters;
      if (breachDistance < minDistanceToPerimeter) {
        minDistanceToPerimeter = breachDistance;
      }
    }
  }

  // If there are no safe zones configured yet, assume safe by default
  if (safeZones.length === 0) {
    isInsideAnyZone = true;
  }

  let activeSession = null;
  let triggeredAlert = null;

  if (!isInsideAnyZone) {
    // 1. Automatically initiate a time-boxed tracking window (30 mins)
    activeSession = await getOrCreateActiveSession(patientId, "EMERGENCY_BREACH", 30);

    // 2. Build Google Maps Link
    const mapUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    const driftM = Math.round(minDistanceToPerimeter);

    // 3. Trigger emergency geofence alert
    triggeredAlert = await prisma.locationAlert.create({
      data: {
        patientId,
        trackingSessionId: activeSession.id,
        severity: "CRITICAL",
        status: "ACTIVE",
        lastKnownLat: lat,
        lastKnownLng: lng,
        mapUrl,
        driftDistanceM: driftM,
        message: `Geofence breach detected! Patient is ${driftM}m outside safe zones. Real-time emergency tracking active.`,
      },
    });
  } else {
    // If inside safe zone, check if there's an ongoing session
    const now = new Date();
    activeSession = await prisma.trackingSession.findFirst({
      where: { patientId, status: "ACTIVE", expiresAt: { gt: now } },
    });
  }

  // Save the breadcrumb ping linked to the session if active
  const ping = await prisma.locationPing.create({
    data: {
      patientId,
      trackingSessionId: activeSession ? activeSession.id : null,
      latitude: lat,
      longitude: lng,
      accuracyMeters: accuracyMeters ? Number(accuracyMeters) : null,
      batteryLevel: batteryLevel ? Number(batteryLevel) : null,
      isInsideSafeZone: isInsideAnyZone,
    },
  });

  return {
    ping,
    isInsideSafeZone: isInsideAnyZone,
    activeSession,
    alert: triggeredAlert,
  };
};

/**
 * Caregiver manually requests a time-boxed location tracking window (e.g. 15 mins)
 */
const initiateTrackingSessionService = async (patientId, caregiverId, durationMinutes = 15, notes) => {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + Number(durationMinutes) * 60 * 1000);

  return await prisma.trackingSession.create({
    data: {
      patientId,
      initiatedById: caregiverId,
      triggerReason: "MANUAL_CAREGIVER_REQUEST",
      status: "ACTIVE",
      expiresAt,
      disclosureSent: true,
      notes: notes || `Caregiver requested ${durationMinutes}-minute time-boxed location check`,
    },
  });
};

/**
 * Get active tracking session & breadcrumbs (only during active emergency window)
 */
const getActiveTrackingStatusService = async (patientId) => {
  const now = new Date();
  const session = await prisma.trackingSession.findFirst({
    where: {
      patientId,
      status: "ACTIVE",
      expiresAt: { gt: now },
    },
    include: {
      pings: {
        orderBy: { recordedAt: "desc" },
        take: 30, // Last 30 breadcrumb points
      },
      alerts: {
        where: { status: "ACTIVE" },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  return {
    isTrackingActive: !!session,
    session: session || null,
  };
};

/**
 * Resolve an active Geofence Alert
 */
const resolveLocationAlertService = async (alertId, caregiverId, resolutionNotes) => {
  return await prisma.locationAlert.update({
    where: { id: alertId },
    data: {
      status: "RESOLVED",
      resolvedById: caregiverId,
      resolvedAt: new Date(),
      resolutionNotes: resolutionNotes || "Patient confirmed safe and returned to safe zone.",
    },
  });
};

module.exports = {
  createSafeZoneService,
  listSafeZonesService,
  recordLocationPingService,
  initiateTrackingSessionService,
  getActiveTrackingStatusService,
  resolveLocationAlertService,
};
