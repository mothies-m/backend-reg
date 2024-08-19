const express = require("express");
const { speakers, booking } = require("../controllers/user.controlller");

const router = express.Router();

router.get("/speakers", speakers);
router.post("/booking", booking);

module.exports = router;
