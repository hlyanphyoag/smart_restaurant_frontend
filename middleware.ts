import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

interface UserWithRole {
  role: string;
}

interface TokenWithUser {
  user?: UserWithRole;
}

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET }) as TokenWithUser;

  if (!token) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  const pathname = req.nextUrl.pathname;
  const role = token?.user?.role;

  switch (role) {
    case 'CUSTOMER':
      if (pathname !== '/') {
        return NextResponse.redirect(new URL('/', req.url));
      }
      break;
    case 'ADMIN':
      if (!pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
      break;
    case 'CASHIER':
      if (!pathname.startsWith('/cashier')) {
        return NextResponse.redirect(new URL('/cashier', req.url));
      }
      break;
    case 'KITCHEN':
      if (!pathname.startsWith('/kitchen')) {
        return NextResponse.redirect(new URL('/kitchen', req.url));
      }
      break;
    case 'STOCKHOLDER':
      if (!pathname.startsWith('/stockholder')) {
        return NextResponse.redirect(new URL('/stockholder', req.url));
      }
      break;
  }

  return NextResponse.next();
}

export const config = {
    matcher: [
      '/',         
      '/admin/:path*',
      '/cashier/:path*',
      '/kitchen/:path*',
      '/stockholder/:path*',
      '/redirect', 
    ]
}