import { ReactNode } from "react";
import { FiChevronRight } from "react-icons/fi";

interface OrderStatusCount {
  count: number;
  status: string;
}

interface MyPageOrderStatusCardProps {
  children: ReactNode;
}

const OrderStatusCount = ({ count, status }: OrderStatusCount) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <span className="text-gray-400 text-5xl font-bold">{count}</span>
      <span>{status}</span>
    </div>
  );
};

const MyPageOrderStatusCard = ({ children }: MyPageOrderStatusCardProps) => {
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
