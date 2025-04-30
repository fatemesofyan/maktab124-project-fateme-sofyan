import React from 'react'

export default function ShoppingGuide() {
  return (
    <div className="flex flex-col space-y-2 mb-12">
    <p className="font-bold text-xl">  راهنمای خرید کالا </p>
    <p className="text-gray-700 hover:text-black cursor-pointer">
    نحوه ثبت سفارش
    </p>
    <p className="text-gray-700 hover:text-black cursor-pointer">
    رویه ارسال سفارش
    </p>
    <p className="text-gray-700 hover:text-black cursor-pointer">  شیوه‌های پرداخت </p>
  </div>
  )
}
