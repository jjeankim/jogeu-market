import DynamicBreadcrumb from "@/components/ui/autoBreadcrumb";
import Footer from "@/components/ui/Footer";
import Main from "./main";
import Header from "@/components/Header";
        
import MyPageAside from "@/components/ui/MyPageAside";
export default function Home() {
  return (
    <>
    <Header />
      <Main />
      <DynamicBreadcrumb />
      <Footer />
    </>
  );
}
