import axiosInstance from "@/lib/axiosInstance";
import { API_BASE_URL } from "@/lib/constants";
import { AuthValues } from "@/types/auth";
import axios, { AxiosError } from "axios";
import { create } from "zustand";

interface AuthStore {
  login: ({ email, password }: AuthValues) => Promise<string | undefined>;
  signup: ({ email, password, name }: AuthValues) => Promise<void>;
  initializeAuth: () => Promise<void>;

  accessToken: string | null;
  isLoggedIn: boolean;
  userName: string | null;

  setAuth: (token: string, userName: string) => void;
  setAccessToken: (token: string) => void;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  userName: null,
  accessToken: null,

  setAuth: (token, userName) => {
    console.log("[setAuth] setting accessToken + userName", {
      token,
      userName,
    });
    set({ accessToken: token, isLoggedIn: true, userName });
  },

  login: async ({ email, password }: AuthValues) => {
    console.log("[login] 요청 시작", { email, password });
    const res = await axios.post(
      `${API_BASE_URL}/api/auth/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    console.log("[login] 응답", res.data);

    const token = res.data?.accessToken as string | undefined;
    const userName = (res.data?.user?.name as string) ?? null;

    if (token) {
      console.log("[login] 로그인 성공 → 상태 업데이트", { token, userName });
      set({ accessToken: token, isLoggedIn: true, userName });
    } else {
      console.warn("[login] accessToken 없음");
    }

    return token;
  },

  signup: async ({ email, password, name }: AuthValues) => {
    console.log("[signup] 요청 시작", { email, password, name });
    await axios.post(`${API_BASE_URL}/api/auth/signup`, {
      email,
      password,
      name,
    });
    console.log("[signup] 완료");
  },

  initializeAuth: async () => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/auth/refresh`,
        {},
        { withCredentials: true }
      );

      console.log("[initializeAuth] refresh 응답", res.status, res.data);

      if (res.status === 204) {
        console.log("[initializeAuth] refreshToken 없음 → 로그아웃 처리");
        // set({ accessToken: null, isLoggedIn: false, userName: null });
        return;
      }

      const accessToken = res.data.accessToken as string | undefined;
      if (!accessToken) {
        console.log("[initializeAuth] accessToken 없음");
        set({ accessToken, isLoggedIn: false, userName: null });
        return;
      }
      console.log("[initializeAuth] accessToken 재발급 성공", accessToken);

      set({ accessToken, isLoggedIn: true });

      const profileRes = await axiosInstance.get(
        `${API_BASE_URL}/api/users/me`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const userName = (profileRes.data.name as string) ?? null;

      set({ userName });
      // set((prev) => {
      //   console.log("[initializeAuth] 상태 업데이트", {
      //     accessToken,
      //     prevUserName: prev.userName,
      //   });
      //   return {
      //     accessToken,
      //     isLoggedIn: true,
      //     userName: prev.userName, // 이전 값 유지
      //   };
      // });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;

        if (axiosError.response?.status === 401) {
          set({ accessToken: null, isLoggedIn: false, userName: null });
        } else if (
          axiosError.code === "ECONNREFUSED" ||
          axiosError.message === "Network Error"
        ) {
          set({ accessToken: null, isLoggedIn: false, userName: null });
        } else {
          console.error("refresh 요청 실패", axiosError);
          set({ accessToken: null, isLoggedIn: false, userName: null });
        }
      } else {
        console.error("알 수 없는 오류", err);
        set({ accessToken: null, isLoggedIn: false, userName: null });
      }
    }
  },

  setAccessToken: (token) => {
    console.log("[setAccessToken] accessToken 설정", token);
    set({ accessToken: token, isLoggedIn: true });
  },

  logout: async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("로그아웃 API 실패", err);
    }
    set({ accessToken: null, userName: null, isLoggedIn: false });
  },
}));

export default useAuthStore;
