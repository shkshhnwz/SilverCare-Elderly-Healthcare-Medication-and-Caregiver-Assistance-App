const {
  recordVitalReadingService,
  setPatientThresholdService,
  getPatientThresholdsService,
  getVitalTrendsService,
  listPatientReadingsService,
  deleteVitalReadingService,
  resolveAlertService,
} = require("./vitals.services");
const { notifyCareCircle } = require("../../utils/circleNotifier");

const recordVitalReading = async (req, res, next) => {
  try {
    const result = await recordVitalReadingService(req.body, req.user.id);
    const io = req.app.get('io');
    const patientId = result.patientId || req.body.patientId;
    if (io) {
      if (patientId) io.to(`circle_${patientId}`).emit('vital_recorded', result);
      io.emit('vital_recorded', result);
    }
    const r = result.reading || result;
    const val = r.systolic && r.diastolic ? `${r.systolic}/${r.diastolic} mmHg` : `${r.value ?? ''} ${r.unit ?? ''}`.trim();
    notifyCareCircle(patientId, {
      title: "🫀 New Vital Logged",
      body: `${(r.vitalType || 'Vital').replace(/_/g, ' ')} (${val}) recorded`,
      data: { type: "VITAL_RECORDED", vitalType: r.vitalType, readingId: r.id },
      actorUserId: req.user.id,
      io,
    });
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

const listPatientReadings = async (req, res, next) => {
  try {
    const result = await listPatientReadingsService(req.params.patientId, req.query.limit);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteVitalReading = async (req, res, next) => {
  try {
    const result = await deleteVitalReadingService(req.params.readingId, req.user.id);
    const io = req.app.get('io');
    if (io) {
      if (result.patientId) io.to(`circle_${result.patientId}`).emit('vital_recorded', result);
      io.emit('vital_recorded', result);
    }
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
  listPatientReadings,
  deleteVitalReading,
  resolveAlert,
};
