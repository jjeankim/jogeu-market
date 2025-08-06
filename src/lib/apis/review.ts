import axiosInstance from "../axiosInstance";

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
