import Button from './Button';

interface PayBoxProps {
  productAmount: number;
  shippingFee: number;
  discountAmount: number;
  totalAmount: number;
  isAgreed: boolean;
  onAgreedChange: (agreed: boolean) => void;
  onPaymentClick: () => void;
  paymentButtonText?: string;
  className?: string;
  disabled?: boolean;
}

const PayBox = ({
  productAmount,
  shippingFee,
  discountAmount,
  totalAmount,
  isAgreed,
  onAgreedChange,
  onPaymentClick,
  paymentButtonText,
  className = "lg:w-80",
  disabled = false
}: PayBoxProps) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString() + '원';
  };

  const finalPaymentText = paymentButtonText || `결제하기 ${formatPrice(totalAmount)}`;

  return (
    <div className={className}>
      <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
        <h2 className="text-xl font-semibold mb-4">결제정보</h2>
        <div className="border-b border-gray-200 mb-4"></div>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">총 상품금액</span>
            <span className="font-medium">{formatPrice(productAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">총 배송비</span>
            <span className="font-medium">+ {formatPrice(shippingFee)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">총 할인금액</span>
            <span className="font-medium text-red-600">- {formatPrice(discountAmount)}</span>
          </div>
          
          <div className="border-t border-gray-200 pt-3 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">총 결제금액</span>
              <span className="text-xl font-bold text-logo">{formatPrice(totalAmount)}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 space-y-4">
          <div className="flex items-start space-x-3">
            <input 
              type="checkbox" 
              checked={isAgreed}
              onChange={(e) => onAgreedChange(e.target.checked)}
              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-sm text-gray-700 leading-relaxed">
              주문동의 및 개인정보 수집 이용 동의
            </label>
          </div>
          
          <Button 
            onClick={onPaymentClick}
            disabled={!isAgreed || disabled}
            className={`w-full text-lg p-4 rounded-[10px] cursor-pointer ${
              !isAgreed || disabled
                ? 'opacity-50 cursor-not-allowed bg-gray-400 text-gray-600' 
                : 'bg-[#405DE6] text-white hover:bg-[#3348C7] hover:text-white'
            }`}
          >
            {finalPaymentText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PayBox;