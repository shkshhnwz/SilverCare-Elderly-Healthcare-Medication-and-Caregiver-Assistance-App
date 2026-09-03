/**
 * ==============================================================================================
 * SILVERCARE - CARE PLAN & TASK COORDINATION (6.6) INTEGRATION TEST SUITE
 * ==============================================================================================
 * 
 * ## 1. PURPOSE & WHY TO TEST:
 * In multi-caregiver environments (family + professional aides):
 *   1. Versioned Care Plan: Changes must increment version (v1 -> v2) and save immutable snapshots
 *      of who changed what and when (critical for liability and multi-caregiver trust).
 *   2. Task Assignment: Tasks must have clear due windows (e.g., 08:00 - 09:30), categories,
 *      assignees, and completion verification notes.
 *   3. Shift-Based Logging for Professional Caregivers:
 *      - Clock-in and clock-out with location audit.
 *      - Structured handover notes (mood/mental state, nutrition/hydration, incidents, next-shift handoff).
 * 
 * ## 2. HOW TO RUN:
 * Step 1: Start the backend server in one terminal:
 *   cd backend
 *   npm start   (or npm run dev)
 * 
 * Step 2: In another terminal, run this test:
 *   cd backend
 *   npm run test:care-plan   (or node test/carePlan.test.js)
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

async function runCarePlanTestSuite() {
  console.log(`${colors.bold}Starting SilverCare Care Plan & Task Coordination (6.6) Test Suite...${colors.reset}\n`);

  try {
    // --------------------------------------------------------------------------------------------
    // 0. CLEANUP & SETUP
    // --------------------------------------------------------------------------------------------
    header("0. Environment Cleanup");
    const testEmails = ['cp_patient@example.com', 'cp_family@example.com', 'cp_nurse@example.com'];

    const existingUsers = await prisma.user.findMany({
      where: { email: { in: testEmails } },
      select: { id: true },
    });

    const userIds = existingUsers.map(u => u.id);
    if (userIds.length > 0) {
      await prisma.careShift.deleteMany({
        where: { OR: [{ patientId: { in: userIds } }, { caregiverId: { in: userIds } }] },
      });
      await prisma.careTask.deleteMany({ where: { patientId: { in: userIds } } });
      await prisma.carePlanAudit.deleteMany({
        where: { carePlan: { patientId: { in: userIds } } },
      });
      await prisma.carePlan.deleteMany({ where: { patientId: { in: userIds } } });
      await prisma.user.deleteMany({ where: { id: { in: userIds } } });
    }
    pass("Previous test care plan data cleaned up successfully");

    // --------------------------------------------------------------------------------------------
    // 1. AUTHENTICATION (PATIENT, FAMILY CAREGIVER, PROFESSIONAL NURSE)
    // --------------------------------------------------------------------------------------------
    header("1. Authentication (Patient, Family Caregiver, Professional Nurse)");

    // 1a. Patient
    const patientRes = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Arthur',
        lastName: 'Pendleton',
        email: 'cp_patient@example.com',
      }),
    });
    const patientData = await patientRes.json();
    if (!patientRes.ok) throw new Error(`Patient signup failed: ${JSON.stringify(patientData)}`);
    const patientToken = patientData.token;
    const patientId = patientData.user.id;
    pass(`Patient registered: Arthur Pendleton (ID: ${patientId})`);

    // 1b. Family Caregiver
    const familyRes = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Sarah',
        lastName: 'Pendleton',
        email: 'cp_family@example.com',
      }),
    });
    const familyData = await familyRes.json();
    if (!familyRes.ok) throw new Error(`Family signup failed: ${JSON.stringify(familyData)}`);
    const familyToken = familyData.token;
    const familyId = familyData.user.id;
    pass(`Family Caregiver registered: Sarah Pendleton (ID: ${familyId})`);

    // 1c. Professional Nurse
    const nurseRes = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Nurse Jackie',
        lastName: 'Peyton',
        email: 'cp_nurse@example.com',
      }),
    });
    const nurseData = await nurseRes.json();
    if (!nurseRes.ok) throw new Error(`Nurse signup failed: ${JSON.stringify(nurseData)}`);
    const nurseToken = nurseData.token;
    const nurseId = nurseData.user.id;
    pass(`Professional Caregiver registered: Nurse Jackie (ID: ${nurseId})`);

    // --------------------------------------------------------------------------------------------
    // 2. CREATE INITIAL CARE PLAN (v1)
    // --------------------------------------------------------------------------------------------
    header("2. Initial Care Plan Creation (Version 1)");
    console.log("   WHY: Establishes shared dietary, mobility, and emergency protocols.");

    const planV1Res = await fetch(`${BASE_URL}/care-plans/patients/${patientId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${familyToken}`,
      },
      body: JSON.stringify({
        dietaryNotes: "Low sodium (< 1500mg/day). Diabetic friendly, soft chewable texture.",
        mobilityInstructions: "Independent indoors with standard cane. Assist with stairs.",
        resuscitationStatus: "Full Code",
        emergencySummary: "Penicillin allergy. Mild dementia, responds well to calm vocal cues.",
      }),
    });
    const planV1Data = await planV1Res.json();
    if (!planV1Res.ok) throw new Error(`Care plan v1 failed: ${JSON.stringify(planV1Data)}`);

    if (planV1Data.version !== 1) throw new Error("Expected care plan version 1");
    const carePlanId = planV1Data.id;
    pass(`Care Plan v1 created (ID: ${carePlanId}, Version: ${planV1Data.version})`);

    // --------------------------------------------------------------------------------------------
    // 3. VERSIONED CARE PLAN UPDATE (v1 -> v2) WITH AUDIT TRAIL
    // --------------------------------------------------------------------------------------------
    header("3. Versioned Care Plan Update (v1 -> v2) with Liability Audit");
    console.log("   WHY: Essential for multi-caregiver trust and legal liability: tracks who changed what and when.");

    const planV2Res = await fetch(`${BASE_URL}/care-plans/patients/${patientId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${nurseToken}`,
      },
      body: JSON.stringify({
        mobilityInstructions: "Post-fall precaution: Walker required at all times. 1-person standby assist.",
        changeReason: "Physical therapy reassessment following mild wobble yesterday.",
      }),
    });
    const planV2Data = await planV2Res.json();
    if (!planV2Res.ok) throw new Error(`Care plan v2 failed: ${JSON.stringify(planV2Data)}`);

    if (planV2Data.version !== 2) throw new Error("Expected care plan version 2");
    pass(`Care Plan upgraded to v2! Version: ${planV2Data.version}`);

    // Fetch history and verify audit snapshot
    const historyRes = await fetch(`${BASE_URL}/care-plans/patients/${patientId}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${familyToken}` },
    });
    const historyData = await historyRes.json();
    if (!historyRes.ok) throw new Error("Failed to fetch care plan history");

    if (historyData.auditHistory.length < 2) {
      throw new Error(`Expected at least 2 audit history records, got: ${historyData.auditHistory.length}`);
    }
    const latestAudit = historyData.auditHistory[0];
    pass(`Audit Verified: v${latestAudit.versionNumber} by ${latestAudit.changedBy.firstName} -> "${latestAudit.changeSummary}"`);

    // --------------------------------------------------------------------------------------------
    // 4. CARE TASK COORDINATION WITH DUE WINDOWS
    // --------------------------------------------------------------------------------------------
    header("4. Task Assignment with Due Windows & Recurring Schedule");
    console.log("   WHY: Ensures tasks are assigned to specific caregivers with explicit time boundaries.");

    const now = Date.now();
    const windowStart = new Date(now + 60 * 60 * 1000); // 1 hour from now
    const windowEnd = new Date(now + 2 * 60 * 60 * 1000); // 2 hours from now

    const taskRes = await fetch(`${BASE_URL}/care-plans/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${familyToken}`,
      },
      body: JSON.stringify({
        carePlanId,
        patientId,
        title: "Check fasting blood sugar and administer morning insulin",
        category: "VITALS_CHECK",
        assignedToId: nurseId,
        dueWindowStart: windowStart.toISOString(),
        dueWindowEnd: windowEnd.toISOString(),
        recurringRRule: "FREQ=DAILY;INTERVAL=1",
      }),
    });
    const taskData = await taskRes.json();
    if (!taskRes.ok) throw new Error(`Create task failed: ${JSON.stringify(taskData)}`);

    const taskId = taskData.id;
    pass(`Task assigned to ${taskData.assignedTo.firstName}: "${taskData.title}"`);
    pass(`Due Window: ${new Date(taskData.dueWindowStart).toLocaleTimeString()} - ${new Date(taskData.dueWindowEnd).toLocaleTimeString()}`);

    // Complete Task
    const completeRes = await fetch(`${BASE_URL}/care-plans/tasks/${taskId}/complete`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${nurseToken}`,
      },
      body: JSON.stringify({
        completionNotes: "Glucose was 114 mg/dL. 4 units Humalog given before oatmeal.",
      }),
    });
    const completeData = await completeRes.json();
    if (!completeRes.ok) throw new Error(`Complete task failed: ${JSON.stringify(completeData)}`);

    if (completeData.status !== "COMPLETED") throw new Error("Task status is not COMPLETED");
    pass(`Task completed by Nurse Jackie with notes: "${completeData.completionNotes}"`);

    // --------------------------------------------------------------------------------------------
    // 5. SHIFT-BASED LOGGING & CLINICAL HANDOVER FOR PROFESSIONAL CAREGIVERS
    // --------------------------------------------------------------------------------------------
    header("5. Professional Caregiver Shift Logging (Clock In/Out & Structured Handoff)");
    console.log("   WHY: Provides structured shift handoff notes: mood, meals, incidents, and next-shift continuity.");

    // 5a. Clock In
    const clockInRes = await fetch(`${BASE_URL}/care-plans/shifts/clock-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${nurseToken}`,
      },
      body: JSON.stringify({
        patientId,
        clockInLocation: "Residence (GPS 40.7128, -74.0060)",
      }),
    });
    const shiftData = await clockInRes.json();
    if (!clockInRes.ok) throw new Error(`Clock in failed: ${JSON.stringify(shiftData)}`);

    const shiftId = shiftData.id;
    pass(`Nurse Jackie clocked in for Arthur Pendleton (Shift ID: ${shiftId})`);

    // 5b. Clock Out with Structured Handoff Notes
    const clockOutRes = await fetch(`${BASE_URL}/care-plans/shifts/${shiftId}/clock-out`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${nurseToken}`,
      },
      body: JSON.stringify({
        clockOutLocation: "Residence Front Porch",
        moodAndMentalState: "Calm and cooperative. Engaged in crossword puzzle during afternoon.",
        mealsAndHydration: "Ate 100% of lunch (chicken broth, soft vegetables). Drank 950ml fluids.",
        incidentsOrConcerns: "No falls or dizziness observed. Left ankle showed mild 1+ edema.",
        handoffNotesNextShift: "Evening aide: please elevate legs on pillows during evening television.",
      }),
    });
    const clockOutData = await clockOutRes.json();
    if (!clockOutRes.ok) throw new Error(`Clock out failed: ${JSON.stringify(clockOutData)}`);

    if (clockOutData.status !== "COMPLETED" || !clockOutData.clockOutAt) {
      throw new Error("Shift status is not COMPLETED");
    }
    pass("Nurse Jackie clocked out with full structured shift handover notes:");
    pass(`  - Mood & Mental State: "${clockOutData.moodAndMentalState}"`);
    pass(`  - Meals & Hydration: "${clockOutData.mealsAndHydration}"`);
    pass(`  - Next Shift Handoff: "${clockOutData.handoffNotesNextShift}"`);

    // --------------------------------------------------------------------------------------------
    // ALL TESTS PASSED
    // --------------------------------------------------------------------------------------------
    console.log(`\n${colors.bold}${colors.green}========================================================================${colors.reset}`);
    console.log(`${colors.bold}${colors.green}  ALL 5 CARE PLAN & COORDINATION (6.6) TESTS PASSED!                    ${colors.reset}`);
    console.log(`${colors.bold}${colors.green}========================================================================${colors.reset}\n`);

  } catch (error) {
    fail("Care Plan Integration Test Suite Failed", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runCarePlanTestSuite();
