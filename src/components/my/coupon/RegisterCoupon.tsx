import Button from "@/components/ui/Button";
import SubTitle from "./SubTitle";
import { useState } from "react";
import { useToast } from "@/hooks/useToast";
import { registerCoupon } from "@/lib/apis/coupon";
import axios from "axios";
import { CouponErrorResponse, RegisterCouponProps } from "@/types/my/coupon";

const RegisterCoupon = ({ onSuccess }: RegisterCouponProps) => {
  const [couponNum, setCouponNum] = useState("");
  const [loading, setLoading] = useState(false);
  const { showError, showSuccess } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!couponNum.trim()) {
      showError("쿠폰 번호를 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      await registerCoupon(couponNum); // 성공 시 바로 데이터 반환
      setCouponNum("");
      showSuccess("쿠폰이 등록되었습니다.");
      onSuccess();
    } catch (error) {
      if (axios.isAxiosError<CouponErrorResponse>(error)) {
        const errMsg = error.response?.data?.error;

        if (
          errMsg === "ALREADY_ISSUED" ||
          errMsg === "이미 발급된 쿠폰입니다."
        ) {
          showError("이미 등록된 쿠폰입니다.");
        } else if (
          errMsg === "INVALID_COUPON" ||
          errMsg === "유효하지 않은 쿠폰입니다."
        ) {
          showError("유효하지 않은 쿠폰 번호입니다.");
        } else {
          showError("쿠폰 등록에 실패했습니다.");
        }
      } else {
        showError("네트워크 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-16">
      <SubTitle title="쿠폰 번호 등록" />
      <form
        onSubmit={handleSubmit}
        className="flex justify-end gap-8 border-t-2 pt-8"
      >
        <input
          type="text"
          placeholder="쿠폰 번호를 입력해 주세요"
          value={couponNum}
          onChange={(e) => setCouponNum(e.target.value)}
          className="border py-2 px-4 rounded-[10px] w-96 focus:outline-black"
        />
        <div>
          <Button type="submit" disabled={loading}>
            {loading ? "등록 중..." : "등록"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterCoupon;
