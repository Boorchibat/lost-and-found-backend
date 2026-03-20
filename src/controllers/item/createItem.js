const Item = require("../../schema/item");
const {getEmbedding} = require("../../services/openai")

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

const createItem = async (req, res) => {
  const {
    itemname,
    isFound,
    User,
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

  if (
    !itemname ||
    isFound === undefined ||
    !User ||
    !mainImage ||
    !images ||
    !description ||
    !location ||
    !contactEmail ||
    !name ||
    !contactNumber
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const validColors = Array.isArray(color)
    ? color.filter((c) => COLORS.includes(c))
    : [];
  const validPhysical = Array.isArray(physical)
    ? physical.filter((p) => PHYSICAL_TYPES.includes(p))
    : [];



  try {
   const textToEmbed = `${itemname}. ${description}. Color: ${validColors.join(", ")}. Physical: ${validPhysical.join(", ")}`;
    const textEmbedding = await getEmbedding(textToEmbed);
    const item = await Item.create({
      itemname,
      isFound,
      User,
      mainImage,
      images,
      description,
      location,
      contactNumber,
      contactEmail,
      name,
      color: validColors,
      physical: validPhysical,
      embedding: textEmbedding,
    });

    return res.status(201).json(item);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createItem,
};
