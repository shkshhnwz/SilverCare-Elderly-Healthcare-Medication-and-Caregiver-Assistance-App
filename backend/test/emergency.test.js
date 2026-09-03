/**
 * ==============================================================================================
 * SILVERCARE - EMERGENCY DETECTION & SOS (6.4) INTEGRATION TEST SUITE
 * ==============================================================================================
 * 
 * ## 1. PURPOSE & WHY TO TEST:
 * For elderly patients requiring emergency intervention:
 *   1. Escalation Policy Engine: Configurable per patient with multiple tiers (Push -> SMS -> Voice).
 *   2. One-Tap SOS: Immediately triggers active emergency and dispatches Tier 1 notifications.
 *   3. Fall Detection & False-Alarm Cancellation:
 *        - Fall triggers a 30s countdown window (COUNTDOWN_ACTIVE).
 *        - Patient can cancel before expiry (CANCELLED_FALSE_ALARM) to avoid alarm fatigue.
 *        - If confirmed or timed out, it auto-upgrades to ACTIVE_EMERGENCY.
 *   4. Auto-Escalation: Unacknowledged emergency advances to Tier 2 and Tier 3.
 *   5. Live Location Sharing: Real-time GPS stream + Google Maps link while emergency is active.
 *   6. Acknowledgment & Resolution: Caregiver acknowledges to halt escalation and resolves with notes.
 * 
 * ## 2. HOW TO RUN:
 * Step 1: Start the backend server in one terminal:
 *   cd backend
 *   npm start   (or npm run dev)
 * 
 * Step 2: In another terminal, run this test:
 *   cd backend
 *   npm run test:emergency   (or node test/emergency.test.js)
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

async function runEmergencyTestSuite() {
  console.log(`${colors.bold}Starting SilverCare Emergency Detection & SOS (6.4) Test Suite...${colors.reset}\n`);

  try {
    // --------------------------------------------------------------------------------------------
    // 0. CLEANUP & SETUP
    // --------------------------------------------------------------------------------------------
    header("0. Environment Cleanup");
    const testEmails = ['emergency_patient@example.com', 'emergency_caregiver1@example.com', 'emergency_caregiver2@example.com'];

    const existingUsers = await prisma.user.findMany({
      where: { email: { in: testEmails } },
      select: { id: true },
    });

    const userIds = existingUsers.map(u => u.id);
    if (userIds.length > 0) {
      await prisma.emergencyNotificationLog.deleteMany({
        where: { event: { patientId: { in: userIds } } },
      });
      await prisma.emergencyEvent.deleteMany({ where: { patientId: { in: userIds } } });
      await prisma.escalationTier.deleteMany({
        where: { policy: { patientId: { in: userIds } } },
      });
      await prisma.emergencyEscalationPolicy.deleteMany({ where: { patientId: { in: userIds } } });
      await prisma.user.deleteMany({ where: { id: { in: userIds } } });
    }
    pass("Previous test data cleaned up successfully");

    // --------------------------------------------------------------------------------------------
    // 1. AUTHENTICATION (PATIENT & 2 CAREGIVERS)
    // --------------------------------------------------------------------------------------------
    header("1. Authentication (Patient & Multi-Tier Caregivers)");

    // 1a. Patient
    const patientRes = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Martha',
        lastName: 'Wayne',
        email: 'emergency_patient@example.com',
      }),
    });
    const patientData = await patientRes.json();
    if (!patientRes.ok) throw new Error(`Patient signup failed: ${JSON.stringify(patientData)}`);
    const patientToken = patientData.token;
    const patientId = patientData.user.id;
    pass(`Patient registered: Martha Wayne (ID: ${patientId})`);

    // 1b. Tier 1 Caregiver (Family)
    const caregiver1Res = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Bruce',
        lastName: 'Wayne',
        email: 'emergency_caregiver1@example.com',
        phone: '+15551234567',
      }),
    });
    const caregiver1Data = await caregiver1Res.json();
    if (!caregiver1Res.ok) throw new Error(`Caregiver 1 signup failed: ${JSON.stringify(caregiver1Data)}`);
    const caregiver1Token = caregiver1Data.token;
    const caregiver1Id = caregiver1Data.user.id;
    pass(`Tier 1 Caregiver registered: Bruce Wayne (ID: ${caregiver1Id})`);

    // 1c. Tier 2 Caregiver (Professional Caregiver)
    const caregiver2Res = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Alfred',
        lastName: 'Pennyworth',
        email: 'emergency_caregiver2@example.com',
        phone: '+15559876543',
      }),
    });
    const caregiver2Data = await caregiver2Res.json();
    if (!caregiver2Res.ok) throw new Error(`Caregiver 2 signup failed: ${JSON.stringify(caregiver2Data)}`);
    const caregiver2Id = caregiver2Data.user.id;
    pass(`Tier 2 Caregiver registered: Alfred Pennyworth (ID: ${caregiver2Id})`);

    // --------------------------------------------------------------------------------------------
    // 2. CONFIGURE PER-PATIENT ESCALATION POLICY ENGINE
    // --------------------------------------------------------------------------------------------
    header("2. Escalation Policy Configuration (Push -> SMS -> Voice Call)");
    console.log("   WHY: Configures who gets alerted in what order across which channels.");

    const policyRes = await fetch(`${BASE_URL}/emergency/patients/${patientId}/escalation-policy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${caregiver1Token}`,
      },
      body: JSON.stringify({
        name: "Martha Wayne Escalation Matrix",
        tiers: [
          {
            tierOrder: 1,
            contactUserId: caregiver1Id,
            channel: "PUSH_NOTIFICATION",
            timeoutMinutes: 3,
          },
          {
            tierOrder: 2,
            contactUserId: caregiver2Id,
            channel: "SMS",
            timeoutMinutes: 3,
          },
          {
            tierOrder: 3,
            customName: "Metropolis Emergency EMS",
            customPhone: "+19110000000",
            channel: "VOICE_CALL",
            timeoutMinutes: 5,
          },
        ],
      }),
    });
    const policyData = await policyRes.json();
    if (!policyRes.ok) throw new Error(`Policy creation failed: ${JSON.stringify(policyData)}`);

    if (policyData.tiers.length !== 3) throw new Error("Expected 3 escalation tiers");
    pass("Escalation Policy created with 3 tiers (Tier 1: Push -> Tier 2: SMS -> Tier 3: Voice Call)");

    // --------------------------------------------------------------------------------------------
    // 3. ONE-TAP SOS TRIGGER WITH GPS LOCATION
    // --------------------------------------------------------------------------------------------
    header("3. One-Tap SOS Trigger with Live GPS Ingestion");
    console.log("   WHY: Instant trigger from lock screen / button. Dispatches Tier 1 instantly.");

    const sosRes = await fetch(`${BASE_URL}/emergency/trigger`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${patientToken}`,
      },
      body: JSON.stringify({
        patientId,
        eventType: "ONE_TAP_SOS",
        latitude: 40.7128,
        longitude: -74.0060,
        accuracyMeters: 4.5,
      }),
    });
    const sosData = await sosRes.json();
    if (!sosRes.ok) throw new Error(`SOS trigger failed: ${JSON.stringify(sosData)}`);

    if (sosData.event.status !== "ACTIVE_EMERGENCY" || !sosData.event.mapUrl.includes("google.com/maps")) {
      throw new Error("SOS event not in ACTIVE_EMERGENCY or missing Google Maps link");
    }
    if (sosData.dispatchedLogs.length === 0 || sosData.dispatchedLogs[0].channel !== "PUSH_NOTIFICATION") {
      throw new Error("Tier 1 Push Notification was not logged");
    }
    const sosEventId = sosData.event.id;
    pass(`One-Tap SOS active! Event ID: ${sosEventId}`);
    pass(`Live Google Maps URL generated: ${sosData.event.mapUrl}`);
    pass(`Tier 1 Alert dispatched to: ${sosData.dispatchedLogs[0].recipientName} via ${sosData.dispatchedLogs[0].channel}`);

    // --------------------------------------------------------------------------------------------
    // 4. LIVE LOCATION STREAMING DURING ACTIVE EMERGENCY
    // --------------------------------------------------------------------------------------------
    header("4. Live Location Streaming During Active Emergency");
    console.log("   WHY: Updates responder with live GPS trail as patient is located or transported.");

    const liveLocRes = await fetch(`${BASE_URL}/emergency/${sosEventId}/live-location`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${patientToken}`,
      },
      body: JSON.stringify({
        latitude: 40.7135,
        longitude: -74.0055,
        accuracyMeters: 3.2,
      }),
    });
    const liveLocData = await liveLocRes.json();
    if (!liveLocRes.ok) throw new Error(`Live location update failed: ${JSON.stringify(liveLocData)}`);

    if (liveLocData.latitude !== 40.7135) throw new Error("Location coordinates were not updated");
    pass("Live GPS updated successfully to 40.7135, -74.0055");

    // --------------------------------------------------------------------------------------------
    // 5. ESCALATION ENGINE - AUTO-ESCALATION TO TIER 2
    // --------------------------------------------------------------------------------------------
    header("5. Escalation Engine (Advance to Tier 2: SMS)");
    console.log("   WHY: If Tier 1 does not acknowledge within timeout, escalate to secondary caregiver via SMS.");

    const escalateRes = await fetch(`${BASE_URL}/emergency/${sosEventId}/escalate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${patientToken}`,
      },
    });
    const escalateData = await escalateRes.json();
    if (!escalateRes.ok) throw new Error(`Escalation failed: ${JSON.stringify(escalateData)}`);

    if (escalateData.escalatedToTier !== 2 || escalateData.notification.channel !== "SMS") {
      throw new Error("Expected escalation to Tier 2 via SMS");
    }
    pass(`Escalated to Tier 2! Recipient: ${escalateData.notification.recipientName} via SMS (${escalateData.notification.recipientTarget})`);

    // --------------------------------------------------------------------------------------------
    // 6. CAREGIVER ACKNOWLEDGMENT & RESOLUTION
    // --------------------------------------------------------------------------------------------
    header("6. Acknowledgment & Resolution of Active SOS");
    console.log("   WHY: Acknowledgment halts further tier escalation; resolution audits recovery details.");

    // Acknowledge
    const ackRes = await fetch(`${BASE_URL}/emergency/${sosEventId}/acknowledge`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${caregiver1Token}` },
    });
    const ackData = await ackRes.json();
    if (!ackRes.ok) throw new Error(`Acknowledgment failed: ${JSON.stringify(ackData)}`);
    if (ackData.status !== "ACKNOWLEDGED") throw new Error("Expected status ACKNOWLEDGED");
    pass(`Emergency acknowledged by Bruce Wayne -> Tier escalation halted`);

    // Resolve
    const resRes = await fetch(`${BASE_URL}/emergency/${sosEventId}/resolve`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${caregiver1Token}`,
      },
      body: JSON.stringify({
        resolutionNotes: "Arrived at location. Patient is unhurt, assisted back inside.",
      }),
    });
    const resData = await resRes.json();
    if (!resRes.ok) throw new Error(`Resolution failed: ${JSON.stringify(resData)}`);
    if (resData.status !== "RESOLVED") throw new Error("Expected status RESOLVED");
    pass(`Emergency marked RESOLVED with clinical note: "${resData.resolutionNotes}"`);

    // --------------------------------------------------------------------------------------------
    // 7. FALL DETECTION HEURISTIC WITH COUNTDOWN & FALSE-ALARM CANCELLATION
    // --------------------------------------------------------------------------------------------
    header("7. Fall Detection Heuristic & False-Alarm Cancellation");
    console.log("   WHY: Dropped phones trigger 30s countdown. Patient cancels to avoid caregiver alarm fatigue.");

    const fallRes = await fetch(`${BASE_URL}/emergency/trigger`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${patientToken}`,
      },
      body: JSON.stringify({
        patientId,
        eventType: "FALL_DETECTED",
        latitude: 40.7128,
        longitude: -74.0060,
        countdownSeconds: 30,
        accelerometerVector: { impactG: 3.8, orientationChangeDeg: 85 },
      }),
    });
    const fallData = await fallRes.json();
    if (!fallRes.ok) throw new Error(`Fall trigger failed: ${JSON.stringify(fallData)}`);

    if (fallData.event.status !== "COUNTDOWN_ACTIVE" || fallData.event.countdownSeconds !== 30) {
      throw new Error("Expected COUNTDOWN_ACTIVE status for fall detection");
    }
    const fallEventId = fallData.event.id;
    pass(`Fall detected! 30-second cancellation countdown active (Event ID: ${fallEventId})`);

    // Patient cancels countdown (False alarm)
    const cancelRes = await fetch(`${BASE_URL}/emergency/${fallEventId}/cancel-countdown`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${patientToken}`,
      },
      body: JSON.stringify({
        reason: "Dropped phone on soft carpet, I am completely fine.",
      }),
    });
    const cancelData = await cancelRes.json();
    if (!cancelRes.ok) throw new Error(`Cancel countdown failed: ${JSON.stringify(cancelData)}`);

    if (cancelData.status !== "CANCELLED_FALSE_ALARM") {
      throw new Error("Expected status CANCELLED_FALSE_ALARM");
    }
    pass(`Patient cancelled false alarm! Status: CANCELLED_FALSE_ALARM -> Zero caregiver alarm fatigue`);

    // --------------------------------------------------------------------------------------------
    // ALL TESTS PASSED
    // --------------------------------------------------------------------------------------------
    console.log(`\n${colors.bold}${colors.green}========================================================================${colors.reset}`);
    console.log(`${colors.bold}${colors.green}  ALL 7 EMERGENCY DETECTION & SOS (6.4) TESTS PASSED!                   ${colors.reset}`);
    console.log(`${colors.bold}${colors.green}========================================================================${colors.reset}\n`);

  } catch (error) {
    fail("Emergency Integration Test Suite Failed", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runEmergencyTestSuite();
