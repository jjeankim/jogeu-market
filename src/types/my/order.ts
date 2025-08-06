import { ReactNode } from "react";

export interface OrderStatusCount {
  count: number;
  status: string;
}

export interface MyPageOrderStatusCardProps {
  children: ReactNode;
}

// 내 상품 후기 페이지
export type Review = {
  id: number;
  rating: number;
  reviewText: string;
  imageUrl: string | null;
  createdAt: string;
};

type ProductBrand = {
  name: string;
};

export type Product = {
  id: number;
  name: string;
  thumbnailImageUrl?: string;
  brand: ProductBrand;
};

export type OrderItem = {
  id: number;
  product: Product;
  review?: Review | null;
};

export type Order = {
  id: number;
  orderedAt: string;
  orderItems: OrderItem[];
};

export interface ReviewCardProps {
  product: Product;
  review?: Review | null;
  orderedAt?: string;
  id?: number;
  onWriteReview?: () => void;
  children?: ReactNode;
}
