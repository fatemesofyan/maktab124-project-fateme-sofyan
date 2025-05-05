"use client"

import Logosite from "@/components/shared/logo/logosite";
import { IoPersonCircleOutline } from "react-icons/io5";
import { PiShoppingCartFill } from "react-icons/pi";
import Inputsearch from "./inputsearch";
import { useRouter } from "next/navigation";
import ROUTES from "@/components/routes/routing";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Headers() {

  const [username, setUsername] = useState("");
  const router = useRouter();

    const productData = useSelector((state) => state.product);
    // const totalCount = productData.reduce((sum, item) => sum + item.count, 0);


    useEffect(() => {
      const savedUsername = localStorage.getItem("username");
      if (savedUsername) {
        setUsername(savedUsername);
      }
    }, []);

    const handleHome = () => {
      router.push(ROUTES.HOME);
    };

    const handlelogin = () => {
      router.push(ROUTES.LOGIN);
    };
    const handleCartpage = () => {
      router.push(ROUTES.CART);
    };
  return (
    <div className="w-full pt-2 flex flex-row items-center justify-around ">
      <button onClick={handleHome} >
      <Logosite />
      </button>
      <Inputsearch />
      <div className="flex flex-row gap-4">
      <div className="flex  items-center gap-2">
      {username && <span className="text-primaryDark ">{username}</span>}

      <IoPersonCircleOutline
        className="w-10 h-10 text-primaryDark cursor-pointer"
        onClick={handlelogin}
      />
    </div>
        <div className="flex items-center gap-2 p-2 rounded-xl relative">
        <div className="flex gap-1">
            <div className="bg-red-400 p-2 rounded-full w-5 h-5 text-white absolute top-3 translate-y-[-30%] items-center flex justify-center">
            { productData.length}
            </div>
          </div>
          <button onClick={handleCartpage}>

        <PiShoppingCartFill className="w-10 h-10 text-primaryDark cursor-pointer"  />
          </button>
        </div>
      </div>
    </div>
  );
}
