import {
  PiHeart,
  PiShareNetwork,
  PiShoppingCartSimpleBold,
} from "react-icons/pi";
import { Brand, ProductDetail } from "@/types/product/detail";
import QuantitySelect from "@/components/product/QuantitySelect";
import { PriceDisplay } from "@/components/product/PriceDisplay";
import Button from "@/components/ui/Button";
import { PiCheckBold } from "react-icons/pi";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

type Props = {
  product: ProductDetail;
  brand: Brand;
  wish: boolean;
  handleWishClick: () => void;
  handleShareClick: () => void;
  handleCartClick: () => void;
  handleOrderClick: () => void;
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
  brand,
  wish,
  handleWishClick,
  handleShareClick,
  handleCartClick,
  handleOrderClick,
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
    <div className="w-full md:w-[50%]">
      <div className="relative mb-4">
        <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
          <span className="inline-flex items-center rounded-md bg-white px-2 py-1 text-xs text-[#9f8265] font-medium ring-1 ring-[#9f8265] ring-inset">
            {brand.name}
          </span>
          <span className="inline-flex items-center rounded-md bg-white px-2 py-1 text-xs text-[#9f8265] font-medium ring-1 ring-[#9f8265] ring-inset">
            Best Seller
          </span>
        </div>

        <div className="absolute right-0 top-0">
          <button
            className="cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95"
            onClick={handleWishClick}
          >
            <PiHeart
              className={`mr-2 text-[24px] transition-all duration-300 ${
                wish ? "text-red-500 scale-110" : "text-black"
              }`}
            />
          </button>
          <button
            className="cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95"
            onClick={handleShareClick}
          >
            <PiShareNetwork className="text-[24px] transition-all duration-300" />
          </button>
        </div>
      </div>

      <p className="text-xl md:text-2xl mb-4">{product.name}</p>

      <PriceDisplay
        isDiscounted={isDiscounted}
        formattedOrigin={formattedOrigin}
        formattedSale={formattedSale}
        discountRate={discountRate}
      />

      <p className="flex flex-col text-base md:text-lg text-gray-500 mb-6 md:mb-10">
        <span className="">배송비</span>
        <span className="text-black">{FREE_SHIPPING_THRESHOLD.toLocaleString()}원 이상 무료배송</span>
      </p>

      <div className="flex flex-col items-center w-full mb-4">
        <QuantitySelect
          quantity={quantity}
          onIncrease={quantityInc}
          onDecrease={quantityDec}
        />
        <div className="mt-4 w-full flex justify-between text-lg md:text-xl">
          <span className="font-medium">총 상품 금액</span>
          <span className="font-bold text-xl md:text-2xl text-[#FF572D]">
            {totalPrice}
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <Button
          className="flex items-center justify-center w-full md:w-[50%] md:mr-3"
          variant="outlined"
          size="md"
          color="black"
          onClick={handleCartClick}
        >
          <PiShoppingCartSimpleBold className="text-[24px] mr-3" />
          장바구니
        </Button>
        <Button
          className="flex items-center justify-center w-full md:w-[50%]"
          variant="filled"
          size="md"
          color="gold"
          onClick={handleOrderClick}
        >
          <PiCheckBold className="text-[24px] mr-3" />
          바로 구매
        </Button>
      </div>
    </div>
  );
}
