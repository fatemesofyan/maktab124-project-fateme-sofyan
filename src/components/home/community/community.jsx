import React from 'react'
import SwiperCommunity from './Swiper'
import { BsInstagram } from "react-icons/bs";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function Community() {
  return (
    <div className='mt-20'>
        <div className='flex flex-row  items-center gap-3 text-secondary cursor-pointer'>
        <IoIosArrowRoundForward  className='w-10 h-10'/>
            <p className="text-2xl">مارا دنبال کنید </p>
            <BsInstagram className='w-10 h-10 text-secondary hover:text-secondary/80 cursor-pointer'/>
        </div>
        <SwiperCommunity/>
    </div>
  )
}
