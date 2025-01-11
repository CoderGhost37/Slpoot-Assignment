import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  const token = request.cookies.get('authToken');

  if (token) {
    return NextResponse.redirect(new URL('/blogs', nextUrl.toString()));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/register'],
};
