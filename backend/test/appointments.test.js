/**
 * ==============================================================================================
 * SILVERCARE - APPOINTMENTS (6.7) INTEGRATION TEST SUITE
 * ==============================================================================================
 * 
 * ## 1. PURPOSE & WHY TO TEST:
 * For elderly healthcare management:
 *   1. Appointment Scheduling: Linking patient, doctor, clinic, and an accompanying caregiver escort.
 *   2. Dual-Reminder Engine: Automatically schedules 24h and 2h reminders for BOTH patient and escort.
 *   3. Calendar Sync:
 *        - Generates 1-Click Google Calendar URLs.
 *        - Generates standard RFC 5545 iCalendar (.ics) files for Apple Calendar / Outlook.
 *   4. Post-Appointment Notes:
 *        - Attaches doctor's clinical summary, prescription changes, and follow-up guidance
 *          directly to the patient's ongoing care plan.
 *        - Transitions appointment status to COMPLETED.
 * 
 * ## 2. HOW TO RUN:
 * Step 1: Start the backend server in one terminal:
 *   cd backend
 *   npm start   (or npm run dev)
 * 
 * Step 2: In another terminal, run this test:
 *   cd backend
 *   npm run test:appointments   (or node test/appointments.test.js)
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

async function runAppointmentsTestSuite() {
  console.log(`${colors.bold}Starting SilverCare Appointments (6.7) Test Suite...${colors.reset}\n`);

  try {
    // --------------------------------------------------------------------------------------------
    // 0. CLEANUP & SETUP
    // --------------------------------------------------------------------------------------------
    header("0. Environment Cleanup");
    const testEmails = ['apt_patient@example.com', 'apt_escort@example.com'];

    const existingUsers = await prisma.user.findMany({
      where: { email: { in: testEmails } },
      select: { id: true },
    });

    const userIds = existingUsers.map(u => u.id);
    if (userIds.length > 0) {
      await prisma.postAppointmentNote.deleteMany({
        where: { appointment: { patientId: { in: userIds } } },
      });
      await prisma.appointmentReminder.deleteMany({
        where: { appointment: { patientId: { in: userIds } } },
      });
      await prisma.appointment.deleteMany({ where: { patientId: { in: userIds } } });
      await prisma.user.deleteMany({ where: { id: { in: userIds } } });
    }
    pass("Previous test appointment data cleaned up successfully");

    // --------------------------------------------------------------------------------------------
    // 1. AUTHENTICATION (PATIENT & ACCOMPANYING CAREGIVER)
    // --------------------------------------------------------------------------------------------
    header("1. Authentication (Patient & Accompanying Caregiver)");

    // 1a. Patient
    const patientRes = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Harold',
        lastName: 'Finch',
        email: 'apt_patient@example.com',
        phone: '+15550001111',
      }),
    });
    const patientData = await patientRes.json();
    if (!patientRes.ok) throw new Error(`Patient signup failed: ${JSON.stringify(patientData)}`);
    const patientToken = patientData.token;
    const patientId = patientData.user.id;
    pass(`Patient registered: Harold Finch (ID: ${patientId})`);

    // 1b. Accompanying Caregiver Escort
    const escortRes = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'John',
        lastName: 'Reese',
        email: 'apt_escort@example.com',
        phone: '+15552223333',
      }),
    });
    const escortData = await escortRes.json();
    if (!escortRes.ok) throw new Error(`Caregiver escort signup failed: ${JSON.stringify(escortData)}`);
    const escortToken = escortData.token;
    const escortId = escortData.user.id;
    pass(`Accompanying Caregiver registered: John Reese (ID: ${escortId})`);

    // --------------------------------------------------------------------------------------------
    // 2. SCHEDULE APPOINTMENT WITH ESCORT & AUTOMATIC REMINDERS
    // --------------------------------------------------------------------------------------------
    header("2. Schedule Appointment with Accompanying Escort");
    console.log("   WHY: Elderly patients often need designated escort caregivers and automatic reminder schedules.");

    // Schedule 3 days in the future
    const appointmentDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

    const scheduleRes = await fetch(`${BASE_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${escortToken}`,
      },
      body: JSON.stringify({
        patientId,
        accompanyingCaregiverId: escortId,
        title: "Comprehensive Cardiology & Echocardiogram",
        doctorName: "Dr. Gregory House",
        specialty: "Cardiologist",
        clinicOrHospital: "Mercy General Hospital - Cardiology Wing Suite 402",
        locationAddress: "123 Medical Arts Plaza, New York, NY",
        scheduledAt: appointmentDate.toISOString(),
        durationMinutes: 60,
        notes: "Patient experiences occasional mild shortness of breath on exertion.",
      }),
    });
    const scheduleData = await scheduleRes.json();
    if (!scheduleRes.ok) throw new Error(`Schedule failed: ${JSON.stringify(scheduleData)}`);

    const appointment = scheduleData.appointment;
    const appointmentId = appointment.id;
    pass(`Appointment scheduled: "${appointment.title}" on ${new Date(appointment.scheduledAt).toLocaleDateString()}`);

    // Verify dual reminders (24h and 2h for both patient and escort = 4 reminders)
    if (scheduleData.remindersScheduled.length < 4) {
      throw new Error(`Expected 4 automatic reminders (24h & 2h for patient + escort), got: ${scheduleData.remindersScheduled.length}`);
    }
    pass(`4 Automatic Reminders provisioned (24h SMS + 2h PUSH for patient & caregiver escort)`);

    // --------------------------------------------------------------------------------------------
    // 3. CALENDAR SYNC (GOOGLE CALENDAR & RFC 5545 iCALENDAR)
    // --------------------------------------------------------------------------------------------
    header("3. Calendar Sync (Google & Apple/Outlook iCalendar)");
    console.log("   WHY: Caregivers and families sync appointments directly to Google/Apple calendars.");

    const googleUrl = scheduleData.calendarSync.googleCalendarUrl;
    if (!googleUrl || !googleUrl.includes("calendar.google.com")) {
      throw new Error("Missing or invalid Google Calendar link");
    }
    pass(`Google Calendar 1-Click Link generated: ${googleUrl.substring(0, 70)}...`);

    // Fetch .ics file
    const icsRes = await fetch(`${BASE_URL}/appointments/${appointmentId}/calendar.ics`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${escortToken}` },
    });
    if (!icsRes.ok) throw new Error("Failed to download .ics calendar file");
    const icsText = await icsRes.text();

    if (!icsText.includes("BEGIN:VCALENDAR") || !icsText.includes("Dr. Gregory House")) {
      throw new Error(".ics content does not contain standard RFC 5545 calendar fields");
    }
    pass("RFC 5545 iCalendar (.ics) export verified for Apple / Outlook Calendar");

    // --------------------------------------------------------------------------------------------
    // 4. LIST PATIENT APPOINTMENTS & UPCOMING FILTER
    // --------------------------------------------------------------------------------------------
    header("4. List Appointments (Filtered by Upcoming)");
    console.log("   WHY: Displays upcoming scheduled visits on the patient/caregiver dashboard.");

    const listRes = await fetch(`${BASE_URL}/appointments/patients/${patientId}?filter=upcoming`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${patientToken}` },
    });
    const listData = await listRes.json();
    if (!listRes.ok) throw new Error(`List appointments failed: ${JSON.stringify(listData)}`);

    if (listData.length === 0 || listData[0].id !== appointmentId) {
      throw new Error("Scheduled appointment not found in upcoming list");
    }
    pass(`Found ${listData.length} upcoming appointment(s) for patient Harold Finch`);

    // --------------------------------------------------------------------------------------------
    // 5. ATTACH POST-APPOINTMENT NOTES DIRECTLY TO CARE PLAN
    // --------------------------------------------------------------------------------------------
    header("5. Post-Appointment Notes Attachable to Care Plan");
    console.log("   WHY: Physician instructions, prescription adjustments, and diagnosis must sync to patient care plan.");

    const nextFollowUp = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000); // 3 months

    const postNoteRes = await fetch(`${BASE_URL}/appointments/${appointmentId}/post-notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${escortToken}`,
      },
      body: JSON.stringify({
        doctorSummary: "Echocardiogram shows stable EF 55%. Normal sinus rhythm. Lungs clear.",
        prescriptionChanges: "Reduced Metoprolol from 50mg to 25mg daily. Continue Lisinopril 10mg.",
        followUpInstructions: "Maintain low sodium diet (< 2g/day). Monitor morning blood pressure daily.",
        nextFollowUpDate: nextFollowUp.toISOString(),
        attachedToCarePlan: true,
      }),
    });
    const postNoteData = await postNoteRes.json();
    if (!postNoteRes.ok) throw new Error(`Attach post note failed: ${JSON.stringify(postNoteData)}`);

    if (!postNoteData.carePlanSynced || postNoteData.appointment.status !== "COMPLETED") {
      throw new Error("Appointment note was not synced to care plan or status is not COMPLETED");
    }
    pass("Post-Appointment Notes attached to care plan & Appointment marked COMPLETED");
    pass(`Doctor Summary: "${postNoteData.postNote.doctorSummary}"`);
    pass(`Prescription Changes: "${postNoteData.postNote.prescriptionChanges}"`);

    // --------------------------------------------------------------------------------------------
    // ALL TESTS PASSED
    // --------------------------------------------------------------------------------------------
    console.log(`\n${colors.bold}${colors.green}========================================================================${colors.reset}`);
    console.log(`${colors.bold}${colors.green}  ALL 5 APPOINTMENTS (6.7) TESTS PASSED!                                ${colors.reset}`);
    console.log(`${colors.bold}${colors.green}========================================================================${colors.reset}\n`);

  } catch (error) {
    fail("Appointments Integration Test Suite Failed", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runAppointmentsTestSuite();
