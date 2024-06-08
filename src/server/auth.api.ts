import axios from "axios";

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/", // Replace with your API base URL
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Set the Authorization header with the access token
    config.headers["Authorization"] = `Bearer YOUR_ACCESS_TOKEN`; // Replace YOUR_ACCESS_TOKEN with your actual token
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful response
    return response.data;
  },
  (error) => {
    // Handle response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
