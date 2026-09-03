const prisma = require("../../config/prisma");

/**
 * 1. Publish to Unified Activity Feed (Cross-Module Event Bus)
 */
const postActivityItemService = async (payload) => {
  const { patientId, authorId, activityType, title, summary, metadata } = payload;
  if (!patientId || !activityType || !title || !summary) {
    throw new Error("patientId, activityType, title, and summary are required");
  }

  return await prisma.activityFeedItem.create({
    data: {
      patientId,
      authorId: authorId || null,
      activityType,
      title,
      summary,
      metadata: metadata || null,
    },
    include: {
      author: { select: { id: true, firstName: true, lastName: true } },
    },
  });
};

/**
 * 2. Get Unified Timeline (Not siloed — all care events in one stream)
 */
const getPatientTimelineService = async (patientId, query = {}) => {
  const { limit = 50, activityType } = query;
  const where = { patientId };
  if (activityType) where.activityType = activityType;

  return await prisma.activityFeedItem.findMany({
    where,
    include: {
      author: { select: { id: true, firstName: true, lastName: true } },
    },
    orderBy: { createdAt: "desc" },
    take: Number(limit),
  });
};

/**
 * 3. Care Circle Chat: Send Message
 */
const sendCareCircleMessageService = async (payload, senderId) => {
  const { patientId, content, attachmentUrl } = payload;
  if (!patientId || !content) {
    throw new Error("patientId and content are required");
  }

  return await prisma.careCircleMessage.create({
    data: {
      patientId,
      senderId,
      content,
      attachmentUrl: attachmentUrl || null,
    },
    include: {
      sender: { select: { id: true, firstName: true, lastName: true } },
    },
  });
};

/**
 * 4. Care Circle Chat: List Messages
 */
const listCareCircleMessagesService = async (patientId, limit = 50) => {
  return await prisma.careCircleMessage.findMany({
    where: { patientId },
    include: {
      sender: { select: { id: true, firstName: true, lastName: true } },
    },
    orderBy: { createdAt: "asc" },
    take: Number(limit),
  });
};

/**
 * 5. Update Notification Preferences
 */
const upsertNotificationPreferencesService = async (userId, payload) => {
  const {
    pushEnabled,
    smsEnabled,
    voiceCallEnabled,
    quietHoursStart,
    quietHoursEnd,
    minSeverityForSms,
    minSeverityForVoice,
    devicePushToken,
  } = payload;

  return await prisma.userNotificationPref.upsert({
    where: { userId },
    update: {
      pushEnabled,
      smsEnabled,
      voiceCallEnabled,
      quietHoursStart,
      quietHoursEnd,
      minSeverityForSms,
      minSeverityForVoice,
      devicePushToken,
    },
    create: {
      userId,
      pushEnabled: pushEnabled !== undefined ? pushEnabled : true,
      smsEnabled: smsEnabled !== undefined ? smsEnabled : true,
      voiceCallEnabled: voiceCallEnabled !== undefined ? voiceCallEnabled : false,
      quietHoursStart,
      quietHoursEnd,
      minSeverityForSms: minSeverityForSms || "HIGH",
      minSeverityForVoice: minSeverityForVoice || "CRITICAL",
      devicePushToken,
    },
  });
};

/**
 * 6. Intelligent Multi-Channel Notification Router (Push -> SMS -> Voice)
 */
const routeNotificationService = async (userId, notification) => {
  const { title, body, severity = "INFO" } = notification;

  // Retrieve user preferences
  const prefs = await prisma.userNotificationPref.findUnique({
    where: { userId },
  });

  const channelsDispatched = [];

  // 1. Push Notification (FCM / APNs)
  if (!prefs || prefs.pushEnabled) {
    channelsDispatched.push({
      channel: "PUSH",
      status: "SENT",
      targetToken: prefs?.devicePushToken || "device_token_simulated",
      details: { title, body },
    });
  }

  // 2. SMS Delivery Check
  const requiresSms =
    severity === "CRITICAL" ||
    (severity === "HIGH" && (!prefs || prefs.minSeverityForSms !== "CRITICAL"));

  if (prefs?.smsEnabled && requiresSms) {
    channelsDispatched.push({
      channel: "SMS",
      status: "SENT",
      details: `[SilverCare Alert]: ${title} - ${body}`,
    });
  }

  // 3. Voice Call Fallback (Only for CRITICAL emergency breaches)
  if (severity === "CRITICAL" && prefs?.voiceCallEnabled) {
    channelsDispatched.push({
      channel: "VOICE_CALL",
      status: "DISPATCHED",
      details: `Automated Voice Warning: ${title}`,
    });
  }

  return {
    userId,
    severity,
    channelsDispatched,
  };
};

/**
 * 7. 6.10 Assisted Setup & Accessibility Preferences (Remote Caregiver Config)
 */
const upsertAccessibilitySettingsService = async (targetUserId, payload, configuredByCaregiverId) => {
  const {
    fontScale = 1.3,
    highContrastMode = false,
    voiceGuidanceTTS = false,
    simplifiedNavigation = true,
    screenReaderOptimized = false,
  } = payload;

  return await prisma.accessibilitySetting.upsert({
    where: { userId: targetUserId },
    update: {
      fontScale: Number(fontScale),
      highContrastMode: Boolean(highContrastMode),
      voiceGuidanceTTS: Boolean(voiceGuidanceTTS),
      simplifiedNavigation: Boolean(simplifiedNavigation),
      screenReaderOptimized: Boolean(screenReaderOptimized),
      configuredByCaregiverId,
    },
    create: {
      userId: targetUserId,
      fontScale: Number(fontScale),
      highContrastMode: Boolean(highContrastMode),
      voiceGuidanceTTS: Boolean(voiceGuidanceTTS),
      simplifiedNavigation: Boolean(simplifiedNavigation),
      screenReaderOptimized: Boolean(screenReaderOptimized),
      configuredByCaregiverId,
    },
  });
};

const getAccessibilitySettingsService = async (userId) => {
  const settings = await prisma.accessibilitySetting.findUnique({
    where: { userId },
  });

  // Default elderly-first profile if not yet configured
  return settings || {
    userId,
    fontScale: 1.2,
    highContrastMode: false,
    voiceGuidanceTTS: false,
    simplifiedNavigation: true,
    screenReaderOptimized: false,
  };
};

module.exports = {
  postActivityItemService,
  getPatientTimelineService,
  sendCareCircleMessageService,
  listCareCircleMessagesService,
  upsertNotificationPreferencesService,
  routeNotificationService,
  upsertAccessibilitySettingsService,
  getAccessibilitySettingsService,
};
