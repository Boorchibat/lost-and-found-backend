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
  "other"
];

const PHYSICAL_TYPES = [
  "Backpack",
  "Clothes",
  "Shoes",
  "Hat",
  "AirPods",
  "Laptop Charger",
  "Notebook",
  "other"
];

const itemSchema = new mongoose.Schema(
  {
    itemname: {
      type: String,
      required: true,
    },
    isFound: {
      type: String,
      enum: ["Found", "In progress"],
      required: true,
      default: "In progress",
    },
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mainImage: imageSchema,
    images: [imageSchema],
    description: {
      type: String,
      required: true,
    },
    color: [
      {
        type: String,
        enum: COLORS,
      },
    ],
    physical: [
      {
        type: String,
        enum: PHYSICAL_TYPES,
      },
    ],
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
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    claims: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Claim",
      },
    ],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    embedding: {
      type: [Number],
      default: [],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
