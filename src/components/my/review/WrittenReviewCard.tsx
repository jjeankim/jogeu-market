import Button from "@/components/ui/Button";
import ModalLayout from "@/components/ui/ModalLayout";
import { useToast } from "@/hooks/useToast";
import { deleteReview } from "@/lib/apis/review";
import { ReviewCardLayout } from "@/pages/my/reviews";
import { ReviewCardProps } from "@/types/my/order";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import ReviewModal from "./ReviewModal";

const WrittenReviewCard = ({
  product,
  review,
  refreshOrderList,
}: ReviewCardProps & { refreshOrderList: () => void }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const rating = review?.rating ?? 0;

  const { showSuccess, showError } = useToast();
  const productId = product.id;
  const reviewId = review?.id;

  const handleClickDelete = async () => {
    try {
      await deleteReview(productId, reviewId!);
      await refreshOrderList();
      showSuccess("후기가 삭제 되었습니다.");
      setOpenDeleteModal(false);
    } catch (error) {
      console.error("리뷰 삭제 중 오류", error);
      showError("후기 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="border-b border-b-gray-300 p-6 relative">
      <ReviewCardLayout product={product} />

      <div className="relative">
        <div className="flex mt-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <FaStar
              key={index}
              className={index < rating ? "text-yellow-400" : "text-gray-300"}
            />
          ))}
          <span className="ml-2 text-sm">{rating}</span>
        </div>
        <p className="mt-6">{review?.reviewText}</p>

        {/* 수정 버튼 */}
        <Button
          size="sm"
          variant="outlined"
          color="gold"
          className="absolute right-0 top-0"
          onClick={() => setOpenUpdateModal(true)}
        >
          수정
        </Button>
      </div>

      {/* 삭제 버튼 */}
      <button
        className="absolute right-6 top-6 text-gray-300"
        onClick={() => setOpenDeleteModal(true)}
      >
        <FiX className="cursor-pointer" />
      </button>

      {/* 삭제 확인 모달 */}
      {openDeleteModal && (
        <ModalLayout onClose={() => setOpenDeleteModal(false)}>
          <div className="flex flex-col gap-4 items-center">
            <FaCheckCircle size={24} />
            <div>리뷰를 삭제하시겠어요?</div>
            <div className="mt-2 flex gap-4">
              <Button variant="outlined" size="sm" onClick={handleClickDelete}>
                삭제
              </Button>
              <Button onClick={() => setOpenDeleteModal(false)}>취소</Button>
            </div>
          </div>
        </ModalLayout>
      )}

      {/* 수정 모달 */}
      {openUpdateModal && review && (
        <ModalLayout onClose={() => setOpenUpdateModal(false)}>
          <ReviewModal
            mode="edit"
            item={{ product, review, id: review.orderItemId }}
            onClose={() => setOpenUpdateModal(false)}
            refreshOrderList={refreshOrderList}
            initialRating={review.rating}
            initialReviewText={review.reviewText}
            initialFile={null} // 서버 이미지 있으면 초기 세팅 가능
          />
        </ModalLayout>
      )}
    </div>
  );
};

export default WrittenReviewCard;