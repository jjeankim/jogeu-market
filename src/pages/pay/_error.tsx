import React from "react";
type Props = { statusCode?: number };
function Error({ statusCode }: Props) {
  return (
    <div style={{textAlign: "center", marginTop: 100}}>
      <h1>{statusCode ? `${statusCode} 에러가 발생했습니다` : "에러가 발생했습니다"}</h1>
    </div>
  );
}
Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
export default Error;
