import React from "react";
import { GoLocation } from "react-icons/go";
import ProductDropdown from "../productDropdown/productDropdown";

export default function Navbar() {
  return (
    <div className="flex flex-row justify-between pl-24 pr-28 pt-4 pb-2">
              <div className="flex flex-row gap-8">
                <p className="text-primaryDark text-lg cursor-pointer  hover:border-b-2 hover:border-primaryDark hover:transition-all">
                  خانه
                </p>
                <ProductDropdown/>
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
  )
}
