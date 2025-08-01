import { User } from "@/types/my/settings";
import axiosInstance from "../axiosInstance";

export const fetchCurrentUser = async () :Promise<User> => {
  const res = await axiosInstance.get("/api/users/me");
  return res.data;
}