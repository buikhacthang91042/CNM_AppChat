const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat.controller");
const authMiddleware = require("../middleware/auth.middleware");
const multer = require('multer');
// Cấu hình multer để lưu tệp tạm thời
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, 
});

router.post("/send", authMiddleware, chatController.sendMessage);
router.get("/messages/:chatId", authMiddleware, chatController.getMessages);
router.get("/list", authMiddleware, chatController.getChatList);
router.post("/mark-read", authMiddleware, chatController.markAsRead);
router.post("/test-emoji", authMiddleware, chatController.testEmojiStorage);
router.post('/recall', authMiddleware, chatController.recallMessage);
router.post('/send-file',authMiddleware, upload.single('file'), chatController.sendFile);
module.exports = router;