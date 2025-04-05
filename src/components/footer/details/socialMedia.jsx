import React from 'react'
import { FaTelegram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { CiTwitter } from "react-icons/ci";
import { FaLinkedin } from "react-icons/fa";

export default function SocialMedia() {
  return (
    <div className='flex flex-col'>

        <p className="font-bold text-xl">همراه ما باشید!</p>
        <div className='flex flex-row gap-4 p-2'>
        <FaTelegram className='w-10 h-10' />
        <FaGithub className='w-10 h-10'/>
        <BsInstagram className='w-10 h-10'/>
        <CiTwitter className='w-10 h-10'/>
        <FaLinkedin className='w-10 h-10'/>
        </div>
    </div>
  )
}
