import Button from "@/components/ui/Button";
import { ReviewCardLayout } from "@/pages/my/reviews";
import { ReviewCardProps } from "@/types/my/order";
import { FaStar } from "react-icons/fa";
import { FiX } from "react-icons/fi";

const WrittenReviewCard = ({ product, review }: ReviewCardProps) => {
  const rating = review?.rating ?? 0;

  return (
    <div className="border-b border-b-gray-300 p-6">
      <ReviewCardLayout product={product} />
      <div className="relative">
        <div className=" flex  mt-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <FaStar
              key={index}
              className={index < rating ? "text-yellow-400" : "text-gray-300"}
            />
          ))}
          <span className="ml-2 text-sm">{rating}</span>
        </div>
        <p className="mt-4">{review?.reviewText}</p>
        <Button
          size="sm"
          variant="outlined"
          color="gold"
          className="absolute right-0 top-0"
        >
          수정
        </Button>
      </div>
      <button className="absolute right-6 top-6 text-gray-300">
        <FiX />
      </button>
    </div>
  );
};

export default WrittenReviewCard;
