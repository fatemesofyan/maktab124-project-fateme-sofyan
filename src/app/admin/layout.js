import Sidebar from "@/components/headerAdmin/sideBar/sidebar";
import "../globals.css";
import HeaderAdmin from "@/components/headerAdmin/headerAdmin";

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Sidebar />
        <main className="mr-64 p-6 min-h-screen">
          <HeaderAdmin />
          <div>{children}</div>
        </main>
      </body>
    </html>
  );
}
