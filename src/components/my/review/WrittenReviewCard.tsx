import Button from "@/components/ui/Button";
import { ReviewCardProps } from "@/types/my/order";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { FiX } from "react-icons/fi";

const WrittenReviewCard = ({ product, review}: ReviewCardProps) => {
  const rating = review?.rating ?? 0;

  return (
    <div className="border-b border-b-gray-300 p-6">
      <div className="flex items-center gap-10">
        <Image
          className="rounded-[10px]"
          src={"/images/립.png"}
          alt={`${product.name}사진`}
          width={100}
          height={100}
        />
        <div>
          <p className="text-md mb-1 text-gray-500">{`[${product.brand.name}]`}</p>
          <p className="text-xl mb-4">{product.name}</p>
          
        </div>
        <button type="button" className="cursor-pointer">
          <FiX className="absolute right-0 top-0 text-gray-200" />
        </button>
      </div>
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
          <p className="my-4">{review?.reviewText}</p>
       
        <Button size="sm" variant="outlined" color="gold" className="absolute right-0 top-0">수정</Button>
      </div>
    </div>
  );
};

export default WrittenReviewCard;
