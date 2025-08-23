import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "./constants";
import useAuthStore from "@/store/AuthStore";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN", // 서버에서 내려주는 쿠키 이름
  xsrfHeaderName: "X-CSRF-Token", // 서버가 검사할 헤더 이름
  withXSRFToken: true,
});

// 인증이 필요한 요청 시 액세스토큰 자동 삽입
axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터로 액세스토큰 만료 시 재발급
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshRes = await axiosInstance.post("/api/auth/refresh", {});
        const newToken = refreshRes.data.accessToken;

        useAuthStore.getState().setAccessToken(newToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }

        return axiosInstance(originalRequest);
      } catch (refreshErr) {
        useAuthStore.getState().logout();
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
