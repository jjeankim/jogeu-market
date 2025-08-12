export type ProductQnAStatus = "PENDING" | "ANSWERED";

export type ProductQnA = {
  id: number;
  productId: number;
  userId: number;
  question: string;
  answer?: string | null;
  status: ProductQnAStatus;
  isPublic: boolean;
  createdAt: string; // ISO string
  answeredAt?: string | null; // ISO string or null
  user?: {
    id: number;
    name: string;
  };
};

export type CreateProductQnARequest = {
  question: string;
  isPublic: boolean;
};
