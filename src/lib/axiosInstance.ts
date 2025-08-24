import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { API_BASE_URL } from "./constants";
import useAuthStore from "@/store/AuthStore";

//메모리 보관용 CSRF 토큰
let CSRF_TOKEN_MEM: string | null = null;
export const setCsrfToken = (t: string | null) => {
  CSRF_TOKEN_MEM = t;
};
export const getCsrfToken = () => CSRF_TOKEN_MEM;

// 토큰 1회 발급(바디 { csrfToken } 권장)
export const fetchAndSetCsrfToken = async () => {
  const res = await axios.get(`${API_BASE_URL}/api/csrf-token`, {
    withCredentials: true,
  });
  setCsrfToken(res.data?.csrfToken ?? null);
  return res;
};

// 변이요청 전에 보장
export const ensureCsrfToken = async () => {
  if (!getCsrfToken()) {
    await fetchAndSetCsrfToken();
  }
};

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN", // 서버에서 내려주는 쿠키 이름
  xsrfHeaderName: "X-CSRF-Token", // 서버가 검사할 헤더 이름
  withXSRFToken: true,
});

const MUTATING = new Set(["POST", "PUT", "PATCH", "DELETE"]);

axiosInstance.interceptors.request.use(async (config) => {
  const method = (config.method || "GET").toUpperCase();

  // 1) 변이 요청이면 CSRF 토큰 보장
  if (MUTATING.has(method) && !getCsrfToken()) {
    try {
      await fetchAndSetCsrfToken();
    } catch {}
  }

  // 2) CSRF 헤더 부착
  const csrf = getCsrfToken();
  if (csrf) {
    config.headers = config.headers ?? {};
    config.headers["X-CSRF-Token"] = csrf;
  }

  // 3) Authorization 부착
  const at = useAuthStore.getState().accessToken;
  if (at) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${at}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError): Promise<AxiosResponse> => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
      _csrfRetry?: boolean; // CSRF 재시도 플래그
    };

    // A) CSRF 실패(403)면 1회 재발급 후 재시도
    if (error.response?.status === 403 && !originalRequest._csrfRetry) {
      originalRequest._csrfRetry = true;
      try {
        await fetchAndSetCsrfToken();
        return axiosInstance(originalRequest);
      } catch {
        // 재발급 실패 시엔 다음 분기로 넘어가거나 그대로 throw
      }
    }

    // B) 인증 실패(401)면 refresh 1회 시도 (AT 없으면 재시도 금지)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshRes = await axiosInstance.post<{ accessToken: string }>(
          "/api/auth/refresh",
          {}
        );
        const newToken = refreshRes.data.accessToken;
        if (!newToken) {
          await useAuthStore.getState().logout();
          throw error;
        }
        useAuthStore.getState().setAccessToken(newToken);

        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshErr) {
        await useAuthStore.getState().logout();
        throw refreshErr;
      }
    }

    throw error;
  }
);

export default axiosInstance;
