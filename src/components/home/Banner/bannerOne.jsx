import React from 'react';
import Image from "next/image";
import PLNTS from "@/assets/image/home/Banner.avif";
export default function BannerOne() {
  return (
    <div className="w-full h-auto  flex items-center justify-center relative overflow-hidden">
      {/* ویدئو با عرض کامل و ارتفاع ثابت */}
      {/* <video
        autoPlay
        loop
        muted
        className="w-full !h-[470px] object-cover"
      >
        <source src="/video/banner.mp4" type="video/mp4" />
        مرورگر شما از تگ ویدیو پشتیبانی نمی‌کند.
      </video> */}

 <Image
                 src={PLNTS}
                 alt="Banner"
                 width={1920} // عرض اصلی تصویر
                 height={1080} // ارتفاع اصلی تصویر
                 style={{ width: '100%', height: '470px', objectFit: 'cover' }}
                 
               />
      {/* لایه شیشه‌ای شفاف روی ویدئو */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* دکمه شفاف روی ویدئو */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-20 z-10">
        <p className='text-4xl text-white  '>به گلخانه گیتا  خوش آمدید</p>
        <button
          className="px-6 py-3 text-white text-lg font-semibold border border-white rounded-lg transition duration-300 ease-in-out hover:bg-white/20"
        >
          مشاهده فروشگاه
        </button>
      </div>
    </div>
  );
}