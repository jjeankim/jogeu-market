import { ReactNode } from "react";

// settings page
export type Address = {
  id: string;
  address: string;
  isDefault: boolean;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  addresses: Address[];
};

export interface MypageUserSettingProps {
  initialUser: User;
}

export interface UserSettingListProps {
  title: string;
  info?: string;
  onEdit?: () => void;
  isLast?: boolean;
}

export interface PasswordChangeModalProps {
  onClose: () => void;
}

export interface PasswordChangeModalValues {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export interface ModalLayoutProps {
  children: ReactNode;
  onClose: () => void;
}