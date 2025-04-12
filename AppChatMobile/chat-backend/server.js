const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const friendRoutes = require('./routes/friends');
dotenv.config()
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/friends', friendRoutes);


const server = http.createServer(app);

const io = socketio(server, {
    cors: {
        origin:'*',
        method: ['GET', 'POST'],
    }
});

connectDB();

app.get('/', (req,res) => {
    res.send("API đang chạy");
});

const onlineUsers = new Map();
io.on('connection', (socket) => {
    console.log("Có người đăng nhập mới: " + socket.id);
    socket.on("test-client", (data) => {
        console.log("📨 Nhận từ client test-client:", data);
        socket.emit("test-server", { message: "Server nhận được!", original: data });
    });
    socket.on("register", (userId) => {
        onlineUsers.set(userId, socket.id);
        console.log("📥 Nhận được register:", userId);
        console.log(`📌 Đã lưu user ${userId} với socket ${socket.id}`);
        console.log("🗺️ Danh sách onlineUsers:", [...onlineUsers.entries()]);
      });
      
    socket.on('disconnect', () => {
       
        console.log('Người dùng đã ngắt kết nối: ' + socket.id);
        
    });
    
});
app.set('io', io); 
app.set('onlineUsers', onlineUsers);

const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0',() => {
    console.log(`Server running on port ${PORT}`);
    
})