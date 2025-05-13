import axios, { InternalAxiosRequestConfig } from "axios";
import { obtenerToken } from "./api";

const axiosContract = axios.create({
  baseURL: `${import.meta.env.VITE_APP_BASE_URL_CONTRACT}`,  
  timeout: import.meta.env.VITE_APP_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": `${import.meta.env.VITE_APP_SUBSCRIPTION_KEY}`,
  },
});

axiosContract.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    config.headers = config.headers || {};
    if (!config.headers?.Authorization) {
      const token = await obtenerToken();

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosContract;
