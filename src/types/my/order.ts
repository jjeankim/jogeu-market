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

export type Product = {
  id: number;
  name: string;
  thumbnailImageUrl?: string;
};

export type OrderItem = {
  id: number;
  product: Product;
  review?: Review | null; // 리뷰가 없을 수도 있음
};

export type Order = {
  id: number;
  orderedAt: string;
  orderItems: OrderItem[];
};

export interface ReviewCardProps {
  product: Product;
  review?: Review | null;
  orderedAt: string;
}