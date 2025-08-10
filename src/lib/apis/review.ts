import axiosInstance from "../axiosInstance";

export const postReview = async (productsId: number, formData: FormData) => {
  try {
    const res = await axiosInstance.post(
      `/api/products/${productsId}/reviews`,
      formData,
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
