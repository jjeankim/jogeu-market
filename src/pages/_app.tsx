import Header from "@/components/Header";
import Footer from "@/components/ui/Footer";
import useAuthStore from "@/store/AuthStore";
import "@/styles/globals.css";
import "@/styles/swiper.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { Toaster } from "react-hot-toast";

const ToastProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

const AppInitializer = () => {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth(); // 새로고침 시 accessToken 복원 시도
  }, [initializeAuth]);

  return null;
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const noHeaderFooterPaths = ["/login", "/signup"];
  const showHeaderFooter = !noHeaderFooterPaths.includes(router.pathname);

  return (
    <ToastProvider>
      <AppInitializer />
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col h-screen">
          {showHeaderFooter && <Header />}
          <div className="flex-1">
            <Component {...pageProps} />
          </div>
          {showHeaderFooter && <Footer />}
        </div>
      </div>
    </ToastProvider>
  );
}
