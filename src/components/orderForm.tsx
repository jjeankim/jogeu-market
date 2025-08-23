import React, { useState, useEffect } from "react";
import Button from "./ui/Button";
import PayBox from "./ui/PayBox";
import { useRouter } from "next/router";
import { CartItem } from "@/lib/apis/cart";
import useAuthStore from "@/store/AuthStore";
import { fetchMyCouponList } from "@/lib/apis/coupon";
import {
  fetchUser,
  fetchUserAddresses,
  createUserAddress,
  AddressData,
} from "@/lib/apis/user";
import { CouponData } from "@/types/my/coupon";
import Image from "next/image";

// 배송지 관리 모달 컴포넌트
const AddressManagementModal = ({
  isOpen,
  onClose,
  addresses,
  onAddressSelect,
  onAddressSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  addresses: AddressData[];
  onAddressSelect: (address: AddressData) => void;
  onAddressSave: (address: Omit<AddressData, "id">) => void;
}) => {
  const [newAddress, setNewAddress] = useState({
    recipientName: "",
    recipientPhone: "",
    zipCode: "",
    roadAddress: "",
    detailAddress: "",
    isDefault: false,
  });

  const openJusoPopup = () => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = () => {
      new window.daum.Postcode({
        oncomplete: function (data: {
          zonecode: string;
          roadAddress: string;
          jibunAddress: string;
        }) {
          setNewAddress((prev) => ({
            ...prev,
            zipCode: data.zonecode,
            roadAddress: data.roadAddress,
          }));
        },
      }).open();
    };
    document.head.appendChild(script);
  };

  const handleCloseModal = () => {
    setNewAddress({
      recipientName: "",
      recipientPhone: "",
      zipCode: "",
      roadAddress: "",
      detailAddress: "",
      isDefault: false,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">배송지 관리</h2>
          <button
            onClick={handleCloseModal}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* 저장된 배송지 목록 */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">저장된 배송지</h3>
          {addresses.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-600 text-lg font-medium mb-3">
                저장된 배송지가 없습니다
              </p>
              <p className="text-gray-500 text-sm mb-2">
                아직 주문한 적이 없거나 배송지를 저장하지 않으셨네요.
              </p>
              <p className="text-gray-400 text-sm">
                아래에서 새 배송지를 추가해보세요!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {addresses.map((address) => (
                <div key={address.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium">{address.recipientName}</p>
                      <p className="text-sm text-gray-600">
                        {address.recipientPhone}
                      </p>
                      <p className="text-sm text-gray-600">
                        [{address.zipCode}] {address.roadAddress}
                        {address.detailAddress && ` ${address.detailAddress}`}
                      </p>
                      {address.isDefault && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          기본 배송지
                        </span>
                      )}
                    </div>
                    <Button
                      onClick={() => onAddressSelect(address)}
                      className="px-3 py-1 bg-logo text-white text-sm rounded"
                    >
                      선택
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 새 배송지 추가 */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-medium mb-3">새 배송지 추가</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="받으실 분"
                value={newAddress.recipientName}
                onChange={(e) =>
                  setNewAddress((prev) => ({
                    ...prev,
                    recipientName: e.target.value,
                  }))
                }
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="tel"
                placeholder="연락처"
                value={newAddress.recipientPhone}
                onChange={(e) =>
                  setNewAddress((prev) => ({
                    ...prev,
                    recipientPhone: e.target.value,
                  }))
                }
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="우편번호"
                value={newAddress.zipCode}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
              <Button
                onClick={openJusoPopup}
                className="px-4 py-2 bg-gray-900 text-white rounded-md"
              >
                우편번호
              </Button>
            </div>
            <input
              type="text"
              placeholder="도로명 주소"
              value={newAddress.roadAddress}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />

            <input
              type="text"
              placeholder="상세주소"
              value={newAddress.detailAddress}
              onChange={(e) =>
                setNewAddress((prev) => ({
                  ...prev,
                  detailAddress: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isDefault"
                checked={newAddress.isDefault}
                onChange={(e) =>
                  setNewAddress((prev) => ({
                    ...prev,
                    isDefault: e.target.checked,
                  }))
                }
                className="mr-2"
              />
              <label htmlFor="isDefault" className="text-sm">
                기본 배송지로 설정
              </label>
            </div>
            <Button
              onClick={() => {
                if (
                  !newAddress.recipientName ||
                  !newAddress.recipientPhone ||
                  !newAddress.zipCode ||
                  !newAddress.roadAddress
                ) {
                  alert("필수 정보를 모두 입력해주세요.");
                  return;
                }
                onAddressSave(newAddress);
                setNewAddress({
                  recipientName: "",
                  recipientPhone: "",
                  zipCode: "",
                  roadAddress: "",
                  detailAddress: "",
                  isDefault: false,
                });
              }}
              className="w-full bg-logo text-white py-2 rounded-md"
            >
              배송지 저장
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 카카오 주소 API 타입 선언
declare global {
  interface Window {
    daum: {
      Postcode: new (options: {
        oncomplete: (data: {
          zonecode: string;
          roadAddress: string;
          jibunAddress: string;
        }) => void;
      }) => {
        open: () => void;
      };
    };
  }
}

interface OrderData {
  items: CartItem[];
  totalPrice: number;
  shippingFee: number;
}

const OrderForm = () => {
  const router = useRouter();
  const [addressData, setAddressData] = useState({
    zipNo: "",
    roadAddrPart1: "",
    roadAddrPart2: "",
    addrDetail: "",
  });
  const [isAgreed, setIsAgreed] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  // 주문자 정보 상태
  const [ordererInfo, setOrdererInfo] = useState({
    name: "",
    phone: "",
    email: "",
  });

  // 사용자 정보 로딩 상태
  const [userLoading, setUserLoading] = useState(true);

  // 배송지 정보 상태
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    useOrdererInfo: false,
  });

  // 배송메시지 상태
  const [deliveryMessage, setDeliveryMessage] = useState("");

  // 쿠폰 관련 상태
  const [coupons, setCoupons] = useState<CouponData[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<CouponData | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  // 배송지 관리 모달 상태
  const [isAddressManagementModalOpen, setIsAddressManagementModalOpen] =
    useState(false);
  const [userAddresses, setUserAddresses] = useState<AddressData[]>([]);

  const { isLoggedIn } = useAuthStore();

  // 세션 스토리지에서 주문 데이터 읽어오기
  useEffect(() => {
    console.log("OrderForm: 세션스토리지에서 데이터 읽기 시도");

    // 브라우저 환경에서만 세션스토리지 접근
    if (typeof window !== "undefined") {
      const savedOrderData = sessionStorage.getItem("orderData");
      console.log("OrderForm: 저장된 데이터:", savedOrderData);

      if (savedOrderData) {
        try {
          const parsedData = JSON.parse(savedOrderData);
          console.log("OrderForm: 파싱된 데이터:", parsedData);
          setOrderData(parsedData);
        } catch (error) {
          console.error("주문 데이터 파싱 실패:", error);
          router.push("/cart");
        }
      } else {
        console.log("OrderForm: 주문 데이터가 없음, 장바구니로 리다이렉트");
        // 주문 데이터가 없으면 장바구니로 리다이렉트
        router.push("/cart");
      }
    } else {
      console.log("OrderForm: 서버 환경에서는 세션스토리지 접근 불가");
    }

    setLoading(false);
  }, [router]);

  // 쿠폰 목록 로딩
  useEffect(() => {
    const loadCoupons = async () => {
      if (isLoggedIn) {
        try {
          const couponData = await fetchMyCouponList();
          if (couponData) {
            setCoupons(couponData);
          }
        } catch (error) {
          console.error("쿠폰 로딩 실패:", error);
        }
      }
    };

    loadCoupons();
  }, [isLoggedIn]);

  // 사용자 정보 로딩
  useEffect(() => {
    const loadUserInfo = async () => {
      if (isLoggedIn) {
        try {
          const userData = await fetchUser();
          if (userData) {
            setOrdererInfo({
              name: userData.name,
              phone: userData.phoneNumber || "",
              email: userData.email,
            });
          }
        } catch (error) {
          console.error("사용자 정보 로딩 실패:", error);
        } finally {
          setUserLoading(false);
        }
      } else {
        setUserLoading(false);
      }
    };

    loadUserInfo();
  }, [isLoggedIn]);

  // 사용자 배송지 목록 로딩
  useEffect(() => {
    const loadUserAddresses = async () => {
      if (isLoggedIn) {
        try {
          const addresses = await fetchUserAddresses();
          if (addresses) {
            setUserAddresses(addresses);
          }
        } catch (error) {
          console.error("배송지 목록 로딩 실패:", error);
        }
      }
    };

    loadUserAddresses();
  }, [isLoggedIn]);

  // 배송지 정보를 주문자 정보와 동일하게 설정
  const handleUseOrdererInfo = () => {
    setShippingInfo((prev) => ({
      ...prev,
      name: ordererInfo.name,
      phone: ordererInfo.phone,
      useOrdererInfo: true,
    }));
  };

  // 주문자 정보가 로드되면 배송지 정보도 자동으로 설정
  useEffect(() => {
    if (!userLoading && ordererInfo.name && ordererInfo.phone) {
      setShippingInfo((prev) => ({
        ...prev,
        name: ordererInfo.name,
        phone: ordererInfo.phone,
        useOrdererInfo: true,
      }));
    }
  }, [userLoading, ordererInfo.name, ordererInfo.phone]);

  // 쿠폰 선택 시 할인 금액 계산
  const handleCouponChange = (couponId: string) => {
    if (couponId === "") {
      setSelectedCoupon(null);
      setDiscountAmount(0);
      return;
    }

    const coupon = coupons.find((c) => c.id.toString() === couponId);
    if (coupon && orderData) {
      setSelectedCoupon(coupon);

      let discount = 0;
      if (coupon.coupon.discountType === "FIXED") {
        discount = coupon.coupon.discountValue;
      } else if (coupon.coupon.discountType === "PERCENTAGE") {
        discount = Math.floor(
          orderData.totalPrice * (coupon.coupon.discountValue / 100)
        );
      }

      setDiscountAmount(discount);
    }
  };

  // 필수 입력 검증
  const isFormValid = () => {
    return (
      ordererInfo.name &&
      ordererInfo.phone &&
      shippingInfo.name &&
      shippingInfo.phone &&
      addressData.zipNo &&
      addressData.roadAddrPart1 &&
      isAgreed
    );
  };

  const openJusoPopup = () => {
    // 카카오 주소 API 스크립트 로드
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = () => {
      // 카카오 주소 검색 팝업 열기
      new window.daum.Postcode({
        oncomplete: function (data: {
          zonecode: string;
          roadAddress: string;
          jibunAddress: string;
        }) {
          setAddressData({
            zipNo: data.zonecode,
            roadAddrPart1: data.roadAddress,
            roadAddrPart2: data.jibunAddress || "",
            addrDetail: addressData.addrDetail,
          });
        },
      }).open();
    };
    document.head.appendChild(script);
  };

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
          <Button onClick={() => router.push("/cart")}>
            장바구니로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">주문/결제</h1>
          <div className="border-b border-gray-300 mt-4"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-8">
            {/* 주문 상품들 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">
                주문 상품 ({orderData.items.length}개)
              </h2>
              <div className="border-b border-gray-200 mb-4"></div>

              <div className="space-y-4">
                {orderData.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
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
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {item.product.name}
                      </h3>
                      <p className="text-lg font-semibold text-logo mt-1">
                        {parseInt(item.product.price).toLocaleString()}원
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        배송: [무료] / 기본배송
                      </p>
                      <p className="text-sm text-gray-600">
                        수량: {item.quantity}개
                      </p>
                      <p className="text-sm font-semibold text-gray-800 mt-1">
                        소계:{" "}
                        {(
                          parseInt(item.product.price) * item.quantity
                        ).toLocaleString()}
                        원
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">주문자 정보</h2>
              <div className="border-b border-gray-200 mb-4"></div>

              {userLoading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="text-lg">사용자 정보를 불러오는 중...</div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      주문자 명 *
                    </label>
                    <input
                      type="text"
                      value={ordererInfo.name}
                      onChange={(e) =>
                        setOrdererInfo((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="주문자 명을 입력하세요"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      회원가입 시 입력한 정보입니다
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      연락처 *
                    </label>
                    <input
                      type="tel"
                      value={ordererInfo.phone}
                      onChange={(e) => {
                        const phoneNumber = e.target.value;
                        setOrdererInfo((prev) => ({
                          ...prev,
                          phone: phoneNumber,
                        }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="연락처를 입력하세요"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {ordererInfo.phone
                        ? "회원 정보에 저장된 전화번호입니다"
                        : "전화번호를 입력해주세요 (첫 주문 시 자동 저장됩니다)"}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      이메일
                    </label>
                    <input
                      type="email"
                      value={ordererInfo.email}
                      onChange={(e) =>
                        setOrdererInfo((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="이메일을 입력하세요"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      회원가입 시 입력한 정보입니다
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">배송지 정보</h2>
                <Button
                  onClick={() => {
                    if (isLoggedIn) {
                      setIsAddressManagementModalOpen(true);
                    } else {
                      alert(
                        "배송지 관리를 위해 로그인이 필요합니다.\n로그인 페이지로 이동합니다."
                      );
                      router.push("/login");
                    }
                  }}
                  className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm hover:bg-gray-800 transition-colors"
                >
                  배송지 관리
                </Button>
              </div>
              <div className="border-b border-gray-200 mb-4"></div>

              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">배송 받으실 분</h3>
                  <Button
                    onClick={handleUseOrdererInfo}
                    className="px-4 py-2 bg-logo text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
                  >
                    주문자와 동일
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      받으실 분 *
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.name}
                      onChange={(e) =>
                        setShippingInfo((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="받으실 분"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      연락처 *
                    </label>
                    <input
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) => {
                        const phoneNumber = e.target.value;
                        setShippingInfo((prev) => ({
                          ...prev,
                          phone: phoneNumber,
                        }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="연락처"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    받으실 곳
                  </label>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={addressData.zipNo}
                      readOnly
                      className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                      placeholder="우편번호"
                    />
                    <Button
                      onClick={openJusoPopup}
                      className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      우편번호
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={addressData.roadAddrPart1}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                      placeholder="도로명 주소"
                    />
                    <input
                      type="text"
                      value={addressData.roadAddrPart2}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                      placeholder="지번 주소"
                    />
                    <input
                      type="text"
                      value={addressData.addrDetail}
                      onChange={(e) =>
                        setAddressData({
                          ...addressData,
                          addrDetail: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="상세주소"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    배송 시 요청사항
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={deliveryMessage}
                    onChange={(e) => setDeliveryMessage(e.target.value)}
                  >
                    <option value="">배송 요청사항을 선택하세요</option>
                    <option value="문 앞에 놓아주세요">
                      문 앞에 놓아주세요
                    </option>
                    <option value="경비실에 맡겨주세요">
                      경비실에 맡겨주세요
                    </option>
                    <option value="배송 전 연락주세요">
                      배송 전 연락주세요
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">할인/쿠폰</h2>
              <div className="border-b border-gray-200 mb-4"></div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    할인/쿠폰
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => handleCouponChange(e.target.value)}
                    value={selectedCoupon?.id.toString() || ""}
                  >
                    <option value="">쿠폰을 선택하세요</option>
                    {coupons.map((couponData) => (
                      <option
                        key={couponData.id}
                        value={couponData.id.toString()}
                      >
                        {couponData.coupon.name} (
                        {couponData.coupon.discountType === "FIXED"
                          ? `${couponData.coupon.discountValue}원`
                          : `${couponData.coupon.discountValue}%`}{" "}
                        할인)
                      </option>
                    ))}
                  </select>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-medium text-gray-700">
                      총 쿠폰 할인
                    </span>
                    <span className="text-sm font-semibold text-red-600">
                      -{discountAmount.toLocaleString()}원
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <PayBox
            productAmount={orderData.totalPrice}
            shippingFee={orderData.shippingFee}
            discountAmount={discountAmount}
            totalAmount={
              orderData.totalPrice + orderData.shippingFee - discountAmount
            }
            isAgreed={isAgreed}
            onAgreedChange={setIsAgreed}
            onPaymentClick={() => {
              if (!isFormValid()) {
                alert("필수 입력 항목을 모두 입력해주세요.");
                return;
              }

              // 주문 정보를 결제 페이지로 전달
              if (typeof window !== "undefined") {
                sessionStorage.setItem(
                  "paymentData",
                  JSON.stringify({
                    ...orderData,
                    orderInfo: {
                      orderer: ordererInfo,
                      shipping: shippingInfo,
                      address: addressData,
                      selectedCoupon: selectedCoupon,
                      discountAmount: discountAmount,
                      deliveryMessage: deliveryMessage,
                    },
                  })
                );
              }
              router.push("/pay/checkout");
            }}
            disabled={!isFormValid()}
          />
        </div>
      </div>

      {/* 배송지 관리 모달 */}
      <AddressManagementModal
        isOpen={isAddressManagementModalOpen}
        onClose={() => setIsAddressManagementModalOpen(false)}
        addresses={userAddresses}
        onAddressSelect={(address) => {
          setShippingInfo({
            name: address.recipientName,
            phone: address.recipientPhone,
            useOrdererInfo: false,
          });
          setAddressData({
            zipNo: address.zipCode,
            roadAddrPart1: address.roadAddress,
            roadAddrPart2: address.detailAddress || "",
            addrDetail: address.detailAddress || "",
          });

          alert(`${address.recipientName}님의 배송지가 선택되었습니다.`);
          setIsAddressManagementModalOpen(false);
        }}
        onAddressSave={async (newAddress) => {
          if (isLoggedIn) {
            try {
              const success = await createUserAddress(newAddress);
              if (success) {
                alert("배송지가 저장되었습니다.");
                const updatedAddresses = await fetchUserAddresses();
                setUserAddresses(updatedAddresses);
                setIsAddressManagementModalOpen(false);
              } else {
                alert("배송지 저장에 실패했습니다.");
              }
            } catch (error) {
              console.error("배송지 저장 실패:", error);
              alert("배송지 저장에 실패했습니다.");
            }
          } else {
            alert("로그인이 필요합니다.");
            router.push("/login");
          }
        }}
      />
    </div>
  );
};

export default OrderForm;
