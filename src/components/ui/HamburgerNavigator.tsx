import { FC } from "react";
import { useRouter } from "next/router";
import { Category } from "@/lib/apis/category";

interface SubCategory {
  name: string;
  slug: string;
  productCode: string;
}

interface CategoryWithChildren extends Category {
  children: SubCategory[];
}

interface Props {
  isMenuOpen: boolean;
  categoriesFromApi: Category[];
  onClose: () => void;
}

// 서브카테고리 매핑 데이터
const subCategoryMap: Record<string, SubCategory[]> = {
  beauty: [
    { name: "스킨케어", slug: "beauty-skincare", productCode: "BS" },
    { name: "메이크업", slug: "beauty-makeup", productCode: "BM" },
    { name: "헤어/바디", slug: "beauty-hairbody", productCode: "BH" },
    { name: "미용소품", slug: "beauty-tools", productCode: "BT" },
  ],
  food: [
    { name: "간편식", slug: "food-meal", productCode: "FM" },
    { name: "헬스케어", slug: "food-healthcare", productCode: "FH" },
    { name: "건강식품", slug: "food-supplement", productCode: "FC" },
    { name: "간식/디저트", slug: "food-snack", productCode: "FD" },
  ],
  living: [
    { name: "주방", slug: "living-kitchen", productCode: "LK" },
    { name: "생활", slug: "living-home", productCode: "LD" },
  ],
  pet: [
    { name: "강아지", slug: "pet-dog", productCode: "PD" },
    { name: "고양이", slug: "pet-cat", productCode: "PC" },
    { name: "장난감", slug: "pet-toy", productCode: "PT" },
  ],
};

// 카테고리에 children(서브카테고리)를 매핑하는 함수
const mapCategoriesWithChildren = (
  categories: Category[],
  subCategoryMap: Record<string, SubCategory[]>
): CategoryWithChildren[] => {
  return categories.map(
    (cat: Category): CategoryWithChildren => ({
      ...cat,
      children: subCategoryMap[cat.slug] || [],
    })
  );
};

const HamburgerNavigator: FC<Props> = ({
  categoriesFromApi,
  onClose,
}) => {
  const router = useRouter();
  const categories = mapCategoriesWithChildren(
    categoriesFromApi,
    subCategoryMap
  );

  const handleClick = (href: string) => {
    onClose(); // 메뉴 닫기
    setTimeout(() => {
      router.push(href); // 라우팅
    }, 300); // 메뉴 닫히는 애니메이션 시간에 맞춰 조절
  };

  return (
    <>
      {categories.map((category) => (
        <ul
          key={category.slug}
          className="flex flex-col items-center p-3 space-y-4 text-lg"
        >
          <li className="font-semibold text-xl ">
            <button
              onClick={() => handleClick(`/product?category=${category.slug}`)}
              className="hover:font-bold hover:text-[#cae6cd] cursor-pointer"
            >
              {category.name}
            </button>
          </li>
          {category.children.map((sub) => (
            <li key={sub.slug}>
              <button
                className="hover:text-[#FEEBB3] cursor-pointer"
                onClick={() =>
                  handleClick(
                    `/product?category=${category.slug}&subCategory=${sub.productCode}`
                  )
                }
              >
                {sub.name}
              </button>
            </li>
          ))}
        </ul>
      ))}
    </>
  );
};

export default HamburgerNavigator;
