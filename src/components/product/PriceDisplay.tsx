import React from "react";
import type { PriceInfo } from "../../types/product/price";

export function formatPriceInfo({
  originPrice,
  price,
  locale = "ko-KR",
  currency = "KRW",
}: PriceInfo) {
  // price, originPrice가 undefined 혹은 null일 때 기본값 0 처리
  const safePrice = typeof price === "number" ? price : 0;
  const safeOriginPrice = typeof originPrice === "number" ? originPrice : 0;

  const isDiscounted = safeOriginPrice > safePrice;

  const formattedSale = safePrice.toLocaleString(locale, {
    style: "currency",
    currency,
  });

  const formattedOrigin = isDiscounted
    ? safeOriginPrice.toLocaleString(locale, { style: "currency", currency })
    : null;

  const discountRate = isDiscounted
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
        <strong className="text-[#FF572D]">{formattedSale}</strong>
      </p>
    </>
  );
}
