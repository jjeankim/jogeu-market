import MyPageOrderStatusCard from "@/components/my/MyPageOrderStatusCard";
import Image from "next/image";
import MyPageLayoutWithWelcome from "@/components/my/MyPageLayoutWithWelcome";

const MyPage = () => {
  
  return (
    <MyPageLayoutWithWelcome>
      <MyPageOrderStatusCard>
        <div className="flex gap-10 items-baseline mb-10">
          <h3 className="text-3xl font-bold">진행 중인 주문</h3>
          <span className="text-gray-400 hover:text-[#b29977]">최근 1개월</span>
          <span className="text-gray-400 hover:text-[#b29977]">최근 3개월</span>
          <span className="text-gray-400 hover:text-[#b29977]">최근 6개월</span>
          <span className="text-gray-400 hover:text-[#b29977]">최근 1년</span>
          <span className="text-gray-400 hover:text-[#b29977]">
            최근 1년 이상
          </span>
        </div>
      </MyPageOrderStatusCard>
      {/* 오더 없을때 조건 부 렌더링 */}
      <div className="flex justify-center">
        <Image
          width={400}
          height={400}
          src={"/images/logo_bw_jogeuMarket.svg"}
          alt="진행 중인 주문 없음 이미지"
        />
      </div>
    </MyPageLayoutWithWelcome>
  );
};

export default MyPage;
