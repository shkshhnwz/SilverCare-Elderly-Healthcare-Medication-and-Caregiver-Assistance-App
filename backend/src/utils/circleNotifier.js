const prisma = require("../config/prisma");
const { sendPushToUsers } = require("../config/firebase");

/**
 * Notifies all members of a patient's Care Circle (via FCM push and real-time Socket.io)
 * @param {string} patientId 
 * @param {object} notification 
 * @param {string} notification.title
 * @param {string} notification.body
 * @param {object} [notification.data]
 * @param {string} [notification.actorUserId] User who initiated the action (excluded from push)
 * @param {object} [notification.io] Socket.io instance
 */
const notifyCareCircle = async (patientId, { title, body, data = {}, actorUserId, io }) => {
  if (!patientId) return;

  try {
    // 1. Fetch patient and care circles
    const [patient, careCircles] = await Promise.all([
      prisma.user.findUnique({
        where: { id: patientId },
        select: { id: true, firstName: true, lastName: true },
      }),
      prisma.careCircle.findMany({
        where: { patientId },
        include: {
          memberships: {
            where: { status: "ACTIVE" },
            include: {
              user: { select: { id: true, firstName: true, lastName: true } },
            },
          },
        },
      }),
    ]);

    const patientName = patient ? `${patient.firstName} ${patient.lastName}`.trim() : "Care Recipient";
    const recipientUserIds = new Set();

    // Notify patient if someone else updated
    if (patientId && patientId !== actorUserId) {
      recipientUserIds.add(patientId);
    }

    // Notify all circle owners & active members (except the person who made the change)
    for (const circle of careCircles) {
      if (circle.ownerId && circle.ownerId !== actorUserId) {
        recipientUserIds.add(circle.ownerId);
      }
      for (const m of circle.memberships) {
        if (m.userId && m.userId !== actorUserId) {
          recipientUserIds.add(m.userId);
        }
      }
    }

    const payload = {
      title,
      body,
      patientId,
      patientName,
      createdAt: new Date().toISOString(),
      ...data,
    };

    // 2. Real-time Socket.io broadcast to care circle room and global
    if (io) {
      io.to(`circle_${patientId}`).emit("circle_notification", payload);
      io.emit("circle_notification", payload);
    }

    // 3. Send FCM Push Notification to all offline/background phones in the care circle
    const recipientList = Array.from(recipientUserIds);
    if (recipientList.length > 0) {
      sendPushToUsers(recipientList, {
        title,
        body,
        data: {
          ...data,
          patientId,
          type: data.type || "CARE_CIRCLE_UPDATE",
          click_action: "FLUTTER_NOTIFICATION_CLICK",
        },
      }).catch((err) => console.error("[notifyCareCircle FCM push error]:", err.message));
    }
  } catch (err) {
    console.error("[notifyCareCircle error]:", err.message);
  }
};

module.exports = {
  notifyCareCircle,
};
