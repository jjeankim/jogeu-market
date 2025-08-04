import { useState } from "react";
import CartItemCard from "./CartItemCard";
import CartPaymentInfo from "./CartPaymentInfo";
// import { OrderItem } from "@/types/cart/cart";
// import { Order } from "@/types/cart/cart";

const sampleProduct1 = {
  id: 1,
  name: "샘플 상품",
  price: 29000,
  imgUrl: "/images/sample.png",
  shippingFee: 3000,
  showShippingInfo: true,
};

const sampleProduct2 = {
  id: 2,
  name: "샘플 상품",
  price: 29000,
  imgUrl: "/images/sample.png",
  shippingFee: 3000,
  showShippingInfo: true,
};

const sampleProducts = [sampleProduct1, sampleProduct2];

const CartForm = () => {
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {}
  );

  const allChecked =
    sampleProducts.length > 0 &&
    sampleProducts.every((product) => checkedItems[product.id]);

  const handleItemCheck = (id: number) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAllCheck = () => {
    if (allChecked) {
      setCheckedItems({});
    } else {
      const newChecked: { [key: number]: boolean } = {};
      sampleProducts.forEach((product) => {
        newChecked[product.id] = true;
      });
      setCheckedItems(newChecked);
    }
  };

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
              <input
                type="checkbox"
                checked={allChecked}
                onChange={handleAllCheck}
                className="mr-4 w-5 h-5 align-middle"
              />
              <span>전체 선택</span>
            </div>
            <span className="underline">선택 삭제</span>
          </div>
        </div>
        <div className="w-full grid grid-cols-[60%_40%] gap-6  p-10 text-sm bg-[#c3cdff] rounded-xl mb-7">
          {/* 상품 list */}
          <div className="flex flex-col space-y-6 w-full">
            {sampleProducts.map((product) => (
              <CartItemCard
                key={product.id}
                product={product}
                checked={!!checkedItems[product.id]}
                onCheck={() => handleItemCheck(product.id)}
              />
            ))}
          </div>

          <CartPaymentInfo
            totalPrice={40000}
            shippingFee={sampleProduct1.shippingFee}
          ></CartPaymentInfo>
        </div>
      </div>
    </div>
  );
};

export default CartForm;
