import { useEffect } from "react";
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
  const logout = useAuthStore((state) => state.logout);

  const handleMenuClick = (menu: string) => {
    router.push(`/?menu=${menu}`);
  };

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
    // if (typeof window !== "undefined") {
    //   localStorage.removeItem("accessToken");
    //   localStorage.removeItem("userName");
    //   window.location.href = "/";
    // }
    await logout();
    router.push("/");
  };

  return (
    <header className="relative w-full shrink-0 mt-6">
      <div className="absolute top-2 right-4 flex gap-4 text-sm text-gray-600 z-10">
        {isLoggedIn ? (
          <div className="flex gap-2 items-center">
            <span className="text-gray-800">{userName}님 환영합니다!</span>
            <button
              onClick={handleLogout}
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

      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <Link href="/" className="w-50">

            <Image
              src="/images/logo_s_jogeuMarket.svg"
              alt="조그마켓 로고"
              width={100}
              height={40}
            />
          </Link>

          <div className="flex items-center gap-6 mt-8">
            <HiMenu size={24} className="text-gray-600  relative" />
            {/* <div className="absolute w-full h-72   bg-amber-200 top-36  z-50 rounded-b-4xl"></div> */}

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

          <button
            type="button"
            className="cursor-pointer"
            onClick={() => handleRedirect("/cart")}
          >
            <PiShoppingCartSimpleBold size={22} />
          </button>
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => handleRedirect("/wishlist")}
          >
            <PiHeartBold size={22} />
          </button>
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => handleRedirect("/my")}
          >
            <FaRegCircleUser size={22} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
