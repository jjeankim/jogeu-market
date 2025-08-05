import { fetchMyOrderList } from "@/lib/apis/order";
import type {
  MyPageOrderStatusCardProps,
  OrderStatusCount,
} from "@/types/my/order";
import { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";

const OrderStatusCount = ({ count, status }: OrderStatusCount) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <span className="text-gray-400 text-5xl font-bold">{count}</span>
      <span>{status}</span>
    </div>
  );
};

const MyPageOrderStatusCard = ({ children }: MyPageOrderStatusCardProps) => {
  const [orderList, setOrderList] = useState([])

  useEffect(() => {
    const getMyOrder = async () => {
      const myOrder = await fetchMyOrderList();
      setOrderList(myOrder)
    }
    getMyOrder()
  },[])

  console.log(orderList);
  // order 모델에 주문 상태누락으로 추후 변경해야함

  return (
    <div className="mb-20">
      {children}
      <div className="border-2 rounded-2xl flex justify-between items-center px-16 py-6">
        <OrderStatusCount count={0} status="주문완료" />
        <FiChevronRight size={35} />
        <OrderStatusCount count={0} status="배송 준비 중" />
        <FiChevronRight size={35} />
        <OrderStatusCount count={0} status="배송 중" />
        <FiChevronRight size={35} />
        <OrderStatusCount count={0} status="배송 완료" />
      </div>
    </div>
  );
};

export default MyPageOrderStatusCard;
