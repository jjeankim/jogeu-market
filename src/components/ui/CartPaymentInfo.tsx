import { CartPayProps } from "@/types/cart/cart";
import Button from "./Button";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

interface ExtendedCartPayProps extends CartPayProps {
  onOrderClick?: () => void;
  selectedItemsCount?: number;
}

const CartPaymentInfo = ({ 
  totalPrice, 
  shippingFee, 
  onOrderClick,
  selectedItemsCount = 0 
}: ExtendedCartPayProps) => {
  const finalPrice = totalPrice + shippingFee;
  
  return (
    <div className="w-full sticky bg-white rounded-lg shadow-sm h-80 p-6 space-y-3 flex flex-col justify-between">
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between">
          <span>선택 상품 ({selectedItemsCount}개)</span>
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
        {totalPrice > FREE_SHIPPING_THRESHOLD && (
          <div className="text-sm text-green-600">
            🎉 {FREE_SHIPPING_THRESHOLD.toLocaleString()}원 이상 구매로 배송비 무료!
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
        <Button 
          color='gold' 
          className="w-full text-lg" 
          onClick={onOrderClick}
          disabled={selectedItemsCount === 0}
        > 
          주문하기 ({selectedItemsCount}개)
        </Button>
      </div>
    </div>
  );
};

export default CartPaymentInfo;
