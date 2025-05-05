"use client";

import React, { useState, useRef } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function WeblogDropdown() {
  const [open, setOpen] = useState(false);

  const handleNavigate = (slug) => {
    window.location.href = `/weblog/${slug}`;
  };

  return (
    <div className="relative inline-block text-right">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-primaryDark text-lg font-medium flex flex-row items-center"
      >
        وبلاگ
                <MdKeyboardArrowDown className="w-5 h-5" />
        
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            <div
              onClick={() => handleNavigate("watering-plants")}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              آبیاری گیاهان
            </div>
            <div
              onClick={() => handleNavigate("yellow-leaves")}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              تعویض گلدان گیاه
            </div>
            <div
              onClick={() => handleNavigate("yellow-leaves")}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
                درمان استرس با گیاه
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
