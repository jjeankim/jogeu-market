import { formatKoreanDate } from "@/lib/utils/date";
import { ReviewCardProps } from "@/types/my/order";
import Image from "next/image";

const ReviewCardLayout = ({ product, review, orderedAt }: ReviewCardProps) => {
  const imgSrc =
    review?.imageUrl?.trim() ||
    product.thumbnailImageUrl?.trim() ||
    "/images/noImg.png";

  return (
    <div className="flex items-center gap-10">
      <Image
        src={imgSrc}
        width={80}
        height={80}
        alt={`${product.name}사진`}
        className="rounded-[10px] w-20 h-20 object-cover"
      />
      <div>
        <p className="text-md mb-1 text-gray-500">{`[${product.brand.name}]`}</p>
        <p className="text-xl mb-4">{product.name}</p>
        <p className="text-sm text-gray-500">
          {orderedAt ? `주문일: ${formatKoreanDate(orderedAt)}` : "\u00A0"}
        </p>
      </div>
    </div>
  );
};

export default ReviewCardLayout;
