const Item = require("../../schema/item");
const mongoose = require("mongoose");

 const deleteItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ID is not valid" });
  }

  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ error: "Item not Found" });
    }
    const deleteItem = await Item.findByIdAndDelete(id);
    res.status(200).json(deleteItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    deleteItem
}