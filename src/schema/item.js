const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
});

const itemSchema = new mongoose.Schema(
  {
    itemname: {
      type: String,
      required: true,
    },
    isFound: {
      type: String,
      enum: ["Found", "In progress"],
    },
    mainImage: imageSchema,
    images: [imageSchema],
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    contactEmail: {
        type: String,
        required: true
    },
    name: {
        type: String,
        requied: true,
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("itemSchema", itemSchema)
