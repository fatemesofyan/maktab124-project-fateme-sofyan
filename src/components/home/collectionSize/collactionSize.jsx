import React from "react";
import Image from "next/image";
import smallx4 from "@/assets/image/home/smallx4.webp";
import mediumx4 from "@/assets/image/home/mediumx4.webp";
import largex4 from "@/assets/image/home/largex4.webp";
import hugex4 from "@/assets/image/home/hugex4.webp";

export default function CollactionSize() {
  return (
    <div className="flex flex-col justify-center items-center content-center gap-10 mt-24">
      <div className="flex flex-col gap-8">
        <h2 className="text-4xl">موجود در هر اندازه</h2>
        <p className="text-sm">
          گیاهان ما را در گلدان ها و اندازه های مختلف کاوش کنید
        </p>
      </div>
      <div className="flex flex-row gap-20">
        <img
          src="https://res.cloudinary.com/easyplant/image/upload/f_auto,q_auto,c_fill,w_690,h_440/homepage2/collections/collectionsx4.jpg"
          alt="collectionsx4"
        />

        <div className="grid grid-cols-2 gap-10">
          <Image
            src={smallx4}
            alt="smallx4"
            width={200}
            height={200}
            className="rounded-lg object-cover"
          />
          <Image
            src={mediumx4}
            alt="mediumx4"
            width={200}
            height={200}
            className="rounded-lg object-cover"
          />
          <Image
            src={largex4}
            alt="largex4"
            width={200}
            height={200}
            className="rounded-lg object-cover"
          />

          <Image
            src={hugex4}
            alt="hugex4"
            width={200}
            height={200}
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}
