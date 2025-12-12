const Item = require("../../schema/item");

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

  try {
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
    });

    return res.status(201).json(item);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createItem,
};
