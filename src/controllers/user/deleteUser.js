const mongoose = require("mongoose");
const User = require("../../schema/user");
const Item = require("../../schema/item"); 

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID is not valid" });
  }
  try {
    await Item.deleteMany({ User: id });

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User and all their items deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { deleteUser };
