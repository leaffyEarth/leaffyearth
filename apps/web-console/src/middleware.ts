// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always let NextAuth's own API routes through
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Try to get a valid JWT from the cookie
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Public pages - allow access regardless of auth status
  if (pathname === "/login" || pathname === "/signup") {
    return NextResponse.next();
  }

  // Everything else is private — force to /login if no token
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Protect everything except:
     * - the NextAuth API
     * - static files
     * - favicon
     */
    "/((?!_next/static|_next/image|favicon.ico|api/auth).*)",
  ],
};
