const User = require("../../schema/user");
const bcrypt = require("bcrypt");
const { createToken } = require("../../utils/createToken");
const transporter = require("../../utils/nodemailer");
const crypto = require("crypto");

const signIn = async (req, res) => {
  const { password, email } = req.body;
  if (!password || !email) {
    return res
      .status(400)
      .json({ message: "Please fill out password and email" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "No user found with this email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }
    if (!user.isVerified) {
      const verificationCode = crypto.randomInt(100000, 1000000).toString();
      user.verificationCode = verificationCode;
      user.verificationCodeExpires = Date.now() + 10 * 60 * 1000;
      await user.save();

      try {
        await transporter.sendMail({
          from: `"Lost & Found" <${process.env.NODEMAILER_EMAIL}>`,
          to: user.email,
          subject: "Verify Your Email",
          html: `
  <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
    <h2 style="color: #2c3e50;">Verify Your Email</h2>
    <p>Hi ${user.username || "there"},</p>
    <p>Thank you for signing in to <strong>Lost & Found</strong>. Please use the verification code below to complete your login:</p>
    <div style="background-color: #f1f1f1; padding: 15px; display: inline-block; border-radius: 5px; font-size: 24px; letter-spacing: 2px; margin: 10px 0;">
      <strong>${verificationCode}</strong>
    </div>
    <p>This code will expire in 10 minutes.</p>
    <p style="font-size: 12px; color: #888;">If you did not request this email, please ignore it.</p>
    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
    <p style="font-size: 12px; color: #aaa;">&copy; 2025 Lost & Found</p>
  </div>
`,
        });
      } catch (error) {
        console.error("Resend error:", error);
        return res
          .status(500)
          .json({ message: "Failed to send verification email" });
      }
      return res.status(200).json({
        message: "Verification code sent Please verify before signing in.",
        email: user.email,
      });
    }
    const token = createToken(user._id);

    return res.status(200).json({
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { signIn };
