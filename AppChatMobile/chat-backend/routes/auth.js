const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get('/me', auth,authController.getInfor);
router.put("/me/update", auth, authController.updateUserInfo);
router.post("/find-user-by-phone", auth, authController.findByPhone);
module.exports = router;
