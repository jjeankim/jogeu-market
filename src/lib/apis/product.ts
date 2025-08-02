import axios from "axios";
import { API_BASE_URL } from "../constants";

export const fetchProductList = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/products`);
    return res.data.products;
  } catch (error) {
    console.error("상품 리스트 조회 실패", error);
  }
};
