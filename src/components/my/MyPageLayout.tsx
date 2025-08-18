import { ReactNode } from "react";
import MyPageAside from "./MyPageAside";

interface MyPageLayout {
  children: ReactNode;
 
}

const MyPageLayout = ({ children }: MyPageLayout) => {
  return (
    <main className="m-20 mb-40 flex flex-col-reverse gap-30 md:flex-row md:gap-10">
      <section className="flex-1">
        <h2 className="text-3xl font-bold inline-block mb-20">마이 페이지</h2>
        <MyPageAside />
      </section>
      <section className="flex-4 flex flex-col gap-25">{children}</section>
    </main>
  );
};

export default MyPageLayout;
