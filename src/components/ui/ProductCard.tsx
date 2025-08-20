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
  showShippingInfo?: boolean;
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
      className="flex border rounded-[10px] w-[600px] h-[200px] p-3 max-w-full overflow-hidden"
    >
      {/* 이미지 영역 - 고정 크기 */}
      <div className="relative w-[180px] h-full flex-shrink-0">
        <div className="w-full h-full relative bg-gray-50 rounded-[10px] overflow-hidden">
          <Image
            src={imgUrl || "/images/noImg.png"}
            alt={name}
            fill
            className="object-contain p-2"
            sizes="180px"
          />
        </div>
      </div>

      {/* 텍스트 영역 - 유연한 크기 */}
      <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
        <div className="flex-1">
          {/* 상품명 - 2줄로 제한 */}
          <p className="text-sm font-medium line-clamp-2 leading-5 mb-2">
            {name}
          </p>

          {/* 가격 - 일정한 형식 */}
          <span className="text-lg font-bold text-gray-900">
            {typeof price === "number" ? price.toLocaleString() : price}원
          </span>
        </div>

        {/* 배송 정보 - 하단 고정 */}
        {showShippingInfo && (
          <div className="text-sm text-gray-500 mt-2 flex-shrink-0">
            배송비{" "}
            {shippingFee === 0 ? "무료" : `${shippingFee?.toLocaleString()}원`}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
