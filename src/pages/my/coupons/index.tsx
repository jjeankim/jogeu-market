import MyPageLayout from "@/components/my/MyPageLayout";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { FiAlertCircle } from "react-icons/fi";

const SubTitle = ({ title }: { title: string }) => {
  return <h3 className="text-3xl font-bold inline-block mb-10">{title}</h3>;
};

const MyCoupon = () => {
  return (
    <>
      <SubTitle title="내 쿠폰" />
      <div className="border-2 rounded-2xl px-8 py-2">
        <div className="flex justify-between py-4 border-b-1 border-b-gray-400">
          <span>사용 가능한 쿠폰</span>
          <span className="text-[#b29977]">3장</span>
        </div>
        <div className="flex justify-between py-4">
          <div className="flex gap-4 items-center">
            <FiAlertCircle size={20} />
            <span>이번달 소멸 예정 쿠폰</span>
          </div>
          <span className="text-[#b29977]">3장</span>
        </div>
      </div>
    </>
  );
};

const RegisterCoupon = () => {
  return (
    <div className="mt-16">
      <SubTitle title="쿠폰 번호 등록" />
      <form className="flex justify-end gap-8 border-t-2 pt-8">
        <input
          type="text"
          placeholder="쿠폰 번호를 입력해 주세요"
          className="border p-4 rounded-2xl w-96 focus:outline-black"
        />
        <div>
          <Button>등록</Button>
        </div>
      </form>
    </div>
  );
};

const Coupon = () => {
  return (
    <div className="p-6 flex flex-col justify-between border rounded-2xl">
      <div className="flex flex-col mb-20">
        <span className="text-3xl mb-2">20%할인 쿠폰(신규 가...)</span>
        <span className="text-sm">10,000원 이상 구매 시 최대 10,000원 할인</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-gray-400">사용기간:2025.12.31 23:59까지</span>
        <Link className="text-[#b29977]" href={"/"}>자세히</Link>
        </div>
    </div>
  );
};

const index = () => {
  return (
    <MyPageLayout pageTitle="마이페이지">
      <MyCoupon />
      <RegisterCoupon />
      <div className="mt-16">
        <SubTitle title="보유 쿠폰" />
        <div className="grid grid-cols-2 gap-8 border-t-2 py-10" >
          <Coupon/>
          <Coupon/>
          <Coupon/>
        </div>
      </div>
    </MyPageLayout>
  );
};

export default index;
