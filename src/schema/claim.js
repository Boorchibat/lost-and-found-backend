const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Claim: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Number: {
      type: String,
      required: true,
    },
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Claim", claimSchema);
