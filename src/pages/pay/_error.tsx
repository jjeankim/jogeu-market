import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useToast } from "@/hooks/useToast";

type Props = { statusCode?: number };

function PayError({ statusCode }: Props) {
  const router = useRouter();
  const { showError } = useToast();

  useEffect(() => {
    showError("결제 진행 중 문제가 발생했어요. 주문 페이지로 이동합니다.");
    const t = setTimeout(() => router.replace("/order"), 2000);
    return () => clearTimeout(t);
  }, [router, showError]);

  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h1>{statusCode ? `${statusCode} 에러가 발생했습니다` : "에러가 발생했습니다"}</h1>
      <p style={{ marginTop: 16, color: "#666" }}>잠시 후 주문 페이지로 이동합니다…</p>
      <div style={{ marginTop: 24 }}>
        <button
          onClick={() => router.replace("/order")}
          style={{ padding: "10px 16px", borderRadius: 8, background: "#1b64da", color: "#fff", border: 0 }}
        >
          주문 페이지로 이동
        </button>
        <button
          onClick={() => router.back()}
          style={{ padding: "10px 16px", borderRadius: 8, background: "#e8f3ff", color: "#1b64da", border: 0, marginLeft: 12 }}
        >
          뒤로 가기
        </button>
      </div>
    </div>
  );
}

PayError.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default PayError;
