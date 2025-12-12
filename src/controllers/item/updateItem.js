const Item = require("../../schema/item");
const mongoose = require("mongoose");

const updateItem = async (req, res) => {
  const {
    itemname,
    isFound,
    mainImage,
    images,
    description,
    location,
    contactNumber,
    contactEmail,
    name,
  } = req.body;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ID is not valid" });
  }

  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ error: "Item not Found" });
    }
    const updateItem = await Item.findByIdAndUpdate(
      id,
      {
        itemname: itemname || Item.itemname,
        isFound: isFound || Item.isFound,
        User: Item.User,
        mainImage: mainImage || Item.mainImage,
        images: images || Item.images,
        description: description || Item.description,
        location: location || Item.location,
        contactEmail: contactEmail || Item.contactEmail,
        contactNumber: contactNumber || Item.contactNumber,
        name: name || Item.name,
      },
      { new: true }
    );
    res.status(200).json(updateItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  updateItem,
};
