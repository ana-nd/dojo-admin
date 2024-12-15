import { toast } from "react-toastify";
import axiosInstance from "../../../interceptor/axiosInstance";
class AuthService {
  async login(email, password) {
    try {
      const data = {
        email,
        password,
      };

      const response = await axiosInstance.post(`/auth/jwt/create/`, data);

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