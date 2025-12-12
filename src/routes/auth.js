const express = require("express");
const { signUp } = require("../controllers/user/signup");
const { signIn } = require("../controllers/user/signin");
const { verifyCode } = require("../controllers/user/vertify");
const { updateUser } = require("../controllers/user/updateUser");
const { deleteUser } = require("../controllers/user/deleteUser");

const router = express.Router();

router.post("/signup", signUp);

router.post("/signin", signIn);

router.post("/verify", verifyCode);

router.put("/:id", updateUser);

router.delete("/delete", deleteUser)

module.exports = router;
