const {
  createSafeZoneService,
  listSafeZonesService,
  deleteSafeZoneService,
  recordLocationPingService,
  initiateTrackingSessionService,
  getActiveTrackingStatusService,
  resolveLocationAlertService,
  listLocationAlertsService,
} = require("./geolocasafe.services");

const createSafeZone = async (req, res, next) => {
  try {
    const result = await createSafeZoneService(req.body, req.user.id);
    const io = req.app.get('io');
    if (io) {
      const patientId = result.patientId || req.body.patientId;
      if (patientId) io.to(`circle_${patientId}`).emit('safe_zone_created', result);
      io.emit('safe_zone_created', result);
    }
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

const deleteSafeZone = async (req, res, next) => {
  try {
    const result = await deleteSafeZoneService(req.params.zoneId);
    const io = req.app.get('io');
    if (io) {
      const patientId = result.patientId;
      if (patientId) io.to(`circle_${patientId}`).emit('safe_zone_deleted', result);
      io.emit('safe_zone_deleted', result);
    }
    res.status(200).json({ message: "Safe zone deleted successfully", zone: result });
  } catch (error) {
    next(error);
  }
};

const recordLocationPing = async (req, res, next) => {
  try {
    const result = await recordLocationPingService(req.body);
    const io = req.app.get('io');
    if (io) {
      const patientId = req.body.patientId;
      if (patientId) {
        if (result.alert) {
          io.to(`circle_${patientId}`).emit('location_alert', result.alert);
          io.emit('location_alert', result.alert);
        }
        io.to(`circle_${patientId}`).emit('location_ping', result.ping);
      }
    }
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
    const io = req.app.get('io');
    if (io) {
      const patientId = result.patientId;
      if (patientId) {
        io.to(`circle_${patientId}`).emit('location_alert_resolved', result);
        io.emit('location_alert_resolved', result);
      }
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const listLocationAlerts = async (req, res, next) => {
  try {
    const result = await listLocationAlertsService(req.params.patientId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSafeZone,
  listSafeZones,
  deleteSafeZone,
  recordLocationPing,
  initiateTrackingSession,
  getActiveTrackingStatus,
  resolveLocationAlert,
  listLocationAlerts,
};
