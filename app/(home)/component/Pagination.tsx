"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString()); // set another param

    router.push(`?${params.toString()}`);
  };

  // Improved pagination logic with ellipsis for large page counts
  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <nav className="flex items-center justify-center mt-8">
      <div className="flex gap-1 bg-white/90 shadow-md rounded-full px-2 py-2 border border-green-100">
        <button
          className="flex items-center justify-center w-9 h-9 rounded-full text-green-600 bg-white border border-green-200 hover:bg-green-50 hover:text-green-700 focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-150 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeftIcon size={20} />
        </button>
        {getPages().map((page, idx) =>
          page === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className="flex items-center justify-center w-9 h-9 text-gray-400 text-lg select-none"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              className={`flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-150 focus:ring-2 focus:ring-green-400 focus:outline-none font-semibold text-base
                    ${
                      page === currentPage
                        ? "bg-green-600 text-white border-green-600 shadow-lg scale-110 z-10"
                        : "bg-white text-green-600 border-green-200 hover:bg-green-50 hover:border-green-400"
                    }
                  `}
              onClick={() => onPageChange(Number(page))}
              disabled={page === currentPage}
              aria-current={page === currentPage ? "page" : undefined}
              aria-label={`Page ${page}`}
            >
              {page}
            </button>
          )
        )}
        <button
          className="flex items-center justify-center w-9 h-9 rounded-full text-green-600 bg-white border border-green-200 hover:bg-green-50 hover:text-green-700 focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-150 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRightIcon size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
