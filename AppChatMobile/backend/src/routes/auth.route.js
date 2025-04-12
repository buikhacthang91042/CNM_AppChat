const express = require('express');
const {
  login,
  logout,
  sendSignupOTP,
  verifyAndSignup,
  updateProfile,
  checkAuth,
  findByPhone
} = require('../controllers/auth.controller');

const protectRoute = require('../middleware/auth.middleware');

const router = express.Router();

// 📌 Gửi mã OTP đến số điện thoại
router.post('/send-otp', sendSignupOTP);

// 📌 Xác minh OTP và tạo tài khoản
router.post('/verify-signup', verifyAndSignup);

// 📌 Đăng nhập
router.post('/login', login);

// 📌 Đăng xuất
router.post('/logout', logout);

// 📌 Cập nhật hồ sơ (avatar, info,...)
router.put('/update-profile', protectRoute, updateProfile);

// 📌 Kiểm tra xác thực người dùng
router.get('/check', protectRoute, checkAuth);
router.post("/find-user-by-phone", protectRoute, findByPhone);

module.exports = router;
