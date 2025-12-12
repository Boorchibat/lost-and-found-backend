const Item = require("../../schema/item");
const mongoose = require("mongoose");
const Claim = require("../../schema/claim")
const createClaim = async (req, res) => {
  try {
    const { itemId, Name, claimText, Email, Number, userId } = req.body;

    if (!itemId || !Name || !claimText || !Email || !Number || !userId) {
      return res.status(400).json({
        message: "All slots are required.",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Invalid Item ID." });
    }
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found." });
    }
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated." });
    }
    const newClaim = await Claim.create({
      Name,
      Claim: claimText,
      Email,
      Number,
      User: userId,
    });
    item.claims.push(newClaim._id);
    await item.save();

    return res.status(201).json({
      message: "Claim submitted successfully!",
      claim: newClaim,
      item,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { createClaim };
