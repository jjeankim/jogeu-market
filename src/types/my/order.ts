// 내 상품 후기 페이지
export type Review = {
  id: number;
  rating: number;
  reviewText: string;
  imageUrl: string | null;
  createdAt: string;
  isDeleted: boolean;
  orderItemId: number;
};

export type ProductBrand = {
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
  review?: Review[]
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
  id?: number; // orderItemId
  onWriteReview?: () => void;
}

export interface ReviewModalProps {
  mode: "create" | "edit";
  item: ReviewCardProps;
  onClose: () => void;
  refreshOrderList: () => void;
  initialRating?: number;
  initialReviewText?: string;
  initialFile?: File | null;
}
