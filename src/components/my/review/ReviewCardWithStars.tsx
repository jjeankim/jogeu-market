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
    <div className="flex flex-col md:flex-row justify-between px-3 py-3 border-b-2">
      <div className="flex flex-col space-y-3 flex-1 min-w-0">
        <div className="flex flex-col md:flex-row md:space-x-3 space-y-1 md:space-y-0">
          <span className="text-sm md:text-base">{maskedLocalPart}</span>
          <span className="text-sm md:text-base text-gray-500">{formattedDate}</span>
        </div>
        <StarRating rating={rating} />
        <p className="text-sm md:text-base break-words">{reviewText}</p>
      </div>
      
      <div className="flex flex-row md:flex-col justify-between md:justify-around items-center mt-3 md:mt-0 md:min-w-56">
        <div className="flex items-center justify-center rounded-2xl overflow-hidden">
          {imageUrl ? (
            <Image
              width={80}
              height={80}
              src={imageUrl}
              alt=""
              className="object-cover w-20 h-20 md:w-[150px] md:h-[150px]"
            />
          ) : (
            <div className="w-20 h-20 md:w-35 md:h-[100%]"></div>
          )}
        </div>
        <div
          className="flex flex-row md:flex-col items-center cursor-pointer select-none ml-4 md:ml-0"
          onClick={handleLikeToggle}
        >
          <FiThumbsUp
            size={20}
            color={liked ? "#2563EB" : "#999"}
            style={{ transition: "color 0.3s" }}
          />
          <h4 className="text-sm md:text-base ml-1 md:ml-0 md:text-center">({likesCount})</h4>
        </div>
      </div>
    </div>
  );
};

export default ReviewCardWithStars;
