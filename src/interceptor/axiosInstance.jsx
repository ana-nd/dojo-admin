// axiosInstance.jsx
import axios from "axios";
import { setupRequestInterceptor } from "./requestInterceptor";
import { setupResponseInterceptor } from "./responseInterceptor";

const API_URL = import.meta.env.VITE_API_URL;
// Create a new Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL, 
  timeout: 5000, 
});

setupRequestInterceptor(axiosInstance);

setupResponseInterceptor(axiosInstance);

export default axiosInstance;