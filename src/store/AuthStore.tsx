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
}

const useAuthStore = create<AuthStore>((set, get) => ({
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

 const {accessToken: token, data: userName} = res.data;

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
  initializeAuth: () => {
    const token = localStorage.getItem("accessToken");
    const userName = localStorage.getItem("userName");
    
    if (token && userName) {
      set({ isLoggedIn: true, userName });
    }
  },
}));

export default useAuthStore;

