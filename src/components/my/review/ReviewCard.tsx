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
    <div className="flex justify-between items-center border-b border-b-gray-300 p-6">
      <div className="flex items-center gap-10">
        <Image
          className="rounded-[10px]"
          src={"/images/립.png"}
          width={100}
          height={100}
          alt={`${product.name}사진`}
        />
        <div>
          <p className="text-md mb-1 text-gray-500">{`[${product.brand.name}]`}</p>
          <p className="text-xl mb-4">{product.name}</p>
          <p className="text-sm text-gray-500">
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
         후기 작성
      </Button>
    </div>
  );
};

export default ReviewCard