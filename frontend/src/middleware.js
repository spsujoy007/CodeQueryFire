import { NextResponse } from "next/server";

export async function middleware(request) {
  const current_url = request.nextUrl.clone();
  console.log("Current URL:", current_url);

  const token = request.cookies.get('access_token');
  console.log("ACCESS TOKEN:", token?.value);

  if (!token?.value) {
    const searchParams = new URLSearchParams(current_url.search);
    const id = searchParams.get("id") || "";
    // return NextResponse.redirect(new URL(`/login?page=${current_url.pathname}&id=${id}`, request.url));
  }

  try {
    // Make fetch request with credentials
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/users/loggedin-profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token?.value}`,
      },
      credentials: "include"
    }).catch(error => {
      console.error("Fetch error:", error);
      return null;
    });

    if (!res || !res.ok) {
      const searchParams = new URLSearchParams(current_url.search);
      const id = searchParams.get("id") || "";
      // return NextResponse.redirect(new URL(`/login?page=${current_url.pathname}&id=${id}`, request.url));
    }

    // Proceed if response is successful
    return NextResponse.next();
  } catch (error) {
    console.error("Error fetching user data:", error);
    const searchParams = new URLSearchParams(current_url.search);
    const id = searchParams.get("id") || "";
    // return NextResponse.redirect(new URL(`/login?page=${current_url.pathname}&id=${id}`, request.url));
  }
}

export const config = {
  matcher: [
    '/profile', 
    '/post/makepost',
    '/post/:path*'
  ],
};
