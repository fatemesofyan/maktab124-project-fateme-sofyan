"use client";
import { useRouter } from "next/navigation";
import { MdOutlinePerson } from "react-icons/md";
import { RiHomeHeartLine } from "react-icons/ri";
import Inputsearch from "../headersite/headerdetalist/inputsearch";
import ROUTES from "../routes/routing";
import Logosite from "../shared/logo/logosite";

export default function HeaderAdmin() {
  const router = useRouter();
  const handleHomesite = () => {
    router.push(ROUTES.HOME);
  };

  return (
    <div>
      <div className="w-full pt-2  flex flex-row items-center justify-around ">
        <Logosite />
        <Inputsearch />
        <div className="flex flex-row gap-4">
          <div className="flex flex-row justify-center items-center gap-2 text-primaryDark">
            <MdOutlinePerson className="w-10 h-10" />
            <p> فاطمه </p>
            {/* <PiHandWaving className="w-10 h-10"/> */}
          </div>
          <RiHomeHeartLine
            className="w-10 h-10 text-primaryDark cursor-pointer"
            onClick={handleHomesite}
          />
        </div>
      </div>
    </div>
  );
}
