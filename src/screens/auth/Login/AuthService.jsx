import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = import.meta.env.VITE_BASE_URL;

console.log("API_URL:", API_URL);
console.log("BASE_URL:", BASE_URL);

class AuthService {
  async login(email, password) {
    try {
      const data = {
        email,
        password,
      };

      const response = await axios.post(`${API_URL}/auth/jwt/create/`, data);

      if (response.status !== 200) {
        toast.error("Please Login Again");
      }
      if (response.data) {
        const responseData = response.data;

        localStorage.setItem("token", responseData?.access);
        return responseData;
      }
    } catch (error) {
      if (error.response.data.detail) {
        toast.error(`${error.response.data.detail}`);
      }

    }
  }

}

export default new AuthService();