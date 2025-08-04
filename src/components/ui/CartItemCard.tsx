import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import ProductCard from "./ProductCard";
import { Product } from "@/types/cart/cart";
// import { ButtonSmall } from "./Button";
import { ButtonSmall } from "../ui/Button";

const CartItemCard = ({
  product,
  checked,
  onCheck,
}: {
  product: Product;
  checked: boolean;
  onCheck: () => void;
}) => {
  return (
    <div className="space-y-3 bg-white rounded-lg  p-6 shadow-sm mx-auto  ">
      <div className="flex ">
        <input
          type="checkbox"
          checked={checked}
          onChange={onCheck}
          className="mr-4 w-5 h-5 align-middle"
        />
        <span>상품 선택</span>
      </div>
      <div className="w-full">
        <ProductCard
          product={product}
          showShippingInfo={product.showShippingInfo}
        />
      </div>
      <div className="flex justify-between">
        <span>수량</span>
        <div className="flex space-x-3 items-center">
          <div className="">
            <FiMinusCircle size={18} />
          </div>
          <div>1</div>
          <div>
            <FiPlusCircle size={18} />
          </div>
        </div>
      </div>
      <div className="flex w-full space-x-3 text-sm">
        <ButtonSmall className="w-full bg-logo"> 주문하기</ButtonSmall>
      </div>
    </div>
  );
};

export default CartItemCard;
