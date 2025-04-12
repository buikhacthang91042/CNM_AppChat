import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import VerifyOTPPage from "./pages/VerifyOTPPage"; // Thêm import
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Hiển thị loading khi đang kiểm tra trạng thái đăng nhập
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Routes>
        {/* Trang chính - yêu cầu đăng nhập */}
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        {/* Trang đăng ký - chỉ cho phép khi chưa đăng nhập */}
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        {/* Trang xác minh OTP - cho phép khi chưa đăng nhập */}
        <Route path="/verify-otp" element={!authUser ? <VerifyOTPPage /> : <Navigate to="/" />} />
        {/* Trang đăng nhập - chỉ cho phép khi chưa đăng nhập */}
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        {/* Trang cài đặt - yêu cầu đăng nhập */}
        <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
        {/* Trang hồ sơ - yêu cầu đăng nhập */}
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />

        <Route path="/forgot-password" element={!authUser ? <ForgotPasswordPage /> : <Navigate to="/" />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;