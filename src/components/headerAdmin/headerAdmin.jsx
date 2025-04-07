"use client"
import React from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RiHomeHeartLine } from "react-icons/ri";
import Logosite from "../logo/logosite";
import Inputsearch from "../headersite/headerdetalist/inputsearch";
import { useRouter } from "next/navigation";
import ROUTES from "../routes/routing";


export default function HeaderAdmin() {

    const router = useRouter();
    const handleHomesite = () => {
      router.push(ROUTES.HOME);
    };
  
  return (
    <div>
      <div className="w-full pt-2  flex flex-row items-center justify-around ">
        <Logosite/>
        <Inputsearch/>
        <div className="flex flex-row gap-4">
          <IoPersonCircleOutline className="w-10 h-10 text-primaryDark cursor-pointer" />
          <RiHomeHeartLine className="w-10 h-10 text-primaryDark cursor-pointer" onClick={handleHomesite} />
        </div>
      </div>
    </div>
  );
}
