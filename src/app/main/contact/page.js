import AsideContact from "@/components/home/contact/asideContact";
import ContactForm from "@/components/home/contact/contact";
import React from "react";

export default function page() {
  return (
    <div className="flex gap-[24px]  justify-center items-center  min-h-screen">
      <AsideContact />
      <ContactForm />
    </div>
  );
}
