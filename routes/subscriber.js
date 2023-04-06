const express = require("express");
const router = express.Router();

var subscriberController = require("../controllers/subscriber");

// Указател към subscriber.
router.get("/", subscriberController.getSubscriberPage);

module.exports = router;