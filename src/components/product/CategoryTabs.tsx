import Link from "next/link";

interface CategoryTabsProps {
  currentCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryTabs = ({
  currentCategory,
  onCategoryChange,
}: CategoryTabsProps) => {
  return (
    <div className="my-3 mt-10 flex justify-center">
      {categories.map(({ label, value }: { label: string, value: string }) => (
        <Link
          key={value}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onCategoryChange(value);
          }}
          className={`font-medium text-lg mx-6 cursor-pointer ${
            currentCategory === value
              ? "text-blue-500 font-bold"
              : "text-gray-700"
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};

export default CategoryTabs;
