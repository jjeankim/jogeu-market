import axiosInstance from "../axiosInstance";
import { AxiosError } from "axios";

export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
  cartItemId?: number;
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
  userCouponId?: number;
  discountAmount?: number;
  deliveryMessage?: string;
}

export const createOrder = async (orderData: OrderData) => {
  try {
    const res = await axiosInstance.post("/api/orders", orderData);

    // 주문 성공 후 장바구니에서 해당 상품들 제거
    if (orderData.items && orderData.items.length > 0) {
      try {
        const cartItemIds = orderData.items
          .filter((item) => item.cartItemId)
          .map((item) => item.cartItemId!);

        if (cartItemIds.length > 0) {
          // removeSelectedItems 함수를 여기서 직접 호출하지 말고
          // 반환 데이터에 cartItemIds를 포함시켜서 호출하는 곳에서 처리하도록 함
        }
      } catch (cartError) {
        console.error("장바구니 정리 중 오류:", cartError);
        // 장바구니 정리 실패해도 주문은 성공으로 처리
      }
    }

    return res.data;
  } catch (error) {
    console.error("주문 생성 실패", error);
    if ((error as AxiosError<{ message: string }>)?.response) {
      console.error(
        "서버 응답:",
        (error as AxiosError<{ message: string }>)?.response?.data
      );
    }
    throw error;
  }
};

export const fetchMyOrderList = async () => {
  const res = await axiosInstance.get("/api/orders");
  return res.data.data;
};
