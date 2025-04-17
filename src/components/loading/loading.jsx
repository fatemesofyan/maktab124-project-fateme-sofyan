import React from 'react'
import Image from 'next/image';
import loading from '@/assets/loading/loading.gif'; 

export default function Loading() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="flex flex-col items-center justify-center text-primaryDark">
            <Image
              src={loading}
              alt="Loading"
              width={70}
              height={70}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
  )
}
