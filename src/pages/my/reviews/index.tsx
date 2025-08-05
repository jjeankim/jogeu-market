import SubTitle from "@/components/my/coupon/SubTitle";
import MyPageLayoutWithWelcome from "@/components/my/MyPageLayoutWithWelcome";
import Button from "@/components/ui/Button";
import { fetchMyOrderList } from "@/lib/apis/order";
import { Order, ReviewCardProps } from "@/types/my/order";
import Image from "next/image";
import { useEffect, useState } from "react";

const ReviewCard = ({ product, review, orderedAt }: ReviewCardProps) => {
  const formmatedDate = new Date(orderedAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div>
      <SubTitle title="내 상품 후기" />
      <div className="grid grid-cols-1 gap-8 border-t-2 py-10">
        <div className="flex justify-between items-center border-2 p-6 rounded-2xl">
          <div className="flex items-center gap-10">
            <Image
              className="rounded-[10px]"
              src={"/images/립.png"}
              width={100}
              height={100}
              alt={`${product.name}사진`}
            />
            <div >
              <p className="text-xl mb-6">{product.name}</p>
              <p className="underline underline-offset-4 text-gray-500">주문일: {formmatedDate}</p>
            </div>
          </div>
          <Button size="md" disabled={!!review?.reviewText}>
            {review ? "작성완료" : "후기작성"}
          </Button>
        </div>
      </div>
    </div>
  );
};

const MyReviewPage = () => {
  const [orderList, setOrderList] = useState<Order[]>([]);
  useEffect(() => {
    const getMyOrderList = async () => {
      const MyOrder = await fetchMyOrderList();

      setOrderList(MyOrder);
    };
    getMyOrderList();
  }, []);

  console.log(orderList);

  return (
    <MyPageLayoutWithWelcome>
      {orderList.map((order) =>
        order.orderItems.map((item) => (
          <ReviewCard
            key={item.id}
            product={item.product}
            review={item.review}
            orderedAt={order.orderedAt}
          />
        ))
      )}
    </MyPageLayoutWithWelcome>
  );
};

export default MyReviewPage;
