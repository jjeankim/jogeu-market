import { fetchMyCouponList } from "@/lib/apis/coupon";
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
      const myCoupons = await fetchMyCouponList();
      setCouponList(myCoupons);
    };
    getMyCoupon();
  }, []);

  return (
    <div className="border-2 rounded-2xl">

      <div className="p-6 md:p-16">
        <h3 className="text-xl font-bold md:text-4xl text-center md:text-left">
          <span className="text-[#B29977]">{userName}</span> 님 환영합니다!
        </h3>
      </div>
      
      {/* 모바일 */}
      <div className="md:hidden border-t-2">
        <div className="flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="text-xl">
                <LuTicketPercent />
              </div>
              <span className="text-base font-bold">쿠폰</span>
            </div>
            <Link href={"/my/coupons"}>
              <span className="text-base font-bold hover:text-[#B29977]">
                {couponList.length} 개
              </span>
            </Link>
          </div>
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center gap-3">
              <FiStar size={24} />
              <span className="text-base font-bold">포인트</span>
            </div>
            <span className="text-base font-bold">30000 P</span>
          </div>
        </div>
      </div>

      {/* 데스크톱 */}
      <div className="hidden md:flex border-t-2">
        <div className="flex-1 flex justify-between items-center border-r-2 p-6 md:p-10 ">
          <div className="text-[20px] md:text-[30px]">
            <LuTicketPercent />
          </div>
          <span className="text-md font-bold lg:text-2xl lg:leading-[64px]">
            쿠폰
          </span>
          <Link href={"/my/coupons"}>
            <span className="text-md font-bold md:text-2xl md:leading-[64px] hover:text-[#B29977]">
              {couponList.length} 개
            </span>
          </Link>
        </div>
        <div className="flex-1 flex justify-between items-center p-6 md:p-10 ">
          <FiStar size={30} />
          <span className="text-md font-bold md:text-2xl leading-[64px]">
            포인트
          </span>
          <span className="text-md font-bold md:text-2xl leading-[64px]">
            30000 P
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyPageWelcomeCard;
