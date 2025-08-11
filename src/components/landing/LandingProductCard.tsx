import Image from "next/image";
import React from "react";
import { LandingProductCardProps } from "@/lib/apis/product";

// interface LandingProductCardProps {
//   imageUrl: string;
//   name: string;
//   price: number;
//   originalPrice?: number;
//   badgeLabel?: string; // BEST, Pick
//   tags?: string[]; // 세일, 샘플증정, MD's Pick
//   className?: string;
//   imageWidth?: number;
//   imageHeight?: number;
// }

const LandingProductCard: React.FC<LandingProductCardProps> = ({
  imageUrl,
  name,
  price,
  originalPrice,
  badgeLabel,
  tags = [],
  className = "",
  imageWidth,
  imageHeight,
  onClick,
}) => {
  return (
    <div
      className={`flex flex-col w-1/2 items-center ${className}`}
      onClick={onClick}
    >
      <div className="">
        <div className="relative  w-[230px] h-[230px] ">
          <Image
            src={imageUrl || "/images/noImg.png"}
            alt={name}
            // width={imageWidth || 230}
            // height={imageHeight || 230}
            fill
            sizes="230px"
            className="object-cover overflow-hidden "
          />
          {badgeLabel && (
            <span className="bg-white absolute border-[3px]  border-red-300  top-1 left-1 w-15 h-15 flex items-center justify-center rounded-full font-semibold text-md">
              {badgeLabel}
            </span>
          )}
        </div>

        <div className="w-full flex flex-col mx-auto">
          <h2 className="text-center mt-3">{name}</h2>
          <div>
            {originalPrice && (
              <span className="line-through text-gray-300 pr-3 text-md">
                {originalPrice.toLocaleString()}원
              </span>
            )}
            <span className="text-lg text-red-400">
              {price.toLocaleString()}원
            </span>
          </div>

          <div className="flex gap-1 mt-1 flex-wrap  overfow-hidden ">
            {tags.map((tag, i) => (
              <span
                key={i}
                className={`p-1 px-3 text-sm rounded-lg text-white whitespace-nowrap ${
                  tag === "세일"
                    ? "bg-red-400"
                    : tag === "MD's Pick"
                      ? "bg-yellow-300"
                      : tag === "샘플 증정"
                        ? "bg-green-400"
                        : "bg-gray-400"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingProductCard;
