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
    const res = await axios.post(
      `${API_BASE_URL}/api/auth/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    // const { accessToken: token, data: userName } = res.data;
    const token = res.data?.accessToken;
    const userName = res.data?.user?.name;

    // if (token && userName) {
    //   set({ isLoggedIn: true, userName });
    // }
    // return token;

    if (token) set({ accessToken: token, isLoggedIn: true });  
    if (userName) set({ userName });

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
        return;
      }

      const accessToken = res.data.accessToken;
      if (accessToken) {
        set({ accessToken, isLoggedIn: true });
      }

      const profileRes = await axiosInstance.get(
        `${API_BASE_URL}/api/users/me`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const userName = profileRes.data.name;
      set({ userName });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;

        if (axiosError.response?.status === 401) {
          set({ accessToken: null, isLoggedIn: false, userName: "" });
        } else if (
          axiosError.code === "ECONNREFUSED" ||
          axiosError.message === "Network Error"
        ) {
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
