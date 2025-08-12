import React, { useEffect, useState } from "react";
import Head from "next/head";
import Button from "@/components/ui/Button";
import { useRouter } from "next/router";
import { CartItem } from "@/lib/apis/cart";
import { useToast } from "@/hooks/useToast";
import { Coupon } from "@/lib/apis/coupon";

// TossPayments 타입 정의
interface TossPaymentsWidgets {
  setAmount: (amount: { currency: string; value: number }) => Promise<void>;
  renderPaymentMethods: (options: { selector: string; variantKey: string }) => Promise<void>;
  renderAgreement: (options: { selector: string; variantKey: string }) => Promise<void>;
  requestPayment: (options: {
    orderId: string;
    orderName: string;
    successUrl: string;
    failUrl: string;
    customerEmail: string;
    customerName: string;
    customerMobilePhone: string;
    windowTarget: string;
  }) => Promise<void>;
  cleanup?: () => void;
}

interface TossPaymentsInstance {
  widgets: (options: { customerKey: string }) => TossPaymentsWidgets;
}

declare global {
  interface Window {
    TossPayments: (clientKey: string) => TossPaymentsInstance;
  }
}

interface PaymentData {
  items: CartItem[];
  totalPrice: number;
  shippingFee: number;
  orderInfo?: {
    address: {
      zipNo: string;
      roadAddrPart1: string;
      roadAddrPart2: string;
      addrDetail: string;
    };
    selectedCoupon: Coupon;
    discountAmount: number;
  };
}

const Checkout = () => {
  const router = useRouter();
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(true);
  const { showError } = useToast();

  // 결제 데이터 로드
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPaymentData = sessionStorage.getItem('paymentData');
      if (savedPaymentData) {
        try {
          const parsedData = JSON.parse(savedPaymentData);
          setPaymentData(parsedData);
        } catch (error) {
          console.error('결제 데이터 파싱 실패:', error);
          router.push('/order');
        }
      } else {
        router.push('/order');
      }
    }
    setLoading(false);
  }, [router]);
  // 토스페이먼츠 위젯 초기화
  useEffect(() => {
    // 결제 데이터가 없으면 초기화하지 않음
    if (!paymentData || loading) return;

    let widgets: TossPaymentsWidgets | null = null;
    let isInitialized = false;

    // 기존 위젯이 있다면 정리
    const paymentMethodElement = document.getElementById("payment-method");
    const agreementElement = document.getElementById("agreement");
    
    if (paymentMethodElement) {
      paymentMethodElement.innerHTML = '';
    }
    if (agreementElement) {
      agreementElement.innerHTML = '';
    }

    // 이미 스크립트가 로드되어 있는지 확인
    const existingScript = document.querySelector('script[src="https://js.tosspayments.com/v2/standard"]');
    
    if (existingScript && typeof window.TossPayments === 'function') {
      // 이미 스크립트가 로드되어 있으면 바로 초기화
      initializePayments();
    } else {
      // 스크립트가 없으면 새로 로드
      const script = document.createElement("script");
      script.src = "https://js.tosspayments.com/v2/standard";
      script.async = true;
      document.body.appendChild(script);
      script.onload = initializePayments;
    }

    async function initializePayments() {
      if (isInitialized) return;
      
      try {
        // DOM 요소들이 준비될 때까지 잠시 대기
        await new Promise<void>(resolve => setTimeout(resolve, 100));
        
        const button = document.getElementById("payment-button");
        const paymentMethodElement = document.getElementById("payment-method");
        const agreementElement = document.getElementById("agreement");
        
        if (!paymentMethodElement || !agreementElement) {
          console.error("필요한 DOM 요소를 찾을 수 없습니다.");
          return;
        }
        
        const discountAmount = paymentData!.orderInfo?.discountAmount || 0;
        const totalAmount = paymentData!.totalPrice + paymentData!.shippingFee - discountAmount;
        const amount = {
          currency: "KRW",
          value: totalAmount,
        };
        
        const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm"; // 위젯 연동용 테스트 키 (문서용)
        const TossPayments = window.TossPayments;
        if (!TossPayments) {
          console.error("TossPayments SDK를 로드할 수 없습니다.");
          showError("결제 모듈 로드에 실패했어요. 잠시 후 다시 시도해주세요.");
          router.replace('/order');
          return;
        }
        
        const customerKey = generateRandomString();
        const tossPayments = TossPayments(clientKey);
        widgets = tossPayments.widgets({ customerKey });
        
        await widgets.setAmount(amount);
        await widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        });
        await widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        });
        
        isInitialized = true;
        
        if (button) {
          button.addEventListener("click", async function () {
            try {
              // 상품명 생성 (첫 번째 상품명 + 외 n개)
              const orderName = paymentData!.items.length === 1 
                ? paymentData!.items[0].product.name
                : `${paymentData!.items[0].product.name} 외 ${paymentData!.items.length - 1}개`;

              // 주문번호 생성 (현재 시간 기반)
              const orderNumber = `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;
              
              if (widgets) {
                await widgets.requestPayment({
                orderId: generateRandomString(),
                orderName: orderName,
                successUrl: `${window.location.origin}/pay/success?orderNumber=${orderNumber}`,
                failUrl: window.location.origin + "/pay/fail",
                customerEmail: "test@example.com",
                customerName: "테스트 고객",
                customerMobilePhone: "01012345678",
                windowTarget: "iframe", // iframe 모드로 변경
                });
              }
            } catch (error: unknown) {
              console.error("결제 요청 중 오류 발생:", error);
              const errorMessage = error instanceof Error ? error.message : String(error);
              const message =
                (typeof errorMessage === 'string' && errorMessage.includes('취소'))
                  ? '결제가 취소되었어요. 주문 페이지로 이동합니다.'
                  : '결제 중 오류가 발생했어요. 주문 페이지로 이동합니다.';
              showError(message);
              router.replace('/order');
            }
          });
        }
      } catch (error) {
        console.error("위젯 초기화 중 오류 발생:", error);
        showError("결제 페이지 초기화 중 문제가 발생했어요. 주문 페이지로 이동합니다.");
        router.replace('/order');
      }
    }
    
    function generateRandomString() {
      return window.btoa(Math.random().toString()).slice(0, 20);
    }

    return () => {
      // 컴포넌트 언마운트 시 위젯 정리
      if (widgets && widgets.cleanup) {
        try {
          widgets.cleanup();
        } catch (error) {
          console.log("위젯 정리 중 오류:", error);
        }
      }
      
      // DOM 요소 정리
      const paymentMethodElement = document.getElementById("payment-method");
      const agreementElement = document.getElementById("agreement");
      
      if (paymentMethodElement) {
        paymentMethodElement.innerHTML = '';
      }
      if (agreementElement) {
        agreementElement.innerHTML = '';
      }
      
      isInitialized = false;
    };
  }, [paymentData, loading , showError, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">결제 정보를 불러오는 중...</div>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600 mb-4">결제 정보를 찾을 수 없습니다</div>
          <Button onClick={() => router.push('/order')}>주문 페이지로 돌아가기</Button>
        </div>
      </div>
    );
  }

  const discountAmount = paymentData.orderInfo?.discountAmount || 0;
  const totalAmount = paymentData.totalPrice + paymentData.shippingFee - discountAmount;

  return (
    <>
      <Head>
        <title>결제하기 - 조은마켓</title>
        <link rel="icon" href="https://static.toss.im/icons/png/4x/icon-toss-logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <div className="max-w-[1000px] mx-auto min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[10px] shadow-[0_10px_20px_rgb(0_0_0_/_1%),0_6px_6px_rgb(0_0_0_/_6%)] p-4 sm:p-6 md:p-[40px] lg:p-[60px] mt-[20px] sm:mt-[30px] mx-auto text-[#333d4b] items-center text-center overflow-x-auto whitespace-nowrap py-3 sm:py-4 md:py-[20px] px-3 sm:px-6 md:px-[40px] min-h-[500px] sm:min-h-[600px] md:min-h-[700px] flex flex-col justify-center w-full">
  

          <div id="payment-method" className="w-full mb-4 sm:mb-6"></div>
          <div id="agreement" className="w-full mb-6 sm:mb-8"></div>
          <div className="mt-6 sm:mt-8 max-w-[800px] mx-auto">
            <Button
              id="payment-button"
              className="text-lg sm:text-xl md:text-2xl py-4 sm:py-5 md:py-6 px-8 sm:px-10 md:px-12 font-semibold"
            >
              {totalAmount.toLocaleString()}원 결제하기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
