import { fetchMyCoupon } from "@/lib/apis/coupon";
import useAuthStore from "@/store/AuthStore";
import { CouponData } from "@/types/my/coupon";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiStar } from "react-icons/fi";
import { LuTicketPercent } from "react-icons/lu";

const MyPageWelcomeCard = () => {
  const [couponList, setCouponList] = useState<CouponData[]>([]);
  const { userName } = useAuthStore();

  useEffect(() => {
    const getMyCoupon = async () => {
      const myCoupons = await fetchMyCoupon();
      setCouponList(myCoupons);
    };
    getMyCoupon();
  }, []);

  return (
    <div className="border-2 rounded-2xl mb-30">
      <div className="p-16">
        <h3 className="text-4xl font-bold">
          <span className="text-[#B29977]">{userName}</span> 님 환영합니다!
        </h3>
      </div>
      <div className="border-t-2 flex">
        <div className="flex-1 flex  p-10 justify-between items-center border-r-2">
          <LuTicketPercent size={30} />
          <span className="text-2xl font-bold leading-[64px]">쿠폰</span>
          <Link href={"/my/coupons"}>
            <span className="text-2xl font-bold leading-[64px] hover:text-[#B29977]">
              {couponList.length} 개
            </span>
          </Link>
        </div>
        <div className="flex-1 flex p-10 justify-between items-center">
          <FiStar size={30} />
          <span className="text-2xl font-bold leading-[64px]">포인트</span>
          <span className="text-2xl font-bold leading-[64px]">30000 P</span>
        </div>
      </div>
    </div>
  );
};

export default MyPageWelcomeCard;
