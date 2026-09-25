const prisma = require("../../config/prisma");

/**
 * 1. Comprehensive Physician-Ready Clinical Report (30 / 60 / 90 days)
 */
const getPhysicianReportService = async (patientId, days = 30) => {
  const startDate = new Date(Date.now() - Number(days) * 24 * 60 * 60 * 1000);

  // 1. Patient Profile
  const patient = await prisma.user.findUnique({
    where: { id: patientId },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    },
  });
  if (!patient) throw new Error("Patient not found");

  // 2. Parallel queries across all modules
  const [
    medications,
    vitals,
    vitalsAlerts,
    emergencies,
    appointments,
    carePlan,
  ] = await Promise.all([
    prisma.medication.findMany({
      where: { patientId, active: true },
      include: {
        doses: {
          where: { scheduledAt: { gte: startDate } },
        },
      },
    }),
    prisma.vitalReading.findMany({
      where: { patientId, recordedAt: { gte: startDate } },
      orderBy: { recordedAt: "desc" },
    }),
    prisma.vitalAlert.findMany({
      where: { patientId, createdAt: { gte: startDate } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.emergencyEvent.findMany({
      where: { patientId, createdAt: { gte: startDate } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.appointment.findMany({
      where: { patientId, scheduledAt: { gte: new Date() } },
      orderBy: { scheduledAt: "asc" },
      take: 3,
    }),
    prisma.carePlan.findUnique({
      where: { patientId },
    }),
  ]);

  // 3. Compute Medication Adherence %
  let totalDoses = 0;
  let takenDoses = 0;
  medications.forEach((med) => {
    med.doses.forEach((dose) => {
      totalDoses++;
      if (dose.state === "CONFIRMED_TAKEN") takenDoses++;
    });
  });
  const adherenceRate = totalDoses > 0 ? Number(((takenDoses / totalDoses) * 100).toFixed(1)) : 100.0;

  // 4. Compute Vitals Overview
  const bpReadings = vitals.filter((v) => v.vitalType === "BLOOD_PRESSURE" && v.systolic !== null);
  let avgSystolic = 0;
  let avgDiastolic = 0;
  if (bpReadings.length > 0) {
    avgSystolic = Math.round(bpReadings.reduce((sum, r) => sum + r.systolic, 0) / bpReadings.length);
    avgDiastolic = Math.round(bpReadings.reduce((sum, r) => sum + r.diastolic, 0) / bpReadings.length);
  }

  const glucoseReadings = vitals.filter((v) => v.vitalType === "GLUCOSE" && v.value !== null);
  let avgGlucose = 0;
  if (glucoseReadings.length > 0) {
    avgGlucose = Math.round(glucoseReadings.reduce((sum, r) => sum + r.value, 0) / glucoseReadings.length);
  }

  const weightReadings = vitals.filter((v) => v.vitalType === "WEIGHT" && v.value !== null);
  let latestWeight = weightReadings.length > 0 ? weightReadings[0].value : null;

  // 5. Clinical Incident Summary
  const incidents = [
    ...vitalsAlerts.map((a) => ({
      type: `VITAL_ANOMALY (${a.severity})`,
      message: a.message,
      date: a.createdAt,
      status: a.status,
    })),
    ...emergencies.map((e) => ({
      type: `EMERGENCY (${e.eventType})`,
      message: `Status: ${e.status}. ${e.resolutionNotes || "No notes"}`,
      date: e.createdAt,
      status: e.status,
    })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  return {
    reportTitle: `Clinical Health Summary - ${patient.firstName} ${patient.lastName}`,
    generatedAt: new Date(),
    timeframeDays: Number(days),
    patient,
    medicationAdherence: {
      activeMedicationsCount: medications.length,
      totalDosesScheduled: totalDoses,
      dosesTaken: takenDoses,
      adherencePercentage: adherenceRate,
      activeMedicationsList: medications.map((m) => ({
        name: m.medicationName,
        dosage: m.dosage,
        route: m.route,
        frequency: m.frequencyRRule,
        prescribedBy: m.prescribingDoctor,
      })),
    },
    vitalsSummary: {
      totalVitalsRecorded: vitals.length,
      averageBloodPressure: bpReadings.length > 0 ? `${avgSystolic}/${avgDiastolic} mmHg` : "No readings",
      averageGlucose: glucoseReadings.length > 0 ? `${avgGlucose} mg/dL` : "No readings",
      latestWeight: latestWeight ? `${latestWeight} kg` : "No readings",
      totalAnomaliesTriggered: vitalsAlerts.length,
    },
    careDirectives: {
      dietaryNotes: carePlan?.dietaryNotes || "None recorded",
      mobilityInstructions: carePlan?.mobilityInstructions || "None recorded",
      resuscitationStatus: carePlan?.resuscitationStatus || "Full Code",
      emergencySummary: carePlan?.emergencySummary || "None",
    },
    clinicalIncidents: incidents.slice(0, 10),
    upcomingAppointments: appointments.map((a) => ({
      title: a.title,
      doctor: a.doctorName,
      clinic: a.clinicOrHospital,
      scheduledAt: a.scheduledAt,
    })),
  };
};

/**
 * 2. Generate Printable Physician HTML Report (Format ready for print/PDF)
 */
const renderPhysicianReportHTML = (reportData) => {
  const { patient, medicationAdherence, vitalsSummary, careDirectives, clinicalIncidents, timeframeDays, generatedAt } = reportData;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Clinical Health Summary - ${patient.firstName} ${patient.lastName}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #1e293b; padding: 40px; margin: 0 auto; max-width: 850px; }
    .header { border-bottom: 3px solid #0284c7; padding-bottom: 15px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: flex-end; }
    h1 { color: #0f172a; margin: 0; font-size: 24px; }
    .meta { color: #64748b; font-size: 13px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px; }
    .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; }
    .card-title { font-weight: bold; font-size: 14px; text-transform: uppercase; color: #0284c7; margin-bottom: 10px; }
    .stat { font-size: 28px; font-weight: bold; color: #0f172a; }
    .badge { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; }
    .badge-green { background: #dcfce7; color: #15803d; }
    .badge-amber { background: #fef3c7; color: #b45309; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 13px; }
    th, td { text-align: left; padding: 8px; border-bottom: 1px solid #e2e8f0; }
    th { background: #f1f5f9; color: #475569; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1>SilverCare Clinical Health Summary</h1>
      <div class="meta">Patient: <strong>${patient.firstName} ${patient.lastName}</strong> | Phone: ${patient.phone || "N/A"}</div>
    </div>
    <div class="meta" style="text-align: right;">
      Timeframe: Last ${timeframeDays} Days<br>Generated: ${new Date(generatedAt).toLocaleDateString()}
    </div>
  </div>

  <div class="grid">
    <div class="card">
      <div class="card-title">Medication Adherence</div>
      <div class="stat">${medicationAdherence.adherencePercentage}%</div>
      <div class="meta">${medicationAdherence.dosesTaken} of ${medicationAdherence.totalDosesScheduled} scheduled doses confirmed</div>
    </div>
    <div class="card">
      <div class="card-title">Vitals Average</div>
      <div style="font-size: 16px; font-weight: 600; margin-top: 4px;">BP: ${vitalsSummary.averageBloodPressure}</div>
      <div style="font-size: 16px; font-weight: 600; margin-top: 4px;">Glucose: ${vitalsSummary.averageGlucose}</div>
      <div style="font-size: 14px; color: #64748b; margin-top: 4px;">Latest Weight: ${vitalsSummary.latestWeight}</div>
    </div>
  </div>

  <div class="card" style="margin-bottom: 25px;">
    <div class="card-title">Care Plan & Clinical Directives</div>
    <div><strong>Dietary Notes:</strong> ${careDirectives.dietaryNotes}</div>
    <div style="margin-top: 6px;"><strong>Mobility Instructions:</strong> ${careDirectives.mobilityInstructions}</div>
    <div style="margin-top: 6px;"><strong>Resuscitation Directives:</strong> ${careDirectives.resuscitationStatus}</div>
  </div>

  <div class="card">
    <div class="card-title">Recent Clinical Incidents & Alerts (${clinicalIncidents.length})</div>
    ${clinicalIncidents.length === 0 ? "<div class='meta'>No clinical incidents recorded during this timeframe.</div>" : `
    <table>
      <thead>
        <tr><th>Date</th><th>Type</th><th>Details</th><th>Status</th></tr>
      </thead>
      <tbody>
        ${clinicalIncidents.map(i => `
          <tr>
            <td>${new Date(i.date).toLocaleDateString()}</td>
            <td><strong>${i.type}</strong></td>
            <td>${i.message}</td>
            <td><span class="badge badge-amber">${i.status}</span></td>
          </tr>
        `).join("")}
      </tbody>
    </table>
    `}
  </div>
</body>
</html>
  `;
};

/**
 * 3. Caregiver Weekly Digest (7-day status retrospective)
 */
const getCaregiverWeeklyDigestService = async (patientId) => {
  const weekStart = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [patient, doses, vitals, alerts, tasks, shifts, appointments] = await Promise.all([
    prisma.user.findUnique({ where: { id: patientId }, select: { firstName: true, lastName: true } }),
    prisma.medicationDose.findMany({
      where: {
        medication: { patientId },
        scheduledAt: { gte: weekStart },
      },
    }),
    prisma.vitalReading.findMany({
      where: { patientId, recordedAt: { gte: weekStart } },
    }),
    prisma.vitalAlert.findMany({
      where: { patientId, createdAt: { gte: weekStart } },
    }),
    prisma.careTask.findMany({
      where: { patientId, dueWindowStart: { gte: weekStart } },
    }),
    prisma.careShift.findMany({
      where: { patientId, clockInAt: { gte: weekStart } },
    }),
    prisma.appointment.findMany({
      where: { patientId, scheduledAt: { gte: new Date(), lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) } },
      orderBy: { scheduledAt: "asc" },
    }),
  ]);

  if (!patient) throw new Error("Patient not found");

  const totalDoses = doses.length;
  const takenDoses = doses.filter((d) => d.state === "CONFIRMED_TAKEN").length;
  const adherenceScore = totalDoses > 0 ? Math.round((takenDoses / totalDoses) * 100) : 100;

  const completedTasks = tasks.filter((t) => t.status === "COMPLETED").length;

  return {
    digestTitle: `Weekly Caregiver Digest: ${patient.firstName} ${patient.lastName}`,
    weekStartDate: weekStart,
    weekEndDate: new Date(),
    summaryParagraph: `${patient.firstName}'s week was stable. Medication adherence was ${adherenceScore}%, with ${completedTasks} care tasks completed and ${shifts.length} caregiver shifts logged.`,
    metrics: {
      medicationAdherenceScore: adherenceScore,
      totalDosesTaken: takenDoses,
      totalDosesScheduled: totalDoses,
      vitalsReadingsLogged: vitals.length,
      anomaliesTriggered: alerts.length,
      tasksCompleted: completedTasks,
      totalTasks: tasks.length,
      caregiverShiftsLogged: shifts.length,
    },
    upcomingAppointmentsNext7Days: appointments.map((a) => ({
      title: a.title,
      doctor: a.doctorName,
      scheduledAt: a.scheduledAt,
      clinic: a.clinicOrHospital,
    })),
  };
};

/**
 * 4. Dispatch Report Before Appointment (Simulate physician email)
 */
const dispatchAppointmentReportService = async (patientId, appointmentId, recipientEmail) => {
  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
  });
  if (!appointment) throw new Error("Appointment not found");

  const report = await getPhysicianReportService(patientId, 30);
  const targetEmail = recipientEmail || "doctor.clinic@hospital.org";

  // Simulate outgoing email dispatch record
  return {
    status: "DISPATCHED",
    recipientEmail: targetEmail,
    subject: `Medical Summary for Appointment: ${appointment.title}`,
    appointmentDetails: {
      doctor: appointment.doctorName,
      clinic: appointment.clinicOrHospital,
      scheduledAt: appointment.scheduledAt,
    },
    clinicalSummaryAttached: {
      adherencePercentage: report.medicationAdherence.adherencePercentage,
      averageBP: report.vitalsSummary.averageBloodPressure,
      incidentsCount: report.clinicalIncidents.length,
    },
    dispatchedAt: new Date(),
  };
};

// In-memory reports store per patient
const patientReportsCache = new Map();

const generateReportService = async (patientId, reportType = "FULL", days = 30) => {
  if (!patientId) throw new Error("patientId is required");

  let title = "Clinical Health Summary";
  let data = null;
  let html = null;

  if (reportType === "WEEKLY") {
    data = await getCaregiverWeeklyDigestService(patientId);
    title = data.digestTitle || "Weekly Caregiver Digest";
  } else {
    data = await getPhysicianReportService(patientId, days);
    html = renderPhysicianReportHTML(data);
    if (reportType === "ADHERENCE") {
      title = `Medication Adherence Report (${data.timeframeDays} Days)`;
    } else if (reportType === "VITALS") {
      title = `Vitals & Health Trends (${data.timeframeDays} Days)`;
    } else {
      title = data.reportTitle || `Clinical Health Summary (${data.timeframeDays} Days)`;
    }
  }

  const report = {
    id: `rep_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    patientId,
    type: reportType,
    title,
    createdAt: new Date().toISOString(),
    data,
    html,
  };

  const list = patientReportsCache.get(patientId) || [];
  list.unshift(report);
  patientReportsCache.set(patientId, list.slice(0, 20));

  return report;
};

const getPatientReportsService = async (patientId) => {
  if (!patientId) throw new Error("patientId is required");
  let list = patientReportsCache.get(patientId);
  if (!list || list.length === 0) {
    try {
      const full = await generateReportService(patientId, "FULL", 30);
      list = [full];
    } catch (_) {
      list = [];
    }
  }
  return list;
};

module.exports = {
  getPhysicianReportService,
  renderPhysicianReportHTML,
  getCaregiverWeeklyDigestService,
  dispatchAppointmentReportService,
  generateReportService,
  getPatientReportsService,
};
