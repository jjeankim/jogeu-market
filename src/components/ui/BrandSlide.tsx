import Image from "next/image";
import SwiperCore, { Navigation, Scrollbar } from "swiper";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
import { useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import clsx from "clsx";

SwiperCore.use([Navigation, Scrollbar]);

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

  return (
    <div className="brand-slider relative overflow-visible">
      <SwiperReact
        spaceBetween={50}
        slidesPerView={4}
        slidesOffsetBefore={0}
        slidesOffsetAfter={0}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setTimeout(() => {
            if (
              swiper?.params?.navigation &&
              typeof swiper.params.navigation !== "boolean"
            ) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;

              swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();
            }
          });
        }}
        // scrollbar={{ draggable: true }}
      >
        {BrandList.map((brand) => (
          <SwiperSlide
            key={brand.id}
            className="!w-[110px] flex items-center justify-center"
          >
            <Link href="" className="relative text-center aspect-square">
              <Image
                src={brand.imgUrl || "/images/noImg.png"}
                width={120}
                height={120}
                alt={brand.name}
                className="rounded-full"
              />
            </Link>
          </SwiperSlide>
        ))}
      </SwiperReact>

      {/* 커스텀 내비게이션 버튼 */}
      <div
        className="swiper-button-prev absolute top-1/2 left-0 z-10 cursor-pointer"
        ref={prevRef}
      >
        <FiChevronLeft size={24} className="text-black" />
      </div>
      <div
        className="swiper-button-next absolute top-1/2 right-0 z-10 cursor-pointer"
        ref={nextRef}
      >
        <FiChevronRight size={24} className="text-black" />
      </div>
    </div>
  );
}

export default BrandSlider;
