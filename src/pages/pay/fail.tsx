import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const Fail = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorCode, setErrorCode] = useState<string>("");

  useEffect(() => {
    if (!router.isReady) return;

    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get("message");
    const code = urlParams.get("code");

    if (message) setErrorMessage(message);
    if (code) setErrorCode(code);
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>토스페이먼츠 샘플 프로젝트</title>
        <link rel="icon" href="https://static.toss.im/icons/png/4x/icon-toss-logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <div id="info" className="bg-white rounded-[10px] shadow-[0_10px_20px_rgb(0_0_0_/_1%),0_6px_6px_rgb(0_0_0_/_6%)] p-[50px] mt-[30px] mx-auto text-[#333d4b] items-center text-center overflow-x-auto whitespace-nowrap w-[600px] max-w-[600px] mx-auto">
        <img width="100px" src="https://static.toss.im/lotties/error-spot-no-loop-space-apng.png" />
        <h2>결제를 실패했어요</h2>

        <div className="h-full flex flex-wrap -mr-6 text-[15px] leading-[1.6] pt-[18px] pb-[18px] px-6">
          <div className="flex-grow pr-6 text-left"><b>에러메시지</b></div>
          <div className="flex-grow pr-6 text-right">{errorMessage}</div>
        </div>
        <div className="h-full flex flex-wrap -mr-6 text-[15px] leading-[1.6] pt-[7px] pb-[7px] px-3">
          <div className="flex-grow pr-6 text-left"><b>에러코드</b></div>
          <div className="flex-grow pr-6 text-right">{errorCode}</div>
        </div>
        <div className="h-full flex flex-wrap -mr-6">
          <button 
            className="text-[#f9fafb] bg-[#3182f6] my-[30px] mx-[15px] mt-0 text-[15px] font-semibold leading-[18px] whitespace-nowrap text-center cursor-pointer border-0 border-transparent select-none transition-all duration-200 ease-in-out no-underline rounded-[7px] py-[11px] px-4 w-[250px] inline-block hover:text-white hover:bg-[#1b64da] flex-[0_0_41.66667%] max-w-[41.66667%]" 
            onClick={() => window.open('https://docs.tosspayments.com/guides/v2/payment-widget/integration')}
          >
            연동 문서
          </button>
          <button 
            className="text-[#f9fafb] bg-[#3182f6] my-[30px] mx-[15px] mt-0 text-[15px] font-semibold leading-[18px] whitespace-nowrap text-center cursor-pointer border-0 border-transparent select-none transition-all duration-200 ease-in-out no-underline rounded-[7px] py-[11px] px-4 w-[250px] inline-block hover:text-white hover:bg-[#1b64da] flex-[0_0_41.66667%] max-w-[41.66667%]" 
            onClick={() => window.open('https://discord.gg/A4fRFXQhRu')}
            style={{ backgroundColor: "#e8f3ff", color: "#1b64da" }}
          >
            실시간 문의
          </button>
        </div>
      </div>
    </>
  );
};

export default Fail;
