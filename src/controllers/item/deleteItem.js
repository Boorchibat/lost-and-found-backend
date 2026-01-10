const Item = require("../../schema/item");
const Claim = require("../../schema/claim");
const mongoose = require("mongoose");

const deleteItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ID is not valid" });
  }

  try {
    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    if (item.claims && item.claims.length > 0) {
      await Claim.deleteMany({ _id: { $in: item.claims } });
    }

    const deletedItem = await Item.findByIdAndDelete(id);

    res.status(200).json({
      message: "Item and all associated claims deleted successfully",
      item: deletedItem,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  deleteItem,
};
