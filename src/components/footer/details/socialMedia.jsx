import React from 'react'
import { FaTelegram } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";

export default function SocialMedia() {
  return (
    <div className='flex flex-col'>

        <p className="font-bold text-xl">همراه ما باشید!</p>
        <div className='flex flex-row gap-4 p-2'>
        <FaTelegram className='w-10 h-10  text-secondary hover:text-secondary/80  cursor-pointer' />
        <BsInstagram className='w-10 h-10 text-secondary hover:text-secondary/80 cursor-pointer'/>
        </div>
    </div> 
  )
}
