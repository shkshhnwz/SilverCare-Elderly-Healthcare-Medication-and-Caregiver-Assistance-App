const {
  getPhysicianReportService,
  renderPhysicianReportHTML,
  getCaregiverWeeklyDigestService,
  dispatchAppointmentReportService,
} = require("./reportingAndInsights.services");

const getPhysicianReport = async (req, res, next) => {
  try {
    const { days = 30, format } = req.query;
    const reportData = await getPhysicianReportService(req.params.patientId, days);

    if (format === "html" || format === "pdf") {
      const html = renderPhysicianReportHTML(reportData);
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.send(html);
    }

    res.status(200).json(reportData);
  } catch (error) {
    next(error);
  }
};

const getCaregiverWeeklyDigest = async (req, res, next) => {
  try {
    const result = await getCaregiverWeeklyDigestService(req.params.patientId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const dispatchAppointmentReport = async (req, res, next) => {
  try {
    const { appointmentId, recipientEmail } = req.body;
    const result = await dispatchAppointmentReportService(
      req.params.patientId,
      appointmentId,
      recipientEmail
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPhysicianReport,
  getCaregiverWeeklyDigest,
  dispatchAppointmentReport,
};
