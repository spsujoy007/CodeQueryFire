import { NextResponse } from "next/server";

export async function middleware(request) {
  const current_url = request.nextUrl.clone();

    // const res = await fetch(`http://localhost:5000/api/v1/users/loggedin-profile`, {
    //   method: 'GET',
    //   headers: {
    //     Cookie: request.headers.get("cookie") || "",  // ✅ Manually pass cookies
    //   },
    //   credentials: "include"
    // });
    // const data = await res.json()
    // console.log(data?.data?.email)

    // if (data.data?.email) {
    //   return NextResponse.next();
    // }
    // else {
    //   console.log("ERROR 2");
    //   const searchParams = new URLSearchParams(current_url.search);
    //   const id = searchParams.get("id") || "";
    //   return NextResponse.redirect(new URL(`/login?page=${current_url.pathname}${id && `&id=${id}`}`, current_url.origin));
    // }
}

export const config = {
  matcher: [
    '/profile', 
    '/post/makepost',
    '/post/:path*'
  ],
};
