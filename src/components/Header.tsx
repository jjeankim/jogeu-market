import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { PiHeartBold } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";
import { HiMenu } from "react-icons/hi";


type User = {
  id: number;
  email: string;
};

const Header = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fetchUser = async () => {
        try {
          const token = localStorage.getItem("token"); // 또는 쿠키에서 가져오기
          if (!token) return;

          const res = await axios.get("http://localhost:4000/api/users/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUser(res.data); // { id, email, nickname }
        } catch (err) {
          console.error("유저 정보 가져오기 실패", err);
          setUser(null);
        }
      };

      fetchUser();
    }
  }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행됨

  const logout = () => {
    // window 객체가 존재하는지 확인하여 클라이언트 환경인지 확인
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      setUser(null);
      window.location.href = "/"; // 또는 router.push("/")
    }
  };

  return (
      <header className="relative w-full border-b">
        <div className="absolute top-2 right-4 flex gap-4 text-sm text-gray-600 z-10">
          {user ? (
            <div className="flex gap-2 items-center">
              <span className="text-gray-800">{user.email}님 환영합니다!</span>
              <button
                onClick={logout}
                className="hover:text-gray-800 hover:underline transition"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hover:text-gray-800 transition-colors"
            >
              로그인 / 회원가입
            </Link>
          )}
          <Link href="/support" className="hover:text-gray-800 transition-colors">
            고객센터
          </Link>
        </div>
  
        {/* ✅ 메인 헤더 영역 */}
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
                <Link href="/" className="hover:text-yellow-500 transition-colors ml-10">Best</Link>
                <Link href="/" className="hover:text-yellow-500 transition-colors">Brand</Link>
                <Link href="/" className="hover:text-yellow-500 transition-colors">Pick</Link>
                <Link href="/" className="hover:text-yellow-500 transition-colors">New</Link>
              </nav>
            </div>
          </div>

          {/* 오른쪽 영역: 검색창 + 아이콘 */}
          <div className="flex items-center gap-6 mt-22">
            {/* 검색창 */}
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="bg-transparent outline-none text-sm w-60"
              />
              <FiSearch className="text-gray-600" size={22} />
            </div>
  
            {/* 아이콘 */}
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