import type { MyPageLayoutWithWelcome } from "@/types/my/my";
import MyPageLayout from "./MyPageLayout";
import MyPageWelcomeCard from "./MyPageWelcomeCard";

const MyPageLayoutWithWelcome = ({ children }: MyPageLayoutWithWelcome) => {
  return (
    <>
      <MyPageLayout>
        <MyPageWelcomeCard />
        {children}
      </MyPageLayout>
    </>
  );
};

export default MyPageLayoutWithWelcome;
