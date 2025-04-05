// import Header from "@/components/headerMain/header";

import Header from "@/components/headerMain/header";
import "../globals.css";
import Footersite from "@/components/footer/footersite";



export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
            <body >
      <Header/>
            <div className="flex-grow">{children}</div>
      <Footersite/>
      </body>
    </html>
  );
}