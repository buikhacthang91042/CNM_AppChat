const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  const { name, phone, email, dob, gender, password } = req.body;

  try {
    let user = await User.findOne({ phone });
    if (user) {
      return res.status(400).json({ message: "Số điện thoại đã tồn tại" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      phone,
      email,
      gender,
      dob,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        dob: user.dob,
        gender: user.gender,
      },
    });
  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.login = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Số điện thoại chưa được đăng kí" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu không đúng" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        dob: user.dob,
        gender: user.gender,
        avatar:user.avatar
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.getInfor = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar:user.avatar,
      dob: user.dob,
      gender: user.gender,
    });
  } catch (error) {
    console.log("Lỗi: ", error.message);
    
    res.status(500).json({ message: "Server error" });
  }
};


exports.updateUserInfo = async(req, res) => {
  try {
    const {name, email, phone, dob, gender, avatar } = req.body;
    const userId = req.user._id;
    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (email !== undefined) updateFields.email = email;
    if (phone !== undefined) updateFields.phone = phone;
    if (dob !== undefined) updateFields.dob = dob;
    if (gender !== undefined) updateFields.gender = gender;
    if (avatar !== undefined) updateFields.avatar = avatar;
    const updateUser = await User.findByIdAndUpdate(
      userId,
      updateFields,
      {new: true}
    );
    if(!updateUser) {
      return res.status(404).json({ message: "Không tìm thấy người dùng." });
    }
    res.status(200).json(updateUser);
  } catch (error) {
    console.error("Lỗi cập nhật người dùng:", error.message);
    res.status(500).json({ message: "Đã xảy ra lỗi khi cập nhật người dùng." });
  }
}

exports.findByPhone = async (req, res) => {
  const { phone } = req.body;

  try {
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    return res.status(200).json({
      id: user._id,
      name: user.name,
      avatar: user.avatar,
      phone: user.phone,
      email: user.email,
      dob: user.dob,
      gender: user.gender,
    });
  } catch (error) {
    console.error("Lỗi tìm người dùng:", error.message);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
