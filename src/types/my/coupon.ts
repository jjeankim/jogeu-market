export type Coupon = {
  name: string;
  discountType: "fixed" | "percentage";
  discountValue: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  usageLimit: number;
};

export interface CouponData {
  id: number;
  couponId: number;
  isUsed: boolean;
  orderId: number | null;
  usedAt: string | null;
  userId: number;
  coupon: Coupon;
}

export interface RegisterCouponProps {
  onSuccess: () => void;
}

export interface CouponErrorResponse {
  error: string;
}
