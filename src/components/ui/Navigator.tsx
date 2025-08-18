import { useState, useEffect } from "react";
import HamburgerNavigator from "./HamburgerNavigator";
import { IoMdClose } from "react-icons/io";
import { HiMenu } from "react-icons/hi";
import { Category } from "@/lib/apis/category";

const Navigator = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/categories`
      );
      if (!response.ok) {
        console.error("Failed to fetch categories:", response.statusText);
        return;
      }
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleHashScroll = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) {
      const yOffset = -160; // 헤더 높이에 따라 조절 (px)
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      // 요소가 없으면 URL 해시만 바꾸고 나중에 useEffect가 처리
      window.location.hash = hash;
    }
  };

  return (
    <>
      <div className="flex items-center gap-6 mt-0 md:mt-8">
        {/* 햄버거 메뉴 버튼 */}
        {isMenuOpen ? (
          <IoMdClose
            size={24}
            onClick={toggleMenu}
            className="cursor-pointer md:hidden"
          />
        ) : (
          <HiMenu 
            size={24} 
            onClick={toggleMenu} 
            className="cursor-pointer md:hidden text-gray-500" 
          />
        )}
        
        {/* 데스크톱용 햄버거 버튼 (기존 크기) */}
        {isMenuOpen ? (
          <IoMdClose
            size={32}
            onClick={toggleMenu}
            className="cursor-pointer hidden md:block"
          />
        ) : (
          <HiMenu 
            size={32} 
            onClick={toggleMenu} 
            className="cursor-pointer hidden md:block" 
          />
        )}

        {/* 햄버거 메뉴 드롭다운 */}
        <div
          className={`p-4 md:p-8 shadow-lg rounded-md grid grid-cols-2 md:grid-cols-4 absolute left-0 top-28 md:top-44 w-full overflow-hidden z-30 bg-white transition-all duration-300 ease-in-out transform origin-top rounded-b-2xl ${
            isMenuOpen
              ? "max-h-[800px] opacity-100 scale-y-100"
              : "max-h-0 opacity-0 scale-y-0"
          }`}
        >
          <HamburgerNavigator
            isMenuOpen={isMenuOpen}
            categoriesFromApi={categories as Category[]}
            onClose={() => setIsMenuOpen(false)}
          />
        </div>

        {/* 데스크톱에서만 표시되는 네비게이션 메뉴 */}
        <nav className="hidden md:flex gap-30 text-2xl font-medium">
          <ul className="grid grid-cols-4 gap-15">
            <li>
              <a
                href="#best"
                className="hover:text-[#fcc18e] transition-colors ml-10"
                onClick={(e) => {
                  e.preventDefault();
                  handleHashScroll("#best");
                }}
              >
                Best
              </a>
            </li>
            <li>
              <a
                href="#pick"
                className="hover:text-[#fcc18e] transition-colors ml-10"
                onClick={(e) => {
                  e.preventDefault();
                  handleHashScroll("#pick");
                }}
              >
                Pick
              </a>
            </li>
            <li>
              <a
                href="#brand"
                className="hover:text-[#fcc18e] transition-colors ml-10"
                onClick={(e) => {
                  e.preventDefault();
                  handleHashScroll("#brand");
                }}
              >
                Brand
              </a>
            </li>
            <li>
              <a
                href="#new"
                className="hover:text-[#fcc18e] transition-colors ml-10"
                onClick={(e) => {
                  e.preventDefault();
                  handleHashScroll("#new");
                }}
              >
                New
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navigator;
