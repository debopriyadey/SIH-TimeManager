const express = require("express");
const router = express.Router();
const roomController = require("../controllers/room");
const requireAuth = require("../middleware/requireAuth");

router.post("/create", requireAuth, roomController.createRoom);

module.exports = router;
