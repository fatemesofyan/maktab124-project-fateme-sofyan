import Footersite from "@/components/footer/footersite";
import Headersite from "@/components/headersite/headersite";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Headersite />
      <div>
        home
      </div>
      <Footersite />
    </div>
  );
}
