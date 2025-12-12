const Claim = require("../../schema/claim");


const getClaims = async (req, res) => {
  try {
    const claims = await Claim.find();
    return res.status(200).json(claims);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
    getClaims,
}