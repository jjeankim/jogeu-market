import ReviewCard from "@/components/my/review/ReviewCard";
import SubTitle from "@/components/my/coupon/SubTitle";
import MyPageLayoutWithWelcome from "@/components/my/MyPageLayoutWithWelcome";
import ModalLayout from "@/components/ui/ModalLayout";
import { fetchMyOrderList } from "@/lib/apis/order";
import { Order, ReviewCardProps } from "@/types/my/order";
import { useCallback, useEffect, useState } from "react";
import ReviewModal from "@/components/my/review/ReviewModal";
import WrittenReviewCard from "@/components/my/review/WrittenReviewCard";
import { useToast } from "@/hooks/useToast";
import axios from "axios";

const MyReviewPage = () => {
  const [orderList, setOrderList] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const { showError } = useToast();
  const [filter, setFilter] = useState<"all" | "written" | "unwritten">(
    "unwritten"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ReviewCardProps | null>(
    null
  );

  const openModal = (item: ReviewCardProps) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const loadOrders = useCallback(
    async (opts?: { silent?: boolean }) => {
      const silent = opts?.silent ?? orderList.length > 0;
      if (!silent) setLoading(true);
      try {
        const myOrder = await fetchMyOrderList();
        setOrderList(myOrder ?? []);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showError("주문 목록을 불러오는데 실패했습니다.");
        } else {
          showError("네트워크 오류가 발생했습니다.");
        }
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [orderList.length, showError]
  );

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

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
  // orderList[] > orderItem[] > review[]를 가져오는 구조로

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
              {`작성한 후기 (${writtenCount})`}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 border-t-2 relative">
          {loading && orderList.length === 0 ? (
            // 처음 로딩에만 스피너 표시 (깜빡임 방지)
            <div className="py-10 flex justify-center">
              {/* <LoadingSpinner /> */}
              <p className="text-gray-500">로딩 중...</p>
            </div>
          ) : filteredItems.length > 0 ? (
            filteredItems.map((item) =>
              filter === "written" ? (
                <WrittenReviewCard
                  key={item.id}
                  product={item.product}
                  review={item.review?.[0]}
                  orderedAt={item.orderedAt}
                  id={item.id}
                  refreshOrderList={() => loadOrders({ silent: true })}
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
            refreshOrderList={() => loadOrders({ silent: true })}
          />
        </ModalLayout>
      )}
    </MyPageLayoutWithWelcome>
  );
};

export default MyReviewPage;
