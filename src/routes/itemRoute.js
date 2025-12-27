const {
  getItems,
  createItem,
  deleteItem,
  updateItem,
  getItemsByUser,
} = require("../controllers/item");

const { approveItem, rejectItem } = require("../controllers/item/adminItem");

const express = require("express");
const { authentication } = require("../middleware");
const { isAdmin } = require("../middleware/isAdmin");
const { getItem } = require("../controllers/item/getItemById");

const router = express.Router();

router.get("/user/:userId", getItemsByUser);
router.get("/", getItems);
router.get("/:id", getItem);

router.post("/", authentication, createItem);
router.put("/:id", authentication, updateItem);
router.delete("/:id", authentication, deleteItem);

router.put("/admin/approve/:id", authentication, isAdmin, approveItem);
router.put("/admin/reject/:id", authentication, isAdmin, rejectItem);

module.exports = router;
