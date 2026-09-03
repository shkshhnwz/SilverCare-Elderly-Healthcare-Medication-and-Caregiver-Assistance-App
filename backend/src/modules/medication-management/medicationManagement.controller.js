const {
    createMedicationService,
    listMedicationService,
    scheduleNextDoseService,
    acknowledgeDoseService,
    escalateDoseService,
    getRefillPredictionService,
    getAdherenceAnalyticsService,
} = require("./medicationManagement.service");

const createMedication = async (req, res, next) => {
    try {
        const result = await createMedicationService(req.body, req.user);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

const listMedications = async (req, res, next) => {
    try {
        const result = await listMedicationService(req.params.patientId);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const scheduleNextDose = async (req, res, next) => {
    try {
        const result = await scheduleNextDoseService(req.params.medicationId);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

const acknowledgeDose = async (req, res, next) => {
    try {
        const result = await acknowledgeDoseService(req.params.medicationId, req.params.doseId, req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const escalateDose = async (req, res, next) => {
    try {
        const result = await escalateDoseService(req.params.medicationId, req.params.doseId);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const getRefillPrediction = async (req, res, next) => {
    try {
        const result = await getRefillPredictionService(req.params.medicationId);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const getAdherenceAnalytics = async (req, res, next) => {
    try {
        const result = await getAdherenceAnalyticsService(req.params.patientId);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createMedication,
    listMedications,
    scheduleNextDose,
    acknowledgeDose,
    escalateDose,
    getRefillPrediction,
    getAdherenceAnalytics,
};