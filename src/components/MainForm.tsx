import React, { useEffect, useState } from "react";
import MainSwiper from "./MainSwiper";
import { axiosProductsForLanding, Product } from "@/lib/apis/product";
import LandingProductSection from "./landing/LandingProductSection";
import PickProductSection from "./landing/PickProductSection";
import BrandSection from "./landing/BrandSection";

const MainForm = () => {
  const [error, setError] = useState<string | null>(null);

  const [landingProductLoading, setLandingProductLoading] = useState(true);
  const [brandProducts, setBrandProducts] = useState<Product[]>([]);
  const [pickProducts, setPickProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [bestProducts, setBestProducts] = useState<Product[]>([]);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const scrollToHash = () => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };

    if (!landingProductLoading) {
      setTimeout(scrollToHash, 100);
    }
  }, [landingProductLoading]);

  useEffect(() => {
    const loadLandingProduct = async () => {
      setLandingProductLoading(true);
      setError(null);
      try {
        const response = await axiosProductsForLanding();

        if (response) {
          setBestProducts(response.best);
          setBrandProducts(response.brand);
          setPickProducts(response.pick);
          setNewProducts(response.new);
        } else {
          setBestProducts([]);
          setBrandProducts([]);
          setPickProducts([]);
          setNewProducts([]);
        }
      } catch (error) {
        console.error("상품 데이터 로딩 실패:", error);
        setError("상품을 불러오는데 실패했습니다.");
      } finally {
        setLandingProductLoading(false);
      }
    };

    loadLandingProduct();
  }, []);

  if (landingProductLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-gray-500 text-lg">
          상품을 불러오는 중입니다...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-red-500 text-lg">{error}</span>
      </div>
    );
  }

  const isAllEmpty =
    bestProducts.length === 0 &&
    newProducts.length === 0 &&
    brandProducts.length === 0 &&
    pickProducts.length === 0;

  if (isAllEmpty) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-gray-400 text-lg">표시할 상품이 없습니다.</span>
      </div>
    );
  }

  return (
    <main className="mt-5 flex flex-col space-y-3">
      <MainSwiper />

      <div className="w-full flex flex-col mx-auto bg-white">
        <div className="flex flex-col items-center justify-center p-3 space-y-3   ">
          <LandingProductSection
            id="best"
            title="BEST"
            subtitle="인기상품"
            products={bestProducts}
            badgeType="BEST"
          />

          <LandingProductSection
            id="new"
            title="New"
            subtitle="핫한 신상"
            products={newProducts}
            badgeType="New"
          />
        </div>
      </div>

      <BrandSection id="brand" brands={brandProducts} />
      <PickProductSection id="pick" products={pickProducts} />
    </main>
  );
};

export default MainForm;
