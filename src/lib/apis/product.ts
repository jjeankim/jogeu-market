
import axiosInstance from "../axiosInstance";

export interface Product {
  id: number;
  name: string;
  productCode: string;
  brandId: number;
  price: number;
  stockQuantity: number;
  detailDescription: string;
  isSample: boolean;
  samplePrice: number | null;
  thumbnailImageUrl: string;
  brand?: {
    id: number;
    name: string;
  };
}

export interface ProductResponse {
  message: string;
  products: Product[];
}

export const fetchProducts = async (category?: string): Promise<Product[]> => {
  try {
    const params = category && category !== 'all' ? `?category=${category}` : '';
    const res = await axiosInstance.get(`/api/products?${params}`);
    return res.data.products;
  } catch (error) {
    console.error("상품 목록 조회 실패", error);
    return [];
  }
};

export const fetchProductById = async (id: number): Promise<Product | null> => {
  try {
    const res = await axiosInstance.get(`/api/products/${id}`);
    return res.data.products;
  } catch (error) {
    console.error("상품 상세 조회 실패", error);
    return null;
  }
}; 

