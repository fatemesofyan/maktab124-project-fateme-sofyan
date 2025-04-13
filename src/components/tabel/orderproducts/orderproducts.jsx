"use client";

import React, { useState } from "react";
import Orderdropdown from "../dropdown/orderdropdown";

const products = Array.from({ length: 300 }, (_, i) => ({
  id: i + 1,
  name: `کالا ${i + 1}`,
  price: `${(i + 1) * 1000} تومان`,
  stock: Math.floor(Math.random() * 100),
  category: `دسته‌بندی ${Math.floor(i / 50) + 1}`, // مثال برای دسته‌بندی
}));

const ITEMS_PER_PAGE = 5; // تعداد آیتم‌ها در هر صفحه
export default function Ordermanagement() {
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
    <div className="p-6 min-h-screen">
      {/* عنوان صفحه */}
      <div className="flex flex-row justify-between">
        <h2 className="text-3xl font-bold text-primaryDark mb-8 text-start">
          مدیریت سفارشات
        </h2>
        <div className="flex flex-row gap-8">
          <div>
            <label htmlFor="order-box " className="text-primaryDark">
              سفارش های تحویل شده
            </label>
            <input type="radio" name="order" id="order-box" />
          </div>
          <div>
            <label htmlFor="order-box" className="text-primaryDark">
              سفارش های در حال انتظار
            </label>
            <input type="radio" name="order" id="order-box" />
          </div>
        </div>
      </div>

      {/* جدول */}
      <div className="shadow-lg rounded-lg border border-gray-300">
        <table className="w-full border-collapse text-sm sm:text-base">
          {/* سربرگ جدول */}
          <thead>
            <tr className="bg-primaryDark text-white">
              <th className="py-4 px-8 text-right font-semibold w-1/8">
                نام کاربر
              </th>
              <th className="py-4 px-8 text-right font-semibold w-2/4">
                مجموع مبلغ
              </th>
              <th className="py-4 px-6 text-right font-semibold w-2/8">
                <Orderdropdown />
              </th>
              <th className="py-4 px-6 text-right font-semibold w-1/8">
                جزییات
              </th>
            </tr>
          </thead>

          {/* بدنه جدول */}
          <tbody>
            {currentItems.map((product, index) => (
              <tr
                key={product.id}
                className={`border-b border-gray-300 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-accent hover:text-white transition`}
              >
                {/* ستون تصویر */}
                <td className="py-4 px-6 border-r border-gray-300">
                  {/* می‌توانید تصویر محصول را اینجا قرار دهید */}
                  {product.img}
                </td>

                {/* ستون کالا */}
                <td className="py-4 px-6 border-r border-gray-300">
                  {product.name}
                </td>

                {/* ستون دسته‌بندی */}
                <td className="py-4 px-6 border-r border-gray-300">
                  {product.category}
                </td>

                {/* ستون تغییرات (ویرایش و حذف) */}
                <td className="py-4 px-6 border-r   border-gray-300 flex items-center justify-center gap-6">
                  {/* ایکون ویرایش */}
                  <button
                    className="text-blue-500 underline  hover:text-blue-900 cursor-pointer"
                    title="ویرایش"
                  >
                    بررسی سفارش
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* پیجینگ */}
      <div className="flex justify-center mt-6 overflow-x-auto">
        <ul className="flex items-center gap-3">
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
                  ? "bg-primaryDark text-white"
                  : "bg-gray-200 text-primaryDark hover:bg-gray-300"
              } transition`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </li>
          ))}

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
