import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8888";
const hotelManagementApi = axios.create({
  baseURL: `${baseURL}/api`,
  timeout: 5000,
});

hotelManagementApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default hotelManagementApi;