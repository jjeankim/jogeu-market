import MyPageInfo from "@/components/ui/MyPageWelcomeCard";
import MyPageLayout from "@/components/ui/MyPageLayout";

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
