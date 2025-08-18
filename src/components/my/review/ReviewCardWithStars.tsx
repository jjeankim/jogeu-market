import React, { useState } from "react";
import Image from "next/image";
import { FiThumbsUp } from "react-icons/fi";
import StarRating from "./StarRating";
import axiosInstance from "@/lib/axiosInstance"; // 이미 설정된 axios 인스턴스 사용
import { useToast } from "@/hooks/useToast"; // 토스트 훅 추가
import { AxiosError } from "axios";

interface ReviewCardWithStarsProps {
  review: {
    id: number;
    userId: number;
    maskedLocalPart: string;
    rating: number;
    reviewText: string;
    createdAt: string;
    imageUrl?: string | null;
    likesCount: number;
    likedByUser?: boolean;
  };
  productId: number;
}

const ReviewCardWithStars: React.FC<ReviewCardWithStarsProps> = ({
  review,
  productId,
}) => {
  const {
    id,
    maskedLocalPart,
    rating,
    reviewText,
    createdAt,
    imageUrl,
    likesCount: initialLikesCount,
    likedByUser: initialLikedByUser = false,
  } = review;

  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [liked, setLiked] = useState(initialLikedByUser);
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  // 날짜 가공
  const formattedDate = (() => {
    if (!createdAt) return "";
    const date = new Date(createdAt);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().split("T")[0].replace(/-/g, ".");
  })();

  const handleLikeToggle = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const url = `/api/products/${productId}/reviews/${id}/like`;

      let response;
      if (liked) {
        // 좋아요 취소: DELETE 요청
        response = await axiosInstance.delete(url);
      } else {
        // 좋아요: POST 요청
        response = await axiosInstance.post(url);
      }

      console.log("좋아요 응답:", response.data); // 디버깅용 로그

      // 성공 처리
      setLiked(!liked);
      setLikesCount((prev) => (liked ? prev - 1 : prev + 1));

      // 성공 메시지 (선택사항)
      // showSuccess(liked ? "좋아요를 취소했습니다." : "좋아요를 누르셨습니다.");
    } catch (error) {
      console.error("좋아요 요청 오류:", error);

      const axiosError = error as AxiosError<{ message: string }>;

      // 구체적인 에러 처리
      if (axiosError.response?.status === 401) {
        showError("로그인이 필요합니다.");
      } else if (axiosError.response?.status === 404) {
        showError("리뷰를 찾을 수 없습니다.");
      } else if (axiosError.response?.status === 409) {
        showError("이미 처리된 요청입니다.");
      } else {
        // 서버에서 온 에러 메시지 사용하거나 기본 메시지
        const errorMessage =
          axiosError.response?.data?.message ||
          "좋아요 요청 중 오류가 발생했습니다.";
        showError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-between px-3 py-3 border-b-2">
      {/* 아이디, 작성일 별, 후기 내용 */}
      <div className="flex flex-col space-y-3 max-w-1/2">
        <div className="flex space-x-3 space-y-3">
          <span>{maskedLocalPart}</span>
          <span className="">{formattedDate}</span>
        </div>
        <StarRating rating={rating} />
        <p>{reviewText}</p>
      </div>
      {/* 사진, 좋아요 */}
      <div className="min-w-56 flex justify-around">
        <div className="flex items-center justify-center rounded-2xl overflow-hidden">
          {imageUrl ? (
            <Image
              width={150}
              height={150}
              src={imageUrl}
              alt=""
              className="object-cover"
            />
          ) : (
            <div className="w-35 h-[100%]"></div>
          )}
        </div>
        <div
          className={`flex flex-col items-center cursor-pointer select-none ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleLikeToggle}
        >
          <FiThumbsUp
            size={25}
            color={liked ? "#2563EB" : "#999"}
            style={{ transition: "color 0.3s" }}
          />
          <h4 className="text-center">({likesCount})</h4>
        </div>
      </div>
    </div>
  );
};

export default ReviewCardWithStars;
