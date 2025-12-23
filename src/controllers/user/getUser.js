const User = require("../../schema/user");
const mongoose = require("mongoose");

 const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ID is not valid" });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(201).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    getUser
}