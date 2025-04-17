import Footersite from "@/components/footer/footersite";
import Headersite from "@/components/headersite/headersite";
import HomePage from "@/components/homePage/HomePage";


export default function Home() {
  return (
    <div>
      <Headersite />
      <div>
      <HomePage/>
      </div>
      <Footersite />
    </div>
  );
}
