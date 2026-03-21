const crypto = require("crypto");
const User = require("../../schema/user");
const { sendEmail } = require("../../utils/mailgun");

const passwordlessLogin = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const verificationCode = crypto.randomInt(100000, 1000000).toString();
    user.verificationCode = verificationCode;
    user.verificationCodeExpires = Date.now() + 10 * 60 * 1000; 
    await user.save();

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #2a9d8f;">Your Login Verification Code</h2>
        <p>Hello,</p>
        <p>Your login code is:</p>
        <h1 style="background-color: #f4f4f4; display: inline-block; padding: 10px 20px; border-radius: 6px; letter-spacing: 3px;">${verificationCode}</h1>
        <p>This code will expire in 10 minutes.</p>
        <p>Thanks,<br/>Foundr FBLA</p>
      </div>
    `;
    try {
      await sendEmail({
        to: email,
        subject: "Your Login Verification Code",
        text: `Your login code is: ${verificationCode}`,
        html: htmlContent,
      });
      console.log(`Sent code ${verificationCode} to ${email}`);
    } catch (mailErr) {
      console.error("Mailgun sending failed:", mailErr);
      return res.status(500).json({ message: "Failed to send email", details: mailErr });
    }

    return res.status(200).json({ message: "Verification code sent" });

  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ message: "Server error", details: err });
  }
};

module.exports = { passwordlessLogin };