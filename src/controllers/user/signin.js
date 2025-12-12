const User = require("../../schema/user");
const bcrypt = require("bcrypt");
const { createToken } = require("../../utils/createToken");
const mg = require("../../utils/mailgun");
const crypto = require("crypto");

const DOMAIN = process.env.MAILGUN_DOMAIN;

const signIn = async (req, res) => {
  const { password, email } = req.body;
  if (!password || !email) {
    return res.status(400).json({ message: "Please fill out password and email" });
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
        await mg.messages.create(DOMAIN, {
          from: `Lost and found login <postmaster@${DOMAIN}>`,
          to: [user.email],
          subject: "Verify Your Email",
          html: `
            <h2>Verify your email</h2>
            <p>Your verification code is:</p>
            <h1>${verificationCode}</h1>
            <p>This code expires in 10 minutes.</p>
          `,
        });
      } catch (error) {
        console.error("Mailgun error:", error);
        return res.status(500).json({ message: "Failed to send verification email" });
      }
      return res.status(200).json({
        message: "Verification code sent. Please verify before signing in.",
      });
    }
    const token = createToken(user._id);

    return res.status(200).json({
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { signIn };
