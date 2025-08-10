import { useState } from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { ReviewModalProps } from "@/types/my/order";
import { formatKoreanDate } from "@/lib/utils/date";
import { postReview, updateReview } from "@/lib/apis/review";
import { useToast } from "@/hooks/useToast";
import CustomFileInput from "./CustomFileInput";

const ReviewModal = ({
  mode,
  item,
  onClose,
  refreshOrderList,
  initialRating = 0,
  initialReviewText = "",
  initialFile = null,
}: ReviewModalProps) => {
  const [rating, setRating] = useState(initialRating);
  const [review, setReview] = useState(initialReviewText);
  const [selectedFile, setSelectedFile] = useState<File | null>(initialFile);
  const [fileName, setFileName] = useState<string>("");

  const { showError, showSuccess } = useToast();
  const starArr = [1, 2, 3, 4, 5];

  const handleClickStar = (star: number) => {
    setRating(star);
  };

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    setFileName(file?.name ?? "");
  };

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("rating", String(rating));
    formData.append("reviewText", review);
    formData.append("orderItemId", String(item.id));

    if (selectedFile) {
      formData.append("imageUrl", selectedFile);
    }

    try {
      if (mode === "create") {
        await postReview(item.product.id, formData);
        showSuccess("리뷰 작성에 성공했습니다");
      } else {
        await updateReview(item.product.id, item.review!.id, formData);
        showSuccess("리뷰가 수정되었습니다");
      }
      await refreshOrderList();
      onClose();
    } catch (error) {
      showError("리뷰 저장 중 에러가 발생했습니다. 다시 시도해주세요");
      console.error("리뷰 저장 중 에러", error);
    }
  };

  return (
    <div>
      <h4 className="text-xl font-bold mb-8">
        {mode === "create" ? "후기 작성" : "후기 수정"}
      </h4>

      <div className="flex gap-6 mb-8">
        <Image
          width={80}
          height={80}
          src={
            item.review?.imageUrl?.trim() ||
            item.product.thumbnailImageUrl?.trim() ||
            "/images/립.png"
          }
          alt="제품 사진"
          className="rounded-[10px]"
        />
        <div className="flex flex-col justify-between py-2">
          <p className="font-bold">{item.product.name}</p>
          {item.orderedAt && (
            <p className="text-sm text-gray-400">
              {`구매일 : ${formatKoreanDate(item.orderedAt)}`}
            </p>
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
        <CustomFileInput onFileSelect={handleFileSelect} fileName={fileName} />
        <Button
          type="submit"
          size="full"
          color="gold"
          disabled={rating === 0 || review.trim() === ""}
        >
          {mode === "create" ? "작성하기" : "수정하기"}
        </Button>
      </form>
    </div>
  );
};

export default ReviewModal;
