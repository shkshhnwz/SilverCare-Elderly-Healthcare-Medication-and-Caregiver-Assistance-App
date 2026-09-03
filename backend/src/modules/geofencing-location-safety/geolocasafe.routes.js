const express = require("express");
const { requireAuth } = require("../../middleware/auth");
const {
  createSafeZone,
  listSafeZones,
  recordLocationPing,
  initiateTrackingSession,
  getActiveTrackingStatus,
  resolveLocationAlert,
} = require("./geolocasafe.controller");

const LocationSafetyRouter = express.Router();

// Safe Zone Management
LocationSafetyRouter.post("/safe-zones", requireAuth, createSafeZone);
LocationSafetyRouter.get("/patients/:patientId/safe-zones", requireAuth, listSafeZones);

// Location Ping Ingestion (from patient app / GPS wearable)
LocationSafetyRouter.post("/pings", requireAuth, recordLocationPing);

// Time-Boxed Tracking Sessions
LocationSafetyRouter.post("/patients/:patientId/tracking-sessions", requireAuth, initiateTrackingSession);
LocationSafetyRouter.get("/patients/:patientId/tracking-status", requireAuth, getActiveTrackingStatus);

// Geofence Alert Resolution
LocationSafetyRouter.patch("/alerts/:alertId/resolve", requireAuth, resolveLocationAlert);

module.exports = LocationSafetyRouter;
