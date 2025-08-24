import axiosInstance, { ensureCsrfToken } from "@/lib/axiosInstance";
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
    set({ accessToken: token, isLoggedIn: true, userName });
  },

  login: async ({ email, password }: AuthValues) => {
    await ensureCsrfToken()
    const res = await axiosInstance.post("/api/auth/login", {
      email,
      password,
    });

    const token = res.data?.accessToken as string | undefined;
    const userName = (res.data?.user?.name as string) ?? null;

    if (token) {
      set({ accessToken: token, isLoggedIn: true, userName });
    } else {
      console.warn("[login] accessToken 없음");
    }

    return token;
  },

  signup: async ({ email, password, name }: AuthValues) => {
    await ensureCsrfToken()
    await axiosInstance.post("/api/auth/signup", {
      email,
      password,
      name,
    });
  },

  initializeAuth: async () => {
    try {
      const res = await axiosInstance.post("/api/auth/refresh", {});

      if (res.status === 204) {
        return;
      }

      const accessToken = res.data.accessToken as string | undefined;
      if (!accessToken) {
        set({ accessToken, isLoggedIn: false, userName: null });
        return;
      }

      set({ accessToken, isLoggedIn: true });

      const profileRes = await axiosInstance.get("/api/users/me");

      const userName = (profileRes.data.name as string) ?? null;

      set({ userName });
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
    set({ accessToken: token, isLoggedIn: true });
  },

  logout: async () => {
    await ensureCsrfToken()
    try {
      await axiosInstance.post("/api/auth/logout", {});
    } catch (err) {
      console.error("로그아웃 API 실패", err);
    }
    set({ accessToken: null, userName: null, isLoggedIn: false });
  },
}));

export default useAuthStore;
