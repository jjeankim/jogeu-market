import React, { useState, useEffect } from "react";
import PickProductCard from "./PickProductCard";
import { Props } from "@/lib/apis/product";
import { useRouter } from "next/router";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   thumbnailImageUrl: string;
//   brand: { name: string };
//   originalPrice?: number;
//   tags?: string[];
// }

// interface Props {
//   id: string;
//   products: Product[];
// }

const PickProductSection: React.FC<Props> = ({ id, products }) => {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const total = products.length;

  const onItemClick = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  useEffect(() => {
    if (products.length === 0) return;

    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % total;
      setPrevIndex(currentIndex);
      setCurrentIndex(nextIndex);
      setIsAnimating(true);

      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }, 2500);

    return () => clearInterval(timer);
  }, [currentIndex, products, total]);

  if (products.length === 0) return null;

  return (
    <section id={id} className="bg-white h-auto space-y-4 py-4">
      <h2 className="text-xl md:text-2xl font-bold text-center">Pick</h2>
      <h3 className="text-lg md:text-xl text-center text-gray-600 px-4">
        엄선한 제품을 소개합니다
      </h3>

      <div className="grid grid-cols-2 gap-6 h-96 px-6 relative overflow-hidden content-center">

        {/* 왼쪽 카드 - 애니메이션 */}
        <div className="relative h-full overflow-hidden">
          {/* 이전 카드 */}
          {isAnimating && (
            <div
              key={`prev-${products[prevIndex].id}`}
              className="absolute w-full h-full z-0 animate-slideOutUp  flex items-center justify-center "
            >
              <PickProductCard
                product={products[prevIndex]}
                imageSize={{ width: 230, height: 230 }}
                onClick={() => onItemClick(products[prevIndex].id.toString())}
              />
            </div>
          )}
          {/* 현재 카드 */}
          <div
            key={`current-${products[currentIndex].id}`}
            className={`absolute w-full h-full z-10 ${
              isAnimating ? "animate-slideInUp" : ""
            } `}
          >
            <PickProductCard
              product={products[currentIndex]}
              onClick={() => onItemClick(products[currentIndex].id.toString())}
              imageSize={{ width: 230, height: 230 }}
            />
          </div>
        </div>

        {/* 오른쪽 리스트 */}
        <ul className="flex flex-col justify-center h-full space-y-1 relative overflow-hidden mt-4 md:mt-0">
          {products.map((product, i) => (
            <li
              key={product.id}
              onClick={() => {
                if (i !== currentIndex) {
                  setPrevIndex(currentIndex);
                  setCurrentIndex(i);
                  setIsAnimating(true);
                  setTimeout(() => setIsAnimating(false), 500);
                }
              }}
              className={`cursor-pointer transition-all duration-500 transform px-3 md:px-4 py-2 rounded-md flex items-center text-sm md:text-lg
                ${
                  currentIndex === i
                    ? "translate-y-0 opacity-100 border-2 border-black text-black font-bold bg-white"
                    : "translate-y-2 opacity-50 border border-transparent text-gray-400"
                }`}
            >
              <span className="font-bold pr-2 md:pr-3 text-sm md:text-base">{i + 1}</span>
              <span className="truncate">{product.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 슬라이드 애니메이션 정의 */}
      <style jsx>{`
        @keyframes slideInUp {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideOutUp {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-100%);
            opacity: 0;
          }
        }

        .animate-slideInUp {
          animation: slideInUp 0.5s ease-out forwards;
        }

        .animate-slideOutUp {
          animation: slideOutUp 0.5s ease-in forwards;
        }
      `}</style>
    </section>
  );
};

export default PickProductSection;
