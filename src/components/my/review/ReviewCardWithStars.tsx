// empty star

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
  };
}

const ReviewCardWithStars: React.FC<ReviewCardWithStarsProps> = ({
  review,
}) => {
  const {
    maskedLocalPart,
    rating,
    reviewText,
    createdAt,
    imageUrl,
    likesCount,
  } = review;

  // 날짜 가공
  const formattedDate = (() => {
    if (!createdAt) return "";
    const date = new Date(createdAt);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().split("T")[0].replace(/-/g, ".");
  })();

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
        <div className="flex items-center justify-center border rounded-2xl overflow-hidden">
          {imageUrl ? (
            <Image
              width={150}
              height={150}
              src={imageUrl}
              alt=""
              className="object-cover"
            />
          ) : null}
        </div>
        <div className="flex flex-col">
          <div className=" flex justify-center  ">
            <FiThumbsUp size={25} />
          </div>
          <h4 className=" text-center">({likesCount})</h4>
        </div>
      </div>
    </div>
  );
};

export default ReviewCardWithStars;
