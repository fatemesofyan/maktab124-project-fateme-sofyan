import ButtonForm from '@/components/shared/button/buttonform'
import React from 'react'
import Image from "next/image";
import PLNTS from "@/assets/image/home/PLNTS_for_life_background_67f551596d.avif";

export default function BannerCollectionOne() {
  return (
    <div className='bg-background mt-20 h-[500px] flex flex-row justify-between pl-20 pr-20'>
      <div className='flex flex-col justify-center items-center gap-10'>
        <h3 className='text-4xl font-bold '>
           دستچین شده گیاهان ممتاز
        </h3>
        <p className='break-words max-w-[297px]'>ما فقط سالم ترین ها را با دقت انتخاب می کنیم گیاهان زیبا برای ارسال از گلخانه ما
        </p>
        <ButtonForm type="button" >
        فروشگاه
      </ButtonForm>
      </div>
      <div className='flex justify-center items-center rounded-lg'>
      {/* <video
        autoPlay
        loop
        muted
        className="w-[600px] h-[400px] object-cover rounded-lg"
      >
        <source src="/video/homepage-video.webm" type="video/mp4" />
        مرورگر شما از تگ ویدیو پشتیبانی نمی‌کند.
      </video> */}
 <Image
                 src={PLNTS}
                 alt="smallx4"
                 width={600}
                 height={600}
                 className="rounded-lg object-cover"
               />
      </div>

    </div>
  )
}
