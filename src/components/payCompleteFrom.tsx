import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { CartItem } from "@/lib/apis/cart";
import { Coupon } from "@/lib/apis/coupon";

interface OrderData {
  items: CartItem[];
  totalPrice: number;
  shippingFee: number;
  orderInfo: {
    orderer: {
      name: string;
      phone: string;
      email: string;
      orderNumber: string;
    };
    shipping: {
      name: string;
      phone: string;
    };
    address: {
      zipNo: string;
      roadAddrPart1: string;
      roadAddrPart2: string;
      addrDetail: string;
    };
    selectedCoupon?: Coupon;
    discountAmount: number;
    deliveryMessage?: string;
  };
}

const PayCompleteFrom = () => {
  const router = useRouter();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 세션스토리지에서 주문 데이터 읽어오기
    if (typeof window !== "undefined") {
      const savedOrderData = sessionStorage.getItem("paymentData");
      if (savedOrderData) {
        try {
          const parsedData = JSON.parse(savedOrderData);
          // 주문번호를 우선순위로 찾기
          const orderNum =
            parsedData.orderNumber ||
            parsedData.orderInfo?.orderer?.orderNumber ||
            "주문번호 미발급";
          setOrderNumber(orderNum);
          setOrderData(parsedData);

          // 주문 완료 후 세션스토리지 정리 (페이지 로드 후 약간의 지연을 두고 정리)
          setTimeout(() => {
            sessionStorage.removeItem("paymentData");
            sessionStorage.removeItem("orderData");
          }, 1000);
        } catch (error) {
          console.error("주문 데이터 파싱 실패:", error);
          router.push("/");
        }
      } else {
        router.push("/");
      }
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">주문 정보를 불러오는 중...</div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600 mb-4">
            주문 데이터를 찾을 수 없습니다
          </div>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString() + "원";
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-10 md:mt-20 px-4 md:px-10">
        <Image
          src="/images/logo_jogeuMarket2.svg"
          alt="조그마켓 로고2"
          width={400}
          height={40}
          className="w-64 md:w-[400px]"
        ></Image>
        <h2 className="text-xl md:text-4xl mt-6 md:mt-10 font-bold text-center">
          주문이 완료되었습니다.
        </h2>

        <p className="text-lg md:text-2xl text-logo">주문번호 : {orderNumber}</p>

      </div>

      <div className="flex flex-col items-start justify-center my-6 md:my-10 px-4 md:px-30 w-full">
        <div className="flex flex-col w-full items-center justify-center mt-6 md:mt-10">
          <h2 className="text-xl md:text-4xl mb-6 md:mb-10 w-full font-bold border-b-2">
            주문 상품
          </h2>

          {/* 모바일용 상품 목록 */}
          <div className="md:hidden w-full space-y-4">
            {orderData.items.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-20 h-20 md:w-40 md:h-40 border border-gray-300 rounded-md bg-white flex-shrink-0 overflow-hidden">
                    {item.product.thumbnailImageUrl ? (
                      <Image
                        src={item.product.thumbnailImageUrl}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-gray-500 text-sm">
                      {item.product.brand?.name || "브랜드명 없음"}
                    </div>
                    <div className="text-black text-sm font-medium truncate">
                      {item.product.name}
                    </div>
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>수량:</span>
                        <span>{item.quantity}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>할인:</span>
                        <span className="text-red-500">0원</span>
                      </div>
                      <div className="flex justify-between text-sm font-semibold">
                        <span>결제금액:</span>
                        <span className="text-red-500">
                          {formatPrice(parseInt(item.product.price) * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 데스크톱용 테이블 */}
          <div className="hidden md:block w-full overflow-x-auto">
            <table className="w-full border-collapse border-t border-b border-gray-200 font-medium text-lg md:text-2xl">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-4 px-4 text-left font-medium text-black border-t border-b border-gray-200 ">
                    상품명
                  </th>
                  <th className="py-4 px-2 text-center font-medium text-black border-t border-b border-gray-200">
                    수량
                  </th>
                  <th className="py-4 px-2 text-center font-medium text-black border-t border-b border-gray-200">
                    할인 금액
                  </th>
                  <th className="py-4  text-center font-medium text-black border-t border-b border-gray-200">
                    결제 금액
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {orderData.items.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="px-4 py-10 border-b border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-40 h-40 border border-gray-300 rounded-md bg-white flex-shrink-0 overflow-hidden">
                          {item.product.thumbnailImageUrl ? (
                            <Image
                              src={item.product.thumbnailImageUrl}
                              alt={item.product.name}
                              width={230}
                              height={230}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200"></div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-gray-500 text-lg">
                            {item.product.brand?.name || "브랜드명 없음"}
                          </span>
                          <span className="text-black text-lg">
                            {item.product.name}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center border-b border-gray-200">
                      <span className="text-black">{item.quantity}</span>
                    </td>
                    <td className="px-4 py-4 text-center border-b border-gray-200">
                      <span className="text-red-500">0원</span>
                    </td>
                    <td className="px-4 py-4 text-center border-b border-gray-200">
                      <span className="text-red-500">
                        {formatPrice(
                          parseInt(item.product.price) * item.quantity
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start justify-center my-10 md:my-20 px-4 md:px-30 w-full">
        <h2 className="text-xl md:text-4xl mb-6 md:mb-10 w-full font-bold">
          배송지 정보
        </h2>
        
        {/* 모바일용 배송지 정보 */}
        <div className="md:hidden w-full space-y-4">
          <div className="space-y-3">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 mb-1">성함</span>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">{orderData.orderInfo.shipping.name}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 mb-1">휴대전화</span>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">{orderData.orderInfo.shipping.phone}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 mb-1">배송지 주소</span>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">
                  {orderData.orderInfo.address.roadAddrPart1} {orderData.orderInfo.address.addrDetail}
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 mb-1">배송 메모</span>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">
                  {orderData.orderInfo.deliveryMessage || "배송 메모 없음"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 데스크톱용 배송지 정보 */}
        <div className="hidden md:flex flex-col lg:flex-row w-full items-start justify-start">
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
              <p>{orderData.orderInfo.shipping.name}</p>{" "}
            </span>
            <span className="w-full border-t-2 border-gray-200 p-2.5">
              {" "}
              <p>{orderData.orderInfo.shipping.phone}</p>{" "}
            </span>
            <span className="flex flex-row w-full border-t-2 border-gray-200 p-2.5 justify-between items-center">
              {" "}
              <p>
                {orderData.orderInfo.address.roadAddrPart1}{" "}
                {orderData.orderInfo.address.addrDetail}
              </p>{" "}
              <button className="px-3 py-1 bg-logo text-white outline-4 outline-logo rounded-full text-center hover:scale-105  transition-all duration-300 cursor-pointer">
                배송지 변경
              </button>
            </span>
            <span className="w-full border-t-2 border-gray-200 p-2.5">
              {" "}
              <p>
                {orderData.orderInfo.deliveryMessage || "배송 메모 없음"}
              </p>{" "}
            </span>
            <span className="w-full border-t-2 border-gray-200"> </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start justify-center my-10 md:my-20 px-4 md:px-30 w-full">
        <h2 className="text-xl md:text-4xl mb-6 md:mb-10 w-full font-bold">
          결제 정보
        </h2>
        
        {/* 모바일용 결제 정보 */}
        <div className="md:hidden w-full space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">상품 금액</span>
              <span className="text-sm">{formatPrice(orderData.totalPrice)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">할인 금액</span>
              <span className="text-sm text-red-500">-{formatPrice(orderData.orderInfo.discountAmount)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">적립 예정 포인트</span>
              <span className="text-sm">{formatPrice(Math.floor(orderData.totalPrice * 0.02))}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">배송비</span>
              <span className="text-sm">{formatPrice(orderData.shippingFee)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
              <span className="text-sm font-bold">최종 결제 금액</span>
              <span className="text-sm font-bold text-red-500">
                {formatPrice(
                  orderData.totalPrice +
                    orderData.shippingFee -
                    orderData.orderInfo.discountAmount
                )}
              </span>
            </div>
          </div>
        </div>

        {/* 데스크톱용 결제 정보 */}
        <div className="hidden md:flex flex-col lg:flex-row w-full items-start justify-start ">
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
              <p>{formatPrice(orderData.totalPrice)}</p>{" "}
            </span>
            <span className="w-full border-t-2 border-gray-200 p-2.5 text-red-500">
              {" "}
              <p>-{formatPrice(orderData.orderInfo.discountAmount)}</p>{" "}
            </span>
            <span className="w-full border-t-2 border-gray-200 p-2.5">
              {" "}
              <p>{formatPrice(Math.floor(orderData.totalPrice * 0.02))}</p>{" "}
            </span>
            <span className="w-full border-t-2 border-gray-200 p-2.5">
              {" "}
              <p>{formatPrice(orderData.shippingFee)}</p>{" "}
            </span>
            <span className="w-full border-t-2 border-gray-200 p-2.5 text-red-500">
              {" "}
              <p>
                {formatPrice(
                  orderData.totalPrice +
                    orderData.shippingFee -
                    orderData.orderInfo.discountAmount
                )}
              </p>{" "}
            </span>
            <span className="w-full border-t-2 border-gray-200"> </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PayCompleteFrom;
