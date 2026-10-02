const express = require("express");
const { requireAuth } = require("../../middleware/auth");
const {
  createSafeZone,
  listSafeZones,
  deleteSafeZone,
  recordLocationPing,
  initiateTrackingSession,
  getActiveTrackingStatus,
  resolveLocationAlert,
  listLocationAlerts,
} = require("./geolocasafe.controller");

const LocationSafetyRouter = express.Router();

// Safe Zone Management
LocationSafetyRouter.post("/safe-zones", requireAuth, createSafeZone);
LocationSafetyRouter.get("/patients/:patientId/safe-zones", requireAuth, listSafeZones);
LocationSafetyRouter.delete("/safe-zones/:zoneId", requireAuth, deleteSafeZone);

// Location Ping Ingestion (from patient app / GPS wearable)
LocationSafetyRouter.post("/pings", requireAuth, recordLocationPing);

// Time-Boxed Tracking Sessions
LocationSafetyRouter.post("/patients/:patientId/tracking-sessions", requireAuth, initiateTrackingSession);
LocationSafetyRouter.get("/patients/:patientId/tracking-status", requireAuth, getActiveTrackingStatus);

// Geofence Alerts
LocationSafetyRouter.get("/patients/:patientId/alerts", requireAuth, listLocationAlerts);
LocationSafetyRouter.patch("/alerts/:alertId/resolve", requireAuth, resolveLocationAlert);

module.exports = LocationSafetyRouter;
