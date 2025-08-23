import Header from "@/components/Header";
import QnATest from "@/components/QnA";
import Footer from "@/components/ui/Footer";
import axiosInstance from "@/lib/axiosInstance";
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
    (async () => {
      try {
        // CSRF 토큰 쿠키(XSRF-TOKEN) 선발급
        await axiosInstance.get("/api/csrf-token");
      } catch (e) {
        // 초기 로드 실패해도 앱 진행은 계속
        console.warn("[AppInitializer] CSRF init failed", e);
      } finally {
        // accessToken 복원(POST /auth/refresh) 시도
        await initializeAuth();
      }
    })();
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
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col h-screen">
          {showHeaderFooter && <Header />}
          <div className="flex-1">
            <Component {...pageProps} />
          </div>
          {showHeaderFooter && <Footer />}
        </div>
        <QnATest />
      </div>
    </ToastProvider>
  );
}
