import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
    <header className="relative">
      {/* 상단 오른쪽 링크들 */}
      <div className="absolute top-4 right-4 flex gap-4 text-sm">
        {user ? (
          <div>
            <span>{user.email}님 환영합니다!</span>
            <button onClick={logout} className="logout">
              로그아웃
            </button>
          </div>
        ) : (
          <Link href="/login" className="text-gray-600 hover:text-gray-800 transition-colors">
            로그인/회원가입
          </Link>
        )}
        <Link href="/" className="text-gray-600 hover:text-gray-800 transition-colors">
          고객센터
        </Link>
      </div>

      {/* 메인 헤더 내용 */}
      <div className="m-10 flex justify-center items-center flex-col">
        <div className="flex justify-center items-center">
          <Image width={150} height={1} src="/images/logo_jogeuMarket.svg" alt="로고" />
        </div>
        <nav className="text-center m-5">
          <Link href="/"> Best |</Link>
          <Link href="/"> Brands |</Link>
          <Link href="/"> Products |</Link>
          <Link href="/"> Review</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;