const Claim = require("../../schema/claim");
const Item = require("../../schema/item");
const mongoose = require("mongoose");

const deleteClaim = async (req, res) => {
  try {
    const { itemId, claimId } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(itemId) ||
      !mongoose.Types.ObjectId.isValid(claimId)
    ) {
      return res.status(400).json({ message: "Invalid item or claim ID." });
    }

    const claim = await Claim.findById(claimId);
    if (!claim) return res.status(404).json({ message: "Claim not found." });

    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ message: "Item not found." });

    item.claims = item.claims.filter((id) => id.toString() !== claimId);
    await item.save();
    await claim.remove();

  
    const deleteClaim = Item.findByIdAndDelete(claimId)
     return res.json(deleteClaim);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};
module.exports = { deleteClaim };
