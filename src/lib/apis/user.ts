import { User } from "@/types/my/settings";
import axiosInstance from "../axiosInstance";

export const fetchUser = async (): Promise<User | null> => {
  try {
    const res = await axiosInstance.get("/api/users/me");
    return res.data;
  } catch (error) {
    console.error("유저 정보 조회 실패", error);
    return null;
  }
};
