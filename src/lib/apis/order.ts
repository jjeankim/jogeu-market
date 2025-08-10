import axiosInstance from "../axiosInstance";

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
  couponId?: number;
  discountAmount?: number;
  deliveryMessage?: string;
}

export const createOrder = async (orderData: OrderData) => {
  try {
    console.log("주문 데이터 전송:", orderData);
    const res = await axiosInstance.post("/api/orders", orderData);
    console.log("주문 생성 성공:", res.data);

    // 주문 성공 후 장바구니에서 해당 상품들 제거
    if (orderData.items && orderData.items.length > 0) {
      try {
        const cartItemIds = orderData.items
          .filter((item) => item.cartItemId)
          .map((item) => item.cartItemId!);

        if (cartItemIds.length > 0) {
          console.log("장바구니에서 주문된 상품들 제거:", cartItemIds);
          // removeSelectedItems 함수를 여기서 직접 호출하지 말고
          // 반환 데이터에 cartItemIds를 포함시켜서 호출하는 곳에서 처리하도록 함
        }
      } catch (cartError) {
        console.error("장바구니 정리 중 오류:", cartError);
        // 장바구니 정리 실패해도 주문은 성공으로 처리
      }
    }

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
  const res = await axiosInstance.get("/api/orders");
  return res.data.data;
};
