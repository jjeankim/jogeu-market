import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "./constants";
import useAuthStore from "@/store/AuthStore";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

// 인증이 필요한 요청 시 액세스토큰 자동 삽입
axiosInstance.interceptors.request.use(config => {
  const token = useAuthStore.getState().accessToken;
  if(token) {
    config.headers.Authorization = `Baerer ${token}`
  }
  return config
})

// 응답 인터셉터로 액세스토큰 만료 시 재발급
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // accessToken 만료 (401) && 아직 재시도 안 했으면
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          `${API_BASE_URL}/api/auth/refresh`,
          {},
          { withCredentials: true }
        );
        const newAccessToken = res.data.accessToken;

        // zustand 상태 갱신
        useAuthStore.getState().setAccessToken(newAccessToken);

        // 원래 요청 헤더에 토큰 다시 셋팅
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        // 원래 요청 재시도
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // refresh 실패 → 강제 로그아웃
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance