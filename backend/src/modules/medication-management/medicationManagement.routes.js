const express = require("express");
const { requireAuth, requireCircleRole } = require("../../middleware/auth");
const {
    createMedication,
    listMedications,
    scheduleNextDose,
    rescheduleDose,
    acknowledgeDose,
    escalateDose,
    getRefillPrediction,
    getAdherenceAnalytics,
} = require("./medicationManagement.controller");

const MedicationManagementRouter = express.Router();
const WRITER_ROLES = ["OWNER", "CAREGIVER_FULL", "PROFESSIONAL", "PHYSICIAN"];

MedicationManagementRouter.post("/", requireAuth, requireCircleRole(WRITER_ROLES), createMedication);
MedicationManagementRouter.get("/patients/:patientId", requireAuth, listMedications);
MedicationManagementRouter.post("/:medicationId/doses/schedule-next", requireAuth, scheduleNextDose);
MedicationManagementRouter.post("/:medicationId/doses/:doseId/reschedule", requireAuth, rescheduleDose);
MedicationManagementRouter.post("/:medicationId/doses/:doseId/acknowledge", requireAuth, acknowledgeDose);
MedicationManagementRouter.post("/:medicationId/doses/:doseId/escalate", requireAuth, escalateDose);
MedicationManagementRouter.get("/:medicationId/refill-prediction", requireAuth, getRefillPrediction);
MedicationManagementRouter.get("/patients/:patientId/adherence-analytics", requireAuth, getAdherenceAnalytics);

module.exports = MedicationManagementRouter;