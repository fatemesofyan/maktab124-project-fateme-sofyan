import React from "react";

export default function CustomerService() {
  return (
    <div className="flex flex-col space-y-2">
      <p className="font-bold text-xl"> خدمات مشتریان </p>
      <p className="text-gray-700 hover:text-black cursor-pointer">
        {" "}
        پاسخ به پرسش‌های متداول{" "}
      </p>
      <p className="text-gray-600 hover:text-black cursor-pointer">
        {" "}
        رویه‌های بازگرداندن کالا
      </p>
      <p className="text-gray-700 hover:text-black cursor-pointer"> شرایط استفاده </p>
      <p className="text-gray-700 hover:text-black cursor-pointer"> حریم خصوصی</p>
      <p className="text-gray-700 hover:text-black cursor-pointer">گزارش باگ </p>
    </div>
  );
}
