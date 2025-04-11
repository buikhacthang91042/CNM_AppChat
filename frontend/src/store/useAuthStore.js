import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast";

const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  isSendingOTP: false,
  tempSignupData: null,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        set({ authUser: null }); // Không có token, coi như chưa đăng nhập
        return;
      }

      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Lỗi kiểm tra auth:", error.message);
      set({ authUser: null });
      localStorage.removeItem("authToken"); // Xóa token nếu không hợp lệ
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  sendSignupOTP: async (phone, navigate) => {
    set({ isSendingOTP: true });
    try {
      const formattedPhone = `+84${phone.replace(/^0/, "")}`;
      const res = await axiosInstance.post("/auth/send-otp", { phone: formattedPhone });
      set((state) => ({
        tempSignupData: {
          ...state.tempSignupData,
          phone: formattedPhone,
        },
      }));
      toast.success(res.data.message || "Đã gửi OTP thành công");
      navigate("/verify-otp");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Không thể gửi OTP.";
      toast.error(errorMessage);
    } finally {
      set({ isSendingOTP: false });
    }
  },

  signup: async (data, navigate) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/verify-signup", data);
      // Kiểm tra và lưu token nếu có
      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);
        set({ authUser: res.data.user });
      } else {
        set({ authUser: null });
      }
      set({ tempSignupData: null });
      toast.success("Tài khoản đã được tạo thành công! Vui lòng đăng nhập để tiếp tục.");
      navigate("/login");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Không thể đăng ký.";
      toast.error(errorMessage);
    } finally {
      set({ isSigningUp: false });
    }
  },

  storeTempSignupData: (data) => {
    set({ tempSignupData: data });
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const formattedData = {
        ...data,
        phone: data.phone.startsWith("+") ? data.phone : `+84${data.phone.replace(/^0/, "")}`,
      };
      const res = await axiosInstance.post("/auth/login", formattedData);
      console.log("Login response:", res.data); // Debug phản hồi từ backend
      // Lưu token và cập nhật authUser
      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);
      } else {
        console.warn("Backend không trả về token!");
      }
      set({ authUser: res.data.user || res.data });
      toast.success("Đăng nhập thành công");
    } catch (error) {
      toast.error(error.response?.data?.message || "Đăng nhập thất bại");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("authToken");
      set({ authUser: null });
      toast.success("Đăng xuất thành công");
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi khi đăng xuất");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Cập nhật hồ sơ thành công");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Lỗi khi cập nhật hồ sơ";
      toast.error(errorMessage);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));

export default useAuthStore;