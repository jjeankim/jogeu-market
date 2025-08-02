import CouponCard from "@/components/my/coupon/CouponCard";
import MyCoupon from "@/components/my/coupon/MyCoupon";
// import RegisterCoupon from "@/components/my/coupon/RegisterCoupon";
import SubTitle from "@/components/my/coupon/SubTitle";
import MyPageLayout from "@/components/my/MyPageLayout";
import { fetchMyCoupon } from "@/lib/apis/coupon";
import { isExpiringThisMonth } from "@/lib/utils/expiringSoonCount";
import { CouponData } from "@/types/my/coupon";
import { useEffect, useState } from "react";

const MyCouponPage = () => {
  const [couponList, setCouponList] = useState<CouponData[]>([]);
  //coupon은 객체 배열로 들어옴

  useEffect(() => {
    const getMyCoupon = async () => {
      const myCoupon = await fetchMyCoupon();
      setCouponList(myCoupon);
    };
    getMyCoupon();
  }, []);

  return (
    <MyPageLayout pageTitle="마이페이지">
      <MyCoupon
        totalCount={couponList.length}
        expiringSoonCount={
          couponList.filter((item) =>
            isExpiringThisMonth(item.coupon.validUntil)
          ).length
        }
      />
      {/* {쿠폰 등록 api 없음} */}
      {/* <RegisterCoupon /> */}
      <div className="mt-16">
        <SubTitle title="보유 쿠폰" />
        <div className="grid grid-cols-2 gap-8 border-t-2 py-10">
          {couponList.length > 0 ? (
            couponList.map((item) => (
              <CouponCard key={item.couponId} userCoupon={item} />
            ))
          ) : (
            <p className="col-span-2 text-gray-500 text-center">
              보유한 쿠폰이 없습니다.
            </p>
          )}
        </div>
      </div>
    </MyPageLayout>
  );
};

export default MyCouponPage;
