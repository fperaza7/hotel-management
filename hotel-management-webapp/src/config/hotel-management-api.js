import axios from "axios";

const hotelManagementApi = axios.create({
  baseURL: "http://localhost:8888/api", // TODO: Add env
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