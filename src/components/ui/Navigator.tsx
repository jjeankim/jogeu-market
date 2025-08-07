import { useState, useEffect } from "react";
import HamburgerNavigator from "./HamburgerNavigator";
// import { HiMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { HiMenu } from "react-icons/hi";
import router from "next/router";

const Navigator = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    console.log(isMenuOpen);
  };

  const handleMenuClick = (path: string) => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      setTimeout(() => {
        router.push(`/${path}`);
      }, 300);
    } else {
      router.push(`/${path}`);
    }
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
      console.log("fetched Categories:", data);
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <>
      <div className="flex items-center gap-6 mt-8 ">
        {isMenuOpen ? (
          <>
            <IoMdClose
              size={32}
              onClick={toggleMenu}
              className="cursor-pointer"
            />
          </>
        ) : (
          <HiMenu size={32} onClick={toggleMenu} className="cursor-pointer" />
        )}
        <div
          className={`p-8 shadow-lg rounded-md grid grid-cols-4 absolute left-0 top-36 w-full overflow-hidden z-50 bg-white transition-all duration-300 ease-in-out transform origin-top rounded-b-2xl ${
            isMenuOpen
              ? "max-h-[800px] opacity-100 scale-y-100"
              : "max-h-0 opacity-0 scale-y-0"
          }`}
        >
          <HamburgerNavigator
            isMenuOpen={isMenuOpen}
            categoriesFromApi={categories}
            onClose={() => setIsMenuOpen(false)}
          />
        </div>

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
    </>
  );
};

export default Navigator;
