const sendSMS = async (to, message) => {
  console.log(`[SMS Sent] To: ${to} | Message: ${message}`);
  return { success: true, provider: "mock-sms" };
};

const sendEmail = async (to, subject, html) => {
  console.log(`[Email Sent] To: ${to} | Subject: ${subject}\nBody: ${html}`);
  return { success: true, provider: "mock-email" };
};

module.exports = {
  sendSMS,
  sendEmail,
};
