import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const getPageNumbers = (): number[] => {
    const maxToShow = 5;
    let startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + maxToShow - 1);

    startPage = Math.max(1, endPage - maxToShow + 1);
    const pages: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();
  const pageInc = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  const pageDec = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 sm:px-6">
      <div className="isolate inline-flex -space-x-px">
        <button
          type="button"
          className={`p-2 ${
            currentPage === 1 ? "opacity-40 cursor-not-allowed" : ""
          }`}
          onClick={pageDec}
          aria-label="Previous"
          disabled={currentPage === 1}
        >
          <FiChevronLeft className="size-5" />
        </button>

        {pageNumbers.map((num) => (
          <button
            type="button"
            key={num}
            onClick={() => onPageChange(num)}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
              num === currentPage ? "text-logo" : "text-gray-800"
            }`}
          >
            {num}
          </button>
        ))}

        <button
          type="button"
          className=""
          onClick={pageInc}
          disabled={currentPage === totalPages}
        >
          <FiChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
