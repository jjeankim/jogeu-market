import axiosInstance from "@/lib/axiosInstance";
import type {
  ProductQnA,
  CreateProductQnARequest,
} from "@/types/product/qna";

export const fetchProductQnAs = async (
  productId: number
): Promise<ProductQnA[]> => {
  const res = await axiosInstance.get(`/api/product/${productId}/qna`);
  const data = res.data;
  if (Array.isArray(data)) return data as ProductQnA[];
  if (Array.isArray(data.qnas)) return data.qnas as ProductQnA[];
  if (Array.isArray(data.data)) return data.data as ProductQnA[];
  if (Array.isArray(data.items)) return data.items as ProductQnA[];
  if (Array.isArray(data.rows)) return data.rows as ProductQnA[];
  if (Array.isArray(data.qnaList)) return data.qnaList as ProductQnA[];
  if (Array.isArray(data.result)) return data.result as ProductQnA[];
  if (Array.isArray(data.productQnAs)) return data.productQnAs as ProductQnA[];
  // 1차 키에서 못 찾으면 중첩 객체에서 첫 배열을 찾아 반환
  if (data && typeof data === 'object') {
    for (const key of Object.keys(data)) {
      const val = (data as Record<string, unknown>)[key];
      if (Array.isArray(val)) return val as ProductQnA[];
      if (val && typeof val === 'object') {
        for (const subKey of Object.keys(val)) {
          const subVal = (val as Record<string, unknown>)[subKey];
          if (Array.isArray(subVal)) return subVal as ProductQnA[];
        }
      }
    }
  }
  return [];
};

export const createProductQnA = async (
  productId: number,
  payload: CreateProductQnARequest
): Promise<ProductQnA> => {
  const res = await axiosInstance.post(`/api/product/${productId}/qna`, payload);
  return (res.data?.qna ?? res.data) as ProductQnA;
};

export const getProductQnA = async (
  productId: number,
  qnaId: number
): Promise<ProductQnA> => {
  const res = await axiosInstance.get(
    `/api/product/${productId}/qna/${qnaId}`
  );
  return (res.data?.qna ?? res.data) as ProductQnA;
};



