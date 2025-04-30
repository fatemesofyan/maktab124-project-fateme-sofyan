import ButtonForm from "@/components/shared/button/buttonform";
import React from "react";

export default function NewsClub() {
  return (
    <div>
      <p className="font-bold mb-2 mt-3">
        با ثبت ایمیل، از جدید‌ترین تخفیف‌ها با‌خبر شوید
      </p>

      <div className="flex flex-row gap-3 items-center">
        <input
          type="email"
          placeholder="آدرس ایمیل شما"
          className="h-12 w-full px-4 rounded-lg text-primaryDark border border-accent focus:outline-none focus:border-secondary focus:border-2"
        />

        <ButtonForm
          
        >
          ثبت
        </ButtonForm>
      </div>
    </div>
  );
}
