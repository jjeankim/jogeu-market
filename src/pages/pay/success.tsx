import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import "@/styles/style.css";

interface PaymentData {
  paymentKey: string;
  orderId: string;
  amount: string;
}

const Success = () => {
  const router = useRouter();
  const [responseData, setResponseData] = useState<any>(null);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

  useEffect(() => {
    if (!router.isReady) return;

    const urlParams = new URLSearchParams(window.location.search);
    const paymentKey = urlParams.get("paymentKey");
    const orderId = urlParams.get("orderId");
    const amount = urlParams.get("amount");

    if (paymentKey && orderId && amount) {
      setPaymentData({ paymentKey, orderId, amount });
      
      // 서버로 결제 승인에 필요한 결제 정보를 보내기
      confirmPayment({ paymentKey, orderId, amount });
    }
  }, [router.isReady]);

  const confirmPayment = async (requestData: PaymentData) => {
    try {
      const response = await fetch("/api/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const json = await response.json();

      if (!response.ok) {
        console.log(json);
        window.location.href = `/fail?message=${json.message}&code=${json.code}`;
        return;
      }

      setResponseData(json);
    } catch (error) {
      console.error("결제 승인 중 오류 발생:", error);
    }
  };

  return (
    <>
      <Head>
        <title>토스페이먼츠 샘플 프로젝트</title>
        <link rel="icon" href="https://static.toss.im/icons/png/4x/icon-toss-logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <div className="box_section" style={{ width: 600, maxWidth: "600px", margin: "0 auto" }}>
        <img width="100px" src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png" />
        <h2>결제를 완료했어요</h2>

        <div className="p-grid typography--p padding--xl">
          <div className="p-grid-col text--left"><b>결제금액</b></div>
          <div className="p-grid-col text--right">{paymentData?.amount}원</div>
        </div>
        <div className="p-grid typography--p padding--s">
          <div className="p-grid-col text--left"><b>주문번호</b></div>
          <div className="p-grid-col text--right">{paymentData?.orderId}</div>
        </div>
        <div className="p-grid typography--p padding--s">
          <div className="p-grid-col text--left"><b>paymentKey</b></div>
          <div className="p-grid-col text--right" style={{ whiteSpace: "initial", width: 250 }}>
            {paymentData?.paymentKey}
          </div>
        </div>
        <div className="p-grid padding--t">
          <button 
            className="button p-grid-col5" 
            onClick={() => window.open('https://docs.tosspayments.com/guides/v2/payment-widget/integration')}
          >
            연동 문서
          </button>
          <button 
            className="button p-grid-col5" 
            onClick={() => window.open('https://discord.gg/A4fRFXQhRu')}
            style={{ backgroundColor: "#e8f3ff", color: "#1b64da" }}
          >
            실시간 문의
          </button>
        </div>
      </div>

      <div className="box_section text--left" style={{ width: 600, maxWidth: "600px", margin: "0 auto" }}>
        <b>Response Data :</b>
        <div style={{ whiteSpace: "initial" }}>
          {responseData && <pre>{JSON.stringify(responseData, null, 4)}</pre>}
        </div>
      </div>
    </>
  );
};

export default Success;
