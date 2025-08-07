import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axiosInstance from "@/lib/axiosInstance";
import SortBar from "@/components/product/SortBar";
import ProductGrid from "@/components/product/ProductGrid";
import PaginationBar from "@/components/product/PaginationBar";
import BrandSlider from "@/components/product/BrandSlider";

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
  } = router.query;

  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const currentCategory = typeof category === "string" ? category : "beauty";
  const currentSubCategory =
    typeof subCategory === "string" ? subCategory : "all";
  const currentPage = Number(page) || 1;
  const currentSort = typeof sort === "string" ? sort : "latest";
  const subCategories = mainToSubMap[currentCategory] || [];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params: Record<string, string> = {
          category: currentCategory,
          page: currentPage.toString(),
          sort: currentSort,
          limit: "10",
        };

        if (currentSubCategory !== "all") {
          params.productCode = currentSubCategory;
        }

        const res = await axiosInstance.get("/api/product", { params });
        setProducts(res.data.products);
        setTotalCount(res.data.totalCount || 0);
        setTotalPages(Math.ceil((res.data.totalCount || 0) / 10));
      } catch (error) {
        console.error("상품 불러오기 실패", error);
      }
    };

    fetchProducts();
  }, [currentCategory, currentSubCategory, currentPage, currentSort]);

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

  return (
    <div className="mx-10">
      {/* 상단 제목 */}
      <div className="text-center mt-20 text-3xl font-bold capitalize">
        {currentCategory}
      </div>

      {/* 서브카테고리 탭만 노출 */}
      <div className="my-3 mt-10 flex justify-center">
        {subCategories.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => updateQuery({ subCategory: value, page: "1" })}
            className={`font-medium text-lg mx-6 cursor-pointer ${
              currentSubCategory === value ? "font-bold" : "text-gray-700"
            }`}
            style={
              currentSubCategory === value
                ? { color: "var(--color-logo)" }
                : undefined
            }
          >
            {label}
          </button>
        ))}
      </div>
      {/* 👉 브랜드 슬라이더 삽입 */}
      <BrandSlider
        category={currentCategory}
        subCategory={currentSubCategory}
      />

      {/* 정렬 바 */}
      <SortBar
        totalItems={totalCount}
        selectedSort={currentSort}
        onChange={(sort) => updateQuery({ sort, page: "1" })}
      />

      {/* 상품 그리드 */}
      <ProductGrid products={products} />

      {/* 페이지네이션 */}
      <PaginationBar
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => updateQuery({ page: page.toString() })}
      />
    </div>
  );
};

export default ProductList;
