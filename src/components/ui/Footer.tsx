import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="shrink-0 w-full h-72 bg-black px-10 py-4 flex justify-center items-center mx-auto">
        <div className=" w-full h-full grid grid-cols-6 gap-5 text-white ">
          <div className="w-full col-span-2 companyInfo flex flex-col justify-between  space-y-1  text-xs ">
            <h4 className="font-bold text-lg mb-3">COMPANY.조그 마켓</h4>
            <div className="space-x-3">
              <span>owner: 김진</span>
              <span>tel.02-2688-4103</span>
            </div>
            <span>business no. 295-88-0287</span>
            <span>mail order license.2025-서울구로-2123[사업자 정보확인]</span>
            <span>personal info manager. 서이현 (hohi1215@naver.com)</span>
            <span>
              address. [08225] 서울특별시 구로구 중앙로3길 46 (고척동) 강서빌딩
              703호 오디너리먼트
            </span>
            <span>대량주문/협력문의 hohi1215@naver.com</span>
            <span>저작권침해/사진도용 제보 hohi1215@naver.com</span>
            <span>
              copyright © 조그마켓 all rights reserved / published by sz
            </span>
          </div>
          <div className="flex flex-col space-y-1">
            <h4 className="font-bold text-lg mb-3">C/S CENTER</h4>
            <span className="text-2xl mb-3 ">02-2688-4103</span>
            <span className="text-xs">MON-FRI AM10:00-PM04:00</span>
            <span className="text-xs">BREAK TIME PM12:00-PM01:00</span>
            <span className="text-xs">SAT,SUN,HOLIDAY OFF</span>
          </div>
          <div className="flex flex-col space-y-1">
            <h4 className="font-bold text-lg mb-3">BANK ACOUNT</h4>
            <span className="text-xs">국민 757101-04-180003</span>
            <span className="text-xs">예금주 : 주식회사 조그마켓</span>
          </div>
          <div className="flex flex-col space-y-1">
            <h4 className="font-bold text-lg mb-3">교환/반품 주소</h4>
            <span className="text-xs leading-relaxed">
              [08563] 서울특별시 금천구 독산로50길 23 학습관2층 202호
            </span>
            <span className="text-xs leading-relaxed">
              * 반품 및 교환 제품은 공지사항을 참고하여 CJ대한통운으로 반품요청
              부탁드립니다.
            </span>
          </div>
          <div className="flex flex-col space-y-1">
            <h4 className="font-bold text-lg mb-3">SERVICE</h4>
            <span className="text-xs leading-relaxed">
              고객님은 안전거래를 위해 현금 등으로 결제시 저희 쇼핑몰 에서
              가입한 구매안전 서비스를 이용하실 수 있습니다.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
