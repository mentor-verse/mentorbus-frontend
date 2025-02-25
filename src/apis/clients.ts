import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import store, { RootState } from "@/store";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  requireAuth?: boolean;
}

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(
  (config: CustomInternalAxiosRequestConfig) => {
    if (config.requireAuth) {
      const state = store.getState() as unknown as RootState;
      const accessToken = state.accessToken;
      if (accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const clientAuth = <T>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return client({
    ...config,
    requireAuth: true,
  } as CustomInternalAxiosRequestConfig);
};
