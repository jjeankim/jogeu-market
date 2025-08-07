import Image from "next/image";
import { PiHeartBold, PiShoppingCartSimpleBold } from "react-icons/pi";
import { FiStar } from "react-icons/fi";
import { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { useToast } from "@/hooks/useToast";

type Product = {
  id: number;
  brand: string | { id: number; name: string; logoImageUrl?: string };

  name: string;
  price: number;
  review: number;
  imgUrl?: string;
};

interface ListCardProps {
  product: Product;
  onClick?: () => void;
}

const ListCard = ({ product, onClick }: ListCardProps) => {
  const [wish, setWish] = useState(false);
  const [wishId, setWishId] = useState<number | null>(null);
  const { showSuccess, showError } = useToast();

  // 하트아이콘 클릭 시 위시리스트 추가
  const handleWishClick = async () => {
    try {
      if (!wish) {
        const res = await axiosInstance.post("/api/wishlist", {
          productId: product.id,
        });
        showSuccess(res.data.message);
        setWish(true);
        setWishId(res.data.wishlist.id);
      } else {
        if (!wishId) {
          showError("삭제할 위시리스트 상품을 찾을 수 없습니다.");
          return;
        }
        const res = await axiosInstance.delete(`/api/wishlist/${wishId}`);
        showSuccess(res.data.message);
        setWish(false);
        setWishId(null);
      }
    } catch (error: any) {
      if (error.response?.status === 409) {
        showError("이미 위시리스트에 추가된 상품입니다.");
      } else if (error.response?.status === 401) {
        showError("유효하지 않은 사용자입니다.");
      } else {
        showError("서버 오류가 발생했습니다.");
        console.error(error);
      }
    }
  };

  // 장바구니 아이콘 클릭 시 장바구니 추가
  const handleAddCart = async () => {
    try {
      const res = await axiosInstance.post("/api/cart", {
        productId: product.id,
        quantity: 1,
      });
      showSuccess(res.data.message);
    } catch (error: any) {
      if (error.response?.status === 401) {
        showError("유효하지 않은 사용자입니다.");
      } else {
        showError("서버 오류가 발생했습니다.");
        console.error(error);
      }
    }
  };

  const { brand, name, price, review, imgUrl } = product;

  // 이미지 URL이 유효한지 확인하고 기본 이미지로 대체
  const getImageUrl = () => {
    if (!imgUrl) return "/images/noImg.png";
    if (
      imgUrl.startsWith("http") &&
      !imgUrl.includes("localhost") &&
      !imgUrl.includes("yourcdn.com")
    ) {
      return "/images/noImg.png";
    }
    return imgUrl;
  };

  return (
    <>
      <div className="relative border-2 rounded-lg mb-3">
        <Image
          width={150}
          height={150}
          src={getImageUrl()}
          alt={name}
          className="aspect-square w-full rounded-lg bg-transparent object-cover group-hover:opacity-75"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/images/noImg.png";
          }}
        />
        <div className="absolute bottom-0 w-full flex justify-between p-4">
          <button
            className="cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95"
            onClick={handleWishClick}
          >
            <PiHeartBold
              className={`text-[24px] transition-all duration-300 ${
                wish ? "text-red-500 scale-110" : "text-black"
              }`}
            />
          </button>
          <button
            className="cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95"
            onClick={handleAddCart}
          >
            <PiShoppingCartSimpleBold className="text-[24px]" />
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col items-center">

          <span className="text-sm font-light text-black">{typeof brand === 'string' ? brand : brand?.name || '브랜드명'}</span>
          <h3 className="text-lg text-center text-gray-700">{name}</h3>
          <span className="flex flex-raw items-center text-lg font-medium text-[#FF572D]">
            {price}
            <span className="text-sm">원</span>
          </span>
          <div className="flex flex-raw items-center">
            <FiStar />
            <span className="ml-1 text-gray-700">{review}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListCard;
