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
      
      <div className="wrapper">
        <div className="box_section">
          <h1 className="title">토스페이먼츠 결제 위젯 샘플</h1>
          <p className="typography--p padding--t">
            Next.js와 TypeScript로 구현된 토스페이먼츠 결제 위젯 샘플입니다.
          </p>
          
          <div className="padding--xl">
            <Link href="/pay/checkout" className="button">
              결제 페이지로 이동
            </Link>
          </div>
          
          <div className="padding--t">
            <p className="typography--p color--grey500" style={{ fontSize: "13px" }}>
              테스트용 결제 정보: 100원
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pay; 