// app/my/page.tsx (또는 적절한 위치)
import { useEffect, useState } from "react";
import Footer from "@/components/ui/Footer";
import MyPageLayoutWithWelcome from "@/components/my/MyPageLayoutWithWelcome";
import OrderTable from "@/components/my/OrderTable";
import ProductCard from "@/components/ui/ProductCard";

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
  coupon: null | any; // coupon 구조에 맞게 정의하세요
  orderItems: OrderItem[];
}

const MyOrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    fetch("http://localhost:4000/api/orders", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorMsg = await res.text();
          throw new Error(`주문 조회 실패: ${res.status} - ${errorMsg}`);
        }
        return res.json();
      })
      .then(({ data }) => {
        setOrders(data);
      })
      .catch((err) => {
        console.error("에러:", err);
        setOrders([]);
      });
  }, []);

  return (
    <>
      <MyPageLayoutWithWelcome>
        <div className="w-full min-w-[42rem] mx-auto p-4">
          <OrderTable orders={orders} />
        </div>
      </MyPageLayoutWithWelcome>
    </>
  );
};

export default MyOrderPage;
