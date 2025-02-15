import { NextResponse } from "next/server";
import ServerUrl from "./Hooks/useServerUrl";

export async function middleware(request) {
  const current_url = request.nextUrl.clone();
  console.log("URL:: ", current_url)
  const response = NextResponse.next()
  response.cookies.set('history_url', current_url.pathname, {
    httpOnly: true, // Optional: to make it accessible via JavaScript on the client-side
    secure: false, // Only set secure cookies in production
    maxAge: 60 * 60 * 24 * 7, // Set cookie expiration (1 week here)
    path: '/', // Path where the cookie will be available
  });
  
  const token = request.cookies.get('access_token');
  if (!token?.value) {
    return NextResponse.redirect(new URL(`/login?page=${current_url.pathname}${current_url?.search}`, request.url));
  }
  
  try {
    // Make fetch request with credentials
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/users/loggedin-profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token?.value}`,
      }
    });
    
    if (!res.ok) {
      return NextResponse.redirect(new URL(`/login?page=${current_url.pathname}${current_url?.search}`, request.url));
    }
    
    // Proceed if response is successful
    const userData = await res.json();
    
    // Optionally, you can pass data to the response if needed
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.redirect(new URL(`/login?page=${current_url.pathname}&id=${current_url?.search.split("?id=")[1]}`, request.url));
  }
}

export const config = {
  matcher: [
    '/profile', 
    '/post/makepost',
    '/post/:path*'
  ],
};
