import Image from "next/image";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import { Swiper } from "swiper/types";
import { Brand } from "@/lib/apis/brand";


interface SliderProps {
  BrandList: Brand[];
  slidesPerView: number;
}

function BrandSlider({ BrandList, slidesPerView }: SliderProps) {
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

      // params.navigation이 존재하고 객체인지 확인
      if (
        swiper.params.navigation &&
        typeof swiper.params.navigation === "object"
      ) {
        // 타입 단언을 사용하여 안전하게 할당
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

        swiper.navigation.destroy(); // 기존 내비게이션 초기화
        swiper.navigation.init(); // 새로 초기화
        swiper.navigation.update(); // 업데이트
      }
    }
  }, [navReady]);

  useEffect(() => {
    console.log("prevRef.current:", prevRef.current);
    console.log("nextRef.current:", nextRef.current);
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
          console.log("isBeginning:", swiper.isBeginning);
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        // navigation={true}
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
                src={brand.logoImageUrl || "/images/noImg.png"}
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
        className={`custom-prev absolute -translate-y-1/2 top-1/2 -left-15 z-10 cursor-pointer ${isBeginning ? "opacity-0 pointer-events-none" : ""}`}
        ref={prevRef}
      >
        <FiChevronLeft size={40} className="text-gray-400" />
      </div>
      <div
        className={`custom-next absolute -translate-y-1/2 top-1/2 -right-15 z-10 cursor-pointer ${isEnd ? "opacity-0 pointer-events-none" : ""}`}
        ref={nextRef}
      >
        <FiChevronRight size={40} className="text-gray-400" />
      </div>
    </div>
  );
}

export default BrandSlider;
