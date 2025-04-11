
const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');
const auth = require("../middleware/authMiddleware");

router.post('/send-request', auth, friendController.sendFriendRequest);
router.post('/cancel-request', auth, friendController.cancelFriendRequest);
router.get("/requests", auth, friendController.getFriendRequests);
router.post("/accept-request", auth, friendController.acceptFriendRequest);
router.get("/list", auth, friendController.getFriends);

module.exports = router;
