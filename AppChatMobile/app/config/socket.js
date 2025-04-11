// socket.js
import { io } from "socket.io-client";

const socket = io("http://192.168.1.11:5000", {
  transports: ["websocket"],
});

export default socket;
