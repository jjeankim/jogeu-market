import React from "react";

const MyPageAside = () => {
  const sections = [
    {
      title: "쇼핑정보",
      items: ["주문 배송 조회", "취소/교환/반품", "쿠폰"],
    },
    {
      title: "활동 정보",
      items: ["내 상품 후기", "위시리스트", "상품 문의"],
    },
    {
      title: "회원 정보",
      items: ["회원 정보 관리", "로그아웃", "회원 탈퇴"],
    },
  ];

  return (
    <aside className="w-2xs bg-white  m-16 mx-auto flex flex-col justify-between ">
      {sections.map(({ title, items }, idx) => (
        <ul key={idx} className="flex flex-col text-gray-400 gap-y-2 ">
          <li className="font-bold text-2xl text-black mb-2 ">{title}</li>
          {items.map((item) => (
            <li
              key={item}
              className="text-lg  hover:text-black transition-colors duration-200"
            >
              {item}
            </li>
          ))}
        </ul>
      ))}
    </aside>
  );
};

export default MyPageAside;
