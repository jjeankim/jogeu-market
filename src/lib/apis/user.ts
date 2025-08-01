import { User } from "@/types/my/settings";
import axiosInstance from "../axiosInstance";

export const fetchUser = async (): Promise<User | null> => {
  try {
    const res = await axiosInstance.get("/api/users/me");
    return res.data;
  } catch (error) {
    console.error("내 정보 조회 실패", error);
    return null;
  }
};

export const changePassword = async ({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}): Promise<boolean> => {
  try {
    await axiosInstance.patch("/api/users/me/password", {
      currentPassword,
      newPassword,
    });
    return true;
  } catch (error) {
    console.error("비밀번호 변경 실패", error);
    return false;
  }
};
