const express = require("express");
const { requireAuth } = require("../../middleware/auth");
const {
  postActivityItem,
  getPatientTimeline,
  sendMessage,
  listMessages,
  updateNotificationPrefs,
  testRouteNotification,
  updateAccessibilitySettings,
  getAccessibilitySettings,
} = require("./communicateAndNotification.controller");

const CommunicationHubRouter = express.Router();

// 1. Unified Activity Feed
CommunicationHubRouter.post("/activities", requireAuth, postActivityItem);
CommunicationHubRouter.get("/patients/:patientId/timeline", requireAuth, getPatientTimeline);
CommunicationHubRouter.get("/patients/:patientId", requireAuth, getPatientTimeline);

// 2. In-App Care Circle Chat
CommunicationHubRouter.post("/chat/messages", requireAuth, sendMessage);
CommunicationHubRouter.post("/message", requireAuth, (req, res, next) => {
  if (req.body.message && !req.body.content) req.body.content = req.body.message;
  return sendMessage(req, res, next);
});
CommunicationHubRouter.get("/patients/:patientId/chat", requireAuth, listMessages);

// 3. Multi-Channel Notification Preferences & Router
CommunicationHubRouter.post("/notifications/preferences", requireAuth, updateNotificationPrefs);
CommunicationHubRouter.put("/notifications/preferences", requireAuth, updateNotificationPrefs);
CommunicationHubRouter.post("/preferences", requireAuth, updateNotificationPrefs);
CommunicationHubRouter.put("/preferences", requireAuth, updateNotificationPrefs);
CommunicationHubRouter.post("/notifications/route-test", requireAuth, testRouteNotification);

// 4. 6.10 Assisted Setup & Accessibility Preferences
CommunicationHubRouter.post("/accessibility/:userId", requireAuth, updateAccessibilitySettings);
CommunicationHubRouter.get("/accessibility/:userId", requireAuth, getAccessibilitySettings);

module.exports = CommunicationHubRouter;
