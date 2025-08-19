import React, {  createContext, useContext, useState } from "react";

//tạo kho chứa thông tin xác thực người dùng
const AuthContext = createContext();

//tạo hook lấy thông tin từ kho
export const useAuth = () => {
  return useContext(AuthContext);
};

//tạo người qly kho
export const AuthProvider = ({ children }) => {
  //lưu thông tin user
  const [user, setUser] = useState(null); //null: chưa đăng nhập

  //hàm đăng nhập
  const login = async (username, password) => {
    try {
      //gọi api đăng nhập
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      //
      const data = await response.json();
      if (response.ok) {
        //đăng nhập thành công
        setUser(data.user); //lưu thông tin user vào kho
        return { success: true };
      } else {
        //đăng nhập thất bại
        return {
          success: false,
          message: data.message || "Đăng nhập thất bại",
        };
      }
    } catch (error) {
      return { success: false, error: "Lỗi kết nối" };
    }
  };

  //hàm dăng xuất
  const logout = () => {
    setUser(null); //xóa thông tin user khỏi kho
  };
  //cập nhât
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
