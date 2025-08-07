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

export const axiosProducts = async (
  category?: string, 
  menu?: string, 
  limit?: number
): Promise<Product[]> => {
  try {
    const params = new URLSearchParams();
    
    if (category && category !== 'all') {
      params.append('category', category);
    }
    
    if (menu && menu !== 'all') {
      params.append('menu', menu);
    }
    
    if (limit) {
      params.append('limit', limit.toString());
    }
    
    const queryString = params.toString();
    const url = queryString ? `/api/product?${queryString}` : '/api/product';
    
    const res = await axiosInstance.get(url);
    return res.data.products;
  } catch (error) {
    console.error("상품 목록 조회 실패", error);
    return [];
  }
};

export const axiosProductById = async (id: number): Promise<Product | null> => {
  try {
    const res = await axiosInstance.get(`/api/product/${id}`);
    return res.data.products;
  } catch (error) {
    console.error("상품 상세 조회 실패", error);
    return null;
  }
};


export const axiosSearchProducts = async (
  query: string,
  page : number =1,
  limit : number = 10
): Promise<Product[]> => {
  try {
    const params = new URLSearchParams();
    params.append('query', query);
    params.append('page', page.toString());
    params.append('limit', limit.toString());

    
    const res = await axiosInstance.get(`/api/product/search?${params.toString()}`);
    return res.data.products;
  } catch (error) {
    console.error("검색 상품 조회 실패", error);
    return [];
  }
};