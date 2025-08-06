import { useState } from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { ReviewCardProps } from "@/types/my/order";
import { formatKoreanDate } from "@/lib/utils/date";
import { postReview } from "@/lib/apis/review";
import { useToast } from "@/hooks/useToast";

const ReviewModal = ({
  item,
  onClose,
  refreshOrderList,
}: {
  item: ReviewCardProps;
  onClose: () => void;
  refreshOrderList: () => void;
}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  console.log(item);

  const { showError, showSuccess } = useToast();

  const starArr = [1, 2, 3, 4, 5];

  const handleClickStar = (star: number) => {
    setRating(star);
  };

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("rating", String(rating));
    formData.append("reviewText", review);
    formData.append("orderItemId", String(item.id));

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      await postReview(String(item.product.id), formData);
      await refreshOrderList()
      showSuccess("리뷰 작성에 성공했습니다");
      onClose();
    } catch (error) {
      showError("리뷰 작성 중 에러가 발생했습니다. 다시 시도해주세요");
      console.log("리뷰 작성 중 에러", error);
    }
  };

  return (
    <div>
      <h4 className="text-xl font-bold mb-8">후기 작성</h4>
      <div className="flex gap-6 mb-8">
        <Image
          width={80}
          height={80}
          src={"/images/립.png"}
          alt="제품 사진"
          className="rounded-[10px]"
        />
        <div className="flex flex-col justify-between py-2">
          <p className="font-bold">{item.product.name}</p>
          {item.orderedAt && (
            <p className="text-sm text-gray-400">{`구매일 : ${formatKoreanDate(item.orderedAt)}`}</p>
          )}
        </div>
      </div>
      <div className="flex justify-center gap-2 mb-8">
        {starArr.map((star) => (
          <FaStar
            key={star}
            size={40}
            onClick={() => handleClickStar(star)}
            className={`cursor-pointer hover:opacity-80 ${
              rating >= star ? "text-amber-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <form onSubmit={submitReview}>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="후기를 작성해주세요."
          className="border border-gray-400 resize-none w-full h-[100px] rounded-[10px] p-4 mb-2 focus:outline-logo"
        />

        {/* 파일 인풋 추가하기 */}
        {/* <input type="file" /> */}

        <Button type="submit" size="full" color="gold">
          작성하기
        </Button>
      </form>
    </div>
  );
};

export default ReviewModal;
