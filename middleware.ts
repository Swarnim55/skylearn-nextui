import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  const secret = process.env.NEXTAUTH_SECRET; // Replace with your secret value
  const token = await getToken({ req: request, secret });

  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = '/api/auth/signin';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/dashboard/:path*'],
};
