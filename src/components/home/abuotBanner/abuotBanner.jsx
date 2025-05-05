import ButtonForm from '@/components/shared/button/buttonform'
import React from 'react'
import Image from "next/image";
import PLNTS from "@/assets/image/home/PLNTS_for_life_background_67f551596d.avif";

export default function AboutBanner() {
  return (
    <div className='bg-background mt-20 h-[500px] flex flex-row justify-between pl-28 pr-28'>
      <div className='flex flex-col justify-center  gap-10'>
        <h3 className='text-4xl font-bold '>
        گیتا شاپ
        </h3>
        <p className='break-words max-w-[500px]'>
        ما در گیتا شاپ ، باور داریم که هر خانه، می‌تواند یک باغ کوچک باشد. ما کنار شما هستیم تا زیباترین گیاهان را به فضای زندگی‌تان دعوت کنید.
        </p>
      
      </div>
      <div className='flex justify-center items-center rounded-lg'>
      <video
        autoPlay
        loop
        muted
        className="w-[450px] h-[450px] object-cover rounded-lg"
      >
        <source src="/video/live-longer.webm" type="video/mp4" />
        مرورگر شما از تگ ویدیو پشتیبانی نمی‌کند.
      </video>
 {/* <Image
                 src={PLNTS}
                 alt="smallx4"
                 width={600}
                 height={600}
                 className="rounded-lg object-cover"
               /> */}
      </div>

    </div>
  )
}
