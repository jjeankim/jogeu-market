import React, { useState } from "react";
import LandingProductCard from "./LandingProductCard";
import { Product, LandingProductSectionProps } from "@/lib/apis/product";

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
  showMoreLink = "#",
  badgeType,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 2;
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const currentProducts = products.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <section id={id} className="w-1/2 space-y-2">
      <h2 className="text-2xl font-bold mb-2">
        {title}
        <span className="pl-2 text-xl font-medium mb-2 align-middle  ">
          {subtitle}
        </span>
      </h2>
      <nav className="flex justify-end ">
        <a href={showMoreLink} className="underline">
          더보기
        </a>
      </nav>

      <div className=" flex-col space-y-5">
        <div className="flex mx-auto">
          {currentProducts.map((product) => (
            <LandingProductCard
              key={product.id}
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
            />
          ))}
        </div>

        <div
          className=" w-[90%] mx-auto text-center py-3 border-2 space-x-3 cursor-pointer"
          onClick={handleNext}
        >
          <span>다른 상품 더보기</span>
          <span>{currentPage + 1}</span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-300">{totalPages}</span>
        </div>
      </div>
    </section>
  );
};

export default LandingProductSection;
