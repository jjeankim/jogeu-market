// components/my/OrderTable.tsx
import Image from "next/image";
import Link from "next/link";

interface Brand {
  id: number;
  name: string;
}

interface Coupon {
  id: number;
  name: string;
  discountType: string;
  discountValue: number;
}

interface Product {
  id: number;
  name: string;
  productCode: string;
  brandId: number;
  price: string;
  stockQuantity: number;
  thumbnailImageUrl: string;
  detailDescription: string;
  isSample: boolean;
  samplePrice: string;
  createdAt: string;
  updatedAt: string;
  brand: Brand;
}

interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  priceAtPurchase: string;
  product: Product;
}

interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  phoneNumber: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Address {
  id: number;
  userId: number;
  recipientName: string;
  recipientPhone: string;
  addressLine1: string;
  addressLine2: string | null;
  postCode: string;
  isDefault: boolean;
}

interface Order {
  id: number;
  orderNumber: string;
  userId: number;
  shippingAddressId: number;
  couponId: number | null;
  totalAmount: string;
  shippingFee: string;
  paymentStatus: string;
  paymentMethod: string;
  deliveryMessage: string;
  isSample: boolean;
  orderedAt: string;
  updatedAt: string;
  user: User;
  address: Address;
  coupon: Coupon;
  orderItems: OrderItem[];
}

interface OrderTableProps {
  orders: Order[];
}

const OrderTable = ({ orders }: OrderTableProps) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-300 text-left p-3">
          <th className="w-1/5 p-3 text-center">주문 일자</th>
          <th className="w-2/5 p-3 text-center">상품</th>
          <th className="w-1/12 p-3 text-center">수량</th>
          <th className="w-1/6 p-3 text-center">주문 금액</th>
          <th className="w-1/6 px-8 text-center">상태</th>
        </tr>
      </thead>
      <tbody className="border-box">
        {orders.map((order) => {
          const item = order.orderItems[0];
          return (
            <tr className="border-t" key={order.id}>
              <td className="p-2 space-y-1 border-r-2 border-b-2 border-gray-300">
                <p className="text-center">
                  {new Date(order.orderedAt).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </p>
                <p className="text-center text-[#b29977]">
                  {order.orderNumber}
                </p>
                <a href="#" className="text-gray-400 text-center block">
                  상세보기
                </a>
              </td>
              <td className="p-2 mt-3 border-r-2 border-b-2 border-gray-300">
                <Link href={`/product/${item.product.id}`} passHref>
                  <div className="flex gap-3 items-center  ">
                    <Image
                      src={item.product.thumbnailImageUrl}
                      width={60}
                      height={60}
                      alt="상품이미지"
                      className="rounded-md border object-cover  "
                    />
                    <div>
                      <p className="text-gray-500">{item.product.brand.name}</p>
                      <p className="text-black line-clamp-2">
                        {item.product.name}
                      </p>
                    </div>
                  </div>
                </Link>
              </td>
              <td className="text-center border-r-2 border-b-2 border-gray-300">
                {item.quantity}
              </td>
              <td className="text-center text-red-600 pr-3 border-r-2 border-b-2 border-gray-300">
                {item.priceAtPurchase}원
              </td>
              <td className="text-center pr-3 border-box p-3 border-b-2 border-gray-300">
                <div className="flex flex-col items-center space-y-1">
                  <p className="px-1 p-1">주문완료</p>
                  <Link
                    className="px-3 py-1 border-1 rounded-full inline-block text-xs"
                    href=""
                  >
                    배송조회
                  </Link>
                  <Link
                    className="px-3 py-1 border-1 rounded-full inline-block text-xs"
                    href="/my/reviews"
                  >
                    리뷰작성
                  </Link>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default OrderTable;
