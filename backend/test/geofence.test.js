/**
 * ==============================================================================================
 * SILVERCARE - GEOFENCING & LOCATION SAFETY (6.5) INTEGRATION TEST SUITE
 * ==============================================================================================
 * 
 * ## 1. PURPOSE & WHY TO TEST:
 * For elderly patients with dementia or wandering risk:
 *   1. Caregivers must be able to define safe zones (e.g. Home, daily walking radius).
 *   2. Breaches must immediately trigger high-priority alerts with a direct map link.
 *   3. Location tracking is privacy-respecting (NOT always-on tracking by default;
 *      time-boxed emergency windows only, disclosed to the patient).
 *   4. Alerts must have a full resolution and audit trail.
 * 
 * ## 2. HOW TO RUN:
 * Step 1: Start the backend server in one terminal:
 *   cd backend
 *   npm start   (or npm run dev)
 * 
 * Step 2: In another terminal, run this test:
 *   cd backend
 *   npm run test:geofence   (or node test/geofence.test.js)
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

async function runGeofenceTestSuite() {
  console.log(`${colors.bold}Starting SilverCare Geofencing & Location Safety (6.5) Test Suite...${colors.reset}\n`);

  try {
    // --------------------------------------------------------------------------------------------
    // 0. CLEANUP & SETUP
    // --------------------------------------------------------------------------------------------
    header("0. Environment Cleanup");
    const testEmails = ['geofence_patient@example.com', 'geofence_caregiver@example.com'];

    const existingUsers = await prisma.user.findMany({
      where: { email: { in: testEmails } },
      select: { id: true },
    });

    const userIds = existingUsers.map(u => u.id);
    if (userIds.length > 0) {
      await prisma.locationAlert.deleteMany({ where: { patientId: { in: userIds } } });
      await prisma.locationPing.deleteMany({ where: { patientId: { in: userIds } } });
      await prisma.trackingSession.deleteMany({ where: { patientId: { in: userIds } } });
      await prisma.safeZone.deleteMany({ where: { patientId: { in: userIds } } });
      await prisma.user.deleteMany({ where: { id: { in: userIds } } });
    }
    pass("Previous test data cleaned up successfully");

    // --------------------------------------------------------------------------------------------
    // 1. AUTHENTICATION (PATIENT & CAREGIVER)
    // --------------------------------------------------------------------------------------------
    header("1. Authentication (Patient & Caregiver)");

    // 1a. Patient
    const patientRes = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'George',
        lastName: 'Bailey',
        email: 'geofence_patient@example.com',
      }),
    });
    const patientData = await patientRes.json();
    if (!patientRes.ok) throw new Error(`Patient signup failed: ${JSON.stringify(patientData)}`);
    const patientToken = patientData.token;
    const patientId = patientData.user.id;
    pass(`Patient registered: George Bailey (ID: ${patientId})`);

    // 1b. Caregiver
    const caregiverRes = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Mary',
        lastName: 'Bailey',
        email: 'geofence_caregiver@example.com',
      }),
    });
    const caregiverData = await caregiverRes.json();
    if (!caregiverRes.ok) throw new Error(`Caregiver signup failed: ${JSON.stringify(caregiverData)}`);
    const caregiverToken = caregiverData.token;
    const caregiverId = caregiverData.user.id;
    pass(`Caregiver registered: Mary Bailey (ID: ${caregiverId})`);

    // --------------------------------------------------------------------------------------------
    // 2. CAREGIVER DEFINES SAFE ZONE
    // --------------------------------------------------------------------------------------------
    header("2. Caregiver Defines Safe Zone");
    console.log("   WHY: Caregiver sets geofenced radius (e.g., 200m around residence).");

    const homeLat = 37.7749;
    const homeLng = -122.4194;
    const safeRadiusMeters = 200;

    const zoneRes = await fetch(`${BASE_URL}/location-safety/safe-zones`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${caregiverToken}`,
      },
      body: JSON.stringify({
        patientId,
        name: "Home Sanctuary & Garden",
        latitude: homeLat,
        longitude: homeLng,
        radiusMeters: safeRadiusMeters,
      }),
    });
    const zoneData = await zoneRes.json();
    if (!zoneRes.ok) throw new Error(`SafeZone creation failed: ${JSON.stringify(zoneData)}`);
    pass(`Safe Zone created: "${zoneData.name}" (Radius: ${zoneData.radiusMeters}m)`);

    // --------------------------------------------------------------------------------------------
    // 3. IN-ZONE LOCATION PING (PRIVACY RESPECTED)
    // --------------------------------------------------------------------------------------------
    header("3. In-Zone Location Ping (Normal)");
    console.log("   WHY: When inside safe zone, no alerts are triggered and always-on tracking is avoided.");

    // Ping roughly 50m away from center (inside 200m perimeter)
    const inZoneLat = homeLat + 0.0003;
    const inZoneLng = homeLng + 0.0003;

    const inZoneRes = await fetch(`${BASE_URL}/location-safety/pings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${patientToken}`,
      },
      body: JSON.stringify({
        patientId,
        latitude: inZoneLat,
        longitude: inZoneLng,
        accuracyMeters: 5.0,
        batteryLevel: 92,
      }),
    });
    const inZoneData = await inZoneRes.json();
    if (!inZoneRes.ok) throw new Error(`In-zone ping failed: ${JSON.stringify(inZoneData)}`);

    if (!inZoneData.isInsideSafeZone || inZoneData.alert !== null) {
      throw new Error("Expected in-zone ping to have isInsideSafeZone: true and alert: null");
    }
    pass("In-zone ping recorded safely (Inside safe zone: TRUE, Alerts: NONE)");

    // --------------------------------------------------------------------------------------------
    // 4. GEOFENCE BREACH & AUTOMATIC TIME-BOXED EMERGENCY TRACKING
    // --------------------------------------------------------------------------------------------
    header("4. Geofence Breach Detection & Emergency Time-Boxed Tracking");
    console.log("   WHY: Wandering breach triggers alert with map link and activates a 30-min time-boxed tracking window.");

    // Ping roughly 1.5 km away from home (well outside 200m zone)
    const breachLat = homeLat + 0.012;
    const breachLng = homeLng + 0.012;

    const breachRes = await fetch(`${BASE_URL}/location-safety/pings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${patientToken}`,
      },
      body: JSON.stringify({
        patientId,
        latitude: breachLat,
        longitude: breachLng,
        accuracyMeters: 8.0,
        batteryLevel: 85,
      }),
    });
    const breachData = await breachRes.json();
    if (!breachRes.ok) throw new Error(`Breach ping failed: ${JSON.stringify(breachData)}`);

    if (breachData.isInsideSafeZone !== false) {
      throw new Error("Breach was not detected as outside safe zone");
    }
    if (!breachData.alert || breachData.alert.severity !== "CRITICAL") {
      throw new Error("Expected CRITICAL LocationAlert to be triggered");
    }
    if (!breachData.alert.mapUrl.includes("google.com/maps")) {
      throw new Error("Alert missing valid Google Maps URL");
    }
    if (!breachData.activeSession || breachData.activeSession.triggerReason !== "EMERGENCY_BREACH") {
      throw new Error("Expected auto-initiated emergency time-boxed tracking session");
    }

    const alertId = breachData.alert.id;
    pass(`Breach alert triggered! Drift: ${breachData.alert.driftDistanceM}m beyond perimeter`);
    pass(`Map Link generated: ${breachData.alert.mapUrl}`);
    pass(`Time-Boxed Emergency Session active until: ${new Date(breachData.activeSession.expiresAt).toLocaleTimeString()}`);

    // --------------------------------------------------------------------------------------------
    // 5. GET ACTIVE TRACKING STATUS & BREADCRUMBS
    // --------------------------------------------------------------------------------------------
    header("5. Active Emergency Tracking Status & Breadcrumbs");
    console.log("   WHY: Allows caregivers to track breadcrumb trail only during authorized emergency windows.");

    const statusRes = await fetch(`${BASE_URL}/location-safety/patients/${patientId}/tracking-status`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${caregiverToken}` },
    });
    const statusData = await statusRes.json();
    if (!statusRes.ok) throw new Error(`Status query failed: ${JSON.stringify(statusData)}`);

    if (!statusData.isTrackingActive || !statusData.session || statusData.session.pings.length === 0) {
      throw new Error("Active tracking session missing or breadcrumbs not populated");
    }
    pass(`Tracking status: ACTIVE (Loaded ${statusData.session.pings.length} breadcrumb points and ${statusData.session.alerts.length} active alerts)`);

    // --------------------------------------------------------------------------------------------
    // 6. ALERT RESOLUTION & CAREGIVER AUDIT NOTE
    // --------------------------------------------------------------------------------------------
    header("6. Alert Resolution & Clinical Recovery Note");
    console.log("   WHY: Caregiver confirms the patient has been found and records recovery details.");

    const resolveRes = await fetch(`${BASE_URL}/location-safety/alerts/${alertId}/resolve`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${caregiverToken}`,
      },
      body: JSON.stringify({
        resolutionNotes: "Caregiver located George at community center. Accompanied back home safely.",
      }),
    });
    const resolveData = await resolveRes.json();
    if (!resolveRes.ok) throw new Error(`Alert resolution failed: ${JSON.stringify(resolveData)}`);

    if (resolveData.status !== "RESOLVED" || resolveData.resolvedById !== caregiverId) {
      throw new Error("Alert resolution status or audit identity mismatch");
    }
    pass(`Alert resolved by Mary Bailey with recovery notes: "${resolveData.resolutionNotes}"`);

    // --------------------------------------------------------------------------------------------
    // ALL TESTS PASSED
    // --------------------------------------------------------------------------------------------
    console.log(`\n${colors.bold}${colors.green}========================================================================${colors.reset}`);
    console.log(`${colors.bold}${colors.green}  ALL 6 GEOFENCING & LOCATION SAFETY (6.5) TESTS PASSED!                ${colors.reset}`);
    console.log(`${colors.bold}${colors.green}========================================================================${colors.reset}\n`);

  } catch (error) {
    fail("Geofencing Integration Test Suite Failed", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runGeofenceTestSuite();
