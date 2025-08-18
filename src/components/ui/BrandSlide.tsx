import Image from "next/image";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Swiper } from "swiper/types";
import { Brand } from "@/lib/apis/brand";

interface SliderProps {
  BrandList: Brand[];
  slidesPerView: number;
  selectedBrandId?: number | null;
  onBrandSelect: (brandId: number | null) => void;
}

function BrandSlider({
  BrandList,
  slidesPerView,
  selectedBrandId,
  onBrandSelect,
}: SliderProps) {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<Swiper | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [navReady, setNavReady] = useState(false);

  useEffect(() => {
    setNavReady(true);
  }, []);

  useEffect(() => {
    if (navReady && swiperRef.current && prevRef.current && nextRef.current) {
      const swiper = swiperRef.current;

      if (
        swiper.params.navigation &&
        typeof swiper.params.navigation === "object"
      ) {
        (
          swiper.params.navigation as {
            prevEl?: HTMLElement;
            nextEl?: HTMLElement;
          }
        ).prevEl = prevRef.current;
        (
          swiper.params.navigation as {
            prevEl?: HTMLElement;
            nextEl?: HTMLElement;
          }
        ).nextEl = nextRef.current;

        swiper.navigation.destroy();
        swiper.navigation.init();
        swiper.navigation.update();
      }
    }
  }, [navReady]);


  const handleBrandClick = (brandId: number) => {
    if (selectedBrandId === brandId) {
      onBrandSelect(null);
    } else {
      onBrandSelect(brandId);
    }
  };

  return (
    <div className="brand-slider relative max-w-[480px] mx-auto">
      <SwiperReact
        modules={[Navigation]}
        slidesPerView={slidesPerView}
        spaceBetween={20}
        slidesOffsetBefore={0}
        slidesOffsetAfter={0}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
      >
        {BrandList.map((brand) => (
          <SwiperSlide
            key={brand.id}
            className="!w-[100px] flex flex-col items-center justify-center p-3"
          >
            <button
              onClick={() => handleBrandClick(brand.id)}
              className={`relative text-center w-[100px] h-[100px] rounded-full overflow-hidden transition-all duration-200 ${
                selectedBrandId === brand.id
                  ? "ring-3 ring-offset-2 scale-105"
                  : "hover:scale-105 hover:shadow-lg"
              }`}
              style={
                selectedBrandId === brand.id
                  ? ({
                      "--tw-ring-color": "var(--color-logo)",
                      "--tw-ring-opacity": "1",
                    } as React.CSSProperties)
                  : undefined
              }
            >
              <Image
                src={brand.logoImageUrl || "/images/noImg.png"}
                width={100}
                height={100}
                alt={brand.name}
                className="rounded-full object-cover w-full h-full"
              />
              {selectedBrandId === brand.id && (
                <div
                  className="absolute inset-0 bg-opacity-15 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-logo)" }}
                >
                  <div
                    className="text-white text-xs px-2 py-1 rounded-full font-medium"
                    style={{ backgroundColor: "var(--color-logo)" }}
                  >
                    선택됨
                  </div>
                </div>
              )}
            </button>
            <div className="text-center mt-2 text-sm font-medium truncate w-full">
              {brand.name}
            </div>
          </SwiperSlide>
        ))}
      </SwiperReact>

      {/* 내비게이션 버튼 */}
      <div
        className={`custom-prev absolute -translate-y-1/2 top-1/2 -left-15 z-10 cursor-pointer ${
          isBeginning ? "opacity-0 pointer-events-none" : ""
        }`}
        ref={prevRef}
      >
        <FiChevronLeft size={40} className="text-gray-400" />
      </div>
      <div
        className={`custom-next absolute -translate-y-1/2 top-1/2 -right-15 z-10 cursor-pointer ${
          isEnd ? "opacity-0 pointer-events-none" : ""
        }`}
        ref={nextRef}
      >
        <FiChevronRight size={40} className="text-gray-400" />
      </div>
    </div>
  );
}

export default BrandSlider;
