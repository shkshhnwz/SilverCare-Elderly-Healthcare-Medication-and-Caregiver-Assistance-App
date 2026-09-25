const admin = require("firebase-admin");
const { getMessaging } = require("firebase-admin/messaging");
const path = require("path");
const fs = require("fs");
const prisma = require("./prisma");

let isInitialized = false;
let messaging = null;

const serviceAccountPath = path.join(__dirname, "serviceAccountKey.json");
let serviceAccount = null;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT.trim();
    if (raw.startsWith('{')) {
      serviceAccount = JSON.parse(raw);
    } else {
      const decoded = Buffer.from(raw, 'base64').toString('utf8');
      serviceAccount = JSON.parse(decoded);
    }
  } catch (e) {
    console.error("[Firebase] Failed to parse FIREBASE_SERVICE_ACCOUNT env var:", e.message);
  }
} else if (fs.existsSync(serviceAccountPath)) {
  try {
    serviceAccount = require(serviceAccountPath);
  } catch (e) {
    console.error("[Firebase] Failed to load serviceAccountKey.json:", e.message);
  }
}

if (serviceAccount) {
  try {
    if (serviceAccount.private_key) {
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    }
    const certFn = admin.credential?.cert || admin.cert;
    const app = admin.initializeApp({
      credential: certFn(serviceAccount),
    });
    messaging = getMessaging(app);
    isInitialized = true;
    console.log("[Firebase] Admin SDK initialized successfully for project:", serviceAccount.project_id);
  } catch (err) {
    console.error("[Firebase] Error initializing Firebase Admin SDK:", err.message);
  }
} else {
  console.warn(
    "[Firebase] serviceAccountKey.json or FIREBASE_SERVICE_ACCOUNT env variable not found. Push notifications are in mock mode."
  );
}

/**
 * Send push notification to a list of user IDs
 * Looks up their devicePushToken from UserNotificationPref
 */
const sendPushToUsers = async (userIds, { title, body, data = {} }) => {
  if (!Array.isArray(userIds) || userIds.length === 0) return { sentCount: 0 };

  try {
    // 1. Fetch push preferences and tokens
    const prefs = await prisma.userNotificationPref.findMany({
      where: {
        userId: { in: userIds },
        pushEnabled: true,
        devicePushToken: { not: null },
      },
      select: {
        userId: true,
        devicePushToken: true,
      },
    });

    const tokens = [];
    prefs.forEach((p) => {
      if (p.devicePushToken && typeof p.devicePushToken === "string") {
        p.devicePushToken
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
          .forEach((t) => {
            if (!tokens.includes(t)) tokens.push(t);
          });
      }
    });

    if (tokens.length === 0) {
      console.log(`[Push Notification] No registered FCM device tokens found for users: ${userIds.join(", ")}`);
      return { sentCount: 0 };
    }

    if (!isInitialized || !messaging) {
      console.log(`[Push Notification MOCK] Would send to ${tokens.length} tokens: "${title}" - "${body}"`);
      return { sentCount: tokens.length, mock: true };
    }

    // Convert data values to strings as required by FCM
    const stringifiedData = {};
    for (const [key, value] of Object.entries(data)) {
      stringifiedData[key] = typeof value === "string" ? value : JSON.stringify(value);
    }

    const message = {
      tokens,
      notification: {
        title,
        body,
      },
      data: stringifiedData,
      android: {
        priority: "high",
        notification: {
          sound: "default",
          priority: "high",
          channelId: "silvercare_alerts",
          defaultSound: true,
          defaultVibrateTimings: true,
        },
      },
      apns: {
        payload: {
          aps: {
            sound: "default",
            badge: 1,
          },
        },
      },
    };

    const response = await messaging.sendEachForMulticast(message);
    console.log(`[Push Notification] Sent ${response.successCount} / ${tokens.length} messages.`);
    return { sentCount: response.successCount, failureCount: response.failureCount };
  } catch (error) {
    console.error("[Push Notification Error]:", error.message);
    return { sentCount: 0, error: error.message };
  }
};

module.exports = {
  admin,
  messaging: () => messaging,
  isInitialized: () => isInitialized,
  sendPushToUsers,
};
