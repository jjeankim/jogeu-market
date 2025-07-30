import { ReactNode } from "react";
import MyPageAside from "./MyPageAside";

interface MyPageLayout {
  children: ReactNode,
  pageTitle: string;
}

const MyPageLayout = ({children,pageTitle}:MyPageLayout) => {
  return (
    <main className=" p-20 flex justify-between">
      <section >
        <h2 className="text-3xl font-bold inline-block mb-20">{pageTitle}</h2>
        <MyPageAside />
      </section>
      <section className="w-[80%]">
        {children}
      </section>
    </main>
  );
};

export default MyPageLayout;
