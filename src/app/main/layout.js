import Headersite from "@/components/headersite/headersite";
import "../globals.css";
import Footersite from "@/components/footer/footersite";



export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
            <body >
      <Headersite/>
            <div className="flex-grow">{children}</div>
      {/* <Footersite/> */}
      </body>
    </html>
  );
}