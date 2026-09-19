const express = require("express");
const { requireAuth, requireCircleRole } = require("../../middleware/auth");
const {
  recordVitalReading,
  setPatientThreshold,
  getPatientThresholds,
  getVitalTrends,
  resolveAlert,
} = require("./vitals.controller");

const VitalsRouter = express.Router();
const WRITER_ROLES = ["OWNER", "CAREGIVER_FULL", "PROFESSIONAL", "PHYSICIAN"];

// Record manual or BLE reading
VitalsRouter.post("/readings", requireAuth, requireCircleRole(WRITER_ROLES), recordVitalReading);

// Dynamic Thresholds (per-patient)
VitalsRouter.post("/patients/:patientId/thresholds", requireAuth, setPatientThreshold);
VitalsRouter.get("/patients/:patientId/thresholds", requireAuth, getPatientThresholds);

// Physician Trend Review & Anomaly Analytics
VitalsRouter.get("/patients/:patientId/trends", requireAuth, getVitalTrends);

// Alert resolution / acknowledgement
VitalsRouter.patch("/alerts/:alertId/resolve", requireAuth, resolveAlert);

module.exports = VitalsRouter;
