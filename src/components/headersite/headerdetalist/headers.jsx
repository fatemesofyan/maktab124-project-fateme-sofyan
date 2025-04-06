import React from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { PiShoppingCartFill } from "react-icons/pi";
import Logosite from "@/components/logo/logosite";
import Inputsearch from "./inputsearch";

export default function Headers() {
  return (
    <div className="w-full pt-2 flex flex-row items-center justify-around ">
      <Logosite />
      <Inputsearch />
      <div className="flex flex-row gap-4">
        <IoPersonCircleOutline className="w-10 h-10 text-primaryDark cursor-pointer" />
        <PiShoppingCartFill className="w-10 h-10 text-primaryDark cursor-pointer" />
      </div>
    </div>
  );
}
