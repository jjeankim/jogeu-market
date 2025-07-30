import "@/styles/globals.css";
import type { AppProps } from "next/app";
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
  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  );
}
