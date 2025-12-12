const Item = require("../../schema/item");


const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
    getItems,
}