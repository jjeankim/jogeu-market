import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { CartItem } from "@/lib/apis/cart";
import Button from "./Button";
import Image from "next/image";

interface CartItemCardProps {
  cartItem: CartItem;
  checked: boolean;
  onCheck: () => void;
  onQuantityChange: (cartItemId: number, quantity: number) => void;
  onRemove: (cartItemId: number) => void;
  onOrderClick: (cartItemId: CartItem) => void;
}

const CartItemCard = ({
  cartItem,
  checked,
  onCheck,
  onQuantityChange,
  onRemove,
  onOrderClick,
}: CartItemCardProps) => {
  const { product, quantity } = cartItem;
  const price = parseInt(product.price);
  const totalPrice = price * quantity;

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(cartItem.id, quantity - 1);
    }
  };

  const handleQuantityIncrease = () => {
    if (quantity < product.stockQuantity) {
      onQuantityChange(cartItem.id, quantity + 1);
    }
  };
  return (
    <div className="space-y-4 bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={checked}
            onChange={onCheck}
            className="mr-4 w-5 h-5 align-middle"
          />
          <span>상품 선택</span>
        </div>
        <button
          onClick={() => onRemove(cartItem.id)}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          삭제
        </button>
      </div>

      <div className="flex gap-4">
        {/* 상품 이미지 */}
        <div className="w-20 h-20 relative flex-shrink-0">
          <Image
            src={product.thumbnailImageUrl || "/images/noImg.png"}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* 상품 정보 */}
        <div className="flex-1">
          <div className="text-sm text-gray-600 mb-1">{product.brand?.name}</div>
          <div className="font-medium mb-2">{product.name}</div>
          <div className="text-lg font-bold text-primary">
            {price.toLocaleString()}원
          </div>
        </div>
      </div>

      {/* 수량 조절 */}
      <div className="flex justify-between items-center">
        <span>수량</span>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleQuantityDecrease}
            disabled={quantity <= 1}
            className={`${quantity <= 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-gray-800 cursor-pointer'}`}
          >
            <FiMinusCircle size={18} />
          </button>
          <span className="min-w-[40px] text-center">{quantity}</span>
          <button
            onClick={handleQuantityIncrease}
            disabled={quantity >= product.stockQuantity}
            className={`${quantity >= product.stockQuantity ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-gray-800 cursor-pointer'}`}
          >
            <FiPlusCircle size={18} />
          </button>
        </div>
      </div>

      {/* 총 가격 */}
      <div className="flex justify-between items-center pt-2 border-t">
        <span className="font-medium">합계</span>
        <span className="text-lg font-bold text-primary">
          {totalPrice.toLocaleString()}원
        </span>
      </div>

      <div className="flex w-full space-x-3">
        <Button color='gold' className="w-full" onClick={()=> onOrderClick(cartItem)}>주문하기</Button>
      </div>
    </div>
  );
};

export default CartItemCard;
