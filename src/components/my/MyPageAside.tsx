import Link from "next/link";
import React from "react";

const MyPageAside = () => {
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
        { label: "위시리스트", href: "/my/wishlist" },
        { label: "상품 문의", href: "/my/inquiries" },
      ],
    },
    {
      title: "회원 정보",
      items: [
        { label: "회원 정보 관리", href: "/my/profile" },
        { label: "로그아웃", href: "/logout" },
        { label: "회원 탈퇴", href: "/my/withdraw" },
      ],
    },
  ];

  return (
    <aside className=" bg-white flex flex-col gap-20 justify-between ">
      {sections.map(({ title, items }, idx) => (
        <ul key={idx} className="flex flex-col text-gray-400 gap-y-2 ">
          <li className="font-bold text-2xl text-black mb-2 ">{title}</li>
          {items.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className="text-lg  hover:text-black transition-colors duration-200"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </aside>
  );
};

export default MyPageAside;
