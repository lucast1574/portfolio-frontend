import { NextResponse, type NextRequest } from 'next/server';
import { browserLanguage } from '@/lib/browser-language';
import { ORIGIN } from '@/lib/seo';

export function middleware(request: NextRequest) {
  const root = request.nextUrl.pathname === '/';
  if (root && browserLanguage(request.headers.get('accept-language')) === 'en') {
    // Next middleware can see the internal hostname behind a reverse proxy.
    const target = new URL(`/en${request.nextUrl.search}`, ORIGIN);
    const response = NextResponse.redirect(target, 307);
    response.headers.set('Cache-Control', 'private, no-store');
    response.headers.append('Vary', 'Accept-Language');
    return response;
  }
  const headers = new Headers(request.headers);
  headers.set('x-portfolio-locale', root ? 'es' : 'en');
  const response = NextResponse.next({ request: { headers } });
  if (root) response.headers.append('Vary', 'Accept-Language');
  return response;
}
export const config = { matcher: ['/', '/en'] };
