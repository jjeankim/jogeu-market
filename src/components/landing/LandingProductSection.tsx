import React, { useState } from "react";
import LandingProductCard from "./LandingProductCard";
import { LandingProductSectionProps } from "@/lib/apis/product";
import { useRouter } from "next/router";

// interface LandingProductSectionProps {
//   id: string;
//   title: string;
//   subtitle?: string;
//   products: Product[];
//   showMoreLink?: string;
//   badgeType?: string;
// }

const LandingProductSection: React.FC<LandingProductSectionProps> = ({
  id,
  title,
  subtitle,
  products,
  badgeType,
}) => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 4; // 데스크톱에서는 4개씩, 모바일에서는 레이아웃으로 조정
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const onItemClick = (productId: string) => {
    console.log("===product clicked");
    router.push(`/product/${productId}`);
  };

  const currentProducts = products.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <section id={id} className="flex flex-col w-full px-2 md:px-0">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 mt-6 md:mt-10 text-center md:text-left">
        {title}
        <span className="pl-2 text-lg md:text-xl font-medium mb-2 align-middle">
          {subtitle}
        </span>
      </h2>

      <div className="flex-col">
        <div className="flex flex-col md:flex-row gap-4 md:gap-0 mx-auto mb-8 md:mb-15">
          {currentProducts.map((product) => (
            <LandingProductCard
              key={product.id}
              id={product.id}
              imageUrl={product.thumbnailImageUrl}
              name={product.name}
              price={product.price}
              originalPrice={product.price * 1.1}
              badgeLabel={badgeType}
              tags={[
                product.isSample ? "샘플 증정" : "",
                product.isPick ? "MD's Pick" : "",
                "세일",
              ].filter(Boolean)}
              onClick={() => onItemClick(product.id.toString())}
            />
          ))}
        </div>

        <div
          className="w-[80%] md:w-[30%] min-w-[200px] mx-auto text-center py-3 border-2 space-x-2 md:space-x-3 cursor-pointer mt-6 md:mt-10 mb-6 md:mb-10 hover:bg-gray-50 transition-colors"
          onClick={handleNext}
        >
          <span className="text-sm md:text-base">다른 상품 더보기</span>
          <span className="text-sm md:text-base">{currentPage + 1}</span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-300">{totalPages}</span>
        </div>
      </div>
    </section>
  );
};

export default LandingProductSection;
