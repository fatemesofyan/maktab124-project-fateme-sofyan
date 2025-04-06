import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";


export default function Inputsearch() {
  return (
    <div className="flex flex-row relative">
      <input
        type="text"
        placeholder="جستجو"
        className="p-2 w-[500px] rounded-full border-2 border-[#e7e3d9] placeholder:text-primaryDark pl-10 pr-5 focus:outline-none"
      />
      <BiSearchAlt2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-primaryDark cursor-pointer" />
    </div>
  );
}
