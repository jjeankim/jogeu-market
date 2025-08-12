export interface Product {
  id: number;
  name: string;
  productCode: string;
  brandId: number;
  price: number;
  stockQuantity: number;
  thumbnailImageUrl: string | null;
  detailDescription: string;
  isSample: boolean;
  samplePrice: number | null;
}
