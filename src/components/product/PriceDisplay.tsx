import React from "react";
import type { PriceInfo } from "../../types/product/price";

export function formatPriceInfo({
  originPrice,
  price,
  locale = "ko-KR",
  currency = "KRW",
}: PriceInfo) {
  const safePrice = typeof price === "number" ? price : null;
  const safeOriginPrice = typeof originPrice === "number" ? originPrice : null;

  const isDiscounted =
    safeOriginPrice !== null &&
    safePrice !== null &&
    safeOriginPrice > safePrice;
  const formattedSale =
    safePrice !== null
      ? safePrice.toLocaleString(locale, { style: "currency", currency })
      : "가격 정보 없음";

  const formattedOrigin =
    isDiscounted && safeOriginPrice !== null
      ? safeOriginPrice.toLocaleString(locale, { style: "currency", currency })
      : null;

  const discountRate =
    isDiscounted && safePrice !== null && safeOriginPrice !== null
      ? ((1 - safePrice / safeOriginPrice) * 100).toFixed(0)
      : null;

  return { isDiscounted, formattedOrigin, formattedSale, discountRate };
}

export function PriceDisplay(props: ReturnType<typeof formatPriceInfo>) {
  const { isDiscounted, formattedOrigin, formattedSale, discountRate } = props;

  return (
    <>
      {isDiscounted && (
        <p className="text-lg text-gray-500 mb-2">
          정상가
          {formattedOrigin && (
            <span className="line-through ml-4">{formattedOrigin}</span>
          )}
        </p>
      )}
      <p className="text-2xl mb-4">
        {discountRate && <strong className="mr-4">{discountRate}%</strong>}
        <span className="text-[#FF572D]">{formattedSale}</span>
      </p>
    </>
  );
}
