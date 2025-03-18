// app/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { api } from './services/api';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/dashboard')) {
    const token = req.cookies.get('token');

    if (!token) {
      try {
        const response = await api.get('/auth/me');
      } catch (err: any) {
        console.log("error in the request")
        // return NextResponse.redirect(new URL('/auth/login', req.url));
      }

    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};