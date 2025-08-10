import CouponCard from "@/components/my/coupon/CouponCard";
import MyCoupon from "@/components/my/coupon/MyCoupon";
import RegisterCoupon from "@/components/my/coupon/RegisterCoupon";
import SubTitle from "@/components/my/coupon/SubTitle";
import MyPageLayout from "@/components/my/MyPageLayout";
import Spinner from "@/components/ui/Spinner";
import { useToast } from "@/hooks/useToast";
import { fetchMyCouponList } from "@/lib/apis/coupon";
import { isExpiringThisMonth } from "@/lib/utils/expiringSoonCount";
import { CouponData } from "@/types/my/coupon";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const MyCouponPage = () => {
  const [couponList, setCouponList] = useState<CouponData[]>([]);
  const [loading, setLoading] = useState(false);
  const { showError } = useToast();

  const loadCouponList = useCallback(async () => {
    setLoading(true);
    try {
      const myCoupon = await fetchMyCouponList();
      setCouponList(myCoupon);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showError("쿠폰 목록을 불러오는데 실패했습니다.");
      } else {
        showError("네트워크 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    loadCouponList();
  }, [loadCouponList]);

  return (
    <MyPageLayout>
      <MyCoupon
        totalCount={couponList.length}
        expiringSoonCount={
          couponList.filter((item) =>
            isExpiringThisMonth(item.coupon.validUntil)
          ).length
        }
      />

      <RegisterCoupon onSuccess={loadCouponList} />
      <div>
        <SubTitle title="보유 쿠폰" />
        {loading && couponList.length === 0 ? (
          <Spinner />
        ) : (
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
        )}
      </div>
    </MyPageLayout>
  );
};

export default MyCouponPage;
