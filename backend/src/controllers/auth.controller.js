const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const cloudinary = require('../config/cloudinary');
const generateToken = require('../config/utils');
const { client, serviceSid } = require('../config/twilio');

// 📌 1. Gửi OTP tới số điện thoại đăng ký
const sendSignupOTP = async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: "Thiếu số điện thoại!" });
  }

  try {
    await client.verify.v2.services(serviceSid)
      .verifications.create({ to: phone, channel: 'sms' });

    res.status(200).json({ success: true, message: "Đã gửi mã OTP." });
  } catch (err) {
    console.error("Lỗi gửi OTP:", err.message);
    res.status(500).json({ success: false, message: "Không thể gửi OTP." });
  }
};

// 📌 2. Xác minh OTP và tạo tài khoản
const verifyAndSignup = async (req, res) => {
  const { phone, code, name, email, password, dob, gender, avatar } = req.body;

  if (!phone || !code || !name || !email || !password) {
    return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
  }

  try {
    // ✅ Xác minh OTP
    const check = await client.verify.v2.services(serviceSid)
      .verificationChecks.create({ to: phone, code });

    if (check.status !== 'approved') {
      return res.status(400).json({ message: "OTP không hợp lệ hoặc đã hết hạn" });
    }

    // ✅ Kiểm tra tài khoản đã tồn tại
    const existingPhone = await User.findOne({ phone });
    const existingEmail = await User.findOne({ email });

    if (existingPhone || existingEmail) {
      return res.status(400).json({ message: "Email hoặc số điện thoại đã tồn tại" });
    }

    // ✅ Upload avatar nếu có
    let uploadedAvatar = "";
    if (avatar) {
      const uploadResponse = await cloudinary.uploader.upload(avatar);
      uploadedAvatar = uploadResponse.secure_url;
    }

    // ✅ Tạo tài khoản mới
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      avatar: uploadedAvatar,
      dob,
      gender,
    });

    // ✅ Sinh JWT và trả về dữ liệu
    const clientType = req.headers['x-client-type'] || 'mobile';
    const token = generateToken(newUser._id, res, clientType);

    const userData = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      avatar: newUser.avatar,
      dob: newUser.dob,
      gender: newUser.gender,
      createAt: newUser.createAt,
    };

    if (clientType === 'web') {
      return res.status(201).json({ message: "Đăng ký thành công (Web)", user: userData });
    } else {
      return res.status(201).json({ message: "Đăng ký thành công (Mobile)", token, user: userData });
    }

  } catch (err) {
    console.error("Lỗi xác minh và đăng ký:", err.message);
    return res.status(500).json({ message: "Lỗi máy chủ khi xác minh OTP và tạo tài khoản" });
  }
};

// 📌 Đăng nhập
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Vui lòng điền email và mật khẩu" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Email không tồn tại" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Mật khẩu không đúng" });

    const clientType = req.headers['x-client-type'] || 'mobile';
    const token = generateToken(user._id, res, clientType);

    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      dob: user.dob,
      gender: user.gender,
      createAt: user.createAt,
    };

    if (clientType === 'web') {
      res.status(200).json({ message: "Đăng nhập thành công (Web)", user: userData });
    } else {
      res.status(200).json({ message: "Đăng nhập thành công (Mobile)", token, user: userData });
    }

  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ khi đăng nhập" });
  }
};

// 📌 Đăng xuất (nếu dùng cookie cho web)
const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Đăng xuất thành công" });
};

// 📌 Cập nhật hồ sơ
const updateProfile = async (req, res) => {
  const user = req.user;
  const { name, phone, dob, gender, avatar } = req.body;

  try {
    if (phone && phone !== user.phone) {
      const existingPhone = await User.findOne({ phone });
      if (existingPhone) {
        return res.status(400).json({ message: "Số điện thoại đã tồn tại" });
      }
    }

    if (avatar) {
      const uploadResponse = await cloudinary.uploader.upload(avatar);
      user.avatar = uploadResponse.secure_url;
    }

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.dob = dob || user.dob;
    user.gender = gender || user.gender;

    await user.save();
    res.status(200).json({ message: "Cập nhật thành công", user });

  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ khi cập nhật hồ sơ" });
  }
};

// 📌 Kiểm tra người dùng đang đăng nhập
const checkAuth = async (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json({ message: "Không xác thực được người dùng" });

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    avatar: user.avatar,
    dob: user.dob,
    gender: user.gender,
    createAt: user.createAt,
  });
};

module.exports = {
  sendSignupOTP,
  verifyAndSignup,
  login,
  logout,
  updateProfile,
  checkAuth,
};
