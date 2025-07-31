import Header from "@/components/Header";
import Footer from "@/components/ui/Footer";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

const ToastProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const noHeaderFooterPaths = ["/login", "/signup"];
  const showHeaderFooter = !noHeaderFooterPaths.includes(router.pathname);

  return (
    <ToastProvider>
      <div className="flex flex-col h-screen">
        {showHeaderFooter && <Header />}
        <div className="flex-1">
          <Component {...pageProps} />
        </div>
        {showHeaderFooter && <Footer />}
      </div>
    </ToastProvider>
  );
}
