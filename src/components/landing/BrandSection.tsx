import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import PickProductCard from "./PickProductCard";
import { BrandSectionProps, Product } from "@/lib/apis/product";

// BrandGroup 타입 정의
interface BrandGroup {
  products: Product[];
}

const BrandSection: React.FC<BrandSectionProps> = ({ id, brands }) => {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  if (!brands || brands.length === 0) return null;

  const selectedBrand = brands[selectedIndex] as unknown as BrandGroup;
  const sampleProductCards = selectedBrand.products?.slice(0, 2) || [];

  const onItemClick = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  return (
    <section id={id} className="bg-white space-y-4 md:space-y-6 py-4 md:py-6">
      <h2 className="text-xl md:text-2xl font-bold text-center">Brand</h2>
      <h3 className="text-lg md:text-xl text-gray-600 text-center px-4">
        주목해야 할 떠오르는 브랜드
      </h3>

      {/* 브랜드 탭 */}
      <div className="flex items-center justify-center flex-wrap gap-2 px-4">
        {brands.map((brand, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className={`rounded-3xl border-2 px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm transition-all ${
              idx === selectedIndex
                ? "bg-black text-white border-black"
                : "text-gray-700 border-gray-400"
            }`}
          >
            {(brand as unknown as BrandGroup).products?.[0]?.brand?.name ||
              "브랜드"}
          </button>
        ))}
      </div>

      {/* 브랜드 이미지 + 제품 카드 */}
      <div className="flex flex-col items-center px-3 md:px-6 py-2 md:py-4 space-y-4 md:space-y-6">
        {/* 브랜드 대표 이미지 */}
        <div className="relative w-full h-48 md:h-64 rounded overflow-hidden bg-white">
          <Image
            src={
              selectedBrand.products?.[0]?.brand?.logoImageUrl ||
              "/images/noImg.png"
            }
            alt="브랜드 이미지"
            fill
            style={{
              objectFit: "contain",
              objectPosition: "center center",
            }}
            className="bg-white"
          />
          <div className="absolute z-40 top-[50%] left-[50%] items-center translate-x-[-50%] text-white text-lg md:text-2xl font-medium">
            {selectedBrand.products?.[0]?.brand?.name || "브랜드 이름"}
          </div>
          {/* Overlay 마스킹  */}
          <div className="absolute inset-0 bg-black opacity-5"></div>
        </div>

        {/* 제품 카드 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {sampleProductCards.map((product: Product) => (
            <div className="w-full mx-auto" key={product.id}>
              <PickProductCard
                imageSize={{ width: 230, height: 230 }}
                product={product}
                onClick={() => onItemClick(product.id.toString())}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
