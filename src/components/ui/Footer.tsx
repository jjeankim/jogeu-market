import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="shrink-0 w-full min-h-72 bg-[#FFFBEE] px-4 md:px-10 py-6 md:py-4 flex justify-center items-center mx-auto">
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-5 text-black">
          <div className="w-full md:col-span-2 companyInfo flex flex-col justify-between space-y-2 text-xs">
            <h4 className="font-bold text-lg mb-3">PROJECT.조그마켓</h4>
            <div className="flex flex-col md:flex-row md:space-x-3 space-y-1 md:space-y-0">
              <span>team leader: 김진</span>
              <span>개발기간: 2024.07.18 - 2024.08.20</span>
            </div>
            <span>프로젝트 유형: 팀 프로젝트 (4명)</span>
            <span>frontend: Next.js, React, TypeScript, Tailwind CSS</span>
            <span>backend: Node.js, Express, PostgreSQL, Prisma</span>
            <span>
              github repository: 
              <a href="https://github.com/jjeankim/jogeu-market" className="text-black hover:text-gray-700 ml-1">
                Frontend
              </a> / 
              <a href="https://github.com/jjeankim/jogeu-market-api" className="text-black hover:text-gray-700 ml-1">
                Backend
              </a>
            </span>
            <span>대량주문/협력문의 miyukikj35@gmail.com</span>
            <span>개발문의/버그리포트 miyukikj35@gmail.com</span>
            <span>
              copyright © 조그마켓 프로젝트 팀 all rights reserved / E-commerce Platform
            </span>
          </div>

          <div className="flex flex-col space-y-2">
            <h4 className="font-bold text-lg mb-3">DEVELOPMENT TEAM</h4>
            <span className="text-lg md:text-xl mb-3 font-semibold">4명의 개발자</span>
            <span className="text-xs">김진 - Team Leader / Full-Stack</span>
            <span className="text-xs">최수영 - Full-Stack Developer</span>
            <span className="text-xs">함선우 - Full-Stack Developer</span>
            <span className="text-xs">허영선 - Full-Stack Developer</span>
          </div>

          <div className="flex flex-col space-y-2">
            <h4 className="font-bold text-lg mb-3">CONTACT INFO</h4>
            <span className="text-xs">김진: miyukikj35@gmail.com</span>
            <span className="text-xs">
              GitHub: 
              <a href="https://github.com/jjeankim" className="text-black hover:text-gray-700 ml-1">
                jjeankim
              </a>
            </span>
            <span className="text-xs">최수영: csy9980@gmail.com</span>
            <span className="text-xs">함선우: return0@knou.ac.kr</span>
            <span className="text-xs">허영선: heo4021@outlook.com</span>
            <span className="text-xs">
              GitHub: 
              <a href="https://github.com/Youngsun33" className="text-black hover:text-gray-700 ml-1">
                Youngsun33
              </a>
            </span>
          </div>

          <div className="flex flex-col space-y-2">
            <h4 className="font-bold text-lg mb-3">기술스택 / 주요기능</h4>
            <span className="text-xs leading-relaxed">
              사용자 인증 (JWT, 소셜로그인), 상품 관리, 장바구니, 주문/결제, 리뷰 시스템
            </span>
            <span className="text-xs leading-relaxed">
              위시리스트, 쿠폰 시스템, Q&A, 마이페이지, 주문내역 관리
            </span>
            <span className="text-xs leading-relaxed">
              * 토스페이먼츠, Azure Blob Storage, PostgreSQL을 활용한 
              완전한 이커머스 플랫폼
            </span>
          </div>

          <div className="flex flex-col space-y-2">
            <h4 className="font-bold text-lg mb-3">PROJECT LINKS</h4>
            <span className="text-xs leading-relaxed">
              <a href="https://www.notion.so/while-ture-2390dbd00533802db8f2e96478e80048?pvs=21" 
                 className="text-black hover:text-gray-700 block mb-2">
                📚 프로젝트 문서 (Notion)
              </a>
              <a href="https://github.com/jjeankim/jogeu-market" 
                 className="text-black hover:text-gray-700 block mb-2">
                🔗 Frontend Repository
              </a>
              <a href="https://github.com/jjeankim/jogeu-market-api" 
                 className="text-black hover:text-gray-700 block">
                🔗 Backend Repository
              </a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;