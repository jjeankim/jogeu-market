import Image from "next/image";
import { Product, PickProductCardProps } from "@/lib/apis/product";

// PickProductCard.tsx
// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   thumbnailImageUrl: string;
//   brand: { name: string };
//   originalPrice?: number;
//   tags?: string[];
//   isSample?: boolean;
//   isPick?: boolean;
// }

interface PickProductCardProps {
  product: Product;
  imageSize?: { width: number; height: number };
  onClick?: (productId: string) => void;
}

const PickProductCard: React.FC<PickProductCardProps> = ({
  product,
  imageSize = { width: 300, height: 300 },
  onClick,
}) => {
  if (!product) return null;

  const {
    name,
    price,
    thumbnailImageUrl,
    brand,
    originalPrice,
    isSample,
    isPick,
  } = product;

  const computedOriginalPrice = originalPrice ?? Math.round(price * 1.1);
  const tags = [
    isSample ? "샘플 증정" : null,
    isPick ? "MD's Pick" : null,
    !isSample && !isPick ? "세일" : null,
  ].filter(Boolean);

  //   const badgeLabel = isSample ? "샘플 증정" : isPick ? "MD's Pick" : "세일";

  return (
    <div className="bg-white p-6 flex" onClick={onClick}>
      <Image
        src={thumbnailImageUrl || "/images/lip.png"}
        alt={name}
        width={imageSize.width}
        height={imageSize.height}
        className="border-2"
      />
      <div className="flex flex-col justify-center space-y-1.5 p-5">
        <div className="text-gray-400 font-semibold">{brand.name}</div>
        <div className="font-semibold">{name}</div>
        <div className="mt-1">
          {computedOriginalPrice > price && (
            <span className="line-through text-sm text-gray-400 pr-3">
              {computedOriginalPrice.toLocaleString()}원
            </span>
          )}
          <span className="text-lg text-red-500 font-semibold mr-2">
            {price.toLocaleString()}원
          </span>
        </div>
        <div className="flex gap-1 mt-1 flex-wrap">
          {tags.map((tag, i) => (
            <span
              key={i}
              className={`p-1 px-3 text-sm rounded-lg text-white ${
                tag === "세일"
                  ? "bg-red-400"
                  : tag === "MD's Pick"
                    ? "bg-yellow-300"
                    : tag === "샘플 증정"
                      ? "bg-green-400"
                      : "bg-gray-400"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PickProductCard;
