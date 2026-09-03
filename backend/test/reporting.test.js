/**
 * ==============================================================================================
 * SILVERCARE - REPORTING & INSIGHTS (6.9) INTEGRATION TEST SUITE
 * ==============================================================================================
 * 
 * ## 1. PURPOSE & WHY TO TEST:
 *   1. Cross-Module Clinical Aggregation: Combines data from medications, vitals, care plans,
 *      incidents, and appointments into a single comprehensive report for physicians.
 *   2. Printable HTML / PDF Render: Generates a beautifully styled, print-to-PDF ready summary.
 *   3. Caregiver Weekly Digest: 7-day retrospective overview highlighting adherence scores,
 *      vitals stability, and completed tasks for family peace of mind.
 *   4. Appointment Summary Auto-Dispatch: Pre-appointment clinical summary dispatch.
 * 
 * ## 2. HOW TO RUN:
 * Step 1: Start the backend server in one terminal:
 *   cd backend
 *   npm start   (or npm run dev)
 * 
 * Step 2: In another terminal, run this test:
 *   cd backend
 *   npm run test:reporting   (or node test/reporting.test.js)
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

async function runReportingTestSuite() {
  console.log(`${colors.bold}Starting SilverCare Reporting & Insights (6.9) Test Suite...${colors.reset}\n`);

  try {
    // --------------------------------------------------------------------------------------------
    // 0. CLEANUP & SETUP
    // --------------------------------------------------------------------------------------------
    header("0. Environment Cleanup");
    const testEmails = ['rep_patient@example.com', 'rep_doctor@example.com'];

    const existingUsers = await prisma.user.findMany({
      where: { email: { in: testEmails } },
      select: { id: true },
    });

    const userIds = existingUsers.map(u => u.id);
    if (userIds.length > 0) {
      await prisma.appointment.deleteMany({ where: { patientId: { in: userIds } } });
      await prisma.carePlan.deleteMany({ where: { patientId: { in: userIds } } });
      await prisma.vitalReading.deleteMany({ where: { patientId: { in: userIds } } });
      await prisma.medicationDose.deleteMany({ where: { medication: { patientId: { in: userIds } } } });
      await prisma.medication.deleteMany({ where: { patientId: { in: userIds } } });
      await prisma.user.deleteMany({ where: { id: { in: userIds } } });
    }
    pass("Previous test reporting data cleaned up successfully");

    // --------------------------------------------------------------------------------------------
    // 1. AUTHENTICATION (PATIENT & PHYSICIAN)
    // --------------------------------------------------------------------------------------------
    header("1. Authentication (Patient & Physician)");

    // 1a. Patient
    const patientRes = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Robert',
        lastName: 'Langdon',
        email: 'rep_patient@example.com',
        phone: '+15554445555',
      }),
    });
    const patientData = await patientRes.json();
    if (!patientRes.ok) throw new Error(`Patient signup failed: ${JSON.stringify(patientData)}`);
    const patientToken = patientData.token;
    const patientId = patientData.user.id;
    pass(`Patient registered: Robert Langdon (ID: ${patientId})`);

    // 1b. Physician
    const doctorRes = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Dr. Katherine',
        lastName: 'Solomon',
        email: 'rep_doctor@example.com',
      }),
    });
    const doctorData = await doctorRes.json();
    if (!doctorRes.ok) throw new Error(`Doctor signup failed: ${JSON.stringify(doctorData)}`);
    const doctorToken = doctorData.token;
    const doctorId = doctorData.user.id;
    pass(`Physician registered: Dr. Katherine Solomon (ID: ${doctorId})`);

    // --------------------------------------------------------------------------------------------
    // 2. SEED CROSS-MODULE CLINICAL DATA
    // --------------------------------------------------------------------------------------------
    header("2. Seed Multi-Module Data (Medication + Vitals + Care Plan + Appointment)");

    // 2a. Medication with a confirmed taken dose
    const med = await prisma.medication.create({
      data: {
        patientId,
        createdById: doctorId,
        medicationName: "Lisinopril",
        dosage: "10mg",
        route: "Oral",
        frequencyRRule: "FREQ=DAILY;INTERVAL=1",
        prescribingDoctor: "Dr. Katherine Solomon",
        refillQuantity: 30,
        active: true,
      },
    });
    await prisma.medicationDose.create({
      data: {
        medicationId: med.id,
        scheduledAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        state: "CONFIRMED_TAKEN",
      },
    });

    // 2b. Vitals Reading (120/80 BP)
    await prisma.vitalReading.create({
      data: {
        patientId,
        vitalType: "BLOOD_PRESSURE",
        systolic: 120,
        diastolic: 80,
        unit: "mmHg",
        createdById: patientId,
      },
    });

    // 2c. Care Plan
    await prisma.carePlan.create({
      data: {
        patientId,
        version: 1,
        dietaryNotes: "Mediterranean diet, low sodium.",
        mobilityInstructions: "Standby assist for long walks.",
        resuscitationStatus: "Full Code",
        createdById: doctorId,
      },
    });

    // 2d. Scheduled Upcoming Appointment
    const appointment = await prisma.appointment.create({
      data: {
        patientId,
        createdById: doctorId,
        title: "Biannual Cardiovascular Review",
        doctorName: "Dr. Katherine Solomon",
        clinicOrHospital: "Boston Heart Institute",
        scheduledAt: new Date(Date.now() + 48 * 60 * 60 * 1000), // in 2 days
        durationMinutes: 45,
      },
    });
    pass("Cross-module clinical data seeded successfully");

    // --------------------------------------------------------------------------------------------
    // 3. GET PHYSICIAN CLINICAL REPORT (JSON FORMAT)
    // --------------------------------------------------------------------------------------------
    header("3. Generate Physician Clinical Report (JSON)");
    console.log("   WHY: Provides doctors with consolidated adherence %, vitals averages, and incidents.");

    const reportRes = await fetch(`${BASE_URL}/reports/patients/${patientId}/physician-report?days=30`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${doctorToken}` },
    });
    const reportData = await reportRes.json();
    if (!reportRes.ok) throw new Error(`Physician report failed: ${JSON.stringify(reportData)}`);

    if (reportData.medicationAdherence.adherencePercentage !== 100 || !reportData.vitalsSummary.averageBloodPressure.includes("120/80")) {
      throw new Error("Report metrics did not match seeded clinical data");
    }
    pass("Physician Report generated:");
    pass(`  - Patient: ${reportData.patient.firstName} ${reportData.patient.lastName}`);
    pass(`  - Medication Adherence: ${reportData.medicationAdherence.adherencePercentage}% (${reportData.medicationAdherence.activeMedicationsCount} active med)`);
    pass(`  - Average Blood Pressure: ${reportData.vitalsSummary.averageBloodPressure}`);
    pass(`  - Care Directives: "${reportData.careDirectives.dietaryNotes}"`);

    // --------------------------------------------------------------------------------------------
    // 4. PRINTABLE HTML / PDF FORMAT RENDER
    // --------------------------------------------------------------------------------------------
    header("4. Generate Printable HTML / PDF View");
    console.log("   WHY: Allows physicians and caregivers to print clean one-page clinical charts.");

    const htmlRes = await fetch(`${BASE_URL}/reports/patients/${patientId}/physician-report?format=html`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${doctorToken}` },
    });
    const htmlText = await htmlRes.text();

    if (!htmlText.includes("SilverCare Clinical Health Summary") || !htmlText.includes("Robert Langdon")) {
      throw new Error("HTML render missing title or patient information");
    }
    pass("Printable HTML view successfully generated with responsive medical stylesheet");

    // --------------------------------------------------------------------------------------------
    // 5. CAREGIVER WEEKLY DIGEST
    // --------------------------------------------------------------------------------------------
    header("5. Caregiver Weekly Digest (7-Day Status Retrospective)");
    console.log("   WHY: Family members receive weekly status summaries without needing to open the app every hour.");

    const digestRes = await fetch(`${BASE_URL}/reports/patients/${patientId}/weekly-digest`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${patientToken}` },
    });
    const digestData = await digestRes.json();
    if (!digestRes.ok) throw new Error(`Weekly digest failed: ${JSON.stringify(digestData)}`);

    if (digestData.metrics.medicationAdherenceScore !== 100) {
      throw new Error("Weekly digest adherence score mismatch");
    }
    pass(`Caregiver Digest generated: "${digestData.summaryParagraph}"`);
    pass(`Weekly Metrics: ${digestData.metrics.totalDosesTaken} doses confirmed taken, ${digestData.metrics.vitalsReadingsLogged} vitals logged`);

    // --------------------------------------------------------------------------------------------
    // 6. AUTO-DISPATCH CLINICAL REPORT BEFORE APPOINTMENT
    // --------------------------------------------------------------------------------------------
    header("6. Pre-Appointment Report Auto-Dispatch");
    console.log("   WHY: Auto-emails complete clinical history to physician clinic before appointment.");

    const dispatchRes = await fetch(`${BASE_URL}/reports/patients/${patientId}/dispatch-appointment-report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${patientToken}`,
      },
      body: JSON.stringify({
        appointmentId: appointment.id,
        recipientEmail: "clinic.intake@bostonheart.org",
      }),
    });
    const dispatchData = await dispatchRes.json();
    if (!dispatchRes.ok) throw new Error(`Dispatch failed: ${JSON.stringify(dispatchData)}`);

    if (dispatchData.status !== "DISPATCHED" || dispatchData.recipientEmail !== "clinic.intake@bostonheart.org") {
      throw new Error("Report dispatch status or recipient email mismatch");
    }
    pass(`Report dispatched to "${dispatchData.recipientEmail}" for upcoming appointment: "${dispatchData.appointmentDetails.doctor}"`);

    // --------------------------------------------------------------------------------------------
    // ALL TESTS PASSED
    // --------------------------------------------------------------------------------------------
    console.log(`\n${colors.bold}${colors.green}========================================================================${colors.reset}`);
    console.log(`${colors.bold}${colors.green}  ALL 6 REPORTING & INSIGHTS (6.9) TESTS PASSED!                        ${colors.reset}`);
    console.log(`${colors.bold}${colors.green}========================================================================${colors.reset}\n`);

  } catch (error) {
    fail("Reporting Integration Test Suite Failed", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runReportingTestSuite();
