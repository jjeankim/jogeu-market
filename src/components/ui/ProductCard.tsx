import Image from "next/image";

type Product = {
  name: string;
  price: number;
  imgUrl?: string;
  shippingFee?: number;
};

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  showShippingInfo?: boolean; // 배송정보 표시 여부
}

const ProductCard = ({
  product,
  onClick,
  showShippingInfo,
}: ProductCardProps) => {
  const { name, price, imgUrl, shippingFee } = product;
  return (
    <div
      onClick={onClick}
      className="flex border rounded-[10px] w-[600px] p-3 max-w-full"
    >
      <Image
        width={150}
        height={150}
        src={imgUrl || "/images/noImg.png"}
        alt={name}
        className="rounded-[10px]"
      />
      <div className="p-4 flex flex-col gap-3">
        <p>{name}</p>
        <span>{price}</span>
        {showShippingInfo && (
          <div className="text-sm text-gray-500 mt-1">
            {shippingFee === 0
              ? "무료"
              : `배송비 ${shippingFee?.toLocaleString()}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
