const mongoose = require("mongoose");
const User = require("../../schema/user");

const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID is not valid" });
  }
  try {
    const deleteUser = User.findByIdAndDelete(id);
    if (!deleteUser) {
      res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "User deleted successfully"
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { deleteUser };
