const User = require("../../schema/user");

const verifyCode = async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ message: "Email and code are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  if (!user.verificationCodeExpires || Date.now() > user.verificationCodeExpires) {
    user.verificationCode = null;
    user.verificationCodeExpires = null;
    await user.save();
    return res.status(400).json({ message: "Verification code has expired" });
  }

  if (user.verificationCode !== code) {
    return res.status(400).json({ message: "Invalid verification code" });
  }

  user.isVerified = true;
  user.verificationCode = null;
  user.verificationCodeExpires = null;
  await user.save();

  return res.status(200).json({ message: "Email verified successfully" });
};

module.exports = { verifyCode };
