import { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { useToast } from "./useToast";
import { AxiosError } from "axios";

const useProductActions = (productId: number) => {
  const [wish, setWish] = useState(false);
  const [wishId, setWishId] = useState<number | null>(null);
  const [cart, setCart] = useState(false);
  const [cartId, setCartId] = useState<number | null>(null);

  const { showSuccess, showError } = useToast();

  const toggleWish = async (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    try {
      if (!wish) {
        const res = await axiosInstance.post("api/wishlist", { productId });
        console.log("wishlist API response", res.data);
        showSuccess(res.data.message);
        setWish(true);
        setWishId(res.data.wishlist.id);
        // mutate("/api/wishlist");
      } else {
        if (!wishId) {
          showError("삭제할 위시리스트 상품을 찾을 수 없습니다.");
          return;
        }
        const res = await axiosInstancce.delete(`/api/wishlist/${wishId}`);
        showSuccess(res.data.message);
        setWish(false);
        setWishId(null);
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        showError("이미 위시리스트에 추가된 상품입니다.");
      } else if (
        error instanceof AxiosError &&
        error.response?.status === 401
      ) {
        showError("유효하지 않은 사용자입니다.");
      } else {
        showError("서버 오류가 발생했습니다.");
        console.error(error);
      }
    }
  };

  const addToCart = async (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    try {
      const res = await axiosInstance.post("/api/cart", {
        productId,
        quantity: 1,
      });
      console.log("cart API response", res.data);
      showSuccess(res.data.message);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        showError("유효하지 않은 사용자입니다.");
      } else {
        showError("서버 오류가 발생했습니다.");
        console.error(error);
      }
    }
  };

  return { wish, toggleWish, addToCart };
};

export default useProductActions;
