import React from "react";
import Image from "next/image";
import { IoPersonCircleOutline } from "react-icons/io5";
import { PiShoppingCartThin } from "react-icons/pi";
import { BiSearchAlt2 } from "react-icons/bi";
import { RiHomeHeartLine } from "react-icons/ri";
import Logo from "@/assets/image/logo/logo.png";
import Sidebar from "./asideBar/sidebar";

export default function HeaderAdmin() {
  return (
    <div>
<div className="w-full pt-2  flex flex-row items-center justify-around ">
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
              placeholder="جستجو"
              className="p-2 w-[500px] rounded-full border-2 border-[#e7e3d9] placeholder:text-primaryDark pl-10 pr-5 focus:outline-none"
            />
            <BiSearchAlt2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-primaryDark" />
          </div>

          <div className="flex flex-row gap-4">
            <IoPersonCircleOutline className="w-10 h-10 text-primaryDark" />
            <RiHomeHeartLine className="w-10 h-10 text-primaryDark"/>
          </div>
        </div>
    </div>
  )
}

