import React, { useState, useEffect } from 'react'
import Button from './ui/Button'
import { useRouter } from 'next/router'

const OrderForm = () => {
  const router = useRouter()
  const [addressData, setAddressData] = useState({
    zipNo: '',
    roadAddrPart1: '',
    roadAddrPart2: '',
    addrDetail: ''
  })




  const searchAddress = async (keyword: string) => {
    const confmKey = process.env.NEXT_PUBLIC_JUSO_KEY

    console.log('도로명주소 API 키:', confmKey)
    console.log('검색어:', keyword)

    if (!confmKey) {
      alert('주소 검색 API 키가 설정되지 않았습니다. 환경 변수 NEXT_PUBLIC_JUSO_KEY를 설정해주세요.')
      return
    }

    try {
      const params = new URLSearchParams({
        confmKey: confmKey,
        currentPage: '1',
        countPerPage: '10',
        keyword: keyword,
        resultType: 'json',
        hstryYn: 'N',
        firstSort: 'none',
        addInfoYn: 'N'
      })

      const response = await fetch(`https://business.juso.go.kr/addrlink/addrLinkApi.do?${params}`)
      const data = await response.json()

      console.log('API 응답:', data)

      if (data.results && data.results.juso && data.results.juso.length > 0) {
        const firstResult = data.results.juso[0]
        setAddressData({
          zipNo: firstResult.zipNo,
          roadAddrPart1: firstResult.roadAddrPart1,
          roadAddrPart2: firstResult.roadAddrPart2 || '',
          addrDetail: addressData.addrDetail
        })
        console.log('주소 설정 완료:', firstResult)
      } else {
        alert('검색 결과가 없습니다.')
      }
    } catch (error) {
      console.error('주소 검색 에러:', error)
      alert('주소 검색 중 오류가 발생했습니다.')
    }
  }

  const openJusoPopup = () => {
    const keyword = prompt('주소를 입력하세요:')
    if (keyword) {
      searchAddress(keyword)
    }
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
                <button className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm hover:bg-gray-800 transition-colors">
                  배송지 관리
                </button>
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
                    <button 
                      onClick={openJusoPopup}
                      className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      우편번호
                    </button>

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

          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-4">결제정보</h2>
              <div className="border-b border-gray-200 mb-4"></div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">총 상품금액</span>
                  <span className="font-medium">3,000원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">총 배송비</span>
                  <span className="font-medium">+ 0원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">총 할인금액</span>
                  <span className="font-medium text-red-600">- 1,000원</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">총 결제금액</span>
                    <span className="text-xl font-bold text-blue-600">2,000원</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="text-sm text-gray-700 leading-relaxed">
                    주문동의 및 개인정보 수집 이용 동의
                  </label>
                </div>
                
                <Button 
                  onClick={() => router.push('/pay/checkout')}>
                  결제하기 2,000 원
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderForm