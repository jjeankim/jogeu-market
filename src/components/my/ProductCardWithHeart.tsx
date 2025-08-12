import { useState } from "react";
import ProductCard from "@/components/ui/ProductCard";
import { FaHeart } from "react-icons/fa";
import { useToast } from "@/hooks/useToast";
import axiosInstance from "@/lib/axiosInstance";

type Product = {
  name: string;
  price: number;
  imgUrl?: string;
  shippingFee?: number;
};

interface ProductCardWithHeartProps {
  product: Product;
  productId: number;
  initiallyLiked?: boolean;
  showShippingInfo?: boolean;
  onRemove?: (productId: number) => void;
}

const ProductCardWithHeart = ({
  product,
  productId,
  initiallyLiked = true,
  showShippingInfo = true,
  onRemove,
}: ProductCardWithHeartProps) => {
  const [liked, setLiked] = useState(initiallyLiked);
  const { showSuccess, showError } = useToast();

  const handleHeartClick = async () => {
    if (!liked) return; // 이미 제거된 경우 무시

    try {
      await axiosInstance.delete(`/api/wishlist/${productId}`);
      setLiked(false);
      showSuccess("위시리스트에서 제거되었습니다.");
      onRemove?.(productId); // 부모에 알림
    } catch (error) {
      console.error(error);
      showError("제거에 실패했습니다.");
    }
  };

  // 위시 해제 시 UI에서 제거
  if (!liked) return null;

  return (
    <div className="relative inline-block w-full mx-auto">
      <ProductCard product={product} showShippingInfo={showShippingInfo} />

      <span
        className="absolute bottom-5 right-5 cursor-pointer z-10"
        onClick={handleHeartClick}
      >
        <FaHeart size={28} className="text-red-600" />
      </span>
    </div>
  );
};

export default ProductCardWithHeart;
