import Pagination from "@/components/Pagination";
import CustomInput from "@/components/ui/CustomInput";
import ListCard from "../../components/ui/ListCard";
import Image from "next/image";
import BrandSlide from "../../components/ui/BrandSlide";
import Link from "next/link";
import SortDropdown from "@/components/ui/SortDropdown";
import { useState } from "react";
import { PiSlidersDuotone } from "react-icons/pi";

const ProductList = () => {
  // 실제 API 불러올때 변경 필요함
  const productExample = {
    id: 1,
    brand: "에스트라",
    name: "NEW 에이시카 365 수분토너 pH4.5 200ml",
    price: 28000,
    review: 4.8,
    imgUrl: "",
  };
  const productList = Array(8).fill(productExample);

  const brandExample = {
    id: 1,
    name: "브랜드",
    imgUrl: "",
  };
  const brandList = Array(6).fill(brandExample);

  const sortOptions = [
    { label: "최신순", value: "latest" },
    { label: "인기 많은 순", value: "popularity" },
    { label: "낮은 가격 순", value: "lowPrice" },
    { label: "높은 가격 순", value: "highPrice" },
    { label: "리뷰 많은 순", value: "mostReviewed" },
  ];
  const [sortValue, setSortValue] = useState("latest");

  const [page, setPage] = useState(1);
  const totalPages = 10;

  return (
    <>
      {/* 상품 목록 카테고리 및 브랜드 표시 */}
      <div className="flex flex-col items-center mx-10">
        <div className="font-bold text-3xl mt-20">BEAUTY</div>
        <div className="my-3 mt-10">
          <Link href="" className="font-medium text-lg mx-10">
            전체
          </Link>
          <Link href="" className="font-medium text-lg mx-10">
            스킨케어
          </Link>
          <Link href="" className="font-medium text-lg mx-10">
            메이크업
          </Link>
          <Link href="" className="font-medium text-lg mx-10">
            헤어/바디
          </Link>
          <Link href="" className="font-medium text-lg mx-10">
            뷰티소품
          </Link>
        </div>
        <div className="flex items-center justify-center mt-10">
          <BrandSlide BrandList={brandList} slidesPerView={4} />
        </div>
      </div>
      <div className="mx-20 mb-20">
        {/* 상품 목록 정렬 및 필터 */}
        <div className="my-3">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex space-x-4">
              총<span className="">8</span>건
            </div>
            <div className="flex justify-center items-center">
              <SortDropdown
                options={sortOptions}
                value={sortValue}
                onChange={setSortValue}
              />
            </div>
          </div>
        </div>
        {/* 상품 목록 카드 영역*/}
        <ul className="grid grid-cols-1 gap-x-10 gap-y-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-15">
          {productList.map((product, index) => (
            <li key={index} className="">
              <Link href="" className="group">
                <ListCard product={product} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* 페이지네이션 */}
      <div className="flex justify-center mb-15">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </>
  );
};

export default ProductList;
