import Image from "next/image";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";

// 필수 CSS 임포트
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState } from "react";

const images = [
  { src: "/images/main1.png", to: "/my" },
  { src: "/images/main2.png", to: "/my/settings" },
  { src: "/images/main3.png", to: "/my/coupon" },
  { src: "/images/main4.png", to: "/my" },
];

const MainSwiper = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // 1부터 시작
  const totalSlides = 4;

  return (
    <div className="relative w-full max-w-[1240px] mx-auto h-48 md:h-96 overflow-hidden mt-4 md:mt-10 mb-4 md:mb-30">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => {
          // loop 모드에서는 realIndex 사용
          setCurrentIndex(swiper.realIndex + 1);
        }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        className="w-full h-full"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <Link href={img.to}>
              <div className="relative w-full h-full">
                <Image
                  fill
                  sizes="100vw"
                  src={img.src}
                  alt={`메인 배너 ${idx + 1}`}
                  className="object-cover"
                  priority={idx === 0}
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Custom Pagination */}
      <div className="absolute bottom-2 md:bottom-4 right-3 md:right-6 z-10 bg-black opacity-40 text-white text-xs md:text-sm px-2 md:px-3 py-1 rounded-full">
        {String(currentIndex).padStart(2, "0")} /{" "}
        {String(totalSlides).padStart(2, "0")}
      </div>

      {/* 네비게이션 버튼 - 모바일에서는 더 작게 */}
      <button className="custom-prev cursor-pointer absolute left-2 md:left-10 top-1/2 z-10 -translate-y-1/2 bg-black opacity-30 text-white rounded-full w-8 h-8 md:w-14 md:h-14 flex items-center justify-center">
        <FiChevronLeft size={20} className="md:hidden" />
        <FiChevronLeft size={30} className="hidden md:block" />
      </button>
      <button className="custom-next cursor-pointer absolute right-2 md:right-10 top-1/2 z-10 -translate-y-1/2 bg-black opacity-30 text-white rounded-full w-8 h-8 md:w-16 md:h-16 flex items-center justify-center">
        <FiChevronRight size={20} className="md:hidden" />
        <FiChevronRight size={30} className="hidden md:block" />
      </button>
    </div>
  );
};

export default MainSwiper;
