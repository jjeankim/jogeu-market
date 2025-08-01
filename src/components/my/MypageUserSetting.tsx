import axiosInstance from "@/lib/axiosInstance";
import { API_BASE_URL } from "@/lib/constants";
import { SubTitle } from "@/pages/my/coupons";
import { User, UserSettingListProps } from "@/types/my/settings";
import { useEffect, useState } from "react";

const UserSettingList = ({
  title,
  info,
  onEdit,
  isLast,
}: UserSettingListProps) => {
  return (
    <div
      className={`flex items-center justify-between py-4 ${isLast ? " " : "border-b border-gray-400"}`}
    >
      <div className="flex items-start gap-16 flex-1">
        <span className="flex-shrink-0 w-[70px]">{title}</span>
        <span className="flex-1 text-gray-500 break-words">{info}</span>
      </div>
      {onEdit && (
        <button
          onClick={onEdit}
          className="text-[#B29977] text-md flex-shrink-0 cursor-pointer"
        >
          변경하기
        </button>
      )}
    </div>
  );
};

const MypageUserSetting = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(`${API_BASE_URL}/api/users/me`);
        setUser(res.data);
      } catch (error) {
        console.error("유저 정보 불러오기 실패", error);
      }
    };
    fetchUser();
  }, []);

  if (!user) {
    return <div>...로딩중</div>;
  }

  const { phoneNumber, email, addresses } = user;
  const defaultAddress =
    addresses.find((a) => a.isDefault)?.address || "등록된 주소가 없습니다.";

  return (
    <div>
      <SubTitle title="회원 정보 관리" />
      <div className="border-2 rounded-2xl px-8 py-4">
        <UserSettingList title="휴대전화" info={phoneNumber} />
        <UserSettingList title="이메일" info={email} />
        <UserSettingList title="주소" info={defaultAddress} />
        <UserSettingList
          title="비밀번호"
          onEdit={() => console.log("수정 버튼")}
          isLast
        />
      </div>
    </div>
  );
};

export default MypageUserSetting;
