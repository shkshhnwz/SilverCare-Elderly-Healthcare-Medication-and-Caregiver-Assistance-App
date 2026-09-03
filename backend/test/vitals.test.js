/**
 * ==============================================================================================
 * SILVERCARE - VITALS & HEALTH MONITORING (6.3) INTEGRATION TEST SUITE
 * ==============================================================================================
 * 
 * ## 1. PURPOSE & WHY TO TEST:
 * In elderly care, static global thresholds (e.g., "blood pressure > 140") cause severe alarm fatigue 
 * and miss gradual clinical deterioration. 
 * Section 6.3 requires:
 *   1. Manual and Wearable/BLE Device Ingestion (smartwatch, BP cuffs, glucometers).
 *   2. Per-Patient Dynamic Thresholds set by physicians (not static system-wide hardcoding).
 *   3. Intelligent Anomaly Engine with 3 distinct detection rules:
 *        - Rule A: Critical Emergency Spike (Immediate crisis alert, e.g., BP >= 180 or SpO2 <= 90).
 *        - Rule B: Consecutive Out-of-Range Breaches (e.g., 3 consecutive elevated readings).
 *        - Rule C: Rolling Baseline Deviation (sudden > 20% shift from the patient's rolling average).
 *   4. Trend Visualization & Clinical Aggregates for Physician Review (Time-in-Range %, averages).
 *   5. Alert Resolution & Audit Trail (acknowledgement by physician/caregiver).
 * 
 * ## 2. HOW TO RUN:
 * Step 1: Start the backend server in one terminal:
 *   cd backend
 *   npm start   (or npm run dev)
 * 
 * Step 2: In another terminal, run this test file:
 *   cd backend
 *   node test/vitals.test.js
 * ==============================================================================================
 */

require('dotenv').config();
const prisma = require('../src/config/prisma');

const BASE_URL = process.env.TEST_API_URL || 'http://localhost:5000/api';

// ANSI colors for clean test reporting
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

async function runVitalsTestSuite() {
  console.log(`${colors.bold}Starting SilverCare Vitals & Health Monitoring (6.3) Test Suite...${colors.reset}\n`);

  try {
    // --------------------------------------------------------------------------------------------
    // 0. CLEANUP & SETUP
    // --------------------------------------------------------------------------------------------
    header("0. Environment Cleanup");
    const testEmails = ['vital_patient@example.com', 'vital_physician@example.com'];

    const existingUsers = await prisma.user.findMany({
      where: { email: { in: testEmails } },
      select: { id: true },
    });

    const userIds = existingUsers.map(u => u.id);
    if (userIds.length > 0) {
      await prisma.vitalAlert.deleteMany({ where: { patientId: { in: userIds } } });
      await prisma.vitalReading.deleteMany({ where: { patientId: { in: userIds } } });
      await prisma.vitalThreshold.deleteMany({ where: { patientId: { in: userIds } } });
      await prisma.user.deleteMany({ where: { id: { in: userIds } } });
    }
    pass("Previous test data cleaned up successfully");

    // --------------------------------------------------------------------------------------------
    // 1. AUTHENTICATION & USER CREATION
    // --------------------------------------------------------------------------------------------
    header("1. Authentication (Patient & Physician)");

    // 1a. Create Patient
    const patientRes = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Eleanor',
        lastName: 'Vance',
        email: 'vital_patient@example.com',
      }),
    });
    const patientData = await patientRes.json();
    if (!patientRes.ok) throw new Error(`Patient signup failed: ${JSON.stringify(patientData)}`);
    const patientToken = patientData.token;
    const patientId = patientData.user.id;
    pass(`Patient registered: Eleanor Vance (ID: ${patientId})`);

    // 1b. Create Physician
    const physicianRes = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Dr. Gregory',
        lastName: 'House',
        email: 'vital_physician@example.com',
      }),
    });
    const physicianData = await physicianRes.json();
    if (!physicianRes.ok) throw new Error(`Physician signup failed: ${JSON.stringify(physicianData)}`);
    const physicianToken = physicianData.token;
    const physicianId = physicianData.user.id;
    pass(`Physician registered: Dr. House (ID: ${physicianId})`);

    // --------------------------------------------------------------------------------------------
    // 2. DYNAMIC PER-PATIENT THRESHOLD CONFIGURATION
    // --------------------------------------------------------------------------------------------
    header("2. Per-Patient Dynamic Threshold Configuration");
    console.log("   WHY: Senior patients often have individualized blood pressure targets (e.g., 135/85 mmHg).");

    const thresholdPayload = {
      vitalType: "BLOOD_PRESSURE",
      systolicMin: 95,
      systolicMax: 135,
      diastolicMin: 60,
      diastolicMax: 85,
      criticalMax: 180,
      criticalMin: 80,
      consecutiveBreachLimit: 3,
      rollingBaselineDays: 7,
      baselineDeviationPercent: 20.0,
    };

    const thresholdRes = await fetch(`${BASE_URL}/vitals/patients/${patientId}/thresholds`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${physicianToken}`,
      },
      body: JSON.stringify(thresholdPayload),
    });
    const thresholdData = await thresholdRes.json();
    if (!thresholdRes.ok) throw new Error(`Threshold config failed: ${JSON.stringify(thresholdData)}`);
    
    if (thresholdData.systolicMax !== 135 || thresholdData.consecutiveBreachLimit !== 3) {
      throw new Error("Threshold response does not match configured values");
    }
    pass("Physician successfully set custom dynamic thresholds (Max Systolic: 135 mmHg, 3-reading consecutive limit)");

    // --------------------------------------------------------------------------------------------
    // 3. NORMAL MANUAL VITAL ENTRY (IN-RANGE)
    // --------------------------------------------------------------------------------------------
    header("3. Manual Vital Entry (Normal / In-Range)");
    console.log("   WHY: Verifies normal patient readings are saved without false-positive alert triggers.");

    const normalReadingRes = await fetch(`${BASE_URL}/vitals/readings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${patientToken}`,
      },
      body: JSON.stringify({
        patientId,
        vitalType: "BLOOD_PRESSURE",
        source: "MANUAL",
        systolic: 120,
        diastolic: 78,
        unit: "mmHg",
        context: "resting",
        notes: "Morning reading after tea",
      }),
    });
    const normalData = await normalReadingRes.json();
    if (!normalReadingRes.ok) throw new Error(`Normal reading failed: ${JSON.stringify(normalData)}`);

    if (normalData.alertsTriggered.length !== 0) {
      throw new Error(`Expected 0 alerts for normal reading, but got: ${normalData.alertsTriggered.length}`);
    }
    pass("Normal manual reading saved (120/78 mmHg, 0 alerts triggered)");

    // --------------------------------------------------------------------------------------------
    // 4. WEARABLE / BLE DEVICE INGESTION
    // --------------------------------------------------------------------------------------------
    header("4. Wearable / BLE Device Ingestion");
    console.log("   WHY: Ensures IoT/Bluetooth cuffs and smartwatches can stream device metadata & raw payloads.");

    const bleReadingRes = await fetch(`${BASE_URL}/vitals/readings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${patientToken}`,
      },
      body: JSON.stringify({
        patientId,
        vitalType: "BLOOD_PRESSURE",
        source: "BLE_DEVICE",
        systolic: 124,
        diastolic: 80,
        unit: "mmHg",
        deviceModel: "Omron Evolv BLE BP7000",
        deviceMacAddress: "AA:BB:CC:11:22:33",
        rawBlePayload: {
          pulse: 72,
          batteryLevel: 94,
          cuffFitOk: true,
        },
      }),
    });
    const bleData = await bleReadingRes.json();
    if (!bleReadingRes.ok) throw new Error(`BLE ingestion failed: ${JSON.stringify(bleData)}`);

    if (bleData.reading.source !== "BLE_DEVICE" || bleData.reading.deviceModel !== "Omron Evolv BLE BP7000") {
      throw new Error("BLE metadata was not properly recorded");
    }
    pass("BLE Bluetooth cuff reading successfully ingested with device metadata");

    // --------------------------------------------------------------------------------------------
    // 5. ANOMALY ENGINE - RULE 1: IMMEDIATE CRITICAL SPIKE
    // --------------------------------------------------------------------------------------------
    header("5. Anomaly Engine: Immediate Critical Spike Detection");
    console.log("   WHY: Severe hypertensive crises (Systolic >= 180) must trigger immediate CRITICAL alert.");

    const criticalRes = await fetch(`${BASE_URL}/vitals/readings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${patientToken}`,
      },
      body: JSON.stringify({
        patientId,
        vitalType: "BLOOD_PRESSURE",
        source: "MANUAL",
        systolic: 185,
        diastolic: 112,
        unit: "mmHg",
        context: "acute_dizziness",
      }),
    });
    const criticalData = await criticalRes.json();
    if (!criticalRes.ok) throw new Error(`Critical reading failed: ${JSON.stringify(criticalData)}`);

    const criticalAlert = criticalData.alertsTriggered.find(a => a.anomalyType === "CRITICAL_SPIKE");
    if (!criticalAlert || criticalAlert.severity !== "CRITICAL") {
      throw new Error("Expected CRITICAL_SPIKE alert with CRITICAL severity");
    }
    const criticalAlertId = criticalAlert.id;
    pass(`CRITICAL_SPIKE alert triggered immediately: "${criticalAlert.message}" (Severity: CRITICAL)`);

    // --------------------------------------------------------------------------------------------
    // 6. ANOMALY ENGINE - RULE 2: CONSECUTIVE THRESHOLD BREACHES
    // --------------------------------------------------------------------------------------------
    header("6. Anomaly Engine: Consecutive Out-of-Range Breach Detection");
    console.log("   WHY: A single mild breach (e.g. 142 mmHg) could be stress or coffee. 3 consecutive breaches indicate persistent elevation.");

    // Submit Reading 1 (Mild elevation above 135): should NOT trigger consecutive alert yet
    const breach1 = await (await fetch(`${BASE_URL}/vitals/readings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${patientToken}` },
      body: JSON.stringify({ patientId, vitalType: "BLOOD_PRESSURE", systolic: 142, diastolic: 88, unit: "mmHg" }),
    })).json();
    const hasConsecutive1 = breach1.alertsTriggered.some(a => a.anomalyType === "CONSECUTIVE_BREACH");
    if (hasConsecutive1) throw new Error("1st breach should not trigger consecutive alert yet");
    pass("Breach 1/3 recorded (142 mmHg) -> No consecutive alert yet");

    // Submit Reading 2: should NOT trigger consecutive alert yet
    const breach2 = await (await fetch(`${BASE_URL}/vitals/readings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${patientToken}` },
      body: JSON.stringify({ patientId, vitalType: "BLOOD_PRESSURE", systolic: 144, diastolic: 89, unit: "mmHg" }),
    })).json();
    const hasConsecutive2 = breach2.alertsTriggered.some(a => a.anomalyType === "CONSECUTIVE_BREACH");
    if (hasConsecutive2) throw new Error("2nd breach should not trigger consecutive alert yet");
    pass("Breach 2/3 recorded (144 mmHg) -> No consecutive alert yet");

    // Submit Reading 3: MUST trigger CONSECUTIVE_BREACH alert!
    const breach3 = await (await fetch(`${BASE_URL}/vitals/readings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${patientToken}` },
      body: JSON.stringify({ patientId, vitalType: "BLOOD_PRESSURE", systolic: 145, diastolic: 90, unit: "mmHg" }),
    })).json();
    const consecutiveAlert = breach3.alertsTriggered.find(a => a.anomalyType === "CONSECUTIVE_BREACH");
    if (!consecutiveAlert || consecutiveAlert.severity !== "HIGH") {
      throw new Error("3rd consecutive breach failed to trigger HIGH severity CONSECUTIVE_BREACH alert");
    }
    pass(`Breach 3/3 recorded -> ${colors.bold}CONSECUTIVE_BREACH alert triggered!${colors.reset} ("${consecutiveAlert.message}")`);

    // --------------------------------------------------------------------------------------------
    // 7. ANOMALY ENGINE - RULE 3: ROLLING BASELINE DEVIATION
    // --------------------------------------------------------------------------------------------
    header("7. Anomaly Engine: Sudden Rolling Baseline Deviation");
    console.log("   WHY: Detects rapid clinical drift (e.g., sudden weight gain due to congestive heart failure, or sudden glucose drift).");

    // Let's test with WEIGHT: establish a steady 3-day baseline around 65.0 kg
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;

    // Set Weight threshold with 5% deviation limit
    await fetch(`${BASE_URL}/vitals/patients/${patientId}/thresholds`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${physicianToken}` },
      body: JSON.stringify({
        vitalType: "WEIGHT",
        minNormal: 50,
        maxNormal: 80,
        rollingBaselineDays: 7,
        baselineDeviationPercent: 5.0, // 5% shift is significant in weight
      }),
    });

    // Create 3 historical readings for baseline (65 kg)
    for (let i = 3; i >= 1; i--) {
      await fetch(`${BASE_URL}/vitals/readings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${patientToken}` },
        body: JSON.stringify({
          patientId,
          vitalType: "WEIGHT",
          value: 65.0,
          unit: "kg",
          recordedAt: new Date(now - i * dayMs).toISOString(),
        }),
      });
    }
    pass("Established 3-day rolling baseline for Weight (Mean: 65.0 kg)");

    // Now submit a sudden reading of 71.0 kg (+9.2% shift, > 5% allowed)
    const suddenWeightRes = await fetch(`${BASE_URL}/vitals/readings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${patientToken}` },
      body: JSON.stringify({
        patientId,
        vitalType: "WEIGHT",
        value: 71.0,
        unit: "kg",
        notes: "Sudden fluid retention noticed",
      }),
    });
    const suddenWeightData = await suddenWeightRes.json();
    const baselineAlert = suddenWeightData.alertsTriggered.find(a => a.anomalyType === "BASELINE_DEVIATION");
    if (!baselineAlert || !baselineAlert.baselineSnapshot) {
      throw new Error("Expected BASELINE_DEVIATION alert with rolling baseline audit snapshot");
    }
    pass(`BASELINE_DEVIATION alert triggered! Snapshot Mean: ${baselineAlert.baselineSnapshot.rollingMean} kg, Deviation: ${baselineAlert.baselineSnapshot.deviationPercent}%`);

    // --------------------------------------------------------------------------------------------
    // 8. PHYSICIAN TREND VISUALIZATION & REVIEW
    // --------------------------------------------------------------------------------------------
    header("8. Physician Trend Visualization & Clinical Aggregates");
    console.log("   WHY: Gives physicians a single dashboard endpoint with Time-In-Range %, averages, and data points.");

    const trendsRes = await fetch(`${BASE_URL}/vitals/patients/${patientId}/trends?vitalType=BLOOD_PRESSURE&days=30`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${physicianToken}`,
      },
    });
    const trendsData = await trendsRes.json();
    if (!trendsRes.ok) throw new Error(`Failed to fetch trends: ${JSON.stringify(trendsData)}`);

    const summary = trendsData.clinicalSummary;
    if (!summary || typeof summary.timeInRangePercent !== "number" || summary.totalReadings === 0) {
      throw new Error("Trend response missing clinical summary or Time-In-Range metrics");
    }
    pass(`Physician Review fetched: ${summary.totalReadings} BP readings, Average: ${summary.average} mmHg, Time-In-Range: ${summary.timeInRangePercent}%, Active Alerts: ${summary.activeAlertsCount}`);

    // --------------------------------------------------------------------------------------------
    // 9. ALERT ACKNOWLEDGEMENT & CLINICAL RESOLUTION
    // --------------------------------------------------------------------------------------------
    header("9. Alert Resolution & Clinical Audit");
    console.log("   WHY: Closes the loop when a physician/caregiver reviews and resolves an anomaly alert.");

    const resolveRes = await fetch(`${BASE_URL}/vitals/alerts/${criticalAlertId}/resolve`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${physicianToken}`,
      },
      body: JSON.stringify({
        status: "RESOLVED",
        resolutionNote: "Contacted patient. Prescribed extra dose of Amlodipine 5mg. Retest in 2 hours.",
      }),
    });
    const resolveData = await resolveRes.json();
    if (!resolveRes.ok) throw new Error(`Alert resolution failed: ${JSON.stringify(resolveData)}`);

    if (resolveData.status !== "RESOLVED" || resolveData.acknowledgedById !== physicianId) {
      throw new Error("Alert status or acknowledgedById mismatch");
    }
    pass(`Alert ${criticalAlertId} resolved by Dr. House with clinical audit note`);

    // --------------------------------------------------------------------------------------------
    // ALL TESTS PASSED
    // --------------------------------------------------------------------------------------------
    console.log(`\n${colors.bold}${colors.green}================================================================${colors.reset}`);
    console.log(`${colors.bold}${colors.green}  ALL 9 VITALS & HEALTH MONITORING (6.3) TESTS PASSED!          ${colors.reset}`);
    console.log(`${colors.bold}${colors.green}================================================================${colors.reset}\n`);

  } catch (error) {
    fail("Vitals Integration Test Suite Failed", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Execute tests
runVitalsTestSuite();
