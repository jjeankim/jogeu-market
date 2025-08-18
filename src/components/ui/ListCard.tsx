
import Image from "next/image";
import { PiHeartBold, PiShoppingCartSimpleBold } from "react-icons/pi";
import { FiStar } from "react-icons/fi";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { useToast } from "@/hooks/useToast";
import { AxiosError } from "axios";
import { Product } from "@/lib/apis/product";

interface ListCardProps {
  product: Product;
  onClick?: () => void;
}

interface ReviewStats {
  total: number;
  average: number;
  distribution: { star: number; count: number }[];
}

const ListCard = ({ product }: ListCardProps) => {
  const [wish, setWish] = useState(false);
  const [wishId, setWishId] = useState<number | null>(null);
  const [reviewStats, setReviewStats] = useState<ReviewStats | null>(null);
  const { showSuccess, showError } = useToast();

  // 리뷰 통계 가져오기
  useEffect(() => {
    const fetchReviewStats = async () => {
      try {
        const res = await axiosInstance.get(
          `/api/products/${product.id}/reviews/stats`
        );
        setReviewStats(res.data);
      } catch (err) {
        console.error("리뷰 통계 조회 실패", err);
      }
    };
    fetchReviewStats();
  }, [product.id]);

  // 하트아이콘 클릭 시 위시리스트 추가
  const handleWishClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 a로 이벤트 전달 안 함
    e.preventDefault();

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
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        showError("이미 위시리스트에 추가된 상품입니다.");
      } else if (
        error instanceof AxiosError &&
        error.response?.status === 401
      ) {
        showError("유효하지 않은 사용자입니다.");
      } else {
        showError("서버 오류가 발생했습니다.");
        console.error(error);
      }
    }
  };

  // 장바구니 아이콘 클릭 시 장바구니 추가
  const handleAddCart = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 a로 이벤트 전달 안 함
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/api/cart", {
        productId: product.id,
        quantity: 1,
      });
      showSuccess(res.data.message);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        showError("유효하지 않은 사용자입니다.");
      } else {
        showError("서버 오류가 발생했습니다.");
        console.error(error);
      }
    }
  };

  const { brand, name, price, thumbnailImageUrl } = product;

  const imageSrc =
    thumbnailImageUrl && thumbnailImageUrl.length > 0
      ? thumbnailImageUrl
      : "/images/noImg.png";

  return (
    <>
      <div className="flex flex-col items-center ">
        <div className="relative  w-[250px] h-[250px] rounded-2xl mb-3 shadow-[5px_10px_20px_rgba(0,0,0,0.1)] flex justify-center items-center">
          <div className="relative rounded-lg mb-3  w-[200px] h-[200px]  ">
            <Image
              src={imageSrc}
              alt={name}
              fill
              style={{
                objectFit: "contain",
                transform: "scale(0.8)",
                transformOrigin: "center center",
              }}
              className="rounded-lg t"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/images/noImg.png";
              }}
            />
          </div>
          <div className="absolute bottom-0 w-full flex justify-between p-5">
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
            <span className="text-sm font-light text-black">
              {typeof brand === "string" ? brand : brand?.name || "브랜드명"}
            </span>
            <h3 className="text-lg text-center text-gray-700">{name}</h3>
            <span className="flex flex-raw items-center text-lg font-medium text-[#FF572D]">
              {price}
              <span className="text-sm">원</span>
            </span>
            <div className="flex flex-raw items-center">
              <FiStar
                className={`${
                  reviewStats && reviewStats.total > 0
                    ? "fill-yellow-400"
                    : "text-gray-700"
                }`}
              />
              <span className="ml-1 text-gray-700">
                {reviewStats ? reviewStats.average : "0.0"} (
                {reviewStats ? reviewStats.total : 0})
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListCard;
