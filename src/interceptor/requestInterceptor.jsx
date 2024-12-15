// requestInterceptor.jsx
export function setupRequestInterceptor(axiosInstance) {
    axiosInstance.interceptors.request.use(
      (config) => {
        // Add JWT token from local storage to the request headers
        const token = localStorage.getItem("token"); // Replace with your token key
        if (token) {
          config.headers["Authorization"] = `JWT ${token}`;
          config.headers["content-type"] = "multipart/form-data";
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }