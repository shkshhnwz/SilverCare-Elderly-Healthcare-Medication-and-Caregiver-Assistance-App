const prisma = require("../../config/prisma");

/**
 * Format Date to iCalendar UTC format (YYYYMMDDTHHmmssZ)
 */
const formatToICSDate = (date) => {
  return new Date(date).toISOString().replace(/-|:|\.\d+/g, "");
};

/**
 * Build Google Calendar 1-Click URL
 */
const generateGoogleCalendarUrl = (appointment) => {
  const start = formatToICSDate(appointment.scheduledAt);
  const endDate = new Date(new Date(appointment.scheduledAt).getTime() + appointment.durationMinutes * 60 * 1000);
  const end = formatToICSDate(endDate);

  const title = encodeURIComponent(`${appointment.title} - ${appointment.doctorName}`);
  const details = encodeURIComponent(
    `Doctor: ${appointment.doctorName} (${appointment.specialty || "Specialist"})\n` +
    `Clinic: ${appointment.clinicOrHospital}\n` +
    `Notes: ${appointment.notes || "None"}`
  );
  const location = encodeURIComponent(appointment.locationAddress || appointment.clinicOrHospital);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
};

/**
 * Build RFC 5545 .ics content for Apple / Outlook Calendar
 */
const generateICSContent = (appointment) => {
  const start = formatToICSDate(appointment.scheduledAt);
  const endDate = new Date(new Date(appointment.scheduledAt).getTime() + appointment.durationMinutes * 60 * 1000);
  const end = formatToICSDate(endDate);

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//SilverCare//Elderly Care Appointments//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${appointment.id}@silvercare.app`,
    `DTSTAMP:${formatToICSDate(new Date())}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${appointment.title} - ${appointment.doctorName}`,
    `DESCRIPTION:Doctor: ${appointment.doctorName}\\nLocation: ${appointment.clinicOrHospital}\\nNotes: ${appointment.notes || ""}`,
    `LOCATION:${appointment.locationAddress || appointment.clinicOrHospital}`,
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-PT2H",
    "ACTION:DISPLAY",
    "DESCRIPTION:SilverCare Appointment Reminder (2 Hours)",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
};

/**
 * 1. Schedule a new appointment with automatic dual-reminders
 */
const scheduleAppointmentService = async (payload, createdById) => {
  const {
    patientId,
    accompanyingCaregiverId,
    title,
    doctorName,
    specialty,
    clinicOrHospital,
    locationAddress,
    scheduledAt,
    durationMinutes = 45,
    notes,
  } = payload;

  if (!patientId || !title || !doctorName || !clinicOrHospital || !scheduledAt) {
    throw new Error("patientId, title, doctorName, clinicOrHospital, and scheduledAt are required");
  }

  const appointmentDate = new Date(scheduledAt);

  // 1. Create Appointment Record
  const appointment = await prisma.appointment.create({
    data: {
      patientId,
      accompanyingCaregiverId: accompanyingCaregiverId || null,
      title,
      doctorName,
      specialty,
      clinicOrHospital,
      locationAddress,
      scheduledAt: appointmentDate,
      durationMinutes: Number(durationMinutes),
      notes,
      createdById,
    },
    include: {
      patient: { select: { id: true, firstName: true, lastName: true, phone: true } },
      accompanyingCaregiver: { select: { id: true, firstName: true, lastName: true, phone: true } },
    },
  });

  // 2. Automatically generate dual-reminders (24h before & 2h before)
  const reminder24h = new Date(appointmentDate.getTime() - 24 * 60 * 60 * 1000);
  const reminder2h = new Date(appointmentDate.getTime() - 2 * 60 * 60 * 1000);

  const remindersToCreate = [];

  // Patient reminders
  if (reminder24h > new Date()) {
    remindersToCreate.push({
      appointmentId: appointment.id,
      recipientRole: "PATIENT",
      recipientId: patientId,
      remindAt: reminder24h,
      channel: "SMS",
      message: `Reminder: Appointment with ${doctorName} tomorrow at ${appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`,
    });
  }
  if (reminder2h > new Date()) {
    remindersToCreate.push({
      appointmentId: appointment.id,
      recipientRole: "PATIENT",
      recipientId: patientId,
      remindAt: reminder2h,
      channel: "PUSH",
      message: `Reminder: Appointment with ${doctorName} in 2 hours at ${clinicOrHospital}.`,
    });
  }

  // Accompanying Caregiver escort reminders
  if (accompanyingCaregiverId) {
    if (reminder24h > new Date()) {
      remindersToCreate.push({
        appointmentId: appointment.id,
        recipientRole: "ACCOMPANYING_CAREGIVER",
        recipientId: accompanyingCaregiverId,
        remindAt: reminder24h,
        channel: "SMS",
        message: `Caregiver Escort Reminder: Escorting ${appointment.patient.firstName} to ${doctorName} tomorrow.`,
      });
    }
    if (reminder2h > new Date()) {
      remindersToCreate.push({
        appointmentId: appointment.id,
        recipientRole: "ACCOMPANYING_CAREGIVER",
        recipientId: accompanyingCaregiverId,
        remindAt: reminder2h,
        channel: "PUSH",
        message: `Caregiver Escort Reminder: Appointment with ${appointment.patient.firstName} in 2 hours at ${clinicOrHospital}.`,
      });
    }
  }

  let createdReminders = [];
  if (remindersToCreate.length > 0) {
    createdReminders = await prisma.appointmentReminder.createManyAndReturn({
      data: remindersToCreate,
    });
  }

  // 3. Generate Calendar Links
  const googleCalendarUrl = generateGoogleCalendarUrl(appointment);

  return {
    appointment,
    calendarSync: {
      googleCalendarUrl,
      icsDownloadEndpoint: `/api/appointments/${appointment.id}/calendar.ics`,
    },
    remindersScheduled: createdReminders,
  };
};

/**
 * 2. Get single appointment details with calendar export
 */
const getAppointmentDetailsService = async (appointmentId) => {
  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
    include: {
      patient: { select: { id: true, firstName: true, lastName: true, phone: true } },
      accompanyingCaregiver: { select: { id: true, firstName: true, lastName: true, phone: true } },
      reminders: true,
      postAppointmentNote: true,
    },
  });

  if (!appointment) throw new Error("Appointment not found");

  return {
    ...appointment,
    calendarSync: {
      googleCalendarUrl: generateGoogleCalendarUrl(appointment),
      icsContent: generateICSContent(appointment),
    },
  };
};

/**
 * 3. List appointments for a patient
 */
const listPatientAppointmentsService = async (patientId, filter = "all") => {
  const now = new Date();
  const where = { patientId };

  if (filter === "upcoming") {
    where.scheduledAt = { gte: now };
    where.status = "SCHEDULED";
  } else if (filter === "past") {
    where.OR = [
      { scheduledAt: { lt: now } },
      { status: "COMPLETED" },
    ];
  }

  return await prisma.appointment.findMany({
    where,
    include: {
      accompanyingCaregiver: { select: { id: true, firstName: true, lastName: true } },
      postAppointmentNote: true,
    },
    orderBy: { scheduledAt: "asc" },
  });
};

/**
 * 4. Attach Post-Appointment Notes to Care Plan & Mark Completed
 */
const attachPostAppointmentNotesService = async (appointmentId, payload, createdById) => {
  const {
    doctorSummary,
    prescriptionChanges,
    followUpInstructions,
    nextFollowUpDate,
    attachedToCarePlan = true,
  } = payload;

  if (!doctorSummary) throw new Error("doctorSummary is required");

  // Create or Update PostAppointmentNote
  const postNote = await prisma.postAppointmentNote.upsert({
    where: { appointmentId },
    update: {
      doctorSummary,
      prescriptionChanges,
      followUpInstructions,
      nextFollowUpDate: nextFollowUpDate ? new Date(nextFollowUpDate) : null,
      attachedToCarePlan,
      createdById,
    },
    create: {
      appointmentId,
      doctorSummary,
      prescriptionChanges,
      followUpInstructions,
      nextFollowUpDate: nextFollowUpDate ? new Date(nextFollowUpDate) : null,
      attachedToCarePlan,
      createdById,
    },
  });

  // Mark appointment as COMPLETED
  const updatedAppointment = await prisma.appointment.update({
    where: { id: appointmentId },
    data: { status: "COMPLETED" },
    include: { patient: { select: { id: true, firstName: true, lastName: true } } },
  });

  return {
    appointment: updatedAppointment,
    postNote,
    carePlanSynced: attachedToCarePlan,
    message: "Post-appointment notes successfully recorded and attached to elderly care plan.",
  };
};

module.exports = {
  scheduleAppointmentService,
  getAppointmentDetailsService,
  listPatientAppointmentsService,
  attachPostAppointmentNotesService,
  generateICSContent,
};
