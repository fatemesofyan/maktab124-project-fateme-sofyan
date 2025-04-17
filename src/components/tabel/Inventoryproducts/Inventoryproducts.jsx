"use client";

import React, { useState, useEffect } from "react";

const ITEMS_PER_PAGE = 2; // تعداد آیتم‌ها در هر صفحه

export default function InventoryProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editingProductId, setEditingProductId] = useState(null); // ID محصولی که در حال ویرایش است
  const [editedProduct, setEditedProduct] = useState({}); // داده‌های ویرایش‌شده برای محصول فعلی

  // فراخوانی API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:8000/api/products?page=${currentPage}&limit=${ITEMS_PER_PAGE}&fields=-rating,-createdAt,-updatedAt,-__v&sort=price&quantity[gte]=8`
        );
        const data = await response.json();

        if (data.status === "success") {
          setProducts(data.data.products); // داده‌های محصولات
          setTotalPages(data.total_pages); // تعداد کل صفحات
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  // تغییر صفحه
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // شروع ویرایش
  const startEditing = (productId) => {
    const productToEdit = products.find((product) => product._id === productId);
    setEditingProductId(productId);
    setEditedProduct({
      price: productToEdit.price,
      quantity: productToEdit.quantity,
    });
  };

  // لغو ویرایش
  const cancelEditing = () => {
    setEditingProductId(null);
    setEditedProduct({});
  };

  // ذخیره تغییرات
  const saveChanges = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/products/${editingProductId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProduct),
      });

      if (response.ok) {
        const updatedProduct = await response.json();

        // به‌روزرسانی محصولات
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === editingProductId ? updatedProduct.data.product : product
          )
        );

        // خروج از حالت ویرایش
        setEditingProductId(null);
        setEditedProduct({});
      } else {
        console.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
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

  if (loading) {
    return <div className="text-center">در حال بارگذاری...</div>;
  }

  return (
    <div className="p-6 min-h-screen">
      {/* عنوان صفحه */}
      <div className="flex flex-row justify-between">
        <h2 className="text-3xl font-bold text-primaryDark mb-8 text-start">
          مدیریت موجودی کالا
        </h2>
      </div>

      {/* جدول */}
      <div className="shadow-lg rounded-lg border border-gray-300">
        <table className="w-full border-collapse text-sm sm:text-base">
          {/* سربرگ جدول */}
          <thead>
            <tr className="bg-primaryDark text-white">
              <th className="py-4 px-8 text-right font-semibold w-2/4">کالا</th>
              <th className="py-4 px-6 text-right font-semibold w-1/8">قیمت</th>
              <th className="py-4 px-6 text-right font-semibold w-1/8">موجودی</th>
              <th className="py-4 px-6 text-right font-semibold w-1/8">تغییرات</th>
            </tr>
          </thead>

          {/* بدنه جدول */}
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product._id}
                className={`border-b border-gray-300 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-accent `}
              >
                <td className="py-4 px-6 border-r border-gray-300">
                  {product.name}
                </td>
                <td className="py-4 px-6 border-r border-gray-300">
                  {editingProductId === product._id ? (
                    <input
                      type="number"
                      value={editedProduct.price || product.price}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          price: e.target.value,
                        })
                      }
                      className="border border-gray-300 p-1 rounded-md w-full"
                    />
                  ) : (
                    product.price
                  )}
                </td>
                <td className="py-4 px-6 border-r border-gray-300">
                  {editingProductId === product._id ? (
                    <input
                      type="number"
                      value={editedProduct.quantity || product.quantity}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          quantity: e.target.value,
                        })
                      }
                      className="border border-gray-300 p-1 rounded-md w-full hover:text-black"
                    />
                  ) : (
                    product.quantity
                  )}
                </td>
                <td className="py-4 px-6 border-r border-gray-300">
                  {editingProductId === product._id ? (
                    <>
                      <button
                        onClick={saveChanges}
                        className="text-green-500 mr-2"
                      >
                        ذخیره
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="text-red-500"
                      >
                        لغو
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => startEditing(product._id)}
                      className="text-blue-500"
                    >
                      ویرایش
                    </button>
                  )}
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