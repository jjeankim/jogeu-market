import axiosInstance from "../axiosInstance";

// 매개변수로 넘어가는 타입 정리해야함(찐)
export const postReview = async (productsId: string, formData: FormData) => {
  try {
    const res = await axiosInstance.post(
      `/api/products/${productsId}/reviews`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
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
