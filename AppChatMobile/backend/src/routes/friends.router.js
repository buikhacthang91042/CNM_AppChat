
const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');
const auth = require("../middleware/auth.middleware");

router.post('/send-request', auth, friendController.sendFriendRequest);
router.post('/cancel-request', auth, friendController.cancelFriendRequest);
router.get("/requests", auth, friendController.getFriendRequests);
router.post("/accept-request", auth, friendController.acceptFriendRequest);
router.get("/list", auth, friendController.getFriends);
router.get('/sent-requests', auth, friendController.getSentFriendRequests);
router.post('/reject-request', auth, friendController.rejectFriendRequest);
module.exports = router;
