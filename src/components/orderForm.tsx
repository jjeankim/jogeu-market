import React, { useState, useEffect } from 'react'
import Button, { ButtonSmall } from './ui/Button'
import PayBox from './ui/PayBox'
import { useRouter } from 'next/router'

// 카카오 주소 API 콜백 함수 타입 선언
declare global {
  interface Window {
    daum: any
  }
}

const OrderForm = () => {
  const router = useRouter()
  const [addressData, setAddressData] = useState({
    zipNo: '',
    roadAddrPart1: '',
    roadAddrPart2: '',
    addrDetail: ''
  })
  const [isAgreed, setIsAgreed] = useState(false)




  const openJusoPopup = () => {
    // 카카오 주소 API 스크립트 로드
    const script = document.createElement('script')
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
    script.onload = () => {
      // 카카오 주소 검색 팝업 열기
      new window.daum.Postcode({
        oncomplete: function(data: any) {
          setAddressData({
            zipNo: data.zonecode,
            roadAddrPart1: data.roadAddress,
            roadAddrPart2: data.jibunAddress || '',
            addrDetail: addressData.addrDetail
          })
        }
      }).open()
    }
    document.head.appendChild(script)
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
            

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">주문 상품 1</h2>
              <div className="border-b border-gray-200 mb-4"></div>
              
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">라운드랩 1025 독도 토너 키트</h3>
                  <p className="text-lg font-semibold text-blue-600 mt-1">3,000원</p>
                  <p className="text-sm text-gray-600 mt-1">배송: [무료] / 기본배송</p>
                  <p className="text-sm text-gray-600">수량: 1개</p>
                </div>
              </div>
            </div>

        
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">주문자 정보</h2>
              <div className="border-b border-gray-200 mb-4"></div>
              
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">주문자 명</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="주문자 명을 입력하세요"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">연락처</label>
                  <input 
                    type="tel" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="연락처를 입력하세요"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="text" 
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="이메일"
                    />
                    <span className="text-gray-500">@</span>
                    <input 
                      type="text" 
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="도메인"
                    />
                  </div>
                </div>
              </div>
            </div>

    
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">배송지 정보</h2>
                <ButtonSmall className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm hover:bg-gray-800 transition-colors">
                  배송지 관리
                </ButtonSmall>
              </div>
              <div className="border-b border-gray-200 mb-4"></div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">받으실 분</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="받으실 분"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">연락처</label>
                    <input 
                      type="tel" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="연락처"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">받으실 곳</label>
                  <div className="flex space-x-2 mb-2">
                    <input 
                      type="text" 
                      value={addressData.zipNo}
                      readOnly
                      className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                      placeholder="우편번호"
                    />
                    <ButtonSmall 
                      onClick={openJusoPopup}
                      className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      우편번호
                    </ButtonSmall>

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
                      onChange={(e) => setAddressData({...addressData, addrDetail: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="상세주소"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">배송 시 요청사항</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">배송 요청사항을 선택하세요</option>
                    <option value="door">문 앞에 놓아주세요</option>
                    <option value="security">경비실에 맡겨주세요</option>
                    <option value="call">배송 전 연락주세요</option>
                  </select>
                </div>
              </div>
            </div>

        
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">할인/쿠폰</h2>
              <div className="border-b border-gray-200 mb-4"></div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">할인/쿠폰</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="coupon1">1,000원 할인 쿠폰</option>
                    <option value="welcome10">신규가입 10% 할인</option>
                    <option value="summer20">여름특가 20% 할인</option>
                    <option value="member15">회원전용 15% 할인</option>
                  </select>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-gray-700">총 쿠폰 할인</span>
                  <span className="text-sm font-semibold text-red-600">1,000원 할인</span>
                </div>
              </div>
            </div>
          </div>

          <PayBox
            productAmount={3000}
            shippingFee={0}
            discountAmount={1000}
            totalAmount={2000}
            isAgreed={isAgreed}
            onAgreedChange={setIsAgreed}
            onPaymentClick={() => router.push('/pay/checkout')}
          />
        </div>
      </div>


    </div>
  )
}

export default OrderForm