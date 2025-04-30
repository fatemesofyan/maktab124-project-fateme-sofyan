import React from 'react'
import Image from "next/image";
import { AiOutlineProduct } from "react-icons/ai";
import { IoIosArrowRoundForward } from "react-icons/io";
import shoping1 from "@/assets/image/shopping/Basic_c24df1019a.avif";
import shoping2 from "@/assets/image/shopping/Medium_plants_f098d83daf.avif";
import shoping3 from "@/assets/image/shopping/Philodendron_feb418a399.avif";
import shoping4 from "@/assets/image/shopping/Rare_plants_aa31325f6c.avif";


export default function Products() {
  return (
    <div>
          <div className='mt-20'>
                <div className='flex flex-row  items-center gap-3 text-secondary cursor-pointer'>
                <IoIosArrowRoundForward  className='w-10 h-10'/>
                    <h3 className='text-2xl'> محصولات  </h3>
                    <AiOutlineProduct  className='w-10 h-10 text-secondary hover:text-secondary/80 cursor-pointer'/>
                </div>
                <div className='flex flex-row justify-center gap-5 mt-10'>
  <Image
            src={shoping1}
            alt="smallx4"
            width={300}
            height={400}
            className="rounded-lg object-cover"
          />
            <Image
            src={shoping2}
            alt="smallx4"
            width={300}
            height={400}
            className="rounded-lg object-cover"
          />
            <Image
            src={shoping3}
            alt="smallx4"
            width={300}
            height={400}
            className="rounded-lg object-cover"
          />
            <Image
            src={shoping4}
            alt="smallx4"
            width={300}
            height={400}
            className="rounded-lg object-cover"
          />
                </div>
            </div>
    </div>
  )
}
