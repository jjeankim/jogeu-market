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
  const ITEMS_PER_PAGE = 4;
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
    <section id={id} className="flex flex-col w-full">
      <h2 className="text-3xl font-bold mb-8 mt-10">
        {title}
        <span className="pl-2 text-xl font-medium mb-2 align-middle">
          {subtitle}
        </span>
      </h2>
      {/* <nav className="flex justify-end ">
        <a href={showMoreLink} className="underline">
          더보기
        </a>
      </nav> */}

      <div className="flex-col ">
        <div className="flex mx-auto mb-15">
          {currentProducts.map((product) => (
            <LandingProductCard
              key={product.id}
              imageUrl={product.thumbnailImageUrl}
              // fill
              // sizes="230px"
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
          className="w-[30%] min-w-sm mx-auto text-center py-3 border-2 space-x-3 cursor-pointer mt-10 mb-10"
          onClick={handleNext}
        >
          <span className="">다른 상품 더보기</span>
          <span>{currentPage + 1}</span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-300">{totalPages}</span>
        </div>
      </div>
    </section>
  );
};

export default LandingProductSection;
