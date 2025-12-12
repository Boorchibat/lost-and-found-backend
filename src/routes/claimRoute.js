const express = require("express");
const router = express.Router();
const { createClaim } = require("../controllers/claim/createClaim");
const { deleteClaim } = require("../controllers/claim/deleteClaim");
const {getClaim} = require("../controllers/claim/getClaim")
const {getClaims} = require("../controllers/claim/getClaims")
const { authentication } = require("../middleware");

router.use(authentication)

router.post("/:itemId", createClaim);
router.delete("/:itemId/:claimId", deleteClaim);
router.get("/", getClaims);
router.get("/:itemId/:claimId", getClaim)

module.exports = router;
