import { CouponCardProps } from "@/types/my/coupon";

const CouponCard = ({ userCoupon }: CouponCardProps) => {
  const { isUsed, coupon } = userCoupon;
  const { name, discountType, discountValue, validFrom, validUntil, isActive } =
    coupon;

  const discountText =
    discountType === "PERCENTAGE"
      ? `${discountValue}% 할인`
      : `${discountValue.toLocaleString()}원 할인`;

  const formatDate = (iso: string) => {
    const date = new Date(iso);
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  const isExpired = new Date(validUntil) < new Date();

  return (
    <div
      className={`p-6 flex flex-col justify-between border rounded-2xl relative ${
        isUsed || isExpired || !isActive ? "opacity-50" : ""
      }`}
    >
      <div className="flex flex-col mb-20">
        <span className="text-3xl mb-2">{discountText}</span>
        <span className="text-sm">{name}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-gray-400">
          사용기간: {formatDate(validFrom)} ~ {formatDate(validUntil)}
        </span>
        {/* <Link className="text-[#b29977]" href={"/"}>
          자세히
        </Link> */}
      </div>
      {isUsed && (
        <span className="text-xs text-red-500 absolute top-2 right-2">
          사용 완료
        </span>
      )}
      {!isUsed && isExpired && (
        <span className="text-xs text-gray-500 absolute top-2 right-2">
          기간 만료
        </span>
      )}
      {!isUsed && !isActive && (
        <span className="text-xs text-gray-500 absolute top-2 right-2">
          비활성화
        </span>
      )}
    </div>
  );
};

export default CouponCard;
