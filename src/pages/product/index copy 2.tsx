import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { axiosBrands, Brand } from "@/lib/apis/brand";
import CategoryTabs from "@/components/product/CategoryTabs";
import BrandSlider from "@/components/ui/BrandSlide";
import SortBar from "@/components/product/SortBar";
import ProductGrid from "@/components/product/ProductGrid";
import PaginationBar from "@/components/product/PaginationBar";
import axiosInstance from "@/lib/axiosInstance";

const ProductList = () => {
  const router = useRouter();
  const { category: queryCategory } = router.query;
  const [brandList, setBrandList] = useState<Brand[]>([]);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("all");
  const [productCode, setProductCode] = useState("");
  const [sortValue, setSortValue] = useState("latest");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params: Record<string, string> = {};
        if (category && category !== "all") params.category = category;
        if (productCode) params.productCode = productCode;
        params.sort = sortValue;
        params.page = page.toString();

        const res = await axiosInstance.get("/api/product", { params });
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("상품 불러오기 실패", error);
      }
    };

    fetchProducts();
  }, [category, productCode, sortValue, page]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brands = await axiosBrands();
        setBrandList(brands);
      } catch (error) {
        console.error("브랜드 불러오기 실패", error);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    if (typeof queryCategory === "string") {
      setCategory(queryCategory);
      setPage(1); // 카테고리가 바뀌면 페이지도 1로 초기화
    }
  }, [queryCategory]);
  return (
    <div className="mx-10 ">
      <div className="flex flex-col items-center">
        <div className="font-bold text-3xl mt-20">{category}</div>
        <CategoryTabs
          currentCategory={category}
          onCategoryChange={setCategory}
        />
      </div>

      <div className="mt-10">
        <BrandSlider
          BrandList={brandList.map((b) => ({
            id: b.id,
            name: b.name,
            imgUrl: b.logoImageUrl,
          }))}
          slidesPerView={4}
        />
      </div>

      <div className="mt-10">
        <SortBar
          totalItems={products.length}
          selectedSort={sortValue}
          onChange={setSortValue}
        />
      </div>

      <div className="mt-10">
        <ProductGrid products={products} />
      </div>

      <div className="mt-10 mb-20">
        <PaginationBar
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default ProductList;
