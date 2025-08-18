import useAuthStore from "@/store/AuthStore";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const MyPageAside = () => {
  const { logout } = useAuthStore();
  const router = useRouter();

  const sections = [
    {
      title: "쇼핑정보",
      items: [
        { label: "주문 배송 조회", href: "/my/orders" },
        { label: "취소/교환/반품", href: "/my/returns" },
        { label: "쿠폰", href: "/my/coupons" },
      ],
    },
    {
      title: "활동 정보",
      items: [
        { label: "내 상품 후기", href: "/my/reviews" },
        { label: "위시리스트", href: "/wishlist" },
        { label: "상품 문의", href: "/qna" },
      ],
    },
    {
      title: "회원 정보",
      items: [
        { label: "회원 정보 관리", href: "/my/settings" },
        { label: "로그아웃", type: "button" },
        { label: "회원 탈퇴", type: "button" },
      ],
    },
  ];

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handleWithdraw = () => {
    // 회원탈퇴 처리 로직
    if (confirm("정말 탈퇴하시겠습니까?")) {
      console.log("회원 탈퇴 실행");
    }
  };

  return (
    <aside className="bg-white flex flex-col gap-20 justify-between">
      {sections.map(({ title, items }, idx) => (
        <ul key={idx} className="flex flex-col text-gray-400 gap-y-2">
          <li className="font-bold text-2xl text-black mb-2">{title}</li>
          {items.map(({ label, href, type }) => (
            <li
              key={label}
              className="text-lg hover:text-black transition-colors duration-200"
            >
              {type === "button" ? (
                <button
                  type="button"
                  className="text-left w-full"
                  onClick={label === "로그아웃" ? handleLogout : handleWithdraw}
                >
                  {label}
                </button>
              ) : (
                <Link href={href!}>{label}</Link>
              )}
            </li>
          ))}
        </ul>
      ))}
    </aside>
  );
};

export default MyPageAside;
