import React, { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { createOrder, OrderData } from "@/lib/apis/order";
import { CartItem } from "@/lib/apis/cart";

interface PaymentData {
  paymentKey: string;
  orderId: string;
  amount: string;
  orderNumber: string;
}

const Success = () => {
  const router = useRouter();
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [orderCreated, setOrderCreated] = useState(false);

  const handleOrderCreation = useCallback(async (orderNumber: string) => {
    try {
      // 세션 스토리지에서 주문 데이터 가져오기
      const paymentDataStr = sessionStorage.getItem("paymentData");
      if (!paymentDataStr) {
        console.error("주문 데이터를 찾을 수 없습니다.");
        return;
      }

      const paymentData = JSON.parse(paymentDataStr);
      const { items, orderInfo } = paymentData;

      // 주문 데이터 생성
      const orderData: OrderData = {
        items: items.map((item: CartItem) => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: parseInt(item.product.price),
          cartItemId: item.id, // 장바구니 아이템 ID (CartItem의 id)
        })),
        totalAmount:
          paymentData.totalPrice +
          paymentData.shippingFee -
          (paymentData.orderInfo?.discountAmount || 0),
        shippingAddress: {
          zipCode: orderInfo.address.zipNo,
          roadAddress: orderInfo.address.roadAddrPart1,
          detailAddress: orderInfo.address.addrDetail || "",
        },
        recipientName: orderInfo.shipping.name,
        recipientPhone: orderInfo.shipping.phone,
        ordererName: orderInfo.orderer.name,
        ordererPhone: orderInfo.orderer.phone,
        ordererEmail: orderInfo.orderer.email,
        userCouponId: orderInfo.selectedCoupon?.id,
        discountAmount: orderInfo.discountAmount,
        deliveryMessage: orderInfo.deliveryMessage || "",
      };

      // 주문 생성 시도 (실패해도 계속 진행)
      let serverOrderNumber = orderNumber; // URL에서 받은 주문번호를 기본값으로 사용

      try {
        const orderResult = await createOrder(orderData);

        // 서버에서 주문번호를 반환했다면 그것을 사용
        if (orderResult && orderResult.orderNumber) {
          serverOrderNumber = orderResult.orderNumber;
        }

        // 장바구니에서 주문된 상품들 제거 (에러 시 무시)
        try {
          const cartItemIds = orderData.items
            .filter((item) => item.cartItemId)
            .map((item) => item.cartItemId!);

          if (cartItemIds.length > 0) {
            // 각 아이템을 개별적으로 삭제 시도 (일부 실패해도 계속 진행)
            const deletePromises = cartItemIds.map(async (id) => {
              try {
                const { removeFromCart } = await import("@/lib/apis/cart");
                await removeFromCart(id);
                return { id, success: true };
              } catch (error) {
                console.warn(`장바구니 아이템 ${id} 삭제 실패:`, error);
                return { id, success: false, error };
              }
            });

            const results = await Promise.allSettled(deletePromises);
            const successCount = results.filter(
              (result) => result.status === "fulfilled" && result.value.success
            ).length;

            console.log(
              `장바구니 정리 완료: ${successCount}/${cartItemIds.length}개 성공`
            );
          }
        } catch (cartError) {
          console.warn("장바구니 정리 중 오류 (무시됨):", cartError);
          // 장바구니 정리 실패해도 주문은 성공으로 처리
        }
      } catch (error) {
        console.error("주문 생성 중 오류 발생:", error);
        // 주문 생성 실패해도 계속 진행
      }

      // paymentData에 주문번호 추가해서 다시 저장
      const updatedPaymentData = {
        ...paymentData,
        orderNumber: serverOrderNumber,
      };
      sessionStorage.setItem("paymentData", JSON.stringify(updatedPaymentData));

      // 주문 완료 상태로 설정
      setOrderCreated(true);

      // 세션 스토리지 정리는 payComplete 페이지에서 처리하도록 함
      // sessionStorage.removeItem('paymentData');
      // sessionStorage.removeItem('orderData');
    } catch (error) {
      console.error("주문 데이터 처리 중 오류 발생:", error);
      // 에러가 발생해도 주문 완료 상태로 설정
      setOrderCreated(true);
    }
  }, []);

  const confirmPayment = useCallback(
    async (requestData: PaymentData) => {
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
          window.location.href = `/fail?message=${json.message}&code=${json.code}`;
          return;
        }

        // 결제 성공 후 주문 생성 및 장바구니 정리
        await handleOrderCreation(requestData.orderNumber);
      } catch (error) {
        console.error("결제 승인 중 오류 발생:", error);
      }
    },
    [handleOrderCreation]
  );

  useEffect(() => {
    if (!router.isReady) return;

    const urlParams = new URLSearchParams(window.location.search);
    const paymentKey = urlParams.get("paymentKey");
    const orderId = urlParams.get("orderId");
    const amount = urlParams.get("amount");
    const orderNumber = urlParams.get("orderNumber");

    if (paymentKey && orderId && amount && orderNumber) {
      setPaymentData({ paymentKey, orderId, amount, orderNumber });

      // 서버로 결제 승인에 필요한 결제 정보를 보내기
      confirmPayment({ paymentKey, orderId, amount, orderNumber });
    }
  }, [router.isReady, router, confirmPayment]);

  return (
    <>
      <Head>
        <title>토스페이먼츠 샘플 프로젝트</title>
        <link
          rel="icon"
          href="https://static.toss.im/icons/png/4x/icon-toss-logo.png"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="bg-white rounded-[10px] shadow-[0_10px_20px_rgb(0_0_0_/_1%),0_6px_6px_rgb(0_0_0_/_6%)] p-[50px] mt-[30px] mx-auto text-[#333d4b] items-center text-center overflow-x-auto whitespace-nowrap w-[600px] max-w-[600px]">
        <Image
          width={100}
          height={100}
          src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
          alt="결제 성공 아이콘"
        />
        <h2>결제를 완료했어요</h2>

        <div className="h-full flex flex-wrap -mr-6 text-[15px] leading-[1.6] pt-[18px] pb-[18px] px-6">
          <div className="flex-grow pr-6 text-left">
            <b>결제금액</b>
          </div>
          <div className="flex-grow pr-6 text-right">
            {paymentData?.amount}원
          </div>
        </div>
        <div className="h-full flex flex-wrap -mr-6 text-[15px] leading-[1.6] pt-[7px] pb-[7px] px-3">
          <div className="flex-grow pr-6 text-left">
            <b>주문번호</b>
          </div>
          <div className="flex-grow pr-6 text-right">
            {paymentData?.orderNumber}
          </div>
        </div>
        <div className="h-full flex flex-wrap -mr-6 text-[15px] leading-[1.6] pt-[7px] pb-[7px] px-3">
          <div className="flex-grow pr-6 text-left">
            <b>paymentKey</b>
          </div>
          <div
            className="flex-grow pr-6 text-right"
            style={{ whiteSpace: "initial", width: 250 }}
          >
            {paymentData?.paymentKey}
          </div>
        </div>

        {orderCreated && (
          <div className="h-full flex flex-wrap -mr-6 text-[15px] leading-[1.6] pt-[7px] pb-[7px] px-3">
            <div className="flex-grow pr-6 text-left">
              <b>주문 상태</b>
            </div>
            <div className="flex-grow pr-6 text-right text-green-600">
              주문 완료
            </div>
          </div>
        )}

        <div className="h-full flex flex-wrap -mr-6 pt-1 pb-1 px-2">
          <button
            className="text-[#f9fafb] bg-[#3182f6] my-[30px] mx-[15px] mt-0 text-[15px] font-semibold leading-[18px] whitespace-nowrap text-center cursor-pointer border-0 border-transparent select-none transition-all duration-200 ease-in-out no-underline rounded-[7px] py-[11px] px-4 w-[250px] inline-block hover:text-white hover:bg-[#1b64da] flex-[0_0_100%] max-w-[100%]"
            onClick={() => {
              window.location.href = "/payComplete";
            }}
            style={{
              backgroundColor: "#1b64da",
              color: "white",
              marginTop: "20px",
            }}
          >
            조그마켓으로 돌아가기
          </button>
        </div>
      </div>
    </>
  );
};

export default Success;
