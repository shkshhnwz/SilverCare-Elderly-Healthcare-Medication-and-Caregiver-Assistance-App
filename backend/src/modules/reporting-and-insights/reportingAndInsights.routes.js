const express = require("express");
const { requireAuth } = require("../../middleware/auth");
const {
  getPhysicianReport,
  getCaregiverWeeklyDigest,
  dispatchAppointmentReport,
} = require("./reportingAndInsights.controller");

const ReportingInsightsRouter = express.Router();

// 1. Physician-Ready Report (JSON or ?format=html for printing)
ReportingInsightsRouter.get("/patients/:patientId/physician-report", requireAuth, getPhysicianReport);

// 2. Caregiver Weekly Digest
ReportingInsightsRouter.get("/patients/:patientId/weekly-digest", requireAuth, getCaregiverWeeklyDigest);

// 3. Auto-email / dispatch clinical summary before appointment
ReportingInsightsRouter.post("/patients/:patientId/dispatch-appointment-report", requireAuth, dispatchAppointmentReport);

module.exports = ReportingInsightsRouter;
