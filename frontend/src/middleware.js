import { NextResponse } from "next/server";

export async function middleware(request) {
  const current_url = request.nextUrl.clone();
  const cookies = request.headers.get("cookie") || ""; 
  const accessTokenMatch = cookies.match(/access_token=([^;]+)/);
  const accessToken = accessTokenMatch ? accessTokenMatch[1] : null;
  console.log("ACCESS TOKEN://////////////", accessToken)
  if(accessToken){
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/users/loggedin-profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`  // ✅ Manually pass cookies
      }
    });
    const data = await res.json()

    if (data.data?.email) {
      return NextResponse.next();
    }
    else {
      console.log("ERROR 2");
      const searchParams = new URLSearchParams(current_url.search);
      const id = searchParams.get("id") || "";
      return NextResponse.redirect(new URL(`/login?${current_url.pathname.includes("/profile") ? `page=${current_url.pathname}` : ""}${id ? `&id=${id}` : ""}`, current_url.origin));
    }
  }
  else{
    console.log("ERROR 3");
    const searchParams = new URLSearchParams(current_url.search);
    const id = searchParams.get("id") || "";
    return NextResponse.redirect(new URL(`/login?${current_url.pathname.includes("/profile") ? `page=${current_url.pathname}` : ""}${id ? `&id=${id}` : ""}`, current_url.origin));

  }
}

export const config = {
  matcher: [
    '/profile', 
    '/profile/:username*', 
    '/post/makepost',
    '/post/:path*'
  ],
};
