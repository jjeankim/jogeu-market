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
  children,
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
      {children && <div></div>}
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

const getMyOrderList = async() => {
  const MyOrder = await fetchMyOrderList();
  setOrderList(MyOrder)
}

  // 나의 주문 목록을 가져옴
  useEffect(() => {
    
    getMyOrderList();
  }, []);

  // 가져온 주문 목록에서 리뷰가 작성된 것과 작성할 것을 구분함
  const filteredItems = orderList.flatMap((order) =>
    order.orderItems
      .filter((item) => {
        
        // 리뷰가 존재하고, 삭제되지 않았고, 리뷰 텍스트가 있어야 하는 
        const isWritten =
          item.review && !item.review.isDeleted && item.review.reviewText;
        if (filter === "written") return isWritten;
        // isWritten 조건에 맞지 않으면서 소프트삭제 된 아이템만 노출
        if (filter === "unwritten") return !isWritten && (!item.review?.isDeleted);
        return true;
      })
      .map((item) => ({
        ...item,
        orderedAt: order.orderedAt,
      }))
  );

  const allOrderItems = orderList.flatMap((order) =>
    order.orderItems.map((item) => ({
      ...item,
      orderedAt: order.orderedAt,
    }))
  );
  
  const writtenCount = allOrderItems.filter(
    (item) => !!item.review?.reviewText && !item.review?.isDeleted
  ).length;
  
  const unwrittenCount = allOrderItems.filter(
    (item) => !item.review?.reviewText || item.review?.isDeleted
  ).length;

  console.log(orderList);

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
                  review={item.review}
                  orderedAt={item.orderedAt}
                  id={item.id}
                  refreshOrderList = {getMyOrderList}
                />
              ) : (
                <ReviewCard
                  key={item.id}
                  product={item.product}
                  review={item.review}
                  orderedAt={item.orderedAt}
                  onWriteReview={() =>
                    openModal({
                      product: item.product,
                      review: item.review,
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
            item={selectedItem}
            onClose={() => {
              closeModal()
              
            }}
            refreshOrderList={getMyOrderList}
          />
        </ModalLayout>
      )}
    </MyPageLayoutWithWelcome>
  );
};

export default MyReviewPage;
