import axiosInstance from "../axiosInstance";

export interface Brand {
  id: number;
  name: string;
  logoImageUrl: string | null;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
}

export interface Product {
  id: number;
  name: string;
  productCode: string;
  brandId: number;
  price: number;
  stockQuantity: number;
  thumbnailImageUrl: string;
  detailImageUrl: string;
  detailDescription: string;
  isSample: boolean;
  samplePrice: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  brand: Brand;
  category: Category;
  purchaseCount?: string;
}

export interface ProductParams {
  category?: string;
  productCode?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface ProductResponse {
  message: string;
  products: Product[];
  totalCount: number;
}


export interface ProductDetailResponse {
  message: string;
  product: Product;
}

export const axiosProducts = async (
  params: ProductParams = {}
): Promise<ProductResponse | null> => {
  try {
    const res = await axiosInstance.get<ProductResponse>("/api/product", {
      params,
    });
    return res.data;

  } catch (error) {
    console.error("상품 목록 조회 실패", error);
    return null;
  }
};

export const axiosProductById = async (id: number): Promise<Product | null> => {
  try {
    const res = await axiosInstance.get<ProductDetailResponse>(
      `/api/product/${id}`
    );
    return res.data.product;
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