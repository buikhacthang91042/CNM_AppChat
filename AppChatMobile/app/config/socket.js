import { Platform } from 'react-native';
import { io } from "socket.io-client";

const getServerURL = () => {
  if (Platform.OS === 'android') {
    return "http://10.0.2.2:3000"; // Android Emulator
  }
  return "http://192.168.1.11:3000"; // iOS device (dùng IP máy backend)
};

const socket = io(getServerURL(), {
  transports: ['websocket'], // tránh fallback gây lỗi
  forceNew: true,
});
socket.on("connect", () => {
  console.log("📡 Đã kết nối đến socket server với ID:", socket.id);
});

socket.on("connect_error", (err) => {
  console.log("❌ Lỗi kết nối socket:", err.message);
});

export default socket;
