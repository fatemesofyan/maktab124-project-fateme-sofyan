import React from 'react'
import { IoHome, IoSettings, IoBag, IoPerson, IoLogOut } from "react-icons/io5";

export default function Sidebar() {
  return (
    <aside
    className="bg-gray-100 text-primaryDark h-screen w-64 fixed top-0 right-0 z-10   shadow-xl  p-5 "
  >
    {/* لوگو */}
    <div className="flex items-center justify-center py-6  border-accent">
      <span className="text-xl font-bold">    پنل مدیریت گیتا </span>
    </div>

    {/* منو */}
    <nav className="mt-8">
      <ul>
        {/* آیتم خانه */}
        <li>
          <a
            href="/admin"
            className="flex items-center px-6 py-3 hover:bg-accent hover:text-white rounded-lg transition-colors"
          >
            <IoHome className="w-5 h-5 mr-2" />
            <span>داشبورد</span>
          </a>
        </li>

        {/* آیتم مدیریت محصولات */}
        <li>
          <a
            href="/admin/products"
            className="flex items-center px-6 py-3 hover:bg-accent hover:text-white rounded-lg transition-colors"
          >
            <IoBag className="w-5 h-5 mr-2" />
            <span>مدیریت محصولات</span>
          </a>
        </li>

        {/* آیتم مدیریت کاربران */}
        <li>
          <a
            href="/admin/users"
            className="flex items-center px-6 py-3 hover:bg-accent hover:text-white rounded-lg transition-colors"
          >
            <IoPerson className="w-5 h-5 mr-2" />
            <span>مدیریت کاربران</span>
          </a>
        </li>

        {/* آیتم تنظیمات */}
        <li>
          <a
            href="/admin/settings"
            className="flex items-center px-6 py-3 hover:bg-accent hover:text-white rounded-lg transition-colors"
          >
            <IoSettings className="w-5 h-5 mr-2" />
            <span>تنظیمات</span>
          </a>
        </li>

        {/* آیتم خروج */}
      </ul>
      <button className="pt-48 flex items-center px-6 py-3 mt-4  rounded-lg  transform hover:scale-110 transition-transform">

    <IoLogOut className="w-5 h-5 mr-2 hover:w-8 h-8" />
    <span>خروج</span>
 
</button>
    </nav>
  </aside>
  );
};