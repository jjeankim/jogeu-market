// hooks/useCart.ts
import { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { useToast } from "./useToast";

export const useCart = () => {
  const [cartItems, setCartItems] = useState<Map<number, number>>(new Map());
  const { showSuccess, showError } = useToast();

  const addToCart = async (productId: number) => {
    try {
      const res = await axiosInstance.post("/api/cart", {
        productId,
        quantity: 1,
      });
      showSuccess(res.data.message);
      setCartItems((prev) => new Map(prev).set(productId, 1));
    } catch (error: unknown) {
      console.error("장바구니 추가 실패", error);
      showError("장바구니 추가 실패");
    }
  };

  return { cartItems, addToCart };
};
