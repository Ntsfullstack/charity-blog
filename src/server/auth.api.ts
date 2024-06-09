import axios from "axios";

// Lấy token từ local storage hoặc môi trường khác phù hợp
const storedToken = localStorage.getItem("token");
const token = storedToken ? JSON.parse(storedToken)?.token : null;


// Tạo một instance của Axios
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/", // Thay thế bằng URL gốc của API của bạn
});

// Intercept yêu cầu
axiosInstance.interceptors.request.use(
  (config) => {
    // Đặt header Authorization với token truy cập
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Xử lý lỗi yêu cầu
    return Promise.reject(error);
  }
);

// Intercept phản hồi
axiosInstance.interceptors.response.use(
  (response) => {
    // Xử lý phản hồi thành công
    return response.data;
  },
  (error) => {
    // Xử lý lỗi phản hồi
    return Promise.reject(error);
  }
);

export default axiosInstance;
