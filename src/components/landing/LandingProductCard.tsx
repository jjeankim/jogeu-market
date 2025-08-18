import Image from "next/image";
import React from "react";
import { LandingProductCardProps } from "@/lib/apis/product";
import { PiHeartBold, PiShoppingCartSimpleBold } from "react-icons/pi";
import useUserWishlist from "@/hooks/useUserWishlist";
import { useCart } from "@/hooks/useCart";

const LandingProductCard: React.FC<LandingProductCardProps> = ({
  imageUrl,
  name,
  price,
  originalPrice,
  badgeLabel,
  tags = [],
  className = "",
  onClick,
  id,
}) => {
  const { userWishlist, toggleWishlist } = useUserWishlist();
  const isWished = userWishlist.has(id);
  const { addToCart } = useCart();

  return (
    <div
      className={`flex flex-col w-full md:w-1/2 items-center cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="w-full max-w-[280px] ">
        <div className="relative w-full aspect-square max-w-[230px] mx-auto">
          <div>
            <Image
              src={imageUrl || "/images/noImg.png"}
              alt={name}
              style={{
                objectFit: "contain",
                transform: "scale(0.8)",
                transformOrigin: "center center",
              }}
              fill
              sizes="(max-width: 768px) 280px, 230px"
            />
            <div className=" absolute bottom-0 flex justify-between w-full">
              <button
                className="cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(id);
                }}
              >
                <PiHeartBold
                  className={`text-[24px] transition-all duration-300 ${
                    isWished ? "text-red-500 scale-110" : "text-black"
                  }`}
                />
              </button>
              <button
                className="cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(id);
                }}
              >
                <PiShoppingCartSimpleBold className="text-[24px]" />
              </button>
            </div>
          </div>
          {badgeLabel && (
            <span className="bg-white absolute border-[3px] border-red-300 top-1 left-1 w-12 h-12 md:w-15 md:h-15 flex items-center justify-center rounded-full font-semibold text-xs md:text-md">
              {badgeLabel}
            </span>
          )}
        </div>

        <div className="w-full flex flex-col mx-auto px-2">
          <h2 className="text-center mt-3 text-sm md:text-base line-clamp-2">
            {name}
          </h2>
          <div className="text-center mt-1">
            {originalPrice && (
              <span className="line-through text-gray-300 pr-2 text-sm md:text-md">
                {originalPrice.toLocaleString()}원
              </span>
            )}
            <span className="text-base md:text-lg text-red-400 font-medium">
              {price.toLocaleString()}원
            </span>
          </div>

          <div className="flex gap-1 mt-2 flex-wrap justify-center overflow-hidden">
            {tags.map((tag, i) => (
              <span
                key={i}
                className={`p-1 px-2 md:px-3 text-xs md:text-sm rounded-lg text-white whitespace-nowrap ${
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
