const express = require("express");
const { requireAuth, requireCircleRole } = require("../../middleware/auth");
const {
  scheduleAppointment,
  getAppointmentDetails,
  listPatientAppointments,
  attachPostAppointmentNotes,
  completeAppointment,
  downloadICSFile,
} = require("./appointments.controller");

const AppointmentsRouter = express.Router();
const WRITER_ROLES = ["OWNER", "CAREGIVER_FULL", "PROFESSIONAL", "PHYSICIAN"];

// 1. Schedule an appointment
AppointmentsRouter.post("/", requireAuth, requireCircleRole(WRITER_ROLES), scheduleAppointment);

// 2. List appointments for a patient (optional filter: ?filter=upcoming or ?filter=past)
AppointmentsRouter.get("/patients/:patientId", requireAuth, listPatientAppointments);

// 3. Get single appointment details (with calendar links)
AppointmentsRouter.get("/:appointmentId", requireAuth, getAppointmentDetails);

// 4. Download .ics iCalendar file for Apple / Outlook
AppointmentsRouter.get("/:appointmentId/calendar.ics", requireAuth, downloadICSFile);

// 5. Post-appointment notes attachable to care plan
AppointmentsRouter.post("/:appointmentId/post-notes", requireAuth, attachPostAppointmentNotes);

// 6. Mark appointment visit as completed
AppointmentsRouter.patch("/:appointmentId/complete", requireAuth, completeAppointment);

module.exports = AppointmentsRouter;
