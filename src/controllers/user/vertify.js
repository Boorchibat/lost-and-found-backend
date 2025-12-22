// controllers/user/verifyCode.js
const User = require("../../schema/user");
const { createToken } = require("../../utils/createToken");

const verifyCode = async (req, res) => {
  const { email, code } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  if (
    !user.verificationCode ||
    user.verificationCode !== code ||
    Date.now() > user.verificationCodeExpires
  ) {
    return res.status(400).json({ message: "Invalid or expired code" });
  }

  user.isVerified = true;
  user.verificationCode = null;
  user.verificationCodeExpires = null;
  await user.save();
  const token = createToken(user._id);

  return res.status(200).json({
    message: "Email verified successfully",
    token: createToken(user._id),
    user: {
      email: user.email,
      username: user.username,
      isVerified: true,
    },
  });
};

module.exports = { verifyCode };
