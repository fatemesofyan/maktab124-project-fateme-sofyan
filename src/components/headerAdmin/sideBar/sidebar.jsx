"use client";

import ROUTES from "@/components/routes/routing";
import { useRouter } from "next/navigation";
import React from "react";
import {
  IoHome,
  IoSettings,
  IoBag,
  IoLogOut,
  IoCube,
  IoCart,
  IoPersonSharp ,
} from "react-icons/io5";


import Swal from "sweetalert2";

export default function Sidebar() {
  const router = useRouter();

  const handleDashboard = () => {
    router.push(ROUTES.dashboard);
  };

  const handleProductsmanagement = () => {
    router.push(ROUTES.Productsmanagement);
  };

  const handleOrder = () => {
    router.push(ROUTES.order);
  };

  const handleInventory = () => {
    router.push(ROUTES.inventory);
  };

  const handleUsermanagement = () => {
    router.push(ROUTES.Usermanagement);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "آیا می خواهید خارج شوید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#236e0a", 
      cancelButtonColor: "#ababab", 
      confirmButtonText: "بله،حتما", 
      cancelButtonText: "خیر", 
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "https://www.google.com";
      }
    });
  };

  return (
    <aside className="bg-gray-50 text-primaryDark h-screen w-64 fixed top-0 right-0 z-10   shadow-xl  p-5 ">
      <div className="flex items-center justify-center py-6  border-accent">
        <span className="text-xl font-bold"> پنل مدیریت گیتا </span>
      </div>
      <nav className="mt-8">
        <ul>
          <li>
            <button className="flex gap-4  items-center px-6 py-3 hover:bg-accent  rounded-lg transition-colors" onClick={handleDashboard}>
              <IoHome className="w-5 h-5 mr-2" />
              <span>داشبورد</span>
            </button>
          </li>
          <li>
            <button className="flex gap-4 items-center px-6 py-3 hover:bg-accent  rounded-lg transition-colors" onClick={handleProductsmanagement}>
              <IoBag className="w-5 h-5 mr-2" />
              <span>مدیریت محصولات</span>
            </button>
          </li>
          <li>
            <button className="flex gap-4 items-center px-6 py-3 hover:bg-accent rounded-lg transition-colors" onClick={handleOrder}>
              <IoCart className="w-5 h-5 mr-2" />
              <span>مدیریت سفارشات</span>
            </button>
          </li>
          <li>
            <button
              className="flex gap-4 items-center px-6 py-3 hover:bg-accent  rounded-lg transition-colors"
              onClick={handleInventory}
            >
              <IoCube className="w-5 h-5 mr-2" />
              <span>مدیریت موجودی‌ها</span>
            </button>
          </li>
          <li>
            {/* <button className="flex gap-4 items-center px-6 py-3 hover:bg-accent rounded-lg transition-colors" onClick={handleUsermanagement}>
                <IoPersonSharp  className="w-5 h-5 mr-2" />
              <span>مدیریت کاربران</span>
            </button> */}
          </li>
          <li>
            <button className="flex gap-4 items-center px-6 py-3 hover:bg-accent rounded-lg transition-colors">
              <IoSettings className="w-5 h-5 mr-2" />
              <span>تنظیمات</span>
            </button>
          </li>
        </ul>
        <button className="pt-40 flex  items-center px-6 py-3 mt-4  rounded-lg  transform hover:scale-110 transition-transform" onClick={handleLogout}>
          <IoLogOut className="w-5  mr-2 hover:w-8 h-8" />
          <span>خروج</span>
        </button>
      </nav>
    </aside>
  );
}
