const User = require("../../schema/user");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { createToken } = require("../../utils/createToken");

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID is not valid" });
  }

  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ message: "Please enter your username, password and email" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Please enter a valid email" });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 number and at least 1 special character",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "No user found with this email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        email,
        username,
        password: hashedPassword,
      },
      { new: true }
    );
    const token = createToken(updatedUser._id);

    return res.status(200).json({
      user: {
        email: updatedUser.email,
        username: updatedUser.username,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { updateUser };
