import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { BiSolidPhoneCall } from "react-icons/bi";

export default function Welcome() {
  return (
      <div className="w-full h-[45px] bg-background flex flex-row justify-between items-center content-center pl-28 pr-28">
            <p className="text-primaryDark flex flex-row gap-3">
              به گلخانه گیتا خوش آمدید
              <span>
                <FaRegHeart className="w-6 h-6" />
              </span>
            </p>
            <div className="bg-secondary w-8 h-8 rounded-full text-white flex justify-center items-center content-center animate-bounce ">
              <BiSolidPhoneCall className="w-6 h-6  cursor-pointer" />
            </div>
          </div>
  )
}
