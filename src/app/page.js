import Footersite from "@/components/footer/footersite";
import Headersite from "@/components/headersite/headersite";
// import BannerVideo from "@/components/home/BannerVideo/bannerVideo";
import HomePage from "@/components/homePage/HomePage";


export default function Home() {
  return (
    <div>
      <Headersite />
      <div>
        {/* <div className="pt-10" >
        <BannerVideo/>
        </div> */}
      <HomePage/>
      </div>
      <Footersite />
    </div>
  );
}
