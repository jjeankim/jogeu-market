import ReviewCard from "@/components/my/review/ReviewCard";
import SubTitle from "@/components/my/coupon/SubTitle";
import MyPageLayoutWithWelcome from "@/components/my/MyPageLayoutWithWelcome";
import ModalLayout from "@/components/ui/ModalLayout";
import { fetchMyOrderList } from "@/lib/apis/order";
import { Order, ReviewCardProps } from "@/types/my/order";
import { useEffect, useState } from "react";
import ReviewModal from "@/components/my/review/ReviewModal";
import WrittenReviewCard from "@/components/my/review/WrittenReviewCard";
import Image from "next/image";
import { formatKoreanDate } from "@/lib/utils/date";

export const ReviewCardLayout = ({
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

const MyReviewPage = () => {
  const [orderList, setOrderList] = useState<Order[]>([]);
  const [filter, setFilter] = useState<"all" | "written" | "unwritten">(
    "unwritten"
  );
  // 모달 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ReviewCardProps | null>(
    null
  );

  // 후기 작성 버튼 클릭 시 호출할 함수
  const openModal = (item: ReviewCardProps) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const getMyOrderList = async () => {
    const MyOrder = await fetchMyOrderList();
    setOrderList(MyOrder);
  };

  // 나의 주문 목록을 가져옴
  useEffect(() => {
    getMyOrderList();
  }, []);

  const filteredItems = orderList.flatMap((order) =>
    order.orderItems
      .filter((item) => {
        const review = item.review?.[0];

        const hasText = review?.reviewText?.trim();
        const isDeleted = review?.isDeleted;

        if (filter === "written") {
          // 리뷰 텍스트가 있고, 삭제되지 않은 경우만 포함
          return hasText && !isDeleted;
        }

        if (filter === "unwritten") {
          // 리뷰 텍스트가 없는 경우 (삭제 여부는 무관)
          return !hasText;
        }

        return true; // "all"인 경우
      })
      .map((item) => ({
        ...item,
        orderedAt: order.orderedAt,
      }))
  );
  console.log(filteredItems);

  const allOrderItems = orderList.flatMap((order) =>
    order.orderItems.map((item) => ({
      ...item,
      orderedAt: order.orderedAt,
    }))
  );

  const writtenCount = allOrderItems.filter((item) => {
    const review = item.review?.[0];
    return review?.reviewText?.trim() && !review?.isDeleted;
  }).length;

  const unwrittenCount = allOrderItems.filter((item) => {
    const review = item.review?.[0];
    return !review?.reviewText?.trim();
  }).length;

  return (
    <MyPageLayoutWithWelcome>
      <div>
        <div className="flex justify-between">
          <SubTitle title="내 상품 후기" />
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setFilter("unwritten")}
              className="cursor-pointer"
            >
              {`작성 가능한 후기 (${unwrittenCount})`}
            </button>
            <button
              onClick={() => setFilter("written")}
              className="cursor-pointer"
            >
              {`작성한 후기 (${writtenCount}) `}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 border-t-2 relative">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) =>
              filter === "written" ? (
                <WrittenReviewCard
                  key={item.id}
                  product={item.product}
                  review={item.review?.[0]}
                  orderedAt={item.orderedAt}
                  id={item.id}
                  refreshOrderList={getMyOrderList}
                />
              ) : (
                <ReviewCard
                  key={item.id}
                  product={item.product}
                  review={item.review?.[0]}
                  orderedAt={item.orderedAt}
                  onWriteReview={() =>
                    openModal({
                      product: item.product,
                      review: item.review?.[0],
                      orderedAt: item.orderedAt,
                      id: item.id,
                    })
                  }
                />
              )
            )
          ) : (
            <p className="col-span-2 text-gray-500 text-center py-10">
              {filter === "written"
                ? "작성한 리뷰가 없습니다."
                : "작성할 리뷰가 없습니다."}
            </p>
          )}
        </div>
      </div>
      {isModalOpen && selectedItem && (
        <ModalLayout onClose={closeModal}>
          <ReviewModal
            mode="create"
            item={selectedItem}
            onClose={closeModal}
            refreshOrderList={getMyOrderList}
          />
        </ModalLayout>
      )}
    </MyPageLayoutWithWelcome>
  );
};

export default MyReviewPage;
