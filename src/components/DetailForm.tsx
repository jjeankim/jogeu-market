import { PiHeart } from "react-icons/pi";
import { ProductDetail } from "@/types/product/detail";
import QuantitySelect from "../components/product/QuantitySelect";
import { PriceDisplay } from "../components/product/PriceDisplay";
import { ButtonSmall } from "@/components/ui/Button";
import { PiCheckBold, PiShoppingCartSimpleBold } from "react-icons/pi";

type Props = {
  product: ProductDetail;
  wish: boolean;
  handleWishClick: () => void;
  quantity: number;
  quantityInc: () => void;
  quantityDec: () => void;
  formattedOrigin: string | null;
  formattedSale: string;
  discountRate: string | null;
  isDiscounted: boolean;
  totalPrice: string;
};

export default function ProductInfo({
  product,
  wish,
  handleWishClick,
  quantity,
  quantityInc,
  quantityDec,
  formattedOrigin,
  formattedSale,
  discountRate,
  isDiscounted,
  totalPrice,
}: Props) {
  return (
    <div className="w-[50%]">
      <div className="relative mb-4">
        <span className="inline-flex items-center rounded-md bg-white px-2 py-1 text-xs text-[#9f8265] font-medium ring-1 ring-[#9f8265] ring-inset mr-1">
          화장품
        </span>
        <span className="inline-flex items-center rounded-md bg-white px-2 py-1 text-xs text-[#9f8265] font-medium ring-1 ring-[#9f8265] ring-inset">
          Best Seller
        </span>
        <button
          className="absolute right-0 top-0 cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95"
          onClick={handleWishClick}
        >
          <PiHeart
            className={`text-[24px] transition-all duration-300 ${
              wish ? "text-red-500 scale-110" : "text-black"
            }`}
          />
        </button>
      </div>

      <p className="text-2xl mb-4">{product.name}</p>

      <PriceDisplay
        isDiscounted={isDiscounted}
        formattedOrigin={formattedOrigin}
        formattedSale={formattedSale}
        discountRate={discountRate}
      />

      <p className="text-lg text-gray-500 mb-10">
        <span className="mr-2">배송비</span>30,000원 이상 무료배송
      </p>

      <div className="flex flex-col items-center w-full mb-4">
        <QuantitySelect
          quantity={quantity}
          onIncrease={quantityInc}
          onDecrease={quantityDec}
        />
        <div className="mt-4 w-full flex justify-between text-xl">
          <span className="font-medium">총 상품 금액</span>
          <span className="font-bold text-[#FF572D]">{totalPrice}</span>
        </div>
      </div>

      <div className="flex">
        <ButtonSmall className="flex justify-center w-[50%] items-center mr-2">
          <PiShoppingCartSimpleBold className="text-[24px] mr-3" />
          장바구니
        </ButtonSmall>
        <ButtonSmall className="flex justify-center w-[50%] items-center">
          <PiCheckBold className="text-[24px] mr-3" />
          바로 구매
        </ButtonSmall>
      </div>
    </div>
  );
}
