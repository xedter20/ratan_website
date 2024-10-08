import { useMemo } from "react";
import axios from "axios";

const useAxiosSecure = () => {
  const axiosSecure = useMemo(() => {

    let baseURL = `${import.meta.env.VITE_REACT_APP_API_END_POINT}/api`;

    const instance = axios.create({
      baseURL: baseURL
    });

    instance.interceptors.request.use((config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response) {
          const { status } = error.response;
          // console.log(`API Error Status: ${status}`);

          if (status === 401 || status === 403) {
            // console.log("Logging out due to unauthorized access.");
          }
        }
        return Promise.reject(error);
      },
    );

    return instance;
  }, []);

  return { axiosSecure };
};

export default useAxiosSecure;
