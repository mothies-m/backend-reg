const express = require('express')
const router = express.Router()

const authRoutes = require('./auth.route');
const userRoutes = require("./user.route");
const speakerRoutes = require('./speaker.route');

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/speaker", speakerRoutes);

module.exports = router;