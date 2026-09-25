const {
  scheduleAppointmentService,
  getAppointmentDetailsService,
  listPatientAppointmentsService,
  attachPostAppointmentNotesService,
  generateICSContent,
} = require("./appointments.services");

const scheduleAppointment = async (req, res, next) => {
  try {
    const result = await scheduleAppointmentService(req.body, req.user.id);
    const io = req.app.get('io');
    if (io) {
      const patientId = result.patientId || req.body.patientId;
      if (patientId) io.to(`circle_${patientId}`).emit('appointment_created', result);
      io.emit('appointment_created', result);
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getAppointmentDetails = async (req, res, next) => {
  try {
    const result = await getAppointmentDetailsService(req.params.appointmentId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const listPatientAppointments = async (req, res, next) => {
  try {
    const { filter } = req.query;
    const result = await listPatientAppointmentsService(req.params.patientId, filter);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const attachPostAppointmentNotes = async (req, res, next) => {
  try {
    const result = await attachPostAppointmentNotesService(
      req.params.appointmentId,
      req.body,
      req.user.id
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const downloadICSFile = async (req, res, next) => {
  try {
    const appointment = await getAppointmentDetailsService(req.params.appointmentId);
    const icsData = generateICSContent(appointment);

    res.setHeader("Content-Type", "text/calendar; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="appointment-${appointment.id}.ics"`);
    res.send(icsData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  scheduleAppointment,
  getAppointmentDetails,
  listPatientAppointments,
  attachPostAppointmentNotes,
  downloadICSFile,
};
