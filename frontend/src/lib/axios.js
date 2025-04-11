import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // Giữ nguyên baseURL của bạn
  withCredentials: true, // Giữ để hỗ trợ cookie nếu backend dùng
  headers: {
    "Content-Type": "application/json",
    "x-client-type": "web", // Thêm header mà backend yêu cầu
  },
});

// Interceptor để thêm token vào header Authorization
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Lấy token từ localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Thêm token vào header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;