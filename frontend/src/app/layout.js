import Navbar from "@/components/shared/Navbar";
import "./globals.css";
import HomeLayout from "@/components/Home/HomeLayout";

 
export const metadata = {
  title: 'CodeQueryFire',
  description: '...',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <HomeLayout>{children}</HomeLayout>
      </body>
    </html>
  );
}
