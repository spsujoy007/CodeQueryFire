import { NextResponse } from "next/server";
import ServerUrl from "./Hooks/useServerUrl";

export async function middleware(request) {

  const token = request.cookies.get('access_token');
  if (!token?.value) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Make fetch request with credentials
    const res = await fetch(`http://localhost:5000/api/v1/users/loggedin-profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token?.value}`,
      }
    });

    if (!res.ok) {
      console.log("Error:", res.statusText);
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Proceed if response is successful
    const userData = await res.json();
    console.log("User data: ", userData);

    // Optionally, you can pass data to the response if needed
    return NextResponse.next();
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/profile'],
};
