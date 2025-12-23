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

router.use(authentication);

router.get("/user/:userId", getItemsByUser);
router.get("/", getItems);
router.get("/:id", getItem);
router.post("/", createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

router.put("/admin/approve/:id", isAdmin, approveItem);
router.put("/admin/reject/:id", isAdmin, rejectItem);

module.exports = router;
