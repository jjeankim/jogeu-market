import { formatKoreanDate } from "@/lib/utils/date";
import { ReviewCardProps } from "@/types/my/order";
import Image from "next/image";

const ReviewCardLayout = ({
  product,
  review,
  orderedAt,
  onWriteReview,
}: ReviewCardProps) => {
  return (
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
          {orderedAt ? `주문일: ${formatKoreanDate(orderedAt)}` : "\u00A0"}
        </p>
      </div>
      {review && <div></div>}
      {onWriteReview && <div></div>}
    </div>
  );
};

export default ReviewCardLayout;
