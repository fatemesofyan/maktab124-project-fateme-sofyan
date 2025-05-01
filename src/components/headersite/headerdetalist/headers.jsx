"use client"

import Logosite from "@/components/shared/logo/logosite";
import { IoPersonCircleOutline } from "react-icons/io5";
import { PiShoppingCartFill } from "react-icons/pi";
import Inputsearch from "./inputsearch";
import { useRouter } from "next/navigation";
import ROUTES from "@/components/routes/routing";

export default function Headers() {

  const router = useRouter();
  
    const handleHome = () => {
      router.push(ROUTES.HOME);
    };

    const handlelogin = () => {
      router.push(ROUTES.LOGIN);
    };

  return (
    <div className="w-full pt-2 flex flex-row items-center justify-around ">
      <button onClick={handleHome} >
      <Logosite />
      </button>
      <Inputsearch />
      <div className="flex flex-row gap-4">
        <IoPersonCircleOutline className="w-10 h-10 text-primaryDark cursor-pointer" onClick={handlelogin}/>
        <PiShoppingCartFill className="w-10 h-10 text-primaryDark cursor-pointer" />
      </div>
    </div>
  );
}
