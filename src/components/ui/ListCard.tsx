import Image from "next/image";
import { PiHeartBold, PiShoppingCartSimpleBold } from "react-icons/pi";
import { FiStar } from "react-icons/fi";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { useToast } from "@/hooks/useToast";
import { AxiosError } from "axios";
import { Product } from "@/lib/apis/product";
import useUserWishlist from "@/hooks/useUserWishlist";
import Link from "next/link";

interface ListCardProps {
  product: Product;
}

interface ReviewStats {
  total: number;
  average: number;
  distribution: { star: number; count: number }[];
}

const ListCard = ({ product }: ListCardProps) => {
  const [reviewStats, setReviewStats] = useState<ReviewStats | null>(null);
  const { showSuccess, showError } = useToast();
  const { userWishlist, toggleWishlist } = useUserWishlist();

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

  const handleAddCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
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
  const isWished = userWishlist.has(product.id);
  const imageSrc =
    thumbnailImageUrl && thumbnailImageUrl.length > 0
      ? thumbnailImageUrl
      : "/images/noImg.png";

  return (
    <>
      <div className="flex flex-col items-center ">
        <div className="relative  w-[250px] h-[250px] rounded-2xl mb-3 shadow-[5px_10px_20px_rgba(0,0,0,0.1)] flex justify-center items-center">
          <div className="relative rounded-lg mb-3  w-[200px] h-[200px]  ">
            <Link href={`/product/${product.id}`}>
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
            </Link>
          </div>
          <div className="absolute bottom-0 w-full flex justify-between p-5">
            <button
              className="cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95"
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(product.id);
              }}
            >
              <PiHeartBold
                className={`text-[24px] transition-all duration-300 ${
                  isWished ? "text-red-500 scale-110" : "text-black"
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
