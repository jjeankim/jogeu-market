import { FiChevronRight } from "react-icons/fi";

interface OrderStatusCount {
  count: number;
  status: string;
}

const OrderStatusCount = ({ count, status }: OrderStatusCount) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <span className="text-gray-400 text-5xl font-bold">{count}</span>
      <span>{status}</span>
    </div>
  );
};

const MyPageOrderStatusCard = () => {
  return (
    <div className="mb-20">
      <div className="flex gap-14 items-baseline mb-10">
        <h3 className="text-3xl font-bold">진행 중인 주문</h3>
        <span className="text-gray-400">최근 6개월 기준</span>
      </div>
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
