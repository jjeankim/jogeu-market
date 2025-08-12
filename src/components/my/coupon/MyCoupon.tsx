import { FiAlertCircle } from "react-icons/fi";
import SubTitle from "./SubTitle";

interface MyCouponProps {
  totalCount: number;
  expiringSoonCount: number;
}

const MyCoupon = ({ totalCount, expiringSoonCount }: MyCouponProps) => {
  return (
    <div>
      <SubTitle title="내 쿠폰" />
      <div className="border-2 rounded-2xl px-8 py-2">
        <div className="flex justify-between py-4 border-b border-gray-400">
          <span>사용 가능한 쿠폰</span>
          <span className="text-[#b29977]">{totalCount}장</span>
        </div>
        <div className="flex justify-between py-4">
          <div className="flex gap-4 items-center">
            <FiAlertCircle size={20} />
            <span>이번달 소멸 예정 쿠폰</span>
          </div>
          <span className="text-[#b29977]">{expiringSoonCount}장</span>
        </div>
      </div>
    </div>
  );
};

export default MyCoupon