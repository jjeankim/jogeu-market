import MyPageLayoutWithWelcome from "@/components/my/MyPageLayoutWithWelcome";
import MypageUserSetting from "@/components/my/setting/MypageUserSetting";


const index = () => {
  return (
    <MyPageLayoutWithWelcome>
      <MypageUserSetting />
    </MyPageLayoutWithWelcome>
  );
};

export default index;
