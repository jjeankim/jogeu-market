import React from "react";
import Head from "next/head";
import Link from "next/link";

const Pay = () => {
  return (
    <>
      <Head>
        <title>토스페이먼츠 샘플 프로젝트</title>
        <link rel="icon" href="https://static.toss.im/icons/png/4x/icon-toss-logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <div className="max-w-[800px] mx-auto">
        <div className="bg-white rounded-[10px] shadow-[0_10px_20px_rgb(0_0_0_/_1%),0_6px_6px_rgb(0_0_0_/_6%)] p-[50px] mt-[30px] mx-auto text-[#333d4b] items-center text-center overflow-x-auto whitespace-nowrap">
          <h1 className="m-0 mb-1 text-2xl font-semibold text-[#4e5968]">토스페이먼츠 결제 위젯 샘플</h1>
          <p className="text-[15px] leading-[1.6] text-[#4e5968] pt-2 pb-2 px-2">
            Next.js와 TypeScript로 구현된 토스페이먼츠 결제 위젯 샘플입니다.
          </p>
          
          <div className="pt-[18px] pb-[18px] px-6">
            <Link 
              href="/pay/checkout" 
              className="text-[#f9fafb] bg-[#3182f6] my-[30px] mx-[15px] mt-0 text-[15px] font-semibold leading-[18px] whitespace-nowrap text-center cursor-pointer border-0 border-transparent select-none transition-all duration-200 ease-in-out no-underline rounded-[7px] py-[11px] px-4 w-[250px] inline-block hover:text-white hover:bg-[#1b64da]"
            >
              결제 페이지로 이동
            </Link>
          </div>
          
          <div className="pt-1 pb-1 px-2">
            <p className="text-[15px] leading-[1.6] text-[#8b95a1] text-[13px]">
              테스트용 결제 정보: 100원
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pay; 