import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { FaRegCircleUser } from "react-icons/fa6";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { PiHeartBold } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";
import { HiMenu } from "react-icons/hi";
import useAuthStore from "@/store/AuthStore";

const Header = () => {
  const { isLoggedIn, userName, initializeAuth } = useAuthStore();
  const router = useRouter();

  const handleMenuClick = (menu: string) => {
    router.push(`/?menu=${menu}`);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      initializeAuth();
    }
  }, [initializeAuth]);

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userName");
      window.location.href = "/";
    }
  };

  return (
    <header className="relative w-full shrink-0">
      <div className="absolute top-2 right-4 flex gap-4 text-sm text-gray-600 z-10">
        {isLoggedIn ? (
          <div className="flex gap-2 items-center">
            <span className="text-gray-800">{userName}님 환영합니다!</span>
            <button
              onClick={logout}
              className="hover:text-gray-800 hover:underline transition"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <Link href="/login" className="hover:text-gray-800 transition-colors">
            로그인 / 회원가입
          </Link>
        )}
        <Link href="/support" className="hover:text-gray-800 transition-colors">
          고객센터
        </Link>
      </div>

      <div className="flex items-start justify-between px-6 py-4">
        <div className="flex flex-col">
          <Link href="/">
            <Image
              src="/images/logo_s_jogeuMarket.svg"
              alt="조그마켓 로고"
              width={100}
              height={40}
            />
          </Link>

          <div className="flex items-center gap-6 mt-8">
            <HiMenu size={24} className="text-gray-600 " />
            <nav className="flex gap-30 text-2xl font-medium">
              <button
                onClick={() => handleMenuClick("best")}
                className="hover:text-yellow-500 transition-colors ml-10"
              >
                Best
              </button>
              <button
                onClick={() => handleMenuClick("brand")}
                className="hover:text-yellow-500 transition-colors"
              >
                Brand
              </button>
              <button
                onClick={() => handleMenuClick("pick")}
                className="hover:text-yellow-500 transition-colors"
              >
                Pick
              </button>
              <button
                onClick={() => handleMenuClick("new")}
                className="hover:text-yellow-500 transition-colors"
              >
                New
              </button>
            </nav>
          </div>
        </div>

        <div className="flex items-center gap-6 mt-24">
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className="bg-transparent outline-none text-sm w-60"
            />
            <FiSearch className="text-gray-600" size={22} />
          </div>

          <Link href="/cart">
            <PiShoppingCartSimpleBold size={22} />
          </Link>
          <Link href="/wishlist">
            <PiHeartBold size={22} />
          </Link>
          <Link href="/my">
            <FaRegCircleUser size={22} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
