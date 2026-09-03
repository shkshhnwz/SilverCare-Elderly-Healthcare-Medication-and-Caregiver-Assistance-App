const {
  setEscalationPolicyService,
  triggerEmergencyService,
  cancelFallCountdownService,
  confirmFallEmergencyService,
  escalateToNextTierService,
  updateLiveLocationService,
  acknowledgeEmergencyService,
  resolveEmergencyService,
  getActiveEmergencyService,
} = require("./emergency-detection.services");

const setEscalationPolicy = async (req, res, next) => {
  try {
    const result = await setEscalationPolicyService(req.params.patientId, req.body, req.user.id);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const triggerEmergency = async (req, res, next) => {
  try {
    const patientId = req.body.patientId || req.user.id;
    const result = await triggerEmergencyService(req.body, patientId);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const cancelFallCountdown = async (req, res, next) => {
  try {
    const { reason } = req.body;
    const result = await cancelFallCountdownService(req.params.eventId, req.user.id, reason);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const confirmFallEmergency = async (req, res, next) => {
  try {
    const result = await confirmFallEmergencyService(req.params.eventId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const escalateToNextTier = async (req, res, next) => {
  try {
    const result = await escalateToNextTierService(req.params.eventId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updateLiveLocation = async (req, res, next) => {
  try {
    const result = await updateLiveLocationService(req.params.eventId, req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const acknowledgeEmergency = async (req, res, next) => {
  try {
    const result = await acknowledgeEmergencyService(req.params.eventId, req.user.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const resolveEmergency = async (req, res, next) => {
  try {
    const { resolutionNotes } = req.body;
    const result = await resolveEmergencyService(req.params.eventId, req.user.id, resolutionNotes);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getActiveEmergency = async (req, res, next) => {
  try {
    const result = await getActiveEmergencyService(req.params.patientId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  setEscalationPolicy,
  triggerEmergency,
  cancelFallCountdown,
  confirmFallEmergency,
  escalateToNextTier,
  updateLiveLocation,
  acknowledgeEmergency,
  resolveEmergency,
  getActiveEmergency,
};
