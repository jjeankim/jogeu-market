import MyPageOrderStatusCard from "@/components/my/MyPageOrderStatusCard";
import Image from "next/image";
import MyPageLayoutWithWelcome from "@/components/my/MyPageLayoutWithWelcome";
import SEO from "@/components/SEO";

const MyPage = () => {
  return (
    <>
      <SEO title="마이쇼핑" />
      <MyPageLayoutWithWelcome>
        <MyPageOrderStatusCard>
          {/* 모바일 */}
          <div className="md:hidden mb-6">
            <h3 className="text-2xl font-bold mb-4">진행 중인 주문</h3>
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-400 hover:text-[#b29977] px-3 py-1 bg-gray-100 rounded-full">
                최근 1개월
              </span>
              <span className="text-sm text-gray-400 hover:text-[#b29977] px-3 py-1 bg-gray-100 rounded-full">
                최근 3개월
              </span>
              <span className="text-sm text-gray-400 hover:text-[#b29977] px-3 py-1 bg-gray-100 rounded-full">
                최근 6개월
              </span>
              <span className="text-sm text-gray-400 hover:text-[#b29977] px-3 py-1 bg-gray-100 rounded-full">
                최근 1년
              </span>
              <span className="text-sm text-gray-400 hover:text-[#b29977] px-3 py-1 bg-gray-100 rounded-full">
                최근 1년 이상
              </span>
            </div>
          </div>

          {/* 데스크톱 */}
          <div className="hidden md:flex gap-10 items-baseline mb-10">
            <h3 className="text-3xl font-bold">진행 중인 주문</h3>
            <span className="text-gray-400 hover:text-[#b29977]">
              최근 1개월
            </span>
            <span className="text-gray-400 hover:text-[#b29977]">
              최근 3개월
            </span>
            <span className="text-gray-400 hover:text-[#b29977]">
              최근 6개월
            </span>
            <span className="text-gray-400 hover:text-[#b29977]">최근 1년</span>
            <span className="text-gray-400 hover:text-[#b29977]">
              최근 1년 이상
            </span>
          </div> */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6 items-start sm:items-baseline mb-6 md:mb-10">
            <h3 className="text-2xl md:text-3xl font-bold">진행 중인 주문</h3>
            <div className="flex flex-wrap gap-3 sm:gap-6 text-sm sm:text-base md:text-lg">
              <span className="text-gray-400 hover:text-[#b29977] cursor-pointer">
                최근 1개월
              </span>
              <span className="text-gray-400 hover:text-[#b29977] cursor-pointer">
                최근 3개월
              </span>
              <span className="text-gray-400 hover:text-[#b29977] cursor-pointer">
                최근 6개월
              </span>
              <span className="text-gray-400 hover:text-[#b29977] cursor-pointer">
                최근 1년
              </span>
              <span className="text-gray-400 hover:text-[#b29977] cursor-pointer">
                최근 1년 이상
              </span>
            </div>
          </div>
        </MyPageOrderStatusCard>
        {/* 오더 없을때 조건 부 렌더링 */}
        {/* <div className="flex justify-center">
          <Image
            width={400}
            height={400}
            src={"/images/logo_bw_jogeuMarket.svg"}
            alt="진행 중인 주문 없음 이미지"
          />
        </div> */}
         <div className="flex justify-center py-10">
          <Image
            width={250}
            height={250}
            src="/images/logo_bw_jogeuMarket.svg"
            alt="진행 중인 주문 없음 이미지"
            className="w-40 sm:w-60 md:w-80 lg:w-[400px] h-auto"
          />
        </div>
      </MyPageLayoutWithWelcome>
    </>
  );
};

export default MyPage;
