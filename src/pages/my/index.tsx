import MyPageInfo from "@/components/my/MyPageWelcomeCard";
import MyPageLayout from "@/components/my/MyPageLayout";
import MyPageOrderStatusCard from "@/components/my/MyPageOrderStatusCard";
import Image from "next/image";

const index = () => {
  return (
    <MyPageLayout pageTitle="마이페이지">
      <MyPageInfo />
      <MyPageOrderStatusCard />
      {/* 오더 없을때 조건 부 렌더링 */}
      <div className="flex justify-center">
        <Image
          width={400}
          height={400}
          src={"/images/logo_bw_jogeuMarket.svg"}
          alt="진행 중인 주문 없음 이미지"
        />
      </div>
    </MyPageLayout>
  );
};

export default index;
