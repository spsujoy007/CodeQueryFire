import { NextResponse } from "next/server";

export async function middleware(request) {
  const current_url = request.nextUrl.clone();
  console.log("Current URL:", current_url.href);

  // const token = request.cookies.get('access_token')?.value;
  // console.log("ACCESS TOKEN:", token);

  // if (!token) {
  //   console.log("ERROR 1");
  //   const searchParams = new URLSearchParams(current_url.search);
  //   const id = searchParams.get("id") || "";
  //   return NextResponse.redirect(new URL(`/login?page=${current_url.pathname}&id=${id}`, current_url.origin));
  // }

  // try {
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/users/loggedin-profile`, {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': `Bearer ${token}`,
  //     },
  //     credentials: true
  //   });

  //   if (!res.ok) {
  //     console.log("ERROR 2");
  //     const searchParams = new URLSearchParams(current_url.search);
  //     const id = searchParams.get("id") || "";
  //     return NextResponse.redirect(new URL(`/login?page=${current_url.pathname}&id=${id}`, current_url.origin));
  //   }

  //   console.log("DATA: ", await res.json());
  //   return NextResponse.next();
  // } catch (error) {
  //   console.error("Error fetching user data:", error);
  //   const searchParams = new URLSearchParams(current_url.search);
  //   const id = searchParams.get("id") || "";
  //   return NextResponse.redirect(new URL(`/login?page=${current_url.pathname}&id=${id}`, current_url.origin));
  // }
}

export const config = {
  matcher: [
    '/profile', 
    '/post/makepost',
    '/post/:path*'
  ],
};
