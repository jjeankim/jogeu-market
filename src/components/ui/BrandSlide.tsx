import Image from "next/image";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import "swiper/css";

type Brand = {
  id: number;
  name: string;
  imgUrl?: string;
};

interface SliderProps {
  BrandList: Brand[];
  slidesPerView: number;
}

function BrandSlider({ BrandList, slidesPerView }: SliderProps) {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.isBeginning);
      setIsEnd(swiperRef.current.isEnd);
    }
  }, []);

  return (
    <div className="brand-slider relative max-w-[500px] mx-auto">
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
            className="!w-[110px] flex items-center justify-center"
          >
            <Link href="" className="relative text-center aspect-square w-full">
              <Image
                src={brand.imgUrl || "/images/noImg.png"}
                width={110}
                height={110}
                alt={brand.name}
                className="rounded-full object-cover"
              />
            </Link>
          </SwiperSlide>
        ))}
      </SwiperReact>

      {/* 내비게이션 버튼 */}
      <div
        className={`swiper-button-prev absolute -translate-y-1/2 top-1/2 -left-10 z-10 cursor-pointer ${isBeginning ? "opacity-0 pointer-events-none" : ""}`}
        ref={prevRef}
      >
        <FiChevronLeft size={24} className="text-black" />
      </div>
      <div
        className={`swiper-button-next absolute -translate-y-1/2 top-1/2 -right-10 z-10 cursor-pointer ${isEnd ? "opacity-0 pointer-events-none" : ""}`}
        ref={nextRef}
      >
        <FiChevronRight size={24} className="text-black" />
      </div>
    </div>
  );
}

export default BrandSlider;
