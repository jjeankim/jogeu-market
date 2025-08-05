import ReviewCard from "@/components/my/review/ReviewCard";
import SubTitle from "@/components/my/coupon/SubTitle";
import MyPageLayoutWithWelcome from "@/components/my/MyPageLayoutWithWelcome";
import Button from "@/components/ui/Button";
import ModalLayout from "@/components/ui/ModalLayout";
import { fetchMyOrderList } from "@/lib/apis/order";
import { Order, ReviewCardProps } from "@/types/my/order";
import { useEffect, useState } from "react";
import ReviewModal from "@/components/my/review/ReviewModal";

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

  useEffect(() => {
    const getMyOrderList = async () => {
      const MyOrder = await fetchMyOrderList();

      setOrderList(MyOrder);
    };
    getMyOrderList();
  }, []);

  const filteredItems = orderList.flatMap((order) =>
    order.orderItems
      .filter((item) => {
        if (filter === "written") return !!item.review?.reviewText;
        if (filter === "unwritten") return !item.review?.reviewText;
        return true; // "all"
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
    (item) => !!item.review?.reviewText
  ).length;
  
  const unwrittenCount = allOrderItems.filter(
    (item) => !item.review?.reviewText
  ).length;

  console.log(orderList);

  return (
    <MyPageLayoutWithWelcome>
      <div>
        <div className="flex justify-between">
          <SubTitle title="내 상품 후기" />
          <div className="flex gap-4 items-center">
            <Button onClick={() => setFilter("unwritten")} variant="outlined">
              {`작성 가능한 후기 (${unwrittenCount})`}
            </Button>
            <Button onClick={() => setFilter("written")} variant="outlined">
            {`작성한 후기 (${writtenCount})`}
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 border-t-2 py-10">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
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
                    id:item.id,
                  })
                }
              />
            ))
          ) : (
            <p className="col-span-2 text-gray-500 text-center">
              {filter === "written"
                ? "작성한 리뷰가 없습니다."
                : "작성할 리뷰가 없습니다."}
            </p>
          )}
        </div>
      </div>
      {isModalOpen && selectedItem && (
        <ModalLayout onClose={closeModal}>
          <ReviewModal item={selectedItem} onClose={closeModal} />
        </ModalLayout>
      )}
    </MyPageLayoutWithWelcome>
  );
};

export default MyReviewPage;
