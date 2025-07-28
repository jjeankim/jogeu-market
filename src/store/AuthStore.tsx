import { AuthValues } from "@/components/LoginForm";
import { API_BASE_URL } from "@/lib/constants";
import axios from "axios";
import { create } from "zustand";

interface AuthStore {
  login: ({ email, password }: AuthValues) => Promise<string | undefined>;
  signup: ({ email, password, name, phoneNumber }: AuthValues) => Promise<void>;
  isLoggedIn: boolean;
}

const useAuthStore = create<AuthStore>((set, get) => ({
  isLoggedIn: false,
  login: async ({ email, password }: AuthValues) => {
    console.log("로그인 시도", email, password);

    const res = await axios.post(
      `${API_BASE_URL}/api/auth/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    const token = res.data.token;
    set({ isLoggedIn: true });
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
}));

export default useAuthStore;
