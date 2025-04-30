import React from "react";
import Footerlogo from "./details/footerlogo";
import Footercallus from "./details/footercallus";
import CustomerService from "./details/customerService";
import ShoppingGuide from "./details/shoppingGuide";
import SocialMedia from "./details/socialMedia";
import NewsClub from "./details/newsClub";

export default function Footersite() {
  return (
    
    <div className="bg-background w-full py-4  text-black">
      <Footerlogo />
      <footer className=" text-black py-10 px-6 ">
      <div className="container mx-auto flex flex-row justify-between items-center ">
          <Footercallus />
          <CustomerService />
          <ShoppingGuide/>
          <div className="flex flex-col">

          <SocialMedia/>
          <NewsClub/>
          </div>
        </div>
        <div className="border-t-2 border-black flex flex-row justify-center mt-20">
          <p className="pt-3">
            تمامی حقوق این سایت متعلق به گلخانه گیتا می باشد.
          </p>
        </div>
      </footer>
    </div>
  );
}
