const User = require("../schema/user");

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Admin access only: Insufficient role." });
    }

    next();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Admin check failed due to server error." });
  }
};

module.exports = { isAdmin };
