const express = require("express");
const { signUp } = require("../controllers/user/signup");
const { signIn } = require("../controllers/user/signin");
const { updateUser } = require("../controllers/user/updateUser");
const { deleteUser } = require("../controllers/user/deleteUser");
const { getUser } = require("../controllers/user/getUser");
const { authentication } = require("../middleware");

const router = express.Router();

router.post("/signup", authentication, signUp);

router.post("/signin", authentication, signIn);

router.put("/:id", authentication, updateUser);

router.get("/:id", getUser);

router.delete("/:id", authentication, deleteUser);

module.exports = router;
