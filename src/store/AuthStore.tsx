import { AuthValues } from "@/components/LoginForm";

import { API_BASE_URL } from "@/lib/constants";
import axios from "axios";
import { create } from "zustand";

interface AuthStore {
  login: ({ email, password }: AuthValues) => Promise<string | undefined>;
  signup: ({ email, password, name, phoneNumber }: AuthValues) => Promise<void>;
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
  signup: async ({ email, password, name, phoneNumber }: AuthValues) => {
    await axios.post(`${API_BASE_URL}/api/auth/signup`, {
      email,
      password,
      name,
      phoneNumber,
    });
  },
  initializeAuth: async () => {
    // const token = localStorage.getItem("accessToken");
    // const userName = localStorage.getItem("userName");

    // if (token && userName) {
    //   set({ isLoggedIn: true, userName });
    // }
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
    } catch (err) {
      console.error("refresh 요청 실패", err);
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
