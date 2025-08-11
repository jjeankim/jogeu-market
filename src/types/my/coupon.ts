export type Coupon = {
  name: string;
  discountType: "FIXED" | "PERCENTAGE";
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

export interface CouponCardProps {
  userCoupon: {
    id: number;
    isUsed: boolean;
    usedAt: string | null;
    coupon: {
      name: string;
      discountType: "PERCENTAGE" | "FIXED";
      discountValue: number;
      validFrom: string;
      validUntil: string;
      isActive: boolean;
      usageLimit: number;
    };
  };
}