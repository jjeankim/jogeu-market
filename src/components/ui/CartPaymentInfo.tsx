import { CartPayProps } from "@/types/cart/cart";
import { ButtonSmall } from "../ui/Button";

const CartPaymentInfo = ({ totalPrice, shippingFee }: CartPayProps) => {
  return (
    <div className="w-full sticky  bg-white rounded-lg shadow-sm h-80 p-6 space-y-3 flex flex-col justify-between ">
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between">
          <span>총 상품 금액</span>
          <div className="flex">
            <span>{totalPrice}</span>
            <span>원</span>
          </div>
        </div>
        <div className="flex justify-between">
          <span>총 배송비</span>
          <div className="flex">
            <span>{shippingFee}</span>
            <span>원</span>
          </div>
        </div>
        <p className="border-b-2"></p>
        <div className="flex justify-between text-lg mb-6">
          <span>결제 예정 금액</span>
          <div className="flex">
            <span>0</span>
            <span>원</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-2 ">
        <ButtonSmall className="w-full"> 주문하기</ButtonSmall>
      </div>
    </div>
  );
};

export default CartPaymentInfo;
