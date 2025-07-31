import { ReactNode } from "react";
import MyPageAside from "./MyPageAside";

interface MyPageLayout {
  children: ReactNode;
  pageTitle: string;
}

const MyPageLayout = ({ children, pageTitle }: MyPageLayout) => {
  return (
    <main className="m-20 flex gap-10">
      <section className="flex-1">
        <h2 className="text-3xl font-bold inline-block mb-20">{pageTitle}</h2>
        <MyPageAside />
      </section>
      <section className="flex-4">{children}</section>
    </main>
  );
};

export default MyPageLayout;
