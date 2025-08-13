import axiosInstance from "axios";

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: number;
  name: string;
  mainCategoryId: number;
}

export const fetchCategories = async () => {
  const res = await axiosInstance.get("/api/categories");
  return res.data;
};