const express = require("express");
const { signUp } = require("../controllers/user/signup");
const { signIn } = require("../controllers/user/signin");
const { updateUser } = require("../controllers/user/updateUser");
const { deleteUser } = require("../controllers/user/deleteUser");
const { getUser } = require("../controllers/user/getUser");

const router = express.Router();

router.post("/signup", signUp);

router.post("/signin", signIn);

router.put("/:id", updateUser);

router.get("/:id", getUser )

router.delete("/:id", deleteUser)

module.exports = router;
