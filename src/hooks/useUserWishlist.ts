import { useEffect, useState } from "react";
import { useToast } from "@/hooks/useToast";
import axiosInstance from "@/lib/axiosInstance";
import { WishlistItem } from "@/lib/apis/wishlist";
import { AxiosError } from "axios";
import useAuthStore from "@/store/AuthStore";

interface WishlistItemWithId {
  productId: number;
  id: number;
}

const useUserWishlist = () => {
  const [userWishlist, setUserWishlist] = useState<Map<number, number>>(
    new Map()
  );
  const { showSuccess, showError } = useToast();
  const { isLoggedIn } = useAuthStore(); // 👈 로그인 여부

  useEffect(() => {
    if (!isLoggedIn) {
      setUserWishlist(new Map()); // 로그인 안됐으면 비워두기
      return;
    }
    const fetchWishlist = async () => {
      try {
        const res = await axiosInstance.get(`/api/wishlist`);
        const wishlistItems: WishlistItemWithId[] = res.data.wishlist.map(
          (item: WishlistItem) => ({
            productId: item.productId,
            id: item.id,
          })
        );
        const wishlistMap = new Map<number, number>();
        wishlistItems.forEach((item) => {
          wishlistMap.set(item.productId, item.id);
        });

        setUserWishlist(wishlistMap);
      } catch (error: unknown) {
        console.error("위시리스트 조회 실패", error);
        showError("위시리스트를 불러오지 못했습니다.");
      }
    };
    fetchWishlist();
  }, [showError, isLoggedIn]);

  const toggleWishlist = async (productId: number) => {
    try {
      const wishlistId = userWishlist.get(productId);

      if (wishlistId) {
        // 삭제
        const res = await axiosInstance.delete(`/api/wishlist/${wishlistId}`);
        showSuccess(res.data.message);
        setUserWishlist((prev) => {
          const newMap = new Map(prev);
          newMap.delete(productId);
          return newMap;
        });
      } else {
        if (userWishlist.has(productId)) {
          showError("이미 위시리스트에 존재합니다.");
          return;
        }

        const res = await axiosInstance.post<{
          wishlist: WishlistItemWithId;
          message: string;
        }>("/api/wishlist", { productId });
        showSuccess(res.data.message);
        const newWishlistId = res.data.wishlist.id;
        setUserWishlist((prev) => {
          const newMap = new Map(prev);
          newMap.set(productId, newWishlistId);
          return newMap;
        });
      }
    } catch (error: unknown) {
      console.error("위시리스트 토글 실패", error);
      if (error instanceof AxiosError) {
        showError(
          error.response?.data?.message ||
            "위시리스트를 업데이트하는 중 오류가 발생했습니다."
        );
      } else if (error instanceof Error) {
        showError(
          error.message || "위시리스트를 업데이트하는 중 오류가 발생했습니다."
        );
      } else {
        showError("위시리스트를 업데이트하는 중 오류가 발생했습니다.");
      }
    }
  };
  return { userWishlist, toggleWishlist };
};

export default useUserWishlist;
