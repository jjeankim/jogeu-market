import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axiosInstance from "@/lib/axiosInstance";
import SortBar from "@/components/product/SortBar";
import ProductGrid from "@/components/product/ProductGrid";
import PaginationBar from "@/components/product/PaginationBar";
import BrandSlider from "@/components/product/BrandSlider";
import SEO from "@/components/SEO";
import { Product } from "@/lib/apis/product";

interface ProductApiResponse {
  products: Product[];
  totalCount: number;
}

const mainToSubMap = {
  beauty: [
    { label: "전체", value: "all" },
    { label: "스킨케어", value: "BS" },
    { label: "메이크업", value: "BM" },
    { label: "헤어/바디", value: "BH" },
    { label: "미용소품", value: "BT" },
  ],
  food: [
    { label: "전체", value: "all" },
    { label: "간편식", value: "FM" },
    { label: "헬스케어", value: "FH" },
    { label: "건강식품", value: "FC" },
    { label: "간식/디저트", value: "FD" },
  ],
  living: [
    { label: "전체", value: "all" },
    { label: "주방", value: "LK" },
    { label: "생활", value: "LD" },
  ],
  pet: [
    { label: "전체", value: "all" },
    { label: "강아지", value: "PD" },
    { label: "고양이", value: "PC" },
    { label: "장난감", value: "PT" },
  ],
};

const ProductList = () => {
  const router = useRouter();
  const {
    category,
    subCategory = "all",
    page = "1",
    sort = "latest",
    brandId,
  } = router.query;

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);

  const currentCategory = typeof category === "string" ? category : "beauty";
  const currentSubCategory =
    typeof subCategory === "string" ? subCategory : "all";
  const currentPage = Number(page) || 1;
  const currentSort = typeof sort === "string" ? sort : "latest";
  const currentBrandId = brandId ? Number(brandId) : null;
  const subCategories =
    mainToSubMap[currentCategory as keyof typeof mainToSubMap] || [];

  const ITEMS_PER_PAGE = 10;

  // 전체 상품 데이터 fetch (처음 한 번만)
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const params: Record<string, string> = {
          category: currentCategory,
          page: "1",
          sort: currentSort,
          limit: "1000",
        };

        if (currentSubCategory !== "all") {
          params.productCode = currentSubCategory;
        }

        const res = await axiosInstance.get<ProductApiResponse>(
          "/api/product",
          { params }
        );
        setAllProducts(res.data.products as Product[]);
      } catch (error) {
        console.error("상품 불러오기 실패", error);
      }
    };

    fetchAllProducts();
  }, [currentCategory, currentSubCategory, currentSort]);

  // URL의 brandId 변경 감지
  useEffect(() => {
    setSelectedBrandId(currentBrandId);
  }, [currentBrandId]);

  // 브랜드 필터링 및 정렬 처리
  useEffect(() => {
    let filtered: Product[] = [...allProducts];

    // 브랜드 필터링
    if (selectedBrandId) {
      filtered = filtered.filter(
        (product) => product.brandId === selectedBrandId
      );
    }

    // 정렬 처리
    switch (currentSort) {
      case "latest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "priceHigh":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "priceLow":
        filtered.sort((a, b) => a.price - b.price);
        break;

      default:
        break;
    }

    setFilteredProducts(filtered);
    setTotalCount(filtered.length);
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
  }, [allProducts, selectedBrandId, currentSort]);

  // 페이지네이션 처리
  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setDisplayProducts(filteredProducts.slice(startIndex, endIndex));
  }, [filteredProducts, currentPage]);

  const updateQuery = (newQuery: Partial<Record<string, string>>) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, ...newQuery },
      },
      undefined,
      { shallow: true }
    );
  };

  // 브랜드 선택 핸들러
  const handleBrandSelect = (brandId: number | null) => {
    setSelectedBrandId(brandId);
    updateQuery({
      brandId: brandId ? brandId.toString() : undefined,
      page: "1", // 브랜드 변경 시 첫 페이지로 이동
    });
  };

  return (
    <>
      <SEO title="상품" />
      <div className="mx-auto ">
        {/* 상단 제목 */}
        <div className="text-center mt-20 text-3xl  capitalize font-semibold ">
          {currentCategory}
        </div>

        {/* 서브카테고리 탭만 노출 */}
        <div className="min-w-[320px] my-3 mt-10  grid grid-cols-2 md:flex md:justify-center gap-y-3 md:gap-x-3 ">
          {subCategories.map(
            ({ label, value }: { label: string; value: string }) => (
              <button
                key={value}
                onClick={() =>
                  updateQuery({
                    subCategory: value,
                    page: "1",
                    brandId: undefined,
                  })
                }
                className={`font-medium sm:py-1 md:text-md lg:text-lg mx-6 cursor-pointer  ${
                  currentSubCategory === value ? "font-bold" : "text-gray-700"
                } `}
                style={
                  currentSubCategory === value
                    ? { color: "var(--color-logo)" }
                    : undefined
                }
              >
                {label}
              </button>
            )
          )}
        </div>

        {/* 브랜드 슬라이더 */}
        <BrandSlider
          category={currentCategory}
          subCategory={currentSubCategory}
          selectedBrandId={selectedBrandId}
          onBrandSelect={handleBrandSelect}
        />

        {/* 선택된 브랜드 표시 */}
        {selectedBrandId && (
          <div className="flex items-center justify-center my-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
              <span className="text-sm text-gray-600">선택된 브랜드</span>
              <button
                onClick={() => handleBrandSelect(null)}
                className="text-sm text-gray-400 hover:text-gray-600"
              >
                ✕ 전체보기
              </button>
            </div>
          </div>
        )}

        {/* 정렬 바 */}
        <SortBar
          totalItems={totalCount}
          selectedSort={currentSort}
          onChange={(sort) => updateQuery({ sort, page: "1" })}
        />

        {/* 상품 그리드 */}
        <ProductGrid products={displayProducts} />

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <PaginationBar
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => updateQuery({ page: page.toString() })}
          />
        )}

        {/* 상품이 없을 때 */}
        {displayProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            선택한 조건에 맞는 상품이 없습니다.
          </div>
        )}
      </div>
    </>
  );
};

export default ProductList;
