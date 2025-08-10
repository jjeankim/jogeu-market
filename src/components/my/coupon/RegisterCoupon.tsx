import Button from "@/components/ui/Button";
import SubTitle from "./SubTitle";
import { useState } from "react";
import { useToast } from "@/hooks/useToast";

const RegisterCoupon = () => {
  const [couponNum, setCouponNum] = useState("");

  const { showError, showSuccess } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("쿠폰등록");
      setCouponNum("");
      showSuccess("쿠폰이 등록되었습니다.");
    } catch (error) {
      console.error("쿠폰 등록 실패", error);
      showError("유효하지 않은 쿠폰 번호 입니다.");
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
          <Button type="submit">등록</Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterCoupon;
