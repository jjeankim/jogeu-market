import Button from "@/components/ui/Button";
import { ReviewCardLayout } from "@/pages/my/reviews";
import { ReviewCardProps } from "@/types/my/order";

const ReviewCard = ({
  product,
  review,
  orderedAt,
  onWriteReview,
}: ReviewCardProps) => {
  return (
    <div className="flex justify-between items-center border-b border-b-gray-300 p-6">
      <ReviewCardLayout product={product} orderedAt={orderedAt} />
      <Button
        onClick={onWriteReview}
        size="md"
        color="gold"
        disabled={!!review?.reviewText}
      >
        후기 작성
      </Button>
    </div>
  );
};

export default ReviewCard;
