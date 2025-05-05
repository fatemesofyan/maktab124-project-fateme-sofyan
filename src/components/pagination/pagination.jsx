import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
 const getVisiblePages = () => {
  const pages = [];
  const maxPagesToShow = 5;

  const totalPagesNum = parseInt(totalPages, 10);
  const currentPageNum = parseInt(currentPage, 10);

  if (totalPagesNum <= maxPagesToShow) {
    for (let i = 1; i <= totalPagesNum; i++) {
      pages.push(i);
    }
  } else {
    let start, end;

    if (currentPageNum <= 3) {
      start = 1;
      end = 5;
    } else if (currentPageNum + 2 >= totalPagesNum) {
      start = totalPagesNum - 4;
      end = totalPagesNum;
    } else {
      start = currentPageNum - 2;
      end = currentPageNum + 2;
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (start > 1) {
      pages.unshift("ellipsis-start");
    }

    if (end < totalPagesNum) {
      pages.push("ellipsis-end");
    }
  }

  return pages;
};

  return (
    <div className="flex justify-center mt-6 overflow-x-auto">
      <ul className="flex items-center gap-3">
        <li
          className={`px-3 py-1 rounded-md cursor-pointer ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 text-secondary hover:bg-gray-300"
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
                ? "bg-secondary text-white"
                : "bg-gray-200 text-secondary hover:bg-gray-300"
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
              : "bg-gray-200 text-secondary hover:bg-gray-300"
          } transition`}
          onClick={() => onPageChange(currentPage + 1)}
        >
          بعدی
        </li>
      </ul>
    </div>
  );
}
