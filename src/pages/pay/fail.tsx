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
      
      <div id="info" className="box_section" style={{ width: 600, maxWidth: "600px", margin: "0 auto" }}>
        <img width="100px" src="https://static.toss.im/lotties/error-spot-no-loop-space-apng.png" />
        <h2>결제를 실패했어요</h2>

        <div className="p-grid typography--p padding--xl">
          <div className="p-grid-col text--left"><b>에러메시지</b></div>
          <div className="p-grid-col text--right">{errorMessage}</div>
        </div>
        <div className="p-grid typography--p padding--s">
          <div className="p-grid-col text--left"><b>에러코드</b></div>
          <div className="p-grid-col text--right">{errorCode}</div>
        </div>
        <div className="p-grid">
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
    </>
  );
};

export default Fail;
