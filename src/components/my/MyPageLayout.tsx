import { ReactNode } from "react";
import MyPageAside from "./MyPageAside";

interface MyPageLayout {
  children: ReactNode;
}

// const MyPageLayout = ({ children }: MyPageLayout) => {
//   return (
//     <main className="m-20 mb-40 flex flex-col-reverse gap-30 md:flex-row md:gap-10">
//       <section className="flex-1">
//         <h2 className="text-3xl font-bold inline-block mb-20">마이 페이지</h2>
//         <MyPageAside />
//       </section>
//       <section className="flex-4 flex flex-col gap-25">{children}</section>
//     </main>
//   );
// };
// const MyPageLayout = ({ children }: MyPageLayout) => {
//   return (
//     <main className="m-4 md:m-20 mb-20 md:mb-40 flex flex-col gap-10 md:flex-row md:gap-10">
//       {/* 사이드 영역 */}
//       <aside className="md:w-64 flex-shrink-0">
//         <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10">마이 페이지</h2>
//         <MyPageAside />
//       </aside>

//       {/* 메인 콘텐츠 */}
//       <section className="flex-1 flex flex-col gap-6 md:gap-10">
//         {children}
//       </section>
//     </main>
//   );
// };
const MyPageLayout = ({ children }: MyPageLayout) => {
  return (
    <main className="mx-auto max-w-screen-xl p-4 md:p-10 lg:p-20 flex flex-col gap-8 md:flex-row md:gap-12">
      {/* 사이드 영역 */}
      <aside className="md:w-56 lg:w-64 flex-shrink-0">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10">마이 페이지</h2>
        <MyPageAside />
      </aside>

      {/* 메인 콘텐츠 */}
      <section className="flex-1 flex flex-col gap-6 lg:gap-10">
        {children}
      </section>
    </main>
  );
};

export default MyPageLayout;
