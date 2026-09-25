const {
  recordVitalReadingService,
  setPatientThresholdService,
  getPatientThresholdsService,
  getVitalTrendsService,
  resolveAlertService,
} = require("./vitals.services");

const recordVitalReading = async (req, res, next) => {
  try {
    const result = await recordVitalReadingService(req.body, req.user.id);
    const io = req.app.get('io');
    if (io) {
      const patientId = result.patientId || req.body.patientId;
      if (patientId) io.to(`circle_${patientId}`).emit('vital_recorded', result);
      io.emit('vital_recorded', result);
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const setPatientThreshold = async (req, res, next) => {
  try {
    const result = await setPatientThresholdService(req.params.patientId, req.body, req.user.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getPatientThresholds = async (req, res, next) => {
  try {
    const result = await getPatientThresholdsService(req.params.patientId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getVitalTrends = async (req, res, next) => {
  try {
    const result = await getVitalTrendsService(req.params.patientId, req.query);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const resolveAlert = async (req, res, next) => {
  try {
    const result = await resolveAlertService(req.params.alertId, req.body, req.user.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  recordVitalReading,
  setPatientThreshold,
  getPatientThresholds,
  getVitalTrends,
  resolveAlert,
};
