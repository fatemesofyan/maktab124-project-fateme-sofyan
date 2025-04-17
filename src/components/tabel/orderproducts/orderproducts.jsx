"use client";

import React, { useState, useEffect } from "react";

const ITEMS_PER_PAGE = 1 ; // تعداد آیتم‌ها در هر صفحه

export default function Ordermanagement() {
  const [orders, setOrders] = useState([]); // ذخیره سفارشات
  const [currentPage, setCurrentPage] = useState(1); // صفحه فعلی
  const [filter, setFilter] = useState("all"); // فیلتر: all, delivered, pending
  const [selectedOrder, setSelectedOrder] = useState(null); // سفارش انتخاب‌شده برای نمایش جزئیات
  const [isModalOpen, setIsModalOpen] = useState(false); // وضعیت باز/بسته بودن مدال

  // دریافت داده‌ها از API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/orders");
        const data = await response.json();
        if (data.status === "success") {
          setOrders(data.data.orders); // ذخیره سفارشات
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  // فیلتر کردن سفارشات بر اساس وضعیت تحویل
  const filteredOrders = orders.filter((order) => {
    if (filter === "delivered") {
      return order.deliveryStatus === true;
    } else if (filter === "pending") {
      return order.deliveryStatus === false;
    }
    return true; // نمایش همه سفارشات
  });

  // محاسبه داده‌های مربوط به صفحه فعلی
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  // تعداد کل صفحات
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

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

  // باز کردن مدال و نمایش جزئیات سفارش
  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // بستن مدال
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // تغییر وضعیت تحویل سفارش
  const markAsDelivered = async (orderId) => {
    try {
      // ارسال درخواست به API برای به‌روزرسانی وضعیت تحویل
      const response = await fetch(`http://localhost:8000/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ deliveryStatus: true }),
      });
  
      const result = await response.json();
  
      if (response.ok && result.status === "success") {
        // آپدیت لوکال‌استیت
        const updatedOrders = orders.map((order) =>
          order._id === orderId ? { ...order, deliveryStatus: true } : order
        );
        setOrders(updatedOrders);
        closeModal(); // بستن مدال بعد از آپدیت
      } else {
        console.error("Failed to update order in database:", result.message);
      }
    } catch (error) {
      console.error("Error updating order delivery status:", error);
    }
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
            <label htmlFor="delivered-orders" className="text-primaryDark">
              سفارش های تحویل شده
            </label>
            <input
              type="radio"
              name="order"
              id="delivered-orders"
              checked={filter === "delivered"}
              onChange={() => {
                setFilter("delivered");
                setCurrentPage(1);
              }}
            />
          </div>
          <div>
            <label htmlFor="pending-orders" className="text-primaryDark">
              سفارش های در حال انتظار
            </label>
            <input
              type="radio"
              name="order"
              id="pending-orders"
              checked={filter === "pending"}
              onChange={() => {
                setFilter("pending");
                setCurrentPage(1);
              }}
            />
          </div>
          <div>
            <label htmlFor="all-orders" className="text-primaryDark">
              همه سفارشات
            </label>
            <input
              type="radio"
              name="order"
              id="all-orders"
              checked={filter === "all"}
              onChange={() => {
                setFilter("all");
                setCurrentPage(1);
              }}
            />
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
                وضعیت تحویل
              </th>
              <th className="py-4 px-6 text-right font-semibold w-1/8">
                جزییات
              </th>
            </tr>
          </thead>

          {/* بدنه جدول */}
          <tbody>
            {currentItems.map((order, index) => (
              <tr
                key={order._id}
                className={`border-b border-gray-300 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-accent hover:text-white transition`}
              >
                {/* نام کاربر */}
                <td className="py-4 px-6 border-r border-gray-300">
                  {order.user.firstname} {order.user.lastname}
                </td>

                {/* مجموع مبلغ */}
                <td className="py-4 px-6 border-r border-gray-300">
                  {order.totalPrice.toLocaleString()} تومان
                </td>

                {/* وضعیت تحویل */}
                <td className="py-4 px-6 border-r border-gray-300">
                  {order.deliveryStatus ? "تحویل داده شده" : "در حال انتظار"}
                </td>

                {/* جزئیات */}
                <td className="py-4 px-6 border-r border-gray-300 flex items-center justify-center gap-6">
                  <button
                    className="text-blue-500 underline hover:text-blue-900 cursor-pointer"
                    onClick={() => openModal(order)}
                  >
                    جزئیات
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* مدال نمایش جزئیات */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
            <h3 className="text-2xl font-bold text-primaryDark mb-4">
              جزئیات سفارش
            </h3>
            <div className="space-y-4">
              <p>
                <strong>نام کاربر:</strong> {selectedOrder.user.firstname}{" "}
                {selectedOrder.user.lastname}
              </p>
              <p>
                <strong>تلفن:</strong> {selectedOrder.user.phoneNumber}
              </p>
              <p>
                <strong>آدرس:</strong> {selectedOrder.user.address}
              </p>
              <p>
                <strong>تاریخ تحویل:</strong>{" "}
                {new Date(selectedOrder.deliveryDate).toLocaleDateString()}
              </p>
              <p>
                <strong>وضعیت تحویل:</strong>{" "}
                {selectedOrder.deliveryStatus ? "تحویل داده شده" : "در حال انتظار"}
              </p>
              <h4 className="text-xl font-bold text-primaryDark mt-4">
                محصولات:
              </h4>
              <ul className="list-disc pl-6">
                {selectedOrder.products.map((product, index) => (
                  <li key={index}>
                    {product.product.name} - {product.count} عدد -{" "}
                    {product.product.price.toLocaleString()} تومان
                  </li>
                ))}
              </ul>
              {!selectedOrder.deliveryStatus && (
                <button
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                  onClick={() => markAsDelivered(selectedOrder._id)}
                >
                  تحویل داده شد
                </button>
              )}
            </div>
            <button
              className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              onClick={closeModal}
            >
              بستن
            </button>
          </div>
        </div>
      )}

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