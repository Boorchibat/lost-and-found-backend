const Item = require("../../schema/item");
const mongoose = require("mongoose");

const getItemsByUser = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const items = await Item.find({ User: userId })
      .populate("User", "username email") 
      .populate("claims"); 

    if (!items || items.length === 0) {
      return res.status(200).json({ message: "No items found for this user" });
    }

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getItemsByUser,
};
