import { NextResponse } from "next/server";

export async function middleware(request) {
  const current_url = request.nextUrl.clone();

    try{
      const res = await fetch(`https://cqfbeserver.vercel.app/api/v1/users/loggedin-profile`, {
        method: 'GET',
        headers: {
          Cookie: request.headers.get("cookie") || "",  // ✅ Manually pass cookies
        },
      });
      const data = await res.json()
  
      if (data.statusCode === 401) {
        console.log("ERROR 2");
        const searchParams = new URLSearchParams(current_url.search);
        const id = searchParams.get("id") || "";
        return NextResponse.redirect(new URL(`/login?page=${current_url.pathname}&id=${id}`, current_url.origin));
      }
      else {
        return NextResponse.next();
      }
    }
    catch(e) {
      const searchParams = new URLSearchParams(current_url.search);
      const id = searchParams.get("id") || "";
      return NextResponse.redirect(new URL(`/login?page=${current_url.pathname}&id=${id}`, current_url.origin));
    }
}

export const config = {
  matcher: [
    '/profile', 
    '/post/makepost',
    '/post/:path*'
  ],
};
