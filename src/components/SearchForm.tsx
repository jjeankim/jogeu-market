import ListCard from "@/components/ui/ListCard";
import SortDropdown from "@/components/ui/SortDropdown";
import { useState } from "react";
import Pagination from "./Pagination";
import { axiosSearchProducts, Product } from "@/lib/apis/product";
import { useEffect } from "react";
import Image from "next/image";
import Spinner from "@/components/ui/Spinner";

interface SearchFormProps {
  searchQuery?: string;
}

const SearchForm = ({ searchQuery }: SearchFormProps) => {
  const sortOptions = [
    { label: "최신순", value: "latest" },
    { label: "인기 많은 순", value: "popularity" },
    { label: "낮은 가격 순", value: "lowPrice" },
    { label: "높은 가격 순", value: "highPrice" },
  ];

  const [sortValue, setSortValue] = useState("latest");
  const [page, setPage] = useState(1);
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const totalPages = 10;

  // useEffect로 검색 실행
  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      axiosSearchProducts(searchQuery)
        .then((results: Product[]) => {
          setProductList(results);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [searchQuery]);

  return (
    <div className="flex flex-col items-center mx-10 mt-10">
      <div className="mx-20 mb-20">
        {/* 상품 목록 정렬 및 필터 */}
        <div className="my-3">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex space-x-4">
              총 <span>{productList.length}</span>건
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

        {/* 상품 목록/빈 상태 */}
        {loading ? (
          <div className="w-full flex justify-center items-center py-20">
            <Spinner />
          </div>
        ) : productList.length === 0 && searchQuery ? (
          <div className="w-full flex flex-col justify-center items-center py-20">
            <Image
              src="/images/logo_bw_jogeuMarket_2.png"
              alt="검색 결과 없음"
              width={500}
              height={180}
              priority={false}
            />
            <p className="mt-6 text-md md:text-4xl text-center font-medium text-gray-400">
              [검색 결과가 없습니다]
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-x-10 gap-y-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-15">
            {productList.map((product, index) => (
              <li key={index}>
                <ListCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mb-15">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
};

export default SearchForm;
