"use client"
import Navbar from "@/components/shared/Navbar";
import "./globals.css";
import HomeLayout from "@/components/Home/HomeLayout";
import { usePathname } from "next/navigation";

 
// export const metadata = {
//   title: 'CodeQueryFire',
//   description: '...',
// }

export default function RootLayout({ children }) {

  const route = usePathname()
  const showNavRoutes = ['/signup', '/login']
  const isShowNav =  showNavRoutes.some((path) => path === route)
  // const isShowNav = showNavRoutes.includes(route)

  // console.log(route, isShowNav)

  return (
    <html lang="en">
      <body className={`antialiased`}>
        {
          !isShowNav && 
          <Navbar></Navbar>
        }
        <HomeLayout>{children}</HomeLayout>
      </body>
    </html>
  );
}
