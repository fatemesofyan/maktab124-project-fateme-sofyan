import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Instagram_photo_1 from "@/assets/image/community/Instagram_photo_1_54e9761800.avif";
import Instagram_photo_2 from "@/assets/image/community/Instagram_photo_2_5c838cc70d.avif";
import Instagram_photo_3 from "@/assets/image/community/Instagram_photo_3_c12825d620.avif";
import Instagram_photo_4 from "@/assets/image/community/Instagram_photo_4_2f10e04901.avif";
import Instagram_photo_5 from "@/assets/image/community/Instagram_photo_5_8f6d628452.avif";
import Instagram_photo_6 from "@/assets/image/community/Instagram_photo_6_5a64928cac.avif";
import Instagram_photo_7 from "@/assets/image/community/Instagram_photo_7_581ff2558c.avif";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";

export default function SwiperCommunity() {
  return (
    <>
      <Swiper
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{
          type: "bullets", 
          clickable: true, 
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        initialSlide={1} 
        className="mySwiper"
      >
        <SwiperSlide>
          <Image
            src={Instagram_photo_1}
            alt="hugex4"
            width={324}
            height={340}
            className="rounded-lg object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={Instagram_photo_2}
            alt="hugex4"
            width={324}
            height={340}
            className="rounded-lg object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={Instagram_photo_3}
            alt="hugex4"
            width={324}
            height={340}
            className="rounded-lg object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={Instagram_photo_4}
            alt="hugex4"
            width={324}
            height={340}
            className="rounded-lg object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={Instagram_photo_5}
            alt="hugex4"
            width={324}
            height={340}
            className="rounded-lg object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={Instagram_photo_6}
            alt="hugex4"
            width={324}
            height={340}
            className="rounded-lg object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={Instagram_photo_7}
            alt="hugex4"
            width={324}
            height={340}
            className="rounded-lg object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
