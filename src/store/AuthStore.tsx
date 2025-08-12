import axiosInstance from "@/lib/axiosInstance";

import { API_BASE_URL } from "@/lib/constants";
import { AuthValues } from "@/types/auth";
import axios, { AxiosError } from "axios";
import { create } from "zustand";

interface AuthStore {
  login: ({ email, password }: AuthValues) => Promise<string | undefined>;
  signup: ({ email, password, name }: AuthValues) => Promise<void>;
  isLoggedIn: boolean;
  userName: string;
  initializeAuth: () => void;

  accessToken: string | null;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  userName: "",
  login: async ({ email, password }: AuthValues) => {
    // console.log("로그인 시도", email, password);

    const res = await axios.post(
      `${API_BASE_URL}/api/auth/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    console.log("백엔드 응답:", res.data); // 디버깅용

    const { accessToken: token, data: userName } = res.data;

    if (token && userName) {
      localStorage.setItem("accessToken", token);
      localStorage.setItem("userName", userName); // 로컬스토리지에 유저 이름 저장

      set({ isLoggedIn: true, userName });
    }
    return token;
  },
  signup: async ({ email, password, name }: AuthValues) => {
    await axios.post(`${API_BASE_URL}/api/auth/signup`, {
      email,
      password,
      name,
    });
  },
  initializeAuth: async () => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/auth/refresh`,
        {},
        { withCredentials: true }
      );

      if (res.status === 204) {
        console.log("refreshToken 없음 → 로그인 상태 아님");
        return;
      }

      const accessToken = res.data.accessToken;
      if (accessToken) {
        set({ accessToken, isLoggedIn: true });
        console.log("재발급 성공", accessToken);
      }

      const profileRes = await axiosInstance.get(
        `${API_BASE_URL}/api/users/me`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const userName = profileRes.data.name;
      set({ userName });
      console.log(userName);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;

        if (axiosError.response?.status === 401) {
          console.log("refresh token이 없거나 만료됨 - 로그인이 필요합니다");
          set({ accessToken: null, isLoggedIn: false, userName: "" });
        } else if (
          axiosError.code === "ECONNREFUSED" ||
          axiosError.message === "Network Error"
        ) {
          console.log(
            "백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요."
          );
          set({ accessToken: null, isLoggedIn: false, userName: "" });
        } else {
          console.error("refresh 요청 실패", axiosError);
          set({ accessToken: null, isLoggedIn: false, userName: "" });
        }
      } else {
        console.error("알 수 없는 오류", err);
        set({ accessToken: null, isLoggedIn: false, userName: "" });
      }
    }
  },

  accessToken: null,
  setAccessToken: (token) => {
    console.log("[setAccessToken]", token);
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
    set({ accessToken: null, userName: "", isLoggedIn: false });
  },
}));

export default useAuthStore;
