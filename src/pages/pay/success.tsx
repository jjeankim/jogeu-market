import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

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
      
      <div className="bg-white rounded-[10px] shadow-[0_10px_20px_rgb(0_0_0_/_1%),0_6px_6px_rgb(0_0_0_/_6%)] p-[50px] mt-[30px] mx-auto text-[#333d4b] items-center text-center overflow-x-auto whitespace-nowrap w-[600px] max-w-[600px] mx-auto">
        <Image 
          width={100} 
          height={100}
          src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png" 
          alt="결제 성공 아이콘"
        />
        <h2>결제를 완료했어요</h2>

        <div className="h-full flex flex-wrap -mr-6 text-[15px] leading-[1.6] pt-[18px] pb-[18px] px-6">
          <div className="flex-grow pr-6 text-left"><b>결제금액</b></div>
          <div className="flex-grow pr-6 text-right">{paymentData?.amount}원</div>
        </div>
        <div className="h-full flex flex-wrap -mr-6 text-[15px] leading-[1.6] pt-[7px] pb-[7px] px-3">
          <div className="flex-grow pr-6 text-left"><b>주문번호</b></div>
          <div className="flex-grow pr-6 text-right">{paymentData?.orderId}</div>
        </div>
        <div className="h-full flex flex-wrap -mr-6 text-[15px] leading-[1.6] pt-[7px] pb-[7px] px-3">
          <div className="flex-grow pr-6 text-left"><b>paymentKey</b></div>
          <div className="flex-grow pr-6 text-right" style={{ whiteSpace: "initial", width: 250 }}>
            {paymentData?.paymentKey}
          </div>
        </div>
        
        <div className="h-full flex flex-wrap -mr-6 pt-1 pb-1 px-2">
          <button 
            className="text-[#f9fafb] bg-[#3182f6] my-[30px] mx-[15px] mt-0 text-[15px] font-semibold leading-[18px] whitespace-nowrap text-center cursor-pointer border-0 border-transparent select-none transition-all duration-200 ease-in-out no-underline rounded-[7px] py-[11px] px-4 w-[250px] inline-block hover:text-white hover:bg-[#1b64da] flex-[0_0_100%] max-w-[100%]" 
            onClick={() => window.location.href = '/payComplete'}
            style={{ backgroundColor: "#1b64da", color: "white", marginTop: "20px" }}
          >
            조그마켓으로 돌아가기
          </button>
        </div>
      </div>

    </>
  );
};

export default Success;
