import Button from "@/components/ui/Button";
import SubTitle from "./SubTitle";

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

export default RegisterCoupon