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
    // <div className="border-2 rounded-2xl">
    //   <div className="p-8 md:p-16">
    //     <h3 className="text-2xl font-bold md:text-4xl">
    //       <span className="text-[#B29977]">{userName}</span> 님 환영합니다!
    //     </h3>
    //   </div>
    //   <div className="border-t-2 flex">
    //     <div className="flex-1 flex justify-between items-center border-r-2 p-6 md:p-10 ">
    //       <div className="text-[20px] md:text-[30px]">
    //         <LuTicketPercent />
    //       </div>
    //       <span className="text-md font-bold lg:text-2xl lg:leading-[64px]">
    //         쿠폰
    //       </span>
    //       <Link href={"/my/coupons"}>
    //         <span className="text-md font-bold md:text-2xl md:leading-[64px] hover:text-[#B29977]">
    //           {couponList.length} 개
    //         </span>
    //       </Link>
    //     </div>
    //     <div className="flex-1 flex justify-between items-center p-6 md:p-10 ">
    //       <FiStar size={30} />
    //       <span className="text-md font-bold md:text-2xl leading-[64px]">
    //         포인트
    //       </span>
    //       <span className="text-md font-bold md:text-2xl leading-[64px]">
    //         30000 P
    //       </span>
    //     </div>
    //   </div>
    // </div>
    <div className="border-2 rounded-2xl overflow-hidden">
      <div className="p-6 sm:p-8 md:p-12 lg:p-16">
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
          <span className="text-[#B29977]">{userName}</span> 님 환영합니다!
        </h3>
      </div>

      <div className="border-t-2 flex flex-col md:flex-row">
        <div className="flex-1 flex justify-between items-center border-b-2 md:border-b-0 md:border-r-2 p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="text-xl sm:text-2xl md:text-3xl">
            <LuTicketPercent />
          </div>
          <span className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold">
            쿠폰
          </span>
          <Link href="/my/coupons">
            <span className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold hover:text-[#B29977]">
              {couponList.length} 개
            </span>
          </Link>
        </div>

        <div className="flex-1 flex justify-between items-center p-4 sm:p-6 md:p-8 lg:p-10">
          <FiStar className="text-xl sm:text-2xl md:text-3xl lg:text-4xl" />
          <span className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold">
            포인트
          </span>
          <span className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold">
            30,000 P
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyPageWelcomeCard;
