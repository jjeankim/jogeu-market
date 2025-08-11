import axiosInstance from "../axiosInstance";

export const postReview = async (productsId: number, formData: FormData) => {
  try {
    const res = await axiosInstance.post(
      `/api/products/${productsId}/reviews`,
      formData
    );
    return res.data;
  } catch (error) {
    console.error("상품 리뷰 작성 성공", error);
  }
};

export const deleteReview = async (id: number, reviewId: number) => {
  try {
    await axiosInstance.delete(`/api/products/${id}/reviews/${reviewId}`);
  } catch (error) {
    console.error("상품 리뷰 삭제 실패", error);
  }
};

// 리뷰 수정하기
export const updateReview = async (
  productId: number,
  reviewId: number,
  formData: FormData
) => {
  try {
    const res = await axiosInstance.put(
      `/api/products/${productId}/reviews/${reviewId}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return res.data;
  } catch (error) {
    console.error("상품 리뷰 수정 실패", error);
  }
};

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

// 선우 수정 작업영역
export interface ReviewsParams {
  productId: number;
  page?: number;
  limit?: number;
}

export interface ReviewUser {
  email: string;
}

export interface ReviewItem {
  id: number;
  productId: number;
  userId: number;
  rating: number;
  reviewText: string;
  imageUrl: string | null;
  likesCount: number;
  createdAt: string;
  updatedAt: string;
  orderItemId: number;
  isDeleted: boolean;
  user: ReviewUser;
  maskedLocalPart: string;
}

export interface ReviewsApiResponse {
  message: string;
  data: ReviewItem[];
  pagination: {
    total: number;
    page: number;
    totalPages: number;
    limit: number;
    hasMore: boolean;
  };
}

// 전체 리뷰 조회
export const getAllReviews = async (
  productId: number,
  params: { page?: number; limit?: number } = {}
): Promise<ReviewsApiResponse | null> => {
  try {
    const res = await axiosInstance.get(`/api/products/${productId}/reviews`, {
      params,
    });
    return res.data as ReviewsApiResponse;
  } catch (error) {
    console.error("상품 리뷰 조회 실패", error);
    return null;
  }
};
