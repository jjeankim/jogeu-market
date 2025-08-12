import MyPageLayoutWithWelcome from "@/components/my/MyPageLayoutWithWelcome";
import MypageUserSetting from "@/components/my/setting/MypageUserSetting";
import SEO from "@/components/SEO";


const index = () => {
  return (
    <>
    <SEO title="마이쇼핑"/>
    <MyPageLayoutWithWelcome>
      <MypageUserSetting />
    </MyPageLayoutWithWelcome>
    </>
  );
};

export default index;
