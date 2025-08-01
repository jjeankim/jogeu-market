import MyPageLayoutWithWelcome from "@/components/my/MyPageLayoutWithWelcome";
import ProductCardWithHeart from "@/components/my/ProductCardWithHeart";
import Pagination from "@/components/Pagination";
import { useState } from "react";

const sampleProduct = {
  name: "샘플 상품",
  price: 29000,
  imgUrl: "/images/sample.png",
  shippingFee: 3000,
};

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <MyPageLayoutWithWelcome>
      <div className="grid gap-14">
        <h2 className="text-4xl font-bold border-b-2 pb-3.5 mb-4">
          위시 리스트
        </h2>
        <div className="grid grid-cols-2 gap-6 overflow-hidden">
          <ProductCardWithHeart product={sampleProduct} />
          <ProductCardWithHeart product={sampleProduct} />
          <ProductCardWithHeart product={sampleProduct} />
          <ProductCardWithHeart product={sampleProduct} />
        </div>
        <div className="mx-auto">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </MyPageLayoutWithWelcome>
  );
};

export default Index;
