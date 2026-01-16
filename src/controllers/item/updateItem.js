const Item = require("../../schema/item");
const mongoose = require("mongoose");

const COLORS = [
  "Red",
  "Blue",
  "Yellow",
  "Green",
  "Black",
  "White",
  "Gray",
  "Orange",
  "Purple",
  "Pink",
  "Brown",
];

const PHYSICAL_TYPES = [
  "Backpack",
  "Clothes",
  "Shoes",
  "Hat",
  "AirPods",
  "Laptop Charger",
  "Notebook",
];

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
    color,
    physical,
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

    const validColors = Array.isArray(color)
      ? color.filter((c) => COLORS.includes(c))
      : item.color;
    const validPhysical = Array.isArray(physical)
      ? physical.filter((p) => PHYSICAL_TYPES.includes(p))
      : item.physical;

    const updatedItem = await Item.findByIdAndUpdate(
      id,
      {
        itemname: itemname || item.itemname,
        isFound: isFound || item.isFound,
        mainImage: mainImage || item.mainImage,
        images: images || item.images,
        description: description || item.description,
        location: location || item.location,
        contactEmail: contactEmail || item.contactEmail,
        contactNumber: contactNumber || item.contactNumber,
        name: name || item.name,
        color: validColors,
        physical: validPhysical,
      },
      { new: true }
    );

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  updateItem,
};
