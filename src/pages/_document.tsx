import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link rel="icon"  href="/favicon.svg" />
      </Head>
      <body className="antialiased scroll-smooth">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
