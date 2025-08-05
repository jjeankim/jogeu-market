import Button from "@/components/ui/Button";
import { formatKoreanDate } from "@/lib/utils/date";
import { ReviewCardProps } from "@/types/my/order";
import Image from "next/image";

const ReviewCard = ({
  product,
  review,
  orderedAt,
  onWriteReview,
}: ReviewCardProps) => {
  const formmatedDate = formatKoreanDate(orderedAt)
  return (
    <div className="flex justify-between items-center border-2 p-6 rounded-2xl">
      <div className="flex items-center gap-10">
        <Image
          className="rounded-[10px]"
          src={"/images/립.png"}
          width={100}
          height={100}
          alt={`${product.name}사진`}
        />
        <div>
          <p className="text-xl mb-6">{product.name}</p>
          <p className="underline underline-offset-4 text-gray-500">
            주문일: {formmatedDate}
          </p>
        </div>
      </div>
      <Button
        onClick={onWriteReview}
        size="md"
        color="gold"
        disabled={!!review?.reviewText}
      >
        {review ? "작성 완료" : "후기 작성"}
      </Button>
    </div>
  );
};

export default ReviewCard