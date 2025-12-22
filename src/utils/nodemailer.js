const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, 
  },
});
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP VERIFY FAILED:", error);
  } else {
    console.log("SMTP READY TO SEND EMAILS");
  }
});


module.exports = transporter;
