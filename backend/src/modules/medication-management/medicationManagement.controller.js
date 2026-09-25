const {
    createMedicationService,
    listMedicationService,
    scheduleNextDoseService,
    rescheduleDoseService,
    acknowledgeDoseService,
    escalateDoseService,
    getRefillPredictionService,
    getAdherenceAnalyticsService,
} = require("./medicationManagement.service");
const { notifyCareCircle } = require("../../utils/circleNotifier");

const createMedication = async (req, res, next) => {
    try {
        const result = await createMedicationService(req.body, req.user);
        const io = req.app.get('io');
        const patientId = req.body.patientId;
        if (io && patientId) {
            io.to(`circle_${patientId}`).emit('medication_created', result);
            io.emit('medication_created', result);
        }
        notifyCareCircle(patientId, {
            title: "💊 New Prescription Added",
            body: `${req.body.medicationName || 'Medication'} (${req.body.dosage || ''}) prescribed`,
            data: { type: "MEDICATION_ADDED", medicationName: req.body.medicationName },
            actorUserId: req.user.id,
            io,
        });
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
        const result = await scheduleNextDoseService(req.params.medicationId, req.body);
        const io = req.app.get('io');
        const patientId = result.patientId;
        if (io && patientId) {
            io.to(`circle_${patientId}`).emit('dose_scheduled', result);
            io.emit('dose_scheduled', result);
        }
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

const rescheduleDose = async (req, res, next) => {
    try {
        const result = await rescheduleDoseService(req.params.medicationId, req.params.doseId, req.body);
        const io = req.app.get('io');
        const patientId = result.patientId;
        if (io && patientId) {
            io.to(`circle_${patientId}`).emit('dose_rescheduled', result);
            io.emit('dose_rescheduled', result);
        }
        notifyCareCircle(patientId, {
            title: "⏰ Medication Rescheduled",
            body: `${result.medicationName || 'Dose'} rescheduled to ${new Date(result.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
            data: { type: "DOSE_RESCHEDULED", medicationId: req.params.medicationId, doseId: req.params.doseId },
            actorUserId: req.user.id,
            io,
        });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const acknowledgeDose = async (req, res, next) => {
    try {
        const result = await acknowledgeDoseService(req.params.medicationId, req.params.doseId, req.body);
        const io = req.app.get('io');
        if (req.body.action === 'taken') {
            notifyCareCircle(result.dose?.medication?.patientId, {
                title: "✅ Medication Taken",
                body: `Dose confirmed taken as prescribed`,
                data: { type: "DOSE_TAKEN", doseId: req.params.doseId },
                actorUserId: req.user.id,
                io,
            });
        }
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
    rescheduleDose,
    acknowledgeDose,
    escalateDose,
    getRefillPrediction,
    getAdherenceAnalytics,
};