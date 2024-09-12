import Navbar from "@/components/shared/Navbar";
import "./globals.css";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Navbar></Navbar>
        {children}
      </body>
    </html>
  );
}
