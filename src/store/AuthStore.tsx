import axios from "axios";
import { create } from "zustand";

interface AuthStore {
  login: (email: string, password: string) => Promise<string | undefined>;
  isLoggedIn: boolean;
}

const useAuthStore = create<AuthStore>((set, get) => ({
  isLoggedIn: false,
  login: async (email: string, password: string) => {
    console.log("로그인 시도", email, password);

    const res = await axios.post("http://localhost:4000/api/auth/login", {
      email,
      password,
    });

    const token = res.data.token;
    set({ isLoggedIn: true });
    return token;
  },
}));

export default useAuthStore;
