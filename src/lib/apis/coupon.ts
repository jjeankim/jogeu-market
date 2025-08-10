import axiosInstance from "../axiosInstance";

//요청-응답만 처리
export const fetchMyCouponList = async () => {
  const res = await axiosInstance.get("/api/coupon/me");
  return res.data.userCoupon ?? [];
};

export const registerCoupon = async (code: string) => {
  const res = await axiosInstance.post("/api/coupon/me", { code });
  return res.data;
};
