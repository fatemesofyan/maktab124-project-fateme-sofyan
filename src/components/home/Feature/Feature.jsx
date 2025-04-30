import Image from "next/image";

import { LuPackage } from "react-icons/lu";
import { IoBagHandleOutline } from "react-icons/io5";
import { MdOutlineHeadsetMic } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";

export default function Feature() {
  return (
    <div className="bg-background w-full  shadow-lg mt-32 flex flex-row justify-around p-8 ">
      <div className="flex flex-row justify-center items-center gap-5 cursor-pointer">
      <TbTruckDelivery  className="w-16 h-16 text-primaryDark cursor-pointer" />
        <div className="flex flex-col">
          <h3 className="text-xl">ارسال رایگان</h3>
          <p className="text-[12px] text-gray-500 ">
            ارسال رایگان برای تمام سفارشات{" "}
          </p>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-5 cursor-pointer">
      <MdOutlineHeadsetMic className="w-16 h-16 text-primaryDark cursor-pointer" />
        <div className="flex flex-col">
          <h3 className="text-xl">پشتیبانی مشتری</h3>
          <p className="text-[12px] text-gray-500 "> دسترسی فوری به پشتیبانی</p>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-5 cursor-pointer">
      <IoBagHandleOutline className="w-16 h-16 text-primaryDark cursor-pointer" />
        <div className="flex flex-col">
          <h3 className="text-xl">پرداخت 100% ایمن </h3>
          <p className="text-[12px] text-gray-500 "> پول شما پس انداز می شود</p>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-5 cursor-pointer">
      <LuPackage className="w-16 h-16 text-primaryDark cursor-pointer"/>
        <div className="flex flex-col">
          <h3 className="text-xl">ضمانت بازگشت وجه</h3>
          <p className="text-[12px] text-gray-500"> 30 روز ضمانت بازگشت وجه</p>
        </div>
      </div>
    </div>
  );
}
