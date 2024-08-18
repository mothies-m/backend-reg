const express = require('express')
const { login, register, verify } = require("../controllers/auth.controllers");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/login/verify", verify);

module.exports = router