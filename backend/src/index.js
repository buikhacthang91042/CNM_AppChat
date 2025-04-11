const express = require('express');
const authRoutes = require('./routes/auth.route');
const messageRoutes = require('./routes/message.route');
// ❌ Xoá vì không cần nữa:
// const otpRoutes = require("./routes/otp.route");

const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { connectDB } = require('./config/database');

const PORT = 3000;
const app = express();

dotenv.config();

// 🍪 Parse cookie từ request
app.use(cookieParser());

// 🌐 Cho phép gọi API từ client frontend
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// 📦 Xử lý dữ liệu JSON và ảnh base64 có kích thước lớn
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// 🚀 Đăng ký các route
app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);
// ❌ Không cần route OTP nữa
// app.use('/api/otp', otpRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
    connectDB();
});
