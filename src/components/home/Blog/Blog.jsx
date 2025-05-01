import Image from "next/image";

import blog_1 from "@/assets/image/blog/Step_3_540a06134b.avif";
import blog_2 from "@/assets/image/blog/Watering_7d6600f806.avif";
import blog_3 from "@/assets/image/blog/Houseplants_category_172980df8c.avif";
import { IoIosArrowRoundForward } from "react-icons/io";
import { PiArticleNyTimes } from "react-icons/pi";

export default function BlogHome() {
  return (
    <div className='mt-20'>
      <div className='flex flex-row  items-center gap-3 text-secondary cursor-pointer'>
          <IoIosArrowRoundForward className="w-10 h-10" />
          <p className="text-2xl"> بیشتر بخوانیم </p>
          <PiArticleNyTimes className="w-10 h-10 text-secondary hover:text-secondary/80 cursor-pointer" />
        </div>
      <div className="flex flex-row justify-around mt-8">
        <div className="rounded-lg w-[400px] overflow-visible">
          <Image
            src={blog_1}
            alt="bannargreen"
            width={200}
            height={370}
            className="w-full h-[370px] object-cover rounded-lg -mb-3"
          />

          <div className="border-2 border-gray-300 rounded-br-lg rounded-bl-lg p-4">
            <h3  className="text-lg pt-4">بهترین زمان برای تعویض گلدان گیاه...</h3>
            <div className="flex flex-col mt-3">
              <button className="flex flex-row-reverse items-center text-secondary gap-2 hover:scale-105 hover:font-bold transition-all duration-400 ease-in-out">
                ادامه مطلب
                <IoIosArrowRoundForward />
              </button>
            </div>
          </div>
        </div>
        <div className="rounded-lg w-[400px] overflow-visible">
          <Image
            src={blog_2}
            alt="bannargreen"
            width={200}
            height={370}
            className="w-full h-[370px] object-cover rounded-lg -mb-3"
          />

          <div className="border-2 border-gray-300 rounded-br-lg rounded-bl-lg p-4">
            <h3  className="text-lg pt-4">اشتباهات رایج آبیاری گیاهان آپارتمانی...</h3>
            <div className="flex flex-col mt-3">
              <button className="flex flex-row-reverse items-center  text-secondary gap-2 hover:scale-105 hover:font-bold transition-all duration-400 ease-in-out">
                ادامه مطلب
                <IoIosArrowRoundForward />
              </button>
            </div>
          </div>
        </div>
        <div className="rounded-lg w-[400px] overflow-visible">
          <Image
            src={blog_3}
            alt="bannargreen"
            width={200}
            height={370}
            className="w-full h-[370px] object-cover rounded-lg -mb-3"
          />

          <div className="border-2 border-gray-300 rounded-br-lg rounded-bl-lg p-4">
            <h3 className="text-lg pt-4"> آیا گیاهان آپارتمانی برای رفع استرس... </h3>
            <div className="flex flex-col mt-3">
              <button className="flex flex-row-reverse items-center  text-secondary gap-2 hover:scale-105 hover:font-bold transition-all duration-400 ease-in-out">
                ادامه مطلب
                <IoIosArrowRoundForward />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
