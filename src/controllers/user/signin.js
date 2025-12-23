const User = require("../../schema/user");
const bcrypt = require("bcrypt");
const { createToken } = require("../../utils/createToken");
const crypto = require("crypto");

const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please provide email and password" });
  }

  try {
    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "No user found with this email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    if (!user.isVerified) {
      const verificationCode = crypto.randomInt(100000, 1000000).toString();
      user.verificationCode = verificationCode;
      user.verificationCodeExpires = Date.now() + 10 * 60 * 1000; 
      await user.save()
    }
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { signIn };
