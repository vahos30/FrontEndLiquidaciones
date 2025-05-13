import axios, { InternalAxiosRequestConfig } from "axios";
import { obtenerToken } from "./api";

const axiosLiquidations = axios.create({
  baseURL: `${import.meta.env.VITE_APP_BASE_URL_LIQUIDATION}`,  
  timeout: import.meta.env.VITE_APP_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": `${import.meta.env.VITE_APP_SUBSCRIPTION_KEY}`,
  },
});

axiosLiquidations.interceptors.request.use(
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

export default axiosLiquidations;
