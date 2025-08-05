import axiosInstance from "../axiosInstance";

export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
  cartItemId?: number; // 장바구니 아이템 ID (선택적)
}

export interface OrderData {
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: {
    zipCode: string;
    roadAddress: string;
    detailAddress: string;
  };
  recipientName: string;
  recipientPhone: string;
  ordererName: string;
  ordererPhone: string;
  ordererEmail?: string;
  couponId?: number;
  discountAmount?: number;
  deliveryMessage?: string;
}

export const createOrder = async (orderData: OrderData) => {
  try {
    console.log('주문 데이터 전송:', orderData);
    const res = await axiosInstance.post("/api/orders", orderData);
    console.log('주문 생성 성공:', res.data);
    return res.data;
  } catch (error: any) {
    console.error("주문 생성 실패", error);
    if (error.response) {
      console.error("서버 응답:", error.response.data);
    }
    throw error;
  }
};

export const fetchMyOrderList = async () => {
  try {
    const res = await axiosInstance.get("/api/orders");
    return res.data.data;
  } catch (error) {
    console.error("내 주문 내역 조회 실패", error);
  }
};
