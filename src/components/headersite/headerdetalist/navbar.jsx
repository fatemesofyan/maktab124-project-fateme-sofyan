"use client";

import React from "react";
import { GoLocation } from "react-icons/go";
import ProductDropdown from "../productDropdown/productDropdown";
import WeblogDropdown from "../blogDropdown/blogDropdown";
import { useRouter } from "next/navigation";
import ROUTES from "@/components/routes/routing";

export default function Navbar() {
  const router = useRouter();



  const handleAboutUs = () => {
    router.push(ROUTES.ABOUT);
  };
  const handlecontaxt = () => {
    router.push(ROUTES.CONTACT);
  };
  const handleHomeSite = () => {
    router.push(ROUTES.HOME);
  };

  return (
    <div className="flex flex-row justify-between pl-24 pr-28 pt-4 pb-2">
      <div className="flex flex-row gap-8">
        <p
          className="text-primaryDark text-lg cursor-pointer  hover:border-b-2 hover:border-primaryDark hover:transition-all"
          onClick={handleHomeSite}
        >
          خانه
        </p>
        
        {/* <button onClick={handleProduct}>
          <ProductDropdown />
        </button> */}

        <ProductDropdown />

        <WeblogDropdown />
        <p className="text-primaryDark text-lg cursor-pointer  hover:border-b-2 hover:border-primaryDark hover:transition-all" onClick={handleAboutUs}>
          درباره ما
        </p>
        <p className="text-primaryDark text-lg cursor-pointer  hover:border-b-2 hover:border-primaryDark hover:transition-all" onClick={handlecontaxt}>
          تماس با ما
        </p>
      </div>
      <div className="flex flex-row items-center gap-3">
        <GoLocation className="w-6 h-6 text-primaryDark" />
        <p className="text-primaryDark flex flex-row gap-3">ارسال به تهران</p>
      </div>
    </div>
  );
}
