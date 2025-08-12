import Link from "next/link";
import { Category } from "@/lib/apis/category";

interface CategoryTabsProps {
  currentCategory: string;
  onCategoryChange: (category: string) => void;
  categories: Category[];
}

const CategoryTabs = ({
  currentCategory,
  onCategoryChange,
  categories,
}: CategoryTabsProps) => {
  return (
    <div className="my-3 mt-10 flex justify-center">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onCategoryChange(category.slug);
          }}
          className={`font-medium text-lg mx-6 cursor-pointer ${
            currentCategory === category.slug
              ? "text-blue-500 font-bold"
              : "text-gray-700"
          }`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default CategoryTabs;
