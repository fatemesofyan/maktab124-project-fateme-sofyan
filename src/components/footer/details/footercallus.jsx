import React from "react";
import { IoCall } from "react-icons/io5";
export default function Footercallus() {
  return (
    <div className="flex flex-col space-y-2">
      <p className="font-bold text-xl">  ارتباط با ما</p>
        <p className="font-bold">آدرس:</p>
        <p className="text-gray-700 hover:text-black cursor-pointer"> تهران، خیابان گیتا</p>
      <p className="font-bold"> اطلاعات تماس</p>
      <p className=" flex flex-row gap-2 text-gray-700 hover:text-black cursor-pointer"> <IoCall className="w-6 h-6 cursor-pointer"/>تلفن: 021-XXXXXXX</p>
      <p className=" flex flex-row gap-2 text-gray-700 hover:text-black cursor-pointer"> <IoCall className="w-6 h-6 cursor-pointer "/>تلفن: 021-XXXXXXX</p>
    </div>
  );
}
