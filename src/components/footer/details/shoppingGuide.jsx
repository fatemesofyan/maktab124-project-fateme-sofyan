import React from 'react'

export default function ShoppingGuide() {
  return (
    <div className="flex flex-col space-y-2">
    <p className="font-bold text-xl">  راهنمای خرید کالا </p>
    <p className="text-gray-300 hover:text-white">
      {" "}
      پاسخ به پرسش‌های متداول{" "}
    </p>
    <p className="text-gray-300 hover:text-white">
      {" "}
      رویه‌های بازگرداندن کالا
    </p>
    <p className="text-gray-300 hover:text-white"> شرایط استفاده </p>
    <p className="text-gray-300 hover:text-white"> حریم خصوصی</p>
    <p className="text-gray-300 hover:text-white">گزارش باگ </p>
  </div>
  )
}
