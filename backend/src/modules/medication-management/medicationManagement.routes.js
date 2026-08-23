const express = require("express");
const { requireAuth } = require("../../middleware/auth");
const {
    createMedication,
    listMedications,
    scheduleNextDose,
    acknowledgeDose,
    escalateDose,
    getRefillPrediction,
    getAdherenceAnalytics,
} = require("./medicationManagement.controller");

const MedicationManagementRouter = express.Router();

MedicationManagementRouter.post("/", requireAuth, createMedication);
MedicationManagementRouter.get("/patients/:patientId", requireAuth, listMedications);
MedicationManagementRouter.post("/:medicationId/doses/schedule-next", requireAuth, scheduleNextDose);
MedicationManagementRouter.post("/:medicationId/doses/:doseId/acknowledge", requireAuth, acknowledgeDose);
MedicationManagementRouter.post("/:medicationId/doses/:doseId/escalate", requireAuth, escalateDose);
MedicationManagementRouter.get("/:medicationId/refill-prediction", requireAuth, getRefillPrediction);
MedicationManagementRouter.get("/patients/:patientId/adherence-analytics", requireAuth, getAdherenceAnalytics);

module.exports = MedicationManagementRouter;