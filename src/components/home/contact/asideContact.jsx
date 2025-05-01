import { CiLocationOn } from "react-icons/ci";
import { HiOutlineMail } from "react-icons/hi";
import { CiPhone } from "react-icons/ci";


export default function AsideContact() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg shadow-xl w-[312px] h-[507px]">
      <div className="p-[24px] flex flex-col items-center gap-4">
      <CiLocationOn className="w-16 h-16 text-secondary"/>
        <p className="text-center">استان تهران، خیابان گیتا   </p>
      </div>
      <div className="p-[24px] flex flex-col items-center gap-4">
      <HiOutlineMail className="w-16 h-16 text-secondary" />
        <div className="text-center">
          <p>gita.co@gmail.com</p>
          <p>gitaShop.co.help@gmail.com</p>
        </div>
      </div>
      <div className="p-[24px] flex flex-col items-center gap-4">
      <CiPhone  className="w-16 h-16 text-secondary"/>
        <div className="text-center">
          <p> ("3350-5288 (013)")</p>
          <p>("3350-6688 (013)") </p>
        </div>
      </div>
    </div>
  );
}
