const express = require("express");
const { authentication } = require("../middleware");
const { isAdmin } = require("../middleware/isAdmin");

const { approveItem, rejectItem } = require("../controllers/item/adminItem");

const router = express.Router();

router.use(authentication);

router.put("/admin/approve/:id", isAdmin, approveItem);
router.put("/admin/reject/:id", isAdmin, rejectItem);

module.exports = router;
