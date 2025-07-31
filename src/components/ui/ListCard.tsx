import Image from "next/image";
import { PiHeartBold, PiShoppingCartSimpleBold } from "react-icons/pi";
import { FiStar } from "react-icons/fi";
import { useState } from "react";
import axios from "axios";

type Product = {
  id: number;
  brand: string;
  name: string;
  price: number;
  review: number;
  imgUrl?: string;
};

interface ListCardProps {
  product: Product;
  onClick?: () => void;
}

const ListCard = ({ product, onClick }: ListCardProps) => {
  const [wish, setWish] = useState(false);
  const [wishId, setWishId] = useState<number | null>(null);

  // 하트아이콘 클릭 시 위시리스트 추가
  const handleWishClick = async () => {
    try {
      if (!wish) {
        const res = await axios.post("/api/wishlist", {
          productId: product.id,
        });
        alert(res.data.message);
        setWish(true);
        setWishId(res.data.wishlist.id);
      } else {
        if (!wishId) {
          alert("삭제할 위시리스트 상품을 찾을 수 없습니다.");
          return;
        }
        const res = await axios.delete(`/api/wishlist/${wishId}`);
        alert(res.data.message);
        setWish(false);
        setWishId(null);
      }
    } catch (error: any) {
      if (error.response?.status === 409) {
        alert("이미 위시리스트에 추가된 상품입니다.");
      } else if (error.response?.status === 401) {
        alert("유효하지 않은 사용자입니다.");
      } else {
        alert("서버 오류가 발생했습니다.");
        console.error(error);
      }
    }
  };

  // 장바구니 아이콘 클릭 시 장바구니 추가
  const handleAddCart = async () => {
    try {
      const res = await axios.post("/api/cart", {
        productId: product.id,
        quantity: 1,
      });
      alert(res.data.message);
    } catch (error: any) {
      if (error.response?.status === 401) {
        alert("유효하지 않은 사용자입니다.");
      } else {
        alert("서버 오류가 발생했습니다.");
        console.error(error);
      }
    }
  };

  const { brand, name, price, review, imgUrl } = product;
  return (
    <>
      <div className="relative border-2 rounded-lg mb-3">
        <Image
          width={150}
          height={150}
          src={imgUrl || "/images/noImg.png"}
          alt=""
          className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75"
        />
        <div className="absolute bottom-0 w-full flex justify-between p-4">
          <button
            className="cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95"
            onClick={handleWishClick}
          >
            <PiHeartBold
              className={`text-[24px] transition-all duration-300 ${
                wish ? "text-red-500 scale-110" : "text-black"
              }`}
            />
          </button>
          <button
            className="cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95"
            onClick={handleAddCart}
          >
            <PiShoppingCartSimpleBold className="text-[24px]" />
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col items-center">
          <span className="text-sm font-light text-black">{brand}</span>
          <h3 className="text-lg text-center text-gray-700">{name}</h3>
          <span className="flex flex-raw items-center text-lg font-medium text-[#FF572D]">
            {price}
            <span className="text-sm">원</span>
          </span>
          <div className="flex flex-raw items-center">
            <FiStar />
            <span className="ml-1 text-gray-700">{review}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListCard;
