// empty star
import React, { useState } from "react";
import Image from "next/image";
import { FiThumbsUp } from "react-icons/fi";
import StarRating from "./StarRating";

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
      const url = liked
        ? `/api/products/${productId}/reviews/${id}/unlike`
        : `/api/products/${productId}/reviews/${id}/like`;

      const res = await fetch(url, { method: "POST" });
      if (!res.ok) throw new Error("좋아요 요청 실패");

      setLiked(!liked);
      setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
    } catch (error) {
      alert("좋아요 요청 중 오류가 발생했습니다.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-between px-3 py-3 border-b-2 ">
      {/* 아이디, 작성일 별 , 후기 내용 */}
      <div className="flex flex-col space-y-3 max-w-1/2">
        <div className="flex space-x-3 space-y-3">
          <span>{maskedLocalPart}</span>
          <span className="">{formattedDate}</span>
        </div>
        <StarRating rating={rating} />
        <p>{reviewText}</p>
      </div>
      {/* 사진 , 좋아요 */}
      <div className=" min-w-56 flex justify-around ">
        <div className="flex items-center justify-center  rounded-2xl overflow-hidden">
          {imageUrl ? (
            <Image
              width={150}
              height={150}
              src={imageUrl}
              alt=""
              className="object-cover"
            />
          ) : (
            <>
              <div className=" w-35 h-[100%]"></div>
            </>
          )}
        </div>
        <div
          className="flex flex-col items-center cursor-pointer select-none"
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
