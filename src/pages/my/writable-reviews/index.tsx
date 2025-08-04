import SubTitle from "@/components/my/coupon/SubTitle";
import MyPageLayoutWithWelcome from "@/components/my/MyPageLayoutWithWelcome";

const MypageReviewList = () => {
  return (
    <div>
      <SubTitle title="내 상품 후기" />
    </div>
  );
};

const index = () => {
  return (
    <MyPageLayoutWithWelcome>
      <MypageReviewList />
    </MyPageLayoutWithWelcome>
  );
};

export default index;
