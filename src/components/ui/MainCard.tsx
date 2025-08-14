import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";

type Item = {
  name: string;
  price: number;
};

interface MainCardProps {
  item: Item;
}

const MainCard = ({ item }: MainCardProps) => {
  const { name, price } = item;

  return (
    <div className="w-full">
      {/* min 760px */}
      <div className="relative h-[240px] border rounded-2xl overflow-hidden">
        <Image
          fill
          src={"/images/toner.png"}
          alt="상품 이미지"
          className="object-cover"
        />
        <div className="absolute left-3 right-3 bottom-3 flex justify-between">
          <button type="button" className="cursor-pointer">
            <FiHeart />
          </button>
          <button type="button" className="cursor-pointer">
            <FiShoppingCart />
          </button>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex justify-between">
          <strong>{name}</strong>
          <span>{`${Number(price).toLocaleString()} 원`}</span>
        </div>
      </div>
    </div>
  );
};

export default MainCard;
