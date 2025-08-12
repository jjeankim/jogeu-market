// app/my/page.tsx (또는 적절한 위치)
import { useEffect, useState } from "react";
import MyPageLayoutWithWelcome from "@/components/my/MyPageLayoutWithWelcome";
import OrderTable from "@/components/my/OrderTable";
import SEO from "@/components/SEO";
import { Coupon } from "@/lib/apis/coupon";
import axiosInstance from "@/lib/axiosInstance";
import { isAxiosError } from "axios";
import { useToast } from "@/hooks/useToast";

interface Brand {
  id: number;
  name: string;
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

const MyOrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { showError } = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get("api/orders");
        console.log(res.data.data);
        setOrders(res.data.data);
      } catch (error) {
        if (isAxiosError(error)) {
          console.error(
            "주문 조회 실패: ",
            error.response?.data?.message || error.message
          );
        } else if (error instanceof Error) {
          console.error("주문조회 실패: ", error.message);
        } else {
          showError("서버 오류가 발생했습니다.");
          console.error(error);
        }
        setOrders([]);
      }
    };

    fetchOrders();
  }, [showError]);

  return (
    <>
      <SEO title="마이쇼핑" />
      <MyPageLayoutWithWelcome>
        <div className="w-full min-w-[42rem] mx-auto p-4">
          <OrderTable orders={orders as Order[]} />
        </div>
      </MyPageLayoutWithWelcome>
    </>
  );
};

export default MyOrderPage;
