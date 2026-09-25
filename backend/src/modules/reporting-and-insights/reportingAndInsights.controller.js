const {
  getPhysicianReportService,
  renderPhysicianReportHTML,
  getCaregiverWeeklyDigestService,
  dispatchAppointmentReportService,
  generateReportService,
  getPatientReportsService,
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

const generateReport = async (req, res, next) => {
  try {
    const patientId = req.params.patientId || req.body.patientId || req.user.id;
    const { reportType = "FULL", days = 30 } = req.body || {};
    const report = await generateReportService(patientId, reportType, days);
    res.status(201).json({ success: true, report });
  } catch (error) {
    next(error);
  }
};

const getPatientReports = async (req, res, next) => {
  try {
    const patientId = req.params.patientId || req.user.id;
    const reports = await getPatientReportsService(patientId);
    res.status(200).json(reports);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPhysicianReport,
  getCaregiverWeeklyDigest,
  dispatchAppointmentReport,
  generateReport,
  getPatientReports,
};
