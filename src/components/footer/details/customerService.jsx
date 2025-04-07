import React from "react";

export default function CustomerService() {
  return (
    <div className="flex flex-col space-y-2">
      <p className="font-bold text-xl"> خدمات مشتریان </p>
      <p className="text-gray-300 hover:text-white cursor-pointer">
        {" "}
        پاسخ به پرسش‌های متداول{" "}
      </p>
      <p className="text-gray-300 hover:text-white cursor-pointer">
        {" "}
        رویه‌های بازگرداندن کالا
      </p>
      <p className="text-gray-300 hover:text-white cursor-pointer"> شرایط استفاده </p>
      <p className="text-gray-300 hover:text-white cursor-pointer"> حریم خصوصی</p>
      <p className="text-gray-300 hover:text-white cursor-pointer">گزارش باگ </p>
    </div>
  );
}
