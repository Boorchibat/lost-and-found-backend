const formData = require("form-data");
const Mailgun = require("mailgun.js");

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
  url: "https://api.mailgun.net",
});

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const result = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `no-reply@${process.env.MAILGUN_DOMAIN}`,
      to,
      subject,
      text,
      html,
    });
    console.log("Email sent:", result);

    return result;
  } catch (err) {
    console.error("Mailgun error:", err);
    console.log("Using domain:", process.env.MAILGUN_DOMAIN);
    console.log("API key length:", process.env.MAILGUN_API_KEY);
    throw err;
  }
};

module.exports = { sendEmail };
