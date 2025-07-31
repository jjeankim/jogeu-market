import Header from "@/components/Header";
import Footer from "@/components/ui/Footer";
import Image from "next/image";
import { FiChevronRight } from "react-icons/fi";

const MyOrderPage = () => {
  return (
    <>
      
      <main className="container w-full h-screen mx-auto p-2 flex flex-col align-center ">
        <div className="flex mx-auto w-2/3 justify-between py-6">
          <h2 className="font-bold w-1/3 text-2xl">주문 배송 조회</h2>
          <ul className="flex justify-between w-2/3 border-box text-lg">
            <li className="hover:text-[#b29977]">최근 1개월</li>
            <li className="hover:text-[#b29977]">최근 3개월</li>
            <li className="hover:text-[#b29977]">최근 6개월</li>
            <li className="hover:text-[#b29977]">최근 1년</li>
            <li className="hover:text-[#b29977]">최근 1년 이상</li>
          </ul>
        </div>

        <div className="flex mx-auto w-2/3 mb-6">
          <ul className="flex justify-between text-gray-400 rounded-lg border-2 w-full px-3 py-3.5">
            <li className="flex flex-col px-3">
              <span className="text-5xl text-center font-bold">O</span>
              <span className="text-gray-600 font-bold text-lg">주문 완료</span>
            </li>
            <li className="flex items-center px-3  text-xl">
              <FiChevronRight />
            </li>
            <li className="flex flex-col px-3 ">
              <span className="text-5xl text-center font-bold">O</span>
              <span className="text-gray-600 font-bold text-lg">
                배송 준비 중
              </span>
            </li>
            <li className="flex items-center px-3  text-xl">
              <FiChevronRight />
            </li>
            <li className="flex flex-col px-3">
              <span className="text-5xl text-center font-bold">O</span>
              <span className="text-gray-600 font-bold text-lg">배송 중</span>
            </li>
            <li className="flex items-center px-3  text-xl">
              <FiChevronRight />
            </li>
            <li className="flex flex-col px-3 ">
              <span className="text-5xl text-center font-bold">O</span>
              <span className="text-gray-600 font-bold text-lg">배송 완료</span>
            </li>
          </ul>
        </div>

        <div className="min-w-[42]rem w-2/3 mx-auto  p-4 ">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-300 text-left p-3">
                <th className="w-1/5 p-3 text-center">주문 일자</th>
                <th className="w-2/5 p-3 text-center">상품</th>
                <th className="w-1/12 p-3 text-center">수량</th>
                <th className="w-1/6 p-3 text-center">주문 금액</th>
                <th className="w-1/6 px-8 text-right">상태</th>
              </tr>
            </thead>
            <tbody className=" border-box">
              <tr className="border-t ">
                <td className="p-2 algin-top space-y-1 border-r-2 border-b-2 border-gray-300">
                  <p className="text-center">2025.07.30</p>
                  <p className=" text-center text-[#b29977]">Y25060362479</p>
                  <a href="#" className="text-gray-400 text-center block">
                    상세보기
                  </a>
                </td>
                <td className="p-2 mt-3 border-r-2 border-b-2 border-gray-300 ">
                  <div className=" flex gap-3 items-center">
                    <Image
                      src="/images/noImg.png"
                      width={80}
                      height={80}
                      alt="상품이미지"
                      className="rounded-md border object-cover"
                    ></Image>
                    <div>
                      <p className="text-gray-500">브랜드명</p>
                      <p className="text-black line-clamp-2">
                        어쩌구저쩌구 블라어쩌구저쩌구 블라어쩌구저쩌구
                        블라어쩌구저쩌구 블라어쩌구저쩌구 블라어쩌구저쩌구
                      </p>
                    </div>
                  </div>
                </td>
                <td className="text-center border-r-2 border-b-2 border-gray-300">
                  1
                </td>
                <td className="text-center text-red-600 pr-3 border-r-2 border-b-2 border-gray-300">
                  <span>9000</span>원
                </td>
                <td className="text-right pr-3 space-y-4 border-box p-3  border-b-2 border-gray-300 ">
                  <p className="px-1 p-1 pt-5">배송완료</p>
                  <a
                    href=""
                    className="px-3 py-1 border-1 rounded-full inline-block text-xs"
                  >
                    배송조회
                  </a>
                  <br />
                  <a
                    href=""
                    className="px-3 py-1 border-1 rounded-full inline-block text-xs"
                  >
                    리뷰작성
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MyOrderPage;
