const express = require("express");
const { requireAuth } = require("../../middleware/auth");
const {
  scheduleAppointment,
  getAppointmentDetails,
  listPatientAppointments,
  attachPostAppointmentNotes,
  downloadICSFile,
} = require("./appointments.controller");

const AppointmentsRouter = express.Router();

// 1. Schedule an appointment
AppointmentsRouter.post("/", requireAuth, scheduleAppointment);

// 2. List appointments for a patient (optional filter: ?filter=upcoming or ?filter=past)
AppointmentsRouter.get("/patients/:patientId", requireAuth, listPatientAppointments);

// 3. Get single appointment details (with calendar links)
AppointmentsRouter.get("/:appointmentId", requireAuth, getAppointmentDetails);

// 4. Download .ics iCalendar file for Apple / Outlook
AppointmentsRouter.get("/:appointmentId/calendar.ics", requireAuth, downloadICSFile);

// 5. Post-appointment notes attachable to care plan
AppointmentsRouter.post("/:appointmentId/post-notes", requireAuth, attachPostAppointmentNotes);

module.exports = AppointmentsRouter;
