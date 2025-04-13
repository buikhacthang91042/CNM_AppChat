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
  tempResetToken: null,

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

  // 📌 Gửi OTP cho forgot password
  sendForgotOTP: async (phone) => {
    set({ isSendingOTP: true });
    try {
      const res = await axiosInstance.post("/auth/send-forgot-otp", { phone }); // Không format lại
      toast.success(res.data.message || "Đã gửi OTP quên mật khẩu");
    } catch (error) {
      console.error("Lỗi gửi OTP: ", error);
      toast.error(error.response?.data?.message || "Không thể gửi OTP");
    } finally {
      set({ isSendingOTP: false });
    }
  },
  
  
  

  // 📌 Xác minh OTP để nhận reset token
  verifyForgotOTP: async (phone, code) => {
    try {
      const res = await axiosInstance.post("/auth/verify-otp", { phone, code });
      set({ tempResetToken: res.data.resetToken  }); // lưu resetToken tạm
      toast.success("OTP hợp lệ. Nhập mật khẩu mới.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Xác minh OTP thất bại");
    }
  },

  // 📌 Đổi mật khẩu mới
  resetPassword: async (newPassword, confirmPassword, navigate) => {
    try {
      if (newPassword !== confirmPassword) {
        toast.error("Mật khẩu xác nhận không khớp");
        return;
      }

      const { tempResetToken } = useAuthStore.getState(); // lấy resetToken
      console.log("Sending reset with token:", tempResetToken);

      if (!tempResetToken) {
        toast.error("Thiếu token reset");
        return;
      }

      await axiosInstance.post("/auth/reset-password", {
        resetToken: tempResetToken,
        newPassword,
      });

      toast.success("Đổi mật khẩu thành công. Hãy đăng nhập lại.");
      set({ tempResetToken: null });
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi khi đổi mật khẩu");
    }
  },
  //doi mat khau trong profile
  changePassword: async ({ currentPassword, newPassword, confirmPassword }) => {
    try {
      const response = await axiosInstance.put('/auth/change-password', {
        currentPassword,
        newPassword,
        confirmPassword,
      });

      if (response.status === 200) {
        return { success: true, message: response.data.message || "Mật khẩu đã được thay đổi thành công!" };
      } else {
        return { success: false, message: response.data.message || "Đổi mật khẩu thất bại" };
      }
    } catch (error) {
      console.error("Change password failed:", error);
      return { success: false, message: error.response?.data?.message || "Lỗi hệ thống" };
    }
  },
}));

export default useAuthStore;