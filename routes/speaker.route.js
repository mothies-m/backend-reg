const express = require('express');
const getSpeaker = require('../controllers/speaker.controllers');

const router = express.Router()

router.post("/getSpeaker", getSpeaker);

module.exports = router;