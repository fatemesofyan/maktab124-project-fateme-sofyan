import React from 'react'
import Image from "next/image";
import Logo from "@/assets/image/logo/logo.png";


export default function Logosite() {
  return (
   <div className="flex flex-row items-center gap-2  cursor-pointer relative  duration-100 ease-in-out hover:scale-110 ">
               <p className="text-secondary !pt-0">گیتا شاپ</p>
   
               <Image
                 src={Logo}
                 alt="logo"
                 width={70}
                 height={70}
                 className="rounded-lg object-cover"
               />
             </div>
  )
}
