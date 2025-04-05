import React from "react";
import Image from "next/image";
import Logo from "@/assets/image/logo/logo.png";

export default function Footerlogo() {
  return (
    <div className=" flex flex-col pr-16">
      <div className="flex flex-row items-center gap-2 ">
        <p className="text-secondary !pt-0">گیتا شاپ</p>
        <Image
          src={Logo}
          alt="logo"
          width={70}
          height={70}
          className="rounded-lg object-cover"
        />
      </div>
      <p className="text-xs">۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم</p>
    </div>
  );
}
