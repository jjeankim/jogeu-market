import React, { useEffect } from "react";
import Head from "next/head";

// TossPayments 타입 정의
declare global {
  interface Window {
    TossPayments: any;
  }
}

const Checkout = () => {
  useEffect(() => {
    let widgets: any = null;
    let isInitialized = false;

    // 기존 위젯이 있다면 정리
    const paymentMethodElement = document.getElementById("payment-method");
    const agreementElement = document.getElementById("agreement");
    
    if (paymentMethodElement) {
      paymentMethodElement.innerHTML = '';
    }
    if (agreementElement) {
      agreementElement.innerHTML = '';
    }

    // 이미 스크립트가 로드되어 있는지 확인
    const existingScript = document.querySelector('script[src="https://js.tosspayments.com/v2/standard"]');
    
    if (existingScript && window.TossPayments) {
      // 이미 스크립트가 로드되어 있으면 바로 초기화
      initializePayments();
    } else {
      // 스크립트가 없으면 새로 로드
      const script = document.createElement("script");
      script.src = "https://js.tosspayments.com/v2/standard";
      script.async = true;
      document.body.appendChild(script);
      script.onload = initializePayments;
    }

    async function initializePayments() {
      if (isInitialized) return;
      
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
        widgets = tossPayments.widgets({ customerKey });
        
        await widgets.setAmount(amount);
        await widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        });
        await widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        });
        
        isInitialized = true;
        
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

    return () => {
      // 컴포넌트 언마운트 시 위젯 정리
      if (widgets) {
        try {
          widgets.cleanup?.();
        } catch (error) {
          console.log("위젯 정리 중 오류:", error);
        }
      }
      
      // DOM 요소 정리
      const paymentMethodElement = document.getElementById("payment-method");
      const agreementElement = document.getElementById("agreement");
      
      if (paymentMethodElement) {
        paymentMethodElement.innerHTML = '';
      }
      if (agreementElement) {
        agreementElement.innerHTML = '';
      }
      
      isInitialized = false;
    };
  }, []);

  return (
    <>
      <Head>
        <title>토스페이먼츠 샘플 프로젝트</title>
        <link rel="icon" href="https://static.toss.im/icons/png/4x/icon-toss-logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <div className="max-w-[800px] mx-auto">
        <div className="bg-white rounded-[10px] shadow-[0_10px_20px_rgb(0_0_0_/_1%),0_6px_6px_rgb(0_0_0_/_6%)] p-[50px] mt-[30px] mx-auto text-[#333d4b] items-center text-center overflow-x-auto whitespace-nowrap py-[11px] px-[22px]">
          <div id="payment-method"></div>
          <div id="agreement"></div>
          <div className="mt-5 max-w-[800px] mx-auto">
            <button
              className="text-[#f9fafb] bg-[#3182f6] my-[30px] mx-[15px] mt-0 text-[15px] font-semibold leading-[18px] whitespace-nowrap text-center cursor-pointer border-0 border-transparent select-none transition-all duration-200 ease-in-out no-underline rounded-[7px] py-[11px] px-4 w-[250px] inline-block hover:text-white hover:bg-[#1b64da] pt-1 pb-1 px-2"
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
