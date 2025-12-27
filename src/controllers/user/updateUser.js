const User = require("../../schema/user");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { createToken } = require("../../utils/createToken");

const DEFAULT_PROFILE_IMAGE = {
  url: "./user.svg",
  public_id: "defaults/profile/guest",
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const { username, password, profileImage, name, number, email, role } =
    req.body;

  if (!username || !email || !name || !number || !role) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  try {
    const updateData = {
      username,
      email,
      name,
      number,
      role,
      profileImage:
        profileImage?.url && profileImage?.public_id
          ? profileImage
          : DEFAULT_PROFILE_IMAGE,
    };

    if (password) {
      if (!validator.isStrongPassword(password)) {
        return res.status(400).json({
          message:
            "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
        });
      }

      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = createToken(updatedUser._id);

    return res.status(200).json({
      user: {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        name: updatedUser.name,
        number: updatedUser.number,
        role: updatedUser.role,
        profileImage: updatedUser.profileImage,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { updateUser };
