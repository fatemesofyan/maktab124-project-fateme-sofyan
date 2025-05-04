import "./globals.css";
import Provider from "@/redux/provider";


export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body >
     

      <Provider>{children}</Provider>
      </body>
    </html>
  );
}
