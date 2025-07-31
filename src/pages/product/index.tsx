import Pagination from "@/components/Pagination";
import CustomInput from "@/components/ui/CustomInput";
import ListCard from "../../components/ui/ListCard";
import Header from "../../components/Header";
import Image from "next/image";

const ProductList = () => {
  const productExample = {
    id: 1,
    brand: "에스트라",
    name: "NEW 에이시카 365 수분토너 pH4.5 200ml",
    price: 28000,
    review: 4.8,
    imgUrl: "",
  };

  return (
    <>
      <Header />
      {/* SearchBar 추후 추가 */}
      <div>상품목록</div>

      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
              {" "}
              총 <span className="">10</span>건
            </div>
          </div>
        </div>
      </div>
      {/* 상품 목록 카드 영역*/}
      <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <li>
          <a href="" className="group">
            <ListCard product={productExample} />
          </a>
        </li>
        <li>
          <a href="" className="group">
            <ListCard product={productExample} />
          </a>
        </li>
        <li>
          <a href="" className="group">
            <ListCard product={productExample} />
          </a>
        </li>
        <li>
          <a href="" className="group">
            <ListCard product={productExample} />
          </a>
        </li>
      </ul>
      {/* 페이지네이션 */}
    </>
  );
};

export default ProductList;
