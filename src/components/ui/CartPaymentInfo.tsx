import { CartPayProps } from "@/types/cart/cart";
import Button from "./Button";
import Link from "next/link";

const CartPaymentInfo = ({ totalPrice, shippingFee }: CartPayProps) => {
  const finalPrice = totalPrice + shippingFee;
  
  return (
    <div className="w-full sticky bg-white rounded-lg shadow-sm h-80 p-6 space-y-3 flex flex-col justify-between">
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between">
          <span>총 상품 금액</span>
          <div className="flex">
            <span>{totalPrice.toLocaleString()}</span>
            <span>원</span>
          </div>
        </div>
        <div className="flex justify-between">
          <span>총 배송비</span>
          <div className="flex">
            <span>{shippingFee.toLocaleString()}</span>
            <span>원</span>
          </div>
        </div>
        {totalPrice > 50000 && (
          <div className="text-sm text-green-600">
            🎉 50,000원 이상 구매로 배송비 무료!
          </div>
        )}
        <p className="border-b-2"></p>
        <div className="flex justify-between text-lg mb-6 font-bold">
          <span>결제 예정 금액</span>
          <div className="flex">
            <span className="text-primary">{finalPrice.toLocaleString()}</span>
            <span>원</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-2 ">
        <Link href="/pay/checkout">
          <Button color='gold' className="w-full text-lg"> 주문하기</Button>
        </Link>
      </div>
    </div>
  );
};

export default CartPaymentInfo;
