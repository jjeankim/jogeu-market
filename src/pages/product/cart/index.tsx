import Button from "@/components/ui/Button";
import ProductCard from "@/components/ui/ProductCard";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

type Product = {
  name: string;
  price: number;
  imgUrl?: string;
  shippingFee?: number;
  showShippingInfo?: boolean;
};

const sampleProduct = {
  name: "샘플 상품",
  price: 29000,
  imgUrl: "/images/sample.png",
  shippingFee: 3000,
  showShippingInfo: true,
};

const Index = () => {
  return (
    <div className="container mx-auto  px-28 mt-10 mb-10">
      <h1 className="text-2xl text-center border-b-2 py-3 mb-3 border-gray-200">
        장바구니
      </h1>
      <div className="flex flex-col space-y-3">
        <div className="inline-flex rounded-xl bg-[#405DE6]  px-6 py-1.5 w-fit text-sm text-white">
          <span className="mr-1">일반 상품</span>
          <span>1</span>
        </div>
        <div className=" font-bold text-sm">
          <div className="flex justify-between  ">
            <div>
              <input type="checkbox" className="mr-4 w-5 h-5 align-middle" />
              <span>전체 선택</span>
            </div>
            <span className="underline">선택 삭제</span>
          </div>
        </div>
        <div className="w-full grid grid-cols-[60%_40%] gap-6  p-10 text-sm bg-[#c3cdff] rounded-xl mb-7">
          {/* 상품 list */}
          <div className="flex flex-col space-y-6 w-full">
            {/* 상품1 */}
            <div className="space-y-3 bg-white rounded-lg  p-4">
              <div className="flex ">
                <input type="checkbox" className="mr-4 w-5 h-5 align-middle" />
                <span>상품 선택</span>
              </div>
              <div className="w-full">
                <ProductCard
                  product={sampleProduct}
                  showShippingInfo={sampleProduct.showShippingInfo}
                />
              </div>
              <div className="flex justify-between">
                <span>수량</span>
                <div className="flex space-x-3 items-center">
                  <div className="">
                    <FiMinusCircle size={18} />
                  </div>
                  <div>1</div>
                  <div>
                    <FiPlusCircle size={18} />
                  </div>
                </div>
              </div>
              <div className="flex w-full space-x-3 text-sm">
                <button className="bg-white border-1 border-[#405DE6] px-6 py- w-1/2 rounded-md text-[#405DE6]">
                  위시리스트
                </button>
                <button className="bg-[#405DE6] px-6 py-3 w-1/2 rounded-md text-white">
                  주문하기
                </button>
              </div>
            </div>
            {/* 상품2 */}
            <div className="space-y-3 bg-white rounded-lg  p-4">
              <div className="flex ">
                <input type="checkbox" className="mr-4 w-5 h-5 align-middle" />
                <span>상품 선택</span>
              </div>
              <div className="w-full">
                <ProductCard
                  product={sampleProduct}
                  showShippingInfo={sampleProduct.showShippingInfo}
                />
              </div>
              <div className="flex justify-between">
                <span>수량</span>
                <div className="flex space-x-3 items-center">
                  <div className="">
                    <FiMinusCircle size={18} />
                  </div>
                  <div>1</div>
                  <div>
                    <FiPlusCircle size={18} />
                  </div>
                </div>
              </div>
              <div className="flex w-full space-x-3 text-sm">
                <button className="bg-white border-1 border-[#405DE6] px-6 py- w-1/2 rounded-md text-[#405DE6]">
                  위시리스트
                </button>
                <button className="bg-[#405DE6] px-6 py-3 w-1/2 rounded-md text-white">
                  주문하기
                </button>
              </div>
            </div>
          </div>

          <div className="w-full sticky  bg-white rounded-lg h-80 p-6 space-y-3 flex flex-col justify-between ">
            <div className="flex flex-col space-y-3">
              <p className="flex justify-between">
                <span>총 상품 금액</span>
                <div className="flex">
                  <span>3000</span>
                  <span>원</span>
                </div>
              </p>
              <p className="flex justify-between">
                <span>총 배송비</span>
                <div className="flex">
                  <span>0</span>
                  <span>원</span>
                </div>
              </p>
              <p className="border-b-2"></p>
              <p className="flex justify-between text-lg mb-6">
                <span>결제 예정 금액</span>
                <div className="flex">
                  <span>0</span>
                  <span>원</span>
                </div>
              </p>
            </div>

            <div className="flex flex-col space-y-1 ">
              <button className="w-full bg-white border-1 border-[#405DE6] px-6 py-1.5  rounded-md text-[#405DE6]">
                위시리스트
              </button>
              <button className="w-full bg-[#405DE6] px-6 py-2  rounded-md text-white">
                주문하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
