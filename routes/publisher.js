const express = require("express");
const router = express.Router();

var publisherController = require("../controllers/publisher");

// Указател към publisher.
router.get("/", publisherController.getPublisherPage);

router.post("/", publisherController.publishMQTTMessage);

module.exports = router;