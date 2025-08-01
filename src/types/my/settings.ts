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