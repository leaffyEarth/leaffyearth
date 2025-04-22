import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { decode } from "punycode";

interface JwtPayload {
  exp: number;
  [key: string]: any;
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  if (!token) {
    if (pathname.startsWith("/auth/login")) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    console.log("i was called");
    
    const decoded: JwtPayload = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
      // Token expired
      console.log("Token expired");
      if (!pathname.startsWith("/auth/login")) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
    } else {
      // Already logged in — don't allow going to login page
      if (pathname === "/auth/login" || pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/auth/login"],
};
