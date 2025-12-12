const Item = require("../../schema/item");

const approveItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    res.json({ message: "Item approved", item });
  } catch (err) {
    res.status(400).json({ message: "Error approving item" });
  }
};

const rejectItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.status === "rejected" || true) {
      await Item.findByIdAndDelete(req.params.id);
      return res.json({ message: "Item rejected and deleted" });
    }
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error rejecting item", error: err.message });
  }
};

module.exports = { approveItem, rejectItem };
