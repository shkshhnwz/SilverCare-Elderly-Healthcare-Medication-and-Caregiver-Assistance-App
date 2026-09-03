const {
  postActivityItemService,
  getPatientTimelineService,
  sendCareCircleMessageService,
  listCareCircleMessagesService,
  upsertNotificationPreferencesService,
  routeNotificationService,
  upsertAccessibilitySettingsService,
  getAccessibilitySettingsService,
} = require("./communicateAndNotification.services");

const postActivityItem = async (req, res, next) => {
  try {
    const result = await postActivityItemService({ ...req.body, authorId: req.user.id });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getPatientTimeline = async (req, res, next) => {
  try {
    const result = await getPatientTimelineService(req.params.patientId, req.query);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const sendMessage = async (req, res, next) => {
  try {
    const result = await sendCareCircleMessageService(req.body, req.user.id);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const listMessages = async (req, res, next) => {
  try {
    const { limit } = req.query;
    const result = await listCareCircleMessagesService(req.params.patientId, limit);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updateNotificationPrefs = async (req, res, next) => {
  try {
    const result = await upsertNotificationPreferencesService(req.user.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const testRouteNotification = async (req, res, next) => {
  try {
    const result = await routeNotificationService(req.user.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// 6.10 Assisted Setup & Accessibility
const updateAccessibilitySettings = async (req, res, next) => {
  try {
    const targetUserId = req.params.userId || req.user.id;
    const result = await upsertAccessibilitySettingsService(targetUserId, req.body, req.user.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getAccessibilitySettings = async (req, res, next) => {
  try {
    const targetUserId = req.params.userId || req.user.id;
    const result = await getAccessibilitySettingsService(targetUserId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postActivityItem,
  getPatientTimeline,
  sendMessage,
  listMessages,
  updateNotificationPrefs,
  testRouteNotification,
  updateAccessibilitySettings,
  getAccessibilitySettings,
};
