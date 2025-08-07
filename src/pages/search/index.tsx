import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SearchForm from "@/components/SearchForm";

const SearchPage = () => {
  const router = useRouter();
  const { q } = router.query; // URL에서 ?q=검색어 가져오기

  return (
    <div className="container mx-auto mt-20">
      {/* 검색어 표시 */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold">
          "{q}" 검색 결과
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-primary via-black to-primary mx-auto mt-4 rounded-full"></div>
      </div>
    
      <SearchForm searchQuery={q as string} />
    </div>
  );
};

export default SearchPage;