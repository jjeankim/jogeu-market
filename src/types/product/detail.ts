export type Brand = { id: number; name: string; logoImageUrl: string | null };

export type ProductDetail = {
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
  category: {
    id: number;
    name: string;
    slug: string;
    description: string;
    isActive: boolean;
  };
};
