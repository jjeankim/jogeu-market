import DynamicBreadcrumb from "@/components/ui/autoBreadcrumb";
import Footer from "@/components/ui/Footer";
import MainForm from "@/components/MainForm";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
    <Header />
      <MainForm />
      <DynamicBreadcrumb />
      <Footer />
    </>
  );
}
