import axiosInstance from "../axiosInstance";
import { AxiosError } from "axios";

export interface CartItem {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: string;
    productCode: string;
    thumbnailImageUrl: string | null;
    detailDescription: string;
    isSample: boolean;
    samplePrice: string;
    stockQuantity: number;
    brand: {
      id: number;
      name: string;
    };
  };
}

export interface CartResponse {
  message: string;
  carts: CartItem[];
}

export interface UpdateCartQuantityRequest {
  quantity: number;
}

export interface AddToCartRequest {
  productId: number;
  quantity: number;
}

// 장바구니 조회
export const getCartItems = async (): Promise<CartItem[]> => {
  const response = await axiosInstance.get<CartResponse>("/api/cart");
  return response.data.carts;
};

// 장바구니에 상품 추가
export const addToCart = async (data: AddToCartRequest): Promise<void> => {
  await axiosInstance.post("/api/cart", data);
};

// 장바구니 수량 업데이트
export const updateCartQuantity = async (
  cartItemId: number,
  quantity: number
): Promise<void> => {
  await axiosInstance.patch(`/api/cart/${cartItemId}`, { quantity });
};

// 장바구니 아이템 삭제
export const removeFromCart = async (cartItemId: number): Promise<void> => {
  try {
    console.log(`장바구니 아이템 삭제 요청: DELETE /api/cart/${cartItemId}`);
    const response = await axiosInstance.delete(`/api/cart/${cartItemId}`);
    console.log(`장바구니 아이템 ${cartItemId} 삭제 성공:`, response.data);
  } catch (error) {
    console.error(`장바구니 아이템 ${cartItemId} 삭제 실패:`, {
      status: (error as AxiosError<{ message: string }>)?.response?.status,
      statusText: (error as AxiosError<{ message: string }>)?.response?.statusText,
      data: (error as AxiosError<{ message: string }>)?.response?.data,
      message: (error as AxiosError<{ message: string }>)?.response?.data?.message,
      url: `/api/cart/${cartItemId}`
    });
    throw error;
  }
};

// 선택된 장바구니 아이템들 삭제
export const removeSelectedItems = async (cartItemIds: number[]): Promise<void> => {
  await Promise.all(cartItemIds.map(id => removeFromCart(id)));
};

// 중복된 장바구니 아이템들 정리
export const mergeDuplicateCartItems = async (): Promise<{ message: string; mergedCount: number }> => {
  const response = await axiosInstance.post("/api/cart/merge-duplicates");
  return response.data;
};