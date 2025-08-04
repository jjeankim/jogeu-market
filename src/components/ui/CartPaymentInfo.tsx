import { CartPayProps } from "@/types/cart/cart";

const CartPaymentInfo = ({ totalPrice, shippingFee }: CartPayProps) => {
  return (
    <div className="w-full sticky  bg-white rounded-lg h-80 p-6 space-y-3 flex flex-col justify-between ">
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

      <div className="flex flex-col space-y-1 ">
        <button className="w-full bg-white border-1 border-[#405DE6] px-6 py-1.5  rounded-md text-[#405DE6]">
          위시리스트
        </button>
        <button className="w-full bg-[#405DE6] px-6 py-2  rounded-md text-white">
          주문하기
        </button>
      </div>
    </div>
  );
};

export default CartPaymentInfo;
