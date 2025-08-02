import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MainSwiper from "./MainSwiper";
import { fetchProductList } from "@/lib/apis/product";
import { Product } from "@/types/home";

const MainForm = () => {
  const [productList, setProductList] = useState<Product[]>([])
  const router = useRouter();
  const { menu } = router.query;

  const getTitle = () => {
    switch (menu) {
      case "brand":
        return "BRAND";
      case "pick":
        return "PICK";
      case "new":
        return "NEW";
      default:
        return "BEST";
    }
  };

  useEffect(() => {
    const getProductList = async () => {
      const res = await fetchProductList()
      setProductList(res)
    }
    getProductList()
  },[])
  console.log(productList);
  

  const handleCategoryClick = (category: string) => {
    const currentMenu = menu || "best"; // 현재 메뉴 정보 유지
    router.push(`/?menu=${currentMenu}&category=${category}`);
  };

  return (
    <>
      <main className=" mt-5 flex flex-col">
        {/* <p className="h-[15rem] w-full mt-10 mb-30 bg-lime-50">
          여기가 배너이미지~~
        </p> */}
        <MainSwiper/>
        {/* 필터와 제품 리스트를 가로로 배치 */}
        <div className="flex flex-row gap-10">
          {/* 필터 */}
          <div className="ml-10 w-[10rem]">
            <h2 className="text-2xl font-bold mb-5">{getTitle()}</h2>
            <nav className="flex flex-col gap-5 place-items-start">
              <button
                onClick={() => handleCategoryClick("beauty")}
                className="hover:text-yellow-500 transition-colors"
              >
                beauty
              </button>
              <button
                onClick={() => handleCategoryClick("food")}
                className="hover:text-yellow-500 transition-colors"
              >
                food
              </button>
              <button
                onClick={() => handleCategoryClick("living")}
                className="hover:text-yellow-500 transition-colors"
              >
                living
              </button>
              <button
                onClick={() => handleCategoryClick("pet")}
                className="hover:text-yellow-500 transition-colors"
              >
                pet
              </button>
            </nav>
          </div>

          {/* 상품 리스트 */}
          <div className="flex-1 px-8">
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(15rem,_1fr))] gap-6">
              {/* <div className="bg-yellow-50  h-[20rem]">1번 제품 카드</div>
              <div className="bg-yellow-50  h-[20rem]">2번 제품 카드</div>
              <div className="bg-yellow-50  h-[20rem]">3번 제품 카드</div>
              <div className="bg-yellow-50  h-[20rem]">4번 제품 카드</div>
              <div className="bg-yellow-50  h-[20rem]">5번 제품 카드</div>
              <div className="bg-yellow-50  h-[20rem]">6번 제품 카드</div> */}
              {productList.map(item => (
                <>
                <div>item.
                  </div></>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MainForm;
