// components/InventoryProducts.js
"use client";

import React, { useState } from "react";

const products = Array.from({ length: 300 }, (_, i) => ({
  id: i + 1,
  name: `کالا ${i + 1}`,
  price: `${(i + 1) * 1000} تومان`,
  stock: Math.floor(Math.random() * 100),
}));

const ITEMS_PER_PAGE = 10; // تعداد آیتم‌ها در هر صفحه

export default function InventoryProducts() {
  const [currentPage, setCurrentPage] = useState(1);

  // محاسبه داده‌های مربوط به صفحه فعلی
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  // تعداد کل صفحات
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  // تغییر صفحه
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // محاسبه صفحات نمایش‌داده‌شده (فقط 5 عدد)
  const getVisiblePages = () => {
    const visiblePages = [];
    const halfRange = Math.floor(5 / 2); // نصف تعداد صفحات نمایش‌داده‌شده

    let startPage = Math.max(1, currentPage - halfRange);
    let endPage = Math.min(totalPages, startPage + 4);

    // اطمینان از اینکه همیشه 5 عدد نمایش داده شود
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      {/* عنوان صفحه */}
      <h2 className="text-3xl font-bold text-primaryDark mb-8 text-start">لیست کالاها</h2>

      {/* جدول */}
      <div className="shadow-lg rounded-lg border border-accent">
        <table className="w-full border-collapse text-sm sm:text-base">
          {/* سربرگ جدول */}
          <thead>
            <tr className="bg-primaryDark text-white">
              <th className="py-4 px-6 text-start font-semibold">کالا</th>
              <th className="py-4 px-6 text-start font-semibold">قیمت</th>
              <th className="py-4 px-6 text-start font-semibold">موجودی</th>
            </tr>
          </thead>

          {/* بدنه جدول */}
          <tbody>
            {currentItems.map((product, index) => (
              <tr
                key={product.id}
                className={`border-b border-accent ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-secondary hover:text-white transition`}
              >
                <td className="py-4 px-6">{product.name}</td>
                <td className="py-4 px-6">{product.price}</td>
                <td className="py-4 px-6">{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* پیجینگ */}
      <div className="flex justify-center mt-6 overflow-x-auto  ">
        <ul className="flex items-center  gap-3">
          {/* دکمه قبلی */}
          <li
            className={`px-3 py-1 rounded-md cursor-pointer ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-primaryDark hover:bg-gray-300"
            } transition`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            قبلی
          </li>

          {/* صفحات */}
          {getVisiblePages().map((page) => (
            <li
              key={page}
              className={`px-3 py-1 rounded-md cursor-pointer ${
                currentPage === page
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-primaryDark hover:bg-gray-300"
              } transition`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </li>
          ))}

          {/* حالت سه‌نقطه
          {totalPages > 5 && currentPage < totalPages - 2 && (
            <li className="px-3 py-1 text-gray-400">...</li>
          )} */}

          {/* دکمه بعدی */}
          <li
            className={`px-3 py-1 rounded-md cursor-pointer ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-primaryDark hover:bg-gray-300"
            } transition`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            بعدی
          </li>
        </ul>
      </div>
    </div>
  );
}