const Claim = require("../../schema/claim");
const Item = require("../../schema/item");
const mongoose = require("mongoose");

const getClaim = async (req, res) => {
  try {
    const { itemId, claimId } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(itemId) ||
      !mongoose.Types.ObjectId.isValid(claimId)
    ) {
      return res.status(400).json({ message: "Invalid item or claim ID." });
    }

    const claim = await Claim.findById(claimId);
    return res.json(claim);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};
module.exports = { getClaim };
