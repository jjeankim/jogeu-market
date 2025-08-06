import axiosInstance from "../axiosInstance";

export interface Brand {
  id: number;
  name: string;
  logoImageUrl: string;
}

export const axiosBrands = async (
  categorySlug?: string,
  subCategoryPrefix?: string
): Promise<Brand[]> => {
  try {
    const params: Record<string, string> = {};
    if (categorySlug) params.categorySlug = categorySlug;
    if (subCategoryPrefix) params.subCategoryPrefix = subCategoryPrefix;

    const res = await axiosInstance.get("/api/brand", { params });
    return res.data.brands;
  } catch (error) {
    console.error("브랜드 목록 조회 실패", error);
    return [];
  }
};
