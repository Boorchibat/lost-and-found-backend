const User = require("../../schema/user");
const { createToken } = require("../../utils/createToken");

const verifyCodeAndLogin = async (req, res) => {
  const { email, code } = req.body;
  if (!email || !code)
    return res.status(400).json({ message: "Email and code are required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

  
    if (
      user.verificationCode !== code ||
      !user.verificationCodeExpires ||
      user.verificationCodeExpires < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    user.verificationCode = null;
    user.verificationCodeExpires = null;
    await user.save();

    const token = createToken(user._id);

    return res.status(200).json({
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email,
        _id: user._id,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", details: err });
  }
};

module.exports = { verifyCodeAndLogin };