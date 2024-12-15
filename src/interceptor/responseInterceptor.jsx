// responseInterceptor.jsx
import { toast } from "react-toastify";

export function setupResponseInterceptor(axiosInstance) {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        const status = error.response.status;

        if (status === 401 || status === 403) {
          window.location.href = "/login";
        } else {
          toast.error(`Error: ${status} - ${error.response.data}`);
        }
      } else if (error.request) {
        // window.location.href = '/login';
      } else {
        // window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
}