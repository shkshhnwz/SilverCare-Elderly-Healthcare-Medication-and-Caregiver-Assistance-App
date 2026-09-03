const {
  createSafeZoneService,
  listSafeZonesService,
  recordLocationPingService,
  initiateTrackingSessionService,
  getActiveTrackingStatusService,
  resolveLocationAlertService,
} = require("./geolocasafe.services");

const createSafeZone = async (req, res, next) => {
  try {
    const result = await createSafeZoneService(req.body, req.user.id);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const listSafeZones = async (req, res, next) => {
  try {
    const result = await listSafeZonesService(req.params.patientId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const recordLocationPing = async (req, res, next) => {
  try {
    const result = await recordLocationPingService(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const initiateTrackingSession = async (req, res, next) => {
  try {
    const { durationMinutes, notes } = req.body;
    const result = await initiateTrackingSessionService(
      req.params.patientId,
      req.user.id,
      durationMinutes,
      notes
    );
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getActiveTrackingStatus = async (req, res, next) => {
  try {
    const result = await getActiveTrackingStatusService(req.params.patientId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const resolveLocationAlert = async (req, res, next) => {
  try {
    const { resolutionNotes } = req.body;
    const result = await resolveLocationAlertService(
      req.params.alertId,
      req.user.id,
      resolutionNotes
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSafeZone,
  listSafeZones,
  recordLocationPing,
  initiateTrackingSession,
  getActiveTrackingStatus,
  resolveLocationAlert,
};
