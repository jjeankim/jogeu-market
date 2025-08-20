import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { FaRegCircleUser } from "react-icons/fa6";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { PiHeartBold } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";
import useAuthStore from "@/store/AuthStore";
import Navigator from "../components/ui/Navigator";

const Header = () => {
  const { isLoggedIn, userName, initializeAuth } = useAuthStore();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleRedirect = (path: string) => {
    if (isLoggedIn) router.push(path);
    else router.push("/login");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      initializeAuth();
    }
  }, [initializeAuth]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?q=${searchTerm}`);
      setSearchTerm(" ");
    }
  };

  return (
    <header className="relative w-full shrink-0 mt-3 md:mt-6">
      <div className="bg-[#FFFBEE] hidden md:block border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex justify-end items-center gap-4 text-xs text-gray-600">
            {isLoggedIn ? (
              <div className="flex gap-3 items-center">
                <span className="text-gray-800">{userName}님</span>
                <button
                  onClick={handleLogout}
                  className="hover:text-black transition"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <Link href="/login" className="hover:text-black transition">
                로그인
              </Link>
            )}
            <div className="w-px h-3 bg-gray-300"></div>
            <Link href="/signup" className="hover:text-black transition">
              회원가입
            </Link>
            <div className="w-px h-3 bg-gray-300"></div>
            <Link href="/qna" className="hover:text-black transition">
              고객센터
            </Link>
          </div>
        </div>
      </div>

      {/* 데스크톱: 기존 스타일 유지 */}
      <div className="hidden md:block">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <Link href="/" className="w-50">
              <Image
                src="/images/logo_s_jogeuMarket.svg"
                alt="조그마켓 로고"
                width={100}
                height={40}
                className="mt-5"
              />
            </Link>
            <Navigator />
          </div>

          <div className="flex items-center gap-6 mt-26">
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="bg-transparent outline-none text-sm w-60 p-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <FiSearch
                className="text-gray-600 cursor-pointer"
                size={22}
                onClick={handleSearch}
              />
            </div>

            <button
              type="button"
              className="cursor-pointer p-1"
              onClick={() => handleRedirect("/cart")}
            >
              <PiShoppingCartSimpleBold size={22} />
            </button>
            <button
              type="button"
              className="cursor-pointer p-1"
              onClick={() => handleRedirect("/wishlist")}
            >
              <PiHeartBold size={22} />
            </button>
            <button
              type="button"
              className="cursor-pointer p-1"
              onClick={() => handleRedirect("/my")}
            >
              <FaRegCircleUser size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* 모바일: 간소화된 스타일 */}
      <div className="md:hidden">
        <div className=" border-b border-gray-100">
          <div className="px-4 py-2">
            <div className="flex justify-end items-center gap-3 text-xs text-gray-600">
              {isLoggedIn ? (
                <div className="flex gap-2 items-center">
                  <span className="text-gray-800 truncate max-w-[100px]">
                    {userName}님
                  </span>
                  <button
                    onClick={handleLogout}
                    className="hover:text-black transition"
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                <Link href="/login" className="hover:text-black transition">
                  로그인
                </Link>
              )}
              <div className="w-px h-3 bg-gray-300"></div>
              <Link href="/signup" className="hover:text-black transition">
                회원가입
              </Link>
              <div className="w-px h-3 bg-gray-300"></div>
              <Link href="/qna" className="hover:text-black transition">
                고객센터
              </Link>
            </div>
          </div>
        </div>

        {/* 모바일 메인 헤더 */}
        <div className="flex items-center justify-between px-4 py-3">
          {/* 로고 */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo_s_jogeuMarket.svg"
              alt="조그마켓 로고"
              width={80}
              height={32}
            />
          </Link>

          {/* 우측 아이콘들 */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="p-2 hover:bg-gray-100 rounded-lg transition"
              onClick={() => handleRedirect("/wishlist")}
            >
              <PiHeartBold size={20} className="text-gray-600" />
            </button>
            <button
              type="button"
              className="p-2 hover:bg-gray-100 rounded-lg transition"
              onClick={() => handleRedirect("/cart")}
            >
              <PiShoppingCartSimpleBold size={20} className="text-gray-600" />
            </button>
            <button
              type="button"
              className="p-2 hover:bg-gray-100 rounded-lg transition"
              onClick={() => handleRedirect("/my")}
            >
              <FaRegCircleUser size={20} className="text-gray-600" />
            </button>
            {/* 햄버거 메뉴 */}
            <Navigator />
          </div>
        </div>

        {/* 모바일 검색바 */}
        <div className="px-4 pb-3">
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-2">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className="bg-transparent outline-none text-sm flex-1 p-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <FiSearch
              className="text-gray-600 cursor-pointer"
              size={20}
              onClick={handleSearch}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
