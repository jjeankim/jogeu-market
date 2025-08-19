import { User } from "@/types/my/settings";
import axiosInstance from "../axiosInstance";

export interface AddressData {
  id?: number;
  recipientName: string;
  recipientPhone: string;
  zipCode: string;
  roadAddress: string;
  detailAddress?: string;
  isDefault?: boolean;
}

export const fetchUser = async (): Promise<User | null> => {
  try {
    const res = await axiosInstance.get("/api/users/me");
    return res.data;
  } catch (error) {
    console.error("내 정보 조회 실패", error);
    return null;
  }
};

export const updateUserInfo = async (userData: {
  phoneNumber?: string;
  name?: string;
}): Promise<boolean> => {
  try {
    await axiosInstance.patch("/api/users/me", userData);
    return true;
  } catch (error) {
    console.error("사용자 정보 업데이트 실패", error);
    return false;
  }
};

export const fetchUserAddresses = async (): Promise<AddressData[]> => {
  try {
    const res = await axiosInstance.get("/api/users/me/addresses");
    const addresses = res.data || [];
    return addresses.map((address: {
      id: number;
      recipientName: string;
      recipientPhone: string;
      postCode: string;
      addressLine1: string;
      addressLine2?: string;
      isDefault: boolean;
    }) => ({
      id: address.id,
      recipientName: address.recipientName,
      recipientPhone: address.recipientPhone,
      zipCode: address.postCode,
      roadAddress: address.addressLine1,
      detailAddress: address.addressLine2 || "",
      isDefault: address.isDefault,
    }));
  } catch (error) {
    console.error("배송지 목록 조회 실패", error);
    return [];
  }
};

export const createUserAddress = async (addressData: Omit<AddressData, 'id'>): Promise<boolean> => {
  try {
    const backendData = {
      recipientName: addressData.recipientName,
      recipientPhone: addressData.recipientPhone,
      postCode: addressData.zipCode,
      addressLine1: addressData.roadAddress,
      addressLine2: addressData.detailAddress || "",
    };
    
    await axiosInstance.post("/api/users/me/addresses", backendData);
    return true;
  } catch (error) {
    console.error("배송지 생성 실패", error);
    return false;
  }
};

export const updateUserAddress = async (addressId: number, addressData: Partial<AddressData>): Promise<boolean> => {
  try {
    await axiosInstance.patch(`/api/users/me/addresses/${addressId}`, addressData);
    return true;
  } catch (error) {
    console.error("배송지 수정 실패", error);
    return false;
  }
};

export const deleteUserAddress = async (addressId: number): Promise<boolean> => {
  try {
    await axiosInstance.delete(`/api/users/me/addresses/${addressId}`);
    return true;
  } catch (error) {
    console.error("배송지 삭제 실패", error);
    return false;
  }
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string,
): Promise<boolean> => {
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
