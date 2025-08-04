import axiosInstance from "../axiosInstance";

export const fetchMyOrderList = async () => {
  try {
    const res = await axiosInstance.get("/api/orders");
    return res.data.data;
  } catch (error) {
    console.error("내 주문 내역 조회 실패", error);
  }
};
