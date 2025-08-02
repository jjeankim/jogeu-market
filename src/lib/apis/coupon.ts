import axiosInstance from "../axiosInstance";

export const fetchMyCoupon = async () => {
  try {
    const res = await axiosInstance.get("/api/coupon/me");
    return res.data.userCoupon;
  } catch (error) {
    console.error("내 쿠폰 조회 실패", error);
  }
};
