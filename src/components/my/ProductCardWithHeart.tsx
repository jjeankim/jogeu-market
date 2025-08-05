import { useState } from "react";
import ProductCard from "@/components/ui/ProductCard";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

type Product = {
  name: string;
  price: number;
  imgUrl?: string;
  shippingFee?: number;
};

interface ProductCardWithHeartProps {
  product: Product;
  initiallyLiked?: boolean;
  showShippingInfo?: boolean;
  onLikeToggle?: (liked: boolean) => void;
}

const ProductCardWithHeart = ({
  product,
  initiallyLiked = true,
  showShippingInfo = true,
  onLikeToggle,
}: ProductCardWithHeartProps) => {
  const [liked, setLiked] = useState(initiallyLiked);

  const toggleLike = () => {
    const newState = !liked;
    setLiked(newState);
    onLikeToggle?.(newState); // 콜백으로 외부에 상태 전달 (옵션)
  };

  return (
    <div className="relative inline-block w-full mx-auto ">
      <ProductCard product={product} showShippingInfo={showShippingInfo} />

      <span
        className="absolute bottom-5 right-5 cursor-pointer z-10"
        onClick={toggleLike}
      >
        {liked ? (
          <FaHeart size={28} className="text-red-600" />
        ) : (
          <FiHeart size={28} className="text-black" />
        )}
      </span>
    </div>
  );
};

export default ProductCardWithHeart;
