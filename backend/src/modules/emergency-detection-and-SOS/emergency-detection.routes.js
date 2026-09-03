const express = require("express");
const { requireAuth } = require("../../middleware/auth");
const {
  setEscalationPolicy,
  triggerEmergency,
  cancelFallCountdown,
  confirmFallEmergency,
  escalateToNextTier,
  updateLiveLocation,
  acknowledgeEmergency,
  resolveEmergency,
  getActiveEmergency,
} = require("./emergency-detection.controller");

const EmergencyRouter = express.Router();

// Escalation policy configuration
EmergencyRouter.post("/patients/:patientId/escalation-policy", requireAuth, setEscalationPolicy);

// Emergency triggering
EmergencyRouter.post("/trigger", requireAuth, triggerEmergency);

// Fall countdown cancellation (false alarm) or confirmation
EmergencyRouter.post("/:eventId/cancel-countdown", requireAuth, cancelFallCountdown);
EmergencyRouter.post("/:eventId/confirm-fall", requireAuth, confirmFallEmergency);

// Escalation engine advance
EmergencyRouter.post("/:eventId/escalate", requireAuth, escalateToNextTier);

// Live location streaming during active emergency
EmergencyRouter.patch("/:eventId/live-location", requireAuth, updateLiveLocation);

// Acknowledge & Resolve
EmergencyRouter.patch("/:eventId/acknowledge", requireAuth, acknowledgeEmergency);
EmergencyRouter.patch("/:eventId/resolve", requireAuth, resolveEmergency);

// Query active emergency status
EmergencyRouter.get("/patients/:patientId/active", requireAuth, getActiveEmergency);

module.exports = EmergencyRouter;
