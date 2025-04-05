import "./globals.css";
import Header from "@/components/header/header";


export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body >
        {children}
      </body>
    </html>
  );
}
