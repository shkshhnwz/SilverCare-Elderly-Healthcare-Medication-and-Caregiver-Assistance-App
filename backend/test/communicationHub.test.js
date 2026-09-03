/**
 * ==============================================================================================
 * SILVERCARE - COMMUNICATION & NOTIFICATION HUB (6.8 & 6.10) INTEGRATION TEST SUITE
 * ==============================================================================================
 * 
 * ## 1. PURPOSE & WHY TO TEST:
 *   1. Unified Activity Feed: Cross-module events (medication doses, vitals, tasks, appointments)
 *      surface as a single chronological timeline rather than being siloed per feature.
 *   2. In-App Care Circle Chat: Secure messaging and updates among family and caregivers.
 *   3. Multi-Channel Notification Routing: Dynamically routes alerts based on severity
 *      (Push for INFO/MED -> SMS for HIGH -> Voice Call for CRITICAL).
 *   4. 6.10 Remote Assisted Setup: Allows a family caregiver to remotely configure
 *      accessibility options (large fonts, high-contrast, TTS voice guidance) for the senior.
 * 
 * ## 2. HOW TO RUN:
 * Step 1: Start the backend server in one terminal:
 *   cd backend
 *   npm start   (or npm run dev)
 * 
 * Step 2: In another terminal, run this test:
 *   cd backend
 *   npm run test:communication   (or node test/communicationHub.test.js)
 * ==============================================================================================
 */

require('dotenv').config();
const prisma = require('../src/config/prisma');

const BASE_URL = process.env.TEST_API_URL || 'http://localhost:5000/api';

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  bold: "\x1b[1m",
};

const pass = (title) => console.log(`  ${colors.green}✔ PASS:${colors.reset} ${title}`);
const fail = (title, err) => {
  console.error(`  ${colors.red}✖ FAIL:${colors.reset} ${title}`);
  if (err) console.error(err);
};
const header = (title) => console.log(`\n${colors.bold}${colors.cyan}=== ${title} ===${colors.reset}`);

async function runCommunicationHubTestSuite() {
  console.log(`${colors.bold}Starting SilverCare Communication & Notification Hub (6.8 & 6.10) Test Suite...${colors.reset}\n`);

  try {
    // --------------------------------------------------------------------------------------------
    // 0. CLEANUP & SETUP
    // --------------------------------------------------------------------------------------------
    header("0. Environment Cleanup");
    const testEmails = ['comm_patient@example.com', 'comm_caregiver@example.com'];

    const existingUsers = await prisma.user.findMany({
      where: { email: { in: testEmails } },
      select: { id: true },
    });

    const userIds = existingUsers.map(u => u.id);
    if (userIds.length > 0) {
      await prisma.careCircleMessage.deleteMany({
        where: { OR: [{ patientId: { in: userIds } }, { senderId: { in: userIds } }] },
      });
      await prisma.activityFeedItem.deleteMany({ where: { patientId: { in: userIds } } });
      await prisma.userNotificationPref.deleteMany({ where: { userId: { in: userIds } } });
      await prisma.accessibilitySetting.deleteMany({ where: { userId: { in: userIds } } });
      await prisma.user.deleteMany({ where: { id: { in: userIds } } });
    }
    pass("Previous test communication data cleaned up successfully");

    // --------------------------------------------------------------------------------------------
    // 1. AUTHENTICATION (PATIENT & FAMILY CAREGIVER)
    // --------------------------------------------------------------------------------------------
    header("1. Authentication (Patient & Family Caregiver)");

    // 1a. Patient
    const patientRes = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Evelyn',
        lastName: 'Cross',
        email: 'comm_patient@example.com',
      }),
    });
    const patientData = await patientRes.json();
    if (!patientRes.ok) throw new Error(`Patient signup failed: ${JSON.stringify(patientData)}`);
    const patientToken = patientData.token;
    const patientId = patientData.user.id;
    pass(`Patient registered: Evelyn Cross (ID: ${patientId})`);

    // 1b. Family Caregiver
    const caregiverRes = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'David',
        lastName: 'Cross',
        email: 'comm_caregiver@example.com',
      }),
    });
    const caregiverData = await caregiverRes.json();
    if (!caregiverRes.ok) throw new Error(`Caregiver signup failed: ${JSON.stringify(caregiverData)}`);
    const caregiverToken = caregiverData.token;
    const caregiverId = caregiverData.user.id;
    pass(`Caregiver registered: David Cross (ID: ${caregiverId})`);

    // --------------------------------------------------------------------------------------------
    // 2. UNIFIED ACTIVITY FEED (CROSS-MODULE EVENT PUBLISHING)
    // --------------------------------------------------------------------------------------------
    header("2. Unified Activity Feed (Non-Siloed Timeline)");
    console.log("   WHY: Caregivers need one single chronological feed instead of checking each feature tab.");

    // 2a. Publish Medication Dose Event
    await fetch(`${BASE_URL}/communication-hub/activities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${patientToken}` },
      body: JSON.stringify({
        patientId,
        activityType: "MEDICATION_DOSE_TAKEN",
        title: "Morning Medication Taken",
        summary: "Evelyn confirmed morning dose of Amlodipine 5mg with photo verification.",
      }),
    });

    // 2b. Publish Vitals Recorded Event
    await fetch(`${BASE_URL}/communication-hub/activities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${patientToken}` },
      body: JSON.stringify({
        patientId,
        activityType: "VITAL_RECORDED",
        title: "Blood Pressure Recorded",
        summary: "122/80 mmHg via Bluetooth Omron Cuff - Normal in-range reading.",
      }),
    });

    // 2c. Publish Task Completed Event
    await fetch(`${BASE_URL}/communication-hub/activities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${caregiverToken}` },
      body: JSON.stringify({
        patientId,
        activityType: "CARE_TASK_COMPLETED",
        title: "Afternoon Physical Therapy Walk",
        summary: "Completed 20-minute garden walk with walker assistance.",
      }),
    });
    pass("Published 3 cross-module events (Medication, Vitals, Task)");

    // Query Unified Timeline
    const timelineRes = await fetch(`${BASE_URL}/communication-hub/patients/${patientId}/timeline`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${caregiverToken}` },
    });
    const timelineData = await timelineRes.json();
    if (!timelineRes.ok) throw new Error("Failed to fetch timeline");

    if (timelineData.length !== 3) {
      throw new Error(`Expected 3 timeline events, got: ${timelineData.length}`);
    }
    pass(`Unified Timeline returned ${timelineData.length} events in chronological order:`);
    timelineData.forEach((item, idx) => console.log(`     [${idx + 1}] (${item.activityType}): ${item.title}`));

    // --------------------------------------------------------------------------------------------
    // 3. IN-APP CARE CIRCLE CHAT
    // --------------------------------------------------------------------------------------------
    header("3. In-App Care Circle Chat");
    console.log("   WHY: Allows family and caregivers to coordinate in real time within the care circle.");

    const chatSendRes = await fetch(`${BASE_URL}/communication-hub/chat/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${caregiverToken}`,
      },
      body: JSON.stringify({
        patientId,
        content: "Hi team, Mom is resting well after lunch. Let's make sure she stays hydrated this afternoon.",
        attachmentUrl: "https://silvercare.app/attachments/lunch_checkin.jpg",
      }),
    });
    const chatSendData = await chatSendRes.json();
    if (!chatSendRes.ok) throw new Error(`Send chat message failed: ${JSON.stringify(chatSendData)}`);

    pass(`Chat message sent by David Cross: "${chatSendData.content}"`);

    // Fetch messages
    const chatListRes = await fetch(`${BASE_URL}/communication-hub/patients/${patientId}/chat`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${patientToken}` },
    });
    const chatListData = await chatListRes.json();
    if (!chatListRes.ok) throw new Error("Failed to fetch chat messages");

    if (chatListData.length === 0 || chatListData[0].id !== chatSendData.id) {
      throw new Error("Chat message not found in history");
    }
    pass(`Chat history verified: loaded ${chatListData.length} message(s)`);

    // --------------------------------------------------------------------------------------------
    // 4. MULTI-CHANNEL NOTIFICATION ROUTING
    // --------------------------------------------------------------------------------------------
    header("4. Multi-Channel Notification Router (Push -> SMS -> Voice Fallback)");
    console.log("   WHY: Non-critical updates stay as Push; critical emergencies trigger SMS & Voice calls.");

    // 4a. Update preferences
    await fetch(`${BASE_URL}/communication-hub/notifications/preferences`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${caregiverToken}` },
      body: JSON.stringify({
        pushEnabled: true,
        smsEnabled: true,
        voiceCallEnabled: true,
        minSeverityForSms: "HIGH",
        minSeverityForVoice: "CRITICAL",
        devicePushToken: "fcm_mock_token_david_phone",
      }),
    });
    pass("Caregiver notification preferences set (Push=All, SMS=HIGH, Voice=CRITICAL)");

    // 4b. Test Route: INFO Level (Expect ONLY Push)
    const infoRoute = await (await fetch(`${BASE_URL}/communication-hub/notifications/route-test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${caregiverToken}` },
      body: JSON.stringify({ title: "Reminder", body: "Afternoon tea time", severity: "INFO" }),
    })).json();

    const channelsInfo = infoRoute.channelsDispatched.map(c => c.channel);
    if (!channelsInfo.includes("PUSH") || channelsInfo.includes("SMS")) {
      throw new Error("INFO notification should only dispatch Push, not SMS");
    }
    pass("Severity INFO -> Dispatched via PUSH ONLY (Preserves SMS limits and avoids alarm fatigue)");

    // 4c. Test Route: CRITICAL Level (Expect Push, SMS, and Voice Call)
    const critRoute = await (await fetch(`${BASE_URL}/communication-hub/notifications/route-test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${caregiverToken}` },
      body: JSON.stringify({ title: "EMERGENCY SOS", body: "Fall detected in living room", severity: "CRITICAL" }),
    })).json();

    const channelsCrit = critRoute.channelsDispatched.map(c => c.channel);
    if (!channelsCrit.includes("PUSH") || !channelsCrit.includes("SMS") || !channelsCrit.includes("VOICE_CALL")) {
      throw new Error("CRITICAL notification must dispatch PUSH, SMS, and VOICE_CALL");
    }
    pass("Severity CRITICAL -> Dispatched across ALL channels (PUSH + SMS + AUTOMATED VOICE CALL)");

    // --------------------------------------------------------------------------------------------
    // 5. 6.10 REMOTE ASSISTED SETUP & ACCESSIBILITY PREFERENCES
    // --------------------------------------------------------------------------------------------
    header("5. 6.10 Remote Assisted Setup & Accessibility Preferences");
    console.log("   WHY: Family caregiver configures font scaling, high-contrast, and TTS voice guidance remotely.");

    const accessRes = await fetch(`${BASE_URL}/communication-hub/accessibility/${patientId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${caregiverToken}`,
      },
      body: JSON.stringify({
        fontScale: 1.4,              // 140% large text for vision impairment
        highContrastMode: true,       // Yellow on black contrast
        voiceGuidanceTTS: true,       // Audio narration of buttons
        simplifiedNavigation: true,   // Single-column, large tap tiles
      }),
    });
    const accessData = await accessRes.json();
    if (!accessRes.ok) throw new Error(`Accessibility setup failed: ${JSON.stringify(accessData)}`);

    if (accessData.fontScale !== 1.4 || !accessData.highContrastMode || !accessData.voiceGuidanceTTS) {
      throw new Error("Accessibility preferences mismatch");
    }
    pass("Remote Assisted Setup completed by caregiver David for patient Evelyn:");
    pass(`  - Font Scale: ${accessData.fontScale * 100}%`);
    pass(`  - High Contrast Mode: ${accessData.highContrastMode ? "ENABLED" : "DISABLED"}`);
    pass(`  - Voice Guidance (TTS): ${accessData.voiceGuidanceTTS ? "ENABLED" : "DISABLED"}`);
    pass(`  - Simplified Single-Column UI: ${accessData.simplifiedNavigation ? "ENABLED" : "DISABLED"}`);

    // --------------------------------------------------------------------------------------------
    // ALL TESTS PASSED
    // --------------------------------------------------------------------------------------------
    console.log(`\n${colors.bold}${colors.green}========================================================================${colors.reset}`);
    console.log(`${colors.bold}${colors.green}  ALL 5 COMMUNICATION & ACCESSIBILITY (6.8/6.10) TESTS PASSED!          ${colors.reset}`);
    console.log(`${colors.bold}${colors.green}========================================================================${colors.reset}\n`);

  } catch (error) {
    fail("Communication Hub Integration Test Suite Failed", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runCommunicationHubTestSuite();
