import CheckableTag from "antd/es/tag/CheckableTag";
import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";

// Lấy token từ localStorage
const token = localStorage.getItem("token");
// Kiểm tra và lấy giá trị isAuthenticated từ token
const isAuthenticated = token ? JSON.parse(token).user.role === "admin" : false;
console.log(isAuthenticated);
interface ProtectedRouteProps {
  children: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Kiểm tra isAuthenticated để quyết định có cho phép truy cập hay điều hướng đến trang đăng nhập
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  // Nếu đã xác thực, render children (các component con)
  return children;
};

export default ProtectedRoute;
