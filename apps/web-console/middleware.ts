import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // ✅ Allow public access to the login page
  if (!token) {
    if (pathname.startsWith('/auth/login')) {
      return NextResponse.next(); // ✅ Allow users to access login page freely
    }
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_BASE_URL}/auth/me`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to authenticate");
    }

    // ✅ Prevent redirecting an already authenticated user back to login
    if (pathname === '/auth/login') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  } catch (err) {
    console.error("Authentication error:", err);

    // ✅ Prevent redirect loop by only redirecting if not already on /auth/login
    if (!pathname.startsWith('/auth/login')) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/auth/login"],
};