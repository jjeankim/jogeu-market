import React, { useEffect } from "react";
import Head from "next/head";
import "@/styles/style.css";

// TossPayments 타입 정의
declare global {
  interface Window {
    TossPayments: any;
  }
}

const Checkout = () => {
  useEffect(() => {
    // 동적으로 TossPayments SDK 로드
    const script = document.createElement("script");
    script.src = "https://js.tosspayments.com/v2/standard";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      async function main() {
        try {
          // DOM 요소들이 준비될 때까지 잠시 대기
          await new Promise(resolve => setTimeout(resolve, 100));
          
          const button = document.getElementById("payment-button");
          const paymentMethodElement = document.getElementById("payment-method");
          const agreementElement = document.getElementById("agreement");
          
          if (!paymentMethodElement || !agreementElement) {
            console.error("필요한 DOM 요소를 찾을 수 없습니다.");
            return;
          }
          
          const amount = {
            currency: "KRW",
            value: 100,
          };
          
          const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
          const TossPayments = window.TossPayments;
          if (!TossPayments) {
            console.error("TossPayments SDK를 로드할 수 없습니다.");
            return;
          }
          
          const customerKey = generateRandomString();
          const tossPayments = TossPayments(clientKey);
          const widgets = tossPayments.widgets({ customerKey });
          
          await widgets.setAmount(amount);
          await widgets.renderPaymentMethods({
            selector: "#payment-method",
            variantKey: "DEFAULT",
          });
          await widgets.renderAgreement({
            selector: "#agreement",
            variantKey: "AGREEMENT",
          });
          
          if (button) {
            button.addEventListener("click", async function () {
              try {
                await widgets.requestPayment({
                  orderId: generateRandomString(),
                  orderName: "토스 티셔츠 외 2건",
                  successUrl: window.location.origin + "/pay/success",
                  failUrl: window.location.origin + "/pay/fail",
                  customerEmail: "customer123@gmail.com",
                  customerName: "김토스",
                  customerMobilePhone: "01012341234",
                });
              } catch (error) {
                console.error("결제 요청 중 오류 발생:", error);
              }
            });
          }
        } catch (error) {
          console.error("위젯 초기화 중 오류 발생:", error);
        }
      }
      
      function generateRandomString() {
        return window.btoa(Math.random().toString()).slice(0, 20);
      }
      
      main();
    };

    return () => {
      const existingScript = document.querySelector('script[src="https://js.tosspayments.com/v2/standard"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>토스페이먼츠 샘플 프로젝트</title>
        <link rel="icon" href="https://static.toss.im/icons/png/4x/icon-toss-logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <div className="wrapper">
        <div className="box_section padding--l">
          <div id="payment-method"></div>
          <div id="agreement"></div>
          <div className="result wrapper">
            <button
              className="button padding--t"
              id="payment-button"
            >
              결제하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
