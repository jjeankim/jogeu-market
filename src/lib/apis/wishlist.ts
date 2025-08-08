import axiosInstance from "../axiosInstance";

export interface Brand {
  id: number;
  name: string;
  logoImageUrl: string | null;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
}

export interface Product {
  id: number;
  name: string;
  productCode: string;
  brandId: number;
  price: number;
  stockQuantity: number;
  thumbnailImageUrl: string | null;
  detailImageUrl: string | null;
  detailDescription: string;
  isSample: boolean;
  samplePrice: number | null;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  brand: Brand;
  category: Category;
  purchaseCount?: string;
  isPick: boolean;
}

export interface WishlistItem {
  id: number;
  userId: number;
  productId: number;
  createdAt: string;
  product: Product;
}

export interface WishlistResponse {
  message: string;
  wishlist: WishlistItem[];
  totalPages?: number; // 페이지네이션 지원 시
  totalCount?: number;
}

export const axiosWishlist = async (
  page: number = 1,
  limit: number = 10
): Promise<WishlistResponse | null> => {
  try {
    const res = await axiosInstance.get<WishlistResponse>("/api/wishlist", {
      params: { page, limit },
    });
    return res.data;
  } catch (error) {
    console.error("위시리스트 조회 실패", error);
    return null;
  }
};
