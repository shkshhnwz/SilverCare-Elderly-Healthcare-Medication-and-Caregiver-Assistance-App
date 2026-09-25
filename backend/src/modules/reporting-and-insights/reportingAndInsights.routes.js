const express = require("express");
const { requireAuth } = require("../../middleware/auth");
const {
  getPhysicianReport,
  getCaregiverWeeklyDigest,
  dispatchAppointmentReport,
  generateReport,
  getPatientReports,
} = require("./reportingAndInsights.controller");

const ReportingInsightsRouter = express.Router();

// 1. Generate Reports
ReportingInsightsRouter.post("/generate", requireAuth, generateReport);
ReportingInsightsRouter.post("/patients/:patientId/generate", requireAuth, generateReport);

// 2. List Reports for a Patient
ReportingInsightsRouter.get("/patients/:patientId", requireAuth, getPatientReports);

// 3. Physician-Ready Report (JSON or ?format=html for printing)
ReportingInsightsRouter.get("/patients/:patientId/physician-report", requireAuth, getPhysicianReport);

// 4. Caregiver Weekly Digest
ReportingInsightsRouter.get("/patients/:patientId/weekly-digest", requireAuth, getCaregiverWeeklyDigest);

// 5. Auto-email / dispatch clinical summary before appointment
ReportingInsightsRouter.post("/patients/:patientId/dispatch-appointment-report", requireAuth, dispatchAppointmentReport);

module.exports = ReportingInsightsRouter;
