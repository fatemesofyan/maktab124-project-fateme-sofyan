import Sidebar from "@/components/headerAdmin/asideBar/sidebar";
import "../globals.css";
import HeaderAdmin from "@/components/headerAdmin/headerAdmin";



export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" >
      <body >
        {/* Sidebar */}
        <Sidebar />

        {/* محتوای اصلی */}
        <main className="mr-64 p-6 min-h-screen">
          {/* Header ادمین */}
          <HeaderAdmin />

          {/* محتوا */}
          <div>{children}</div>
        </main>
      </body>
    </html>
  );
}