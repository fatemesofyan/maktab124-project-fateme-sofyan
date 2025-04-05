import React from "react";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { BiSolidPhoneCall } from "react-icons/bi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { PiShoppingCartThin } from "react-icons/pi";
import { GoLocation } from "react-icons/go";
import { BiSearchAlt2 } from "react-icons/bi";
import Logo from "@/assets/image/logo/logo.png";
import ProductDropdown from "./productDropdown/productDropdown";

export default function Header() {
  return (
    <div>
      <div className="w-full h-[45px] bg-surface flex flex-row justify-between items-center content-center pl-28 pr-28">
        <p className="text-primaryDark flex flex-row gap-3">
          به گلخانه گیتا خوش آمدید
          <span>
            <FaRegHeart className="w-6 h-6" />
          </span>
        </p>
        <div className="bg-secondary w-8 h-8 rounded-full text-white flex justify-center items-center content-center animate-bounce ">
          <BiSolidPhoneCall className="w-6 h-6 " />
        </div>
      </div>
      <div className="w-full pt-2 bg-background ">
        <div className="w-full pt-2 bg-background flex flex-row items-center justify-around ">
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
          <div className="flex flex-row relative">
            <input
              type="text"
              placeholder="به دنبال چه چیزی میگردید؟"
              className="p-2 w-[500px] rounded-full border-2 border-[#e7e3d9] placeholder:text-primaryDark pl-10 pr-5 focus:outline-none"
            />
            <BiSearchAlt2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-primaryDark" />
          </div>

          <div className="flex flex-row gap-4">
            <IoPersonCircleOutline className="w-10 h-10 text-primaryDark" />
            <PiShoppingCartThin className="w-10 h-10 text-primaryDark" />
          </div>
        </div>
        <div className="flex flex-row justify-between pl-24 pr-28 pt-4 pb-2">
          <div className="flex flex-row gap-8">
            <p className="text-primaryDark text-lg cursor-pointer  hover:border-b-2 hover:border-primaryDark hover:transition-all">
              خانه
            </p>
            <ProductDropdown />
            <p className="text-primaryDark text-lg cursor-pointer  hover:border-b-2 hover:border-primaryDark hover:transition-all">
              وبلاگ
            </p>
            <p className="text-primaryDark text-lg cursor-pointer  hover:border-b-2 hover:border-primaryDark hover:transition-all">
              درباره ما
            </p>
            <p className="text-primaryDark text-lg cursor-pointer  hover:border-b-2 hover:border-primaryDark hover:transition-all">
              تماس با ما
            </p>
          </div>
          <div className="flex flex-row items-center gap-3">
            <GoLocation className="w-6 h-6 text-primaryDark" />
            <p className="text-primaryDark flex flex-row gap-3">
              ارسال به تهران
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
