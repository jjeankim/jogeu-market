import SortBox from "@/components/ui/SortDropdown";
import React, { useState } from "react";

const sortOptions = [
  { label: "최신순", value: "latest" },
  { label: "인기순", value: "popular" },
];

const ProductList = () => {
  const [sort, setSort] = useState("latest");
  return (
    <div className="m-[100px]">
      <SortBox options={sortOptions} value={sort} onChange={setSort} />
    </div>
  );
};

export default ProductList;
