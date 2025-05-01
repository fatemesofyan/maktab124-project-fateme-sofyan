import aboutimage1 from "@/assets/image/about/aboutimage1.avif";
import aboutimage2 from "@/assets/image/about/aboutimage2.avif";
import aboutimage3 from "@/assets/image/about/aboutimage3.avif";
import ButtonForm from "@/components/shared/button/buttonform";
import { CiCircleCheck } from "react-icons/ci";

import Image from "next/image";

export default function AboutUs() {
  return (
    <div>
      <div className="flex gap-[50px] py-[80px] px-[250px] ">
        <Image
          src={aboutimage1}
          alt="about"
          width={200}
          height={200}
          className="rounded-lg"
        />
        <div className="flex flex-col gap-[32px]">
          <h2 className="font-semibold text-[40px]">
            فروشگاه گیاهان آپارتمانی
            <br /> گیتا شاپ
          </h2>
          <p className="font-normal text-[18px] text-[#666666]">
          در گل و گیاه گیتا شاپ، ما گل‌ها و گیاهان ارگانیکی را به شما ارائه می‌دهیم که با دقت و توجه انتخاب شده‌اند. تیم ما متعهد است تا با ارائه گیاهان سالم، تازه و گل‌های زیبا، فضای شما را با طبیعت پر کند. شما می‌توانید با اطمینان کامل از محصولات ما استفاده کنید و از تجربه خریدی لذت‌بخش در گیتا شاپ بهره‌مند شوید. هر گلدان و هر شاخه گل ما نماد عشق به طبیعت و تعهد به کیفیت است.
          </p>
        </div>
      </div>
      <div>
        <div className="flex flex-row justify-center items-center gap-12 pr-[100px] bg-background h-[500px] p-10 mt-14 mb-14">
          <div className="flex flex-col gap-[32px]">
            <h2 className="font-semibold text-[40px]">فروشگاه گیتا</h2>
            <p className="font-normal text-[18px] text-[#666666]">
            در گل و گیاه گیتا شاپ، ما گل‌ها و گیاهان را با دقت و توجه به شما ارائه می‌دهیم که زیبایی طبیعت را در فضای شما زنده می‌کنند. تیم ما متعهد است تا با انتخاب گیاهان تازه، سالم ، تجربه‌ای منحصر به فرد از خرید و استفاده از محصولات طبیعی فراهم کند. شما می‌توانید با اطمینان کامل از گیاهان  ما استفاده کنید و از تجربه خریدی لذت‌بخش و الهام‌بخش در گیتا شاپ بهره‌مند شوید. هر محصول ما نمادی از عشق به طبیعت و تعهد به کیفیت و زیبایی است.
            </p>
          </div>

          <Image
            src={aboutimage2}
            alt="about"
            width={430}
            max-height={150}
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="flex gap-[50px] px-[250px]  py-[80px] ">
        <Image
          src={aboutimage3}
          alt="about"
          width={500}
          height={300}
          className="rounded-lg"
        />
        <div className="flex flex-col gap-[32px]">
          <h2 className="font-semibold text-[40px]">
            ما تحویل می‌دهیم،
            <br /> شما لذت می‌برید!
          </h2>
          <p className="font-normal text-[18px] text-[#666666]">
            اتصال راحت به شما این امکان را می‌دهد که تجربه خریدی بی‌دغدغه داشته
            باشید. تمامی مراحل جای‌گذاری محصولات با دقت انجام می‌شود و فرآیند
            تحویل به‌صورت ساده و سریع پیش می رود.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <CiCircleCheck className="text-secondary w-10 h-10" />
              <p className="font-normal text-[14px] text-[#666666]">
                در دل سختی‌ها پیش می‌رویم.
              </p>
            </div>
            <div className="flex gap-2">
              <CiCircleCheck className="text-secondary w-10 h-10" />
              <p className="font-normal text-[14px] text-[#666666]">
                به سمت آینده پیش می‌رویم، با زمان و نیازهای شما همگام می‌شویم.
              </p>
            </div>
            <div className="flex gap-2">
              <CiCircleCheck className="text-secondary w-10 h-10" />

              <p className="font-normal text-[14px] text-[#666666]">
                ما در تلاشیم تا بهترین و نوآورانه‌ترین محصولات را برای شما
                ارائه دهیم.
              </p>
            </div>
          </div>
          <ButtonForm>خرید کنید</ButtonForm>
        </div>
      </div>
    </div>
  );
}
