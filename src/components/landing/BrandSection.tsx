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
    <section id={id} className="bg-white space-y-6 py-6">
      <h2 className="text-2xl font-bold text-center">Brand</h2>
      <h3 className="text-xl text-gray-600 text-center">
        주목해야 할 떠오르는 브랜드
      </h3>

      {/* 브랜드 탭 */}
      <div className="flex items-center justify-center flex-wrap gap-2">
        {brands.map((brand, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className={`rounded-3xl border-2 px-4 py-2 text-sm transition-all ${
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
      <div className="flex flex-col items-center px-6 py-4 space-y-6">
        {/* 브랜드 대표 이미지 */}
        <div className="relative w-full h-64 rounded overflow-hidden bg-white ">
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
              // filter: "brightness(0.9)",
            }}
            className="bg-white"
          />
          {/* <div className="flex w-full  h-full  justify-center items-center bg-gray-600 opacity-20  text-white text-2xl"></div> */}
          <div className="absolute z-40 top-[50%] left-[50%] items-center translate-x-[-50%]   text-white text-2xl">
            {selectedBrand.products?.[0]?.brand?.name || "브랜드 이름"}
          </div>
          {/* Overlay 마스킹  */}
          <div className="absolute inset-0 bg-black opacity-5"></div>
        </div>

        {/* 제품 카드 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full items-center">
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
