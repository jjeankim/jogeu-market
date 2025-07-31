import React from "react";
import Image from "next/image";

const PayCompleteFrom = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-20 px-4 md:px-10">
        <Image
          src="/images/logo_jogeuMarket2.svg"
          alt="조그마켓 로고2"
          width={400}
          height={40}
        ></Image>
        <h2 className="text-2xl md:text-4xl mt-10 font-bold">
          주문이 완료되었습니다.
        </h2>
        <p className="text-lg md:text-2xl text-logo">주문번호 : 1234567890</p>
      </div>

      <div className="flex flex-col items-start justify-center my-10 px-4 md:px-30 w-full">
        <div className="flex flex-col w-full items-center justify-center mt-10">
          <h2 className="text-2xl md:text-4xl mb-10 w-full font-bold border-b-2">
            주문 상품
          </h2>

          <div className="w-full overflow-x-auto ">
            <table className="w-full border-collapse border-t border-b border-gray-200 font-medium text-lg md:text-2xl">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-4 px-4 text-left font-medium text-black border-t border-b border-gray-200 ">상품명</th>
                  <th className="py-4 px-2 text-center font-medium text-black border-t border-b border-gray-200">수량</th>
                  <th className="py-4 px-2 text-center font-medium text-black border-t border-b border-gray-200">할인 금액</th>
                  <th className="py-4  text-center font-medium text-black border-t border-b border-gray-200">결제 금액</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-10 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-40 h-40 border border-gray-300 rounded-md bg-white flex-shrink-0"></div>
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-lg">브랜드명</span>
                        <span className="text-black text-lg">샴푸 샘플 (50ml)</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center border-b border-gray-200">
                    <span className="text-black">1</span>
                  </td>
                  <td className="px-4 py-4 text-center border-b border-gray-200">
                    <span className="text-red-500">0원</span>
                  </td>
                  <td className="px-4 py-4 text-center border-b border-gray-200">
                    <span className="text-red-500">500원</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-10 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-40 h-40 border border-gray-300 rounded-md bg-white flex-shrink-0"></div>
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-lg">브랜드명</span>
                        <span className="text-black text-lg">클렌징 오일 미니</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center border-b border-gray-200">
                    <span className="text-black">1</span>
                  </td>
                  <td className="px-4 py-4 text-center border-b border-gray-200">
                    <span className="text-red-500">0원</span>
                  </td>
                  <td className="px-4 py-4 text-center border-b border-gray-200">
                    <span className="text-red-500">700원</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-10 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-40 h-40 border border-gray-300 rounded-md bg-white flex-shrink-0"></div>
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-lg">브랜드명</span>
                        <span className="text-black text-lg">토너 체험분</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center border-b border-gray-200">
                    <span className="text-black">1</span>
                  </td>
                  <td className="px-4 py-4 text-center border-b border-gray-200">
                    <span className="text-red-500">0원</span>
                  </td>
                  <td className="px-4 py-4 text-center border-b border-gray-200">
                    <span className="text-red-500">1000원</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start justify-center my-20 px-4 md:px-30 w-full">
        <h2 className="text-2xl md:text-4xl mb-10 w-full font-bold">
          배송지 정보
        </h2>
        <div className="flex flex-col lg:flex-row w-full items-start justify-start">
          <div className="flex flex-col w-full lg:w-1/3 items-start justify-center gap-5">
            <p className="text-lg md:text-2xl font-medium inline-block w-full md:w-64 px-4 py-1 bg-none outline-4 outline-logo rounded-full text-center">
              성함
            </p>
            <p className="text-lg md:text-2xl font-medium inline-block w-full md:w-64 px-4 py-1 bg-none outline-4 outline-logo rounded-full text-center">
              휴대전화
            </p>
            <p className="text-lg md:text-2xl font-medium inline-block w-full md:w-64 px-4 py-1 bg-none outline-4 outline-logo rounded-full text-center">
              배송지 주소
            </p>
            <p className="text-lg md:text-2xl font-medium inline-block w-full md:w-64 px-4 py-1 bg-logo text-white outline-4 outline-logo rounded-full text-center">
              배송 메모
            </p>
          </div>

          <div className="flex flex-col w-full lg:w-2/3 items-start justify-center text-lg md:text-2xl font-medium">
            <span className="w-full border-t-2 border-black p-2.5">
              {" "}
              <p>홍길동</p>{" "}
            </span>
            <span className="w-full border-t-2 border-gray-200 p-2.5">
              {" "}
              <p>010-1234-5678</p>{" "}
            </span>
            <span className="flex flex-row w-full border-t-2 border-gray-200 p-2.5 justify-between items-center">
              {" "}
              <p>서울시 강남구 역삼동 123-123</p>{" "}
              <button className="px-3 py-1 bg-logo text-white outline-4 outline-logo rounded-full text-center hover:scale-105  transition-all duration-300 cursor-pointer">
                배송지 변경
              </button>
            </span>
            <span className="w-full border-t-2 border-gray-200 p-2.5">
              {" "}
              <p>배송 메모</p>{" "}
            </span>
            <span className="w-full border-t-2 border-gray-200"> </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start justify-center my-20 px-4 md:px-30 w-full">
        <h2 className="text-2xl md:text-4xl mb-10 w-full font-bold">
          결제 정보
        </h2>
        <div className="flex flex-col lg:flex-row w-full items-start justify-start ">
          <div className="flex flex-col w-full lg:w-1/3 items-start justify-center gap-5">
            <p className="text-lg md:text-2xl font-medium inline-block w-full md:w-64 px-4 py-1 bg-none outline-4 outline-logo rounded-full text-center">
              상품 금액
            </p>
            <p className="text-lg md:text-2xl font-medium inline-block w-full md:w-64 px-4 py-1 bg-none outline-4 outline-logo rounded-full text-center">
              할인 금액
            </p>
            <p className="text-lg md:text-2xl font-medium inline-block w-full md:w-64 px-4 py-1 bg-none outline-4 outline-logo rounded-full text-center">
              적립 예정 포인트
            </p>
            <p className="text-lg md:text-2xl font-medium inline-block w-full md:w-64 px-4 py-1 bg-none outline-4 outline-logo rounded-full text-center">
              배송비
            </p>
            <p className="text-lg md:text-2xl font-medium inline-block w-full md:w-64 px-4 py-1 bg-logo text-white outline-4 outline-logo rounded-full text-center">
              최종 결제 금액
            </p>
          </div>

          <div className="flex flex-col w-full lg:w-2/3 items-start justify-center text-lg md:text-2xl font-medium">
            <span className="w-full border-t-2 border-black p-2.5">
              {" "}
              <p>6,000원</p>{" "}
            </span>
            <span className="w-full border-t-2 border-gray-200 p-2.5 text-red-500">
              {" "}
              <p>0원</p>{" "}
            </span>
            <span className="w-full border-t-2 border-gray-200 p-2.5">
              {" "}
              <p>120원</p>{" "}
            </span>
            <span className="w-full border-t-2 border-gray-200 p-2.5">
              {" "}
              <p>3000원</p>{" "}
            </span>
            <span className="w-full border-t-2 border-gray-200 p-2.5 text-red-500">
              {" "}
              <p>9,000원</p>{" "}
            </span>
            <span className="w-full border-t-2 border-gray-200"> </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PayCompleteFrom;
