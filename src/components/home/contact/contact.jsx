import ButtonForm from "@/components/shared/button/buttonform";

export default function ContactForm() {
  return (
    <div className="shadow-xl rounded-lg w-[984px] h-[507px] p-[50px]">
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-2xl">سلام</p>
        <p className="font-normal text-lg text-[#808080]">
          سوالی درباره فروشگاه ما و یا گیاهان ما دارید؟آیا به مشاوره برای خرید
          نیاز دارید؟ با ما در تماس باشید، خوشحال می‌شویم راهنمایی‌تان کنیم.
        </p>
      </div>

      <div className="flex flex-col gap-4 my-5">
        <div className="flex gap-5">
          <input
            type="text"
            placeholder="ایمیل"
            className="   w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input
            type="text"
            placeholder="موضوع"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
        <input
          type="text"
          placeholder="نظرات خود را بنویسید"
          className="border border-gray-300 rounded-md px-4 py-2 w-full h-32 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <ButtonForm>ارسال پیام</ButtonForm>
    </div>
  );
}
