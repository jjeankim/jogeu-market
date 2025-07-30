import MyPageInfo from "@/components/my/MyPageWelcomeCard";
import MyPageLayout from "@/components/my/MyPageLayout";

const index = () => {
  return (
    <MyPageLayout pageTitle="마이페이지">
      <section>
        <MyPageInfo />
      </section>
    </MyPageLayout>
  );
};

export default index;
