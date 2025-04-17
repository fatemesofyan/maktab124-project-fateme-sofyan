import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const getVisiblePages = () => {
    const visiblePages = [];
    const halfRange = Math.floor(5 / 2);
    let startPage = Math.max(1, currentPage - halfRange);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  return (
    <div className="flex justify-center mt-6 overflow-x-auto">
      <ul className="flex items-center gap-3">
        <li
          className={`px-3 py-1 rounded-md cursor-pointer ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 text-primaryDark hover:bg-gray-300"
          } transition`}
          onClick={() => onPageChange(currentPage - 1)}
        >
          قبلی
        </li>

        {getVisiblePages().map((page) => (
          <li
            key={page}
            className={`px-3 py-1 rounded-md cursor-pointer ${
              currentPage === page
                ? "bg-primaryDark text-white"
                : "bg-gray-200 text-primaryDark hover:bg-gray-300"
            } transition`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </li>
        ))}

        <li
          className={`px-3 py-1 rounded-md cursor-pointer ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 text-primaryDark hover:bg-gray-300"
          } transition`}
          onClick={() => onPageChange(currentPage + 1)}
        >
          بعدی
        </li>
      </ul>
    </div>
  );
}
