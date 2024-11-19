"use client"
import Navbar from "@/components/shared/Navbar";
import "./globals.css";
import HomeLayout from "@/components/Home/HomeLayout";
import { Suspense, useEffect } from "react";
import { usePathname } from "next/navigation";

 
// export const metadata = {
//   title: 'CodeQueryFire',
//   description: '...',
// }

export default function RootLayout({ children }) {
  // console.log(searchParams.get("category"))

  const route = usePathname()
  const showNavRoutes = ['/signup', '/login']
  const isShowNav =  showNavRoutes.some((path) => path === route)
  // const isShowNav = showNavRoutes.includes(route)

  // console.log(route, isShowNav)
  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  return (
    <html lang="en">
      <body>
        <Suspense>
        {
          !isShowNav && 
          <Navbar></Navbar>
        }
          <section className={`${!isShowNav && 'pt-[65px]'}`}>
            <HomeLayout>{children}</HomeLayout>
          </section>
        </Suspense>
      </body>
    </html>
  );
}
