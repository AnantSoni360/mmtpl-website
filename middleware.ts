import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Global cache for basic rate limiting in Edge
const requestLog = new Map<string, number>();

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback_secret_key_change_in_production_123'
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Basic in-memory rate limiting for POST requests (10 reqs per minute per IP)
  // For production with multiple edge nodes, Redis or Arcjet is recommended.
  if (request.method === 'POST') {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    const windowStart = now - 60000;
    
    // Clean up old entries
    for (const [key, timestamp] of requestLog.entries()) {
      if (timestamp < windowStart) requestLog.delete(key);
    }
    
    const requestKey = `${ip}-${now}`;
    requestLog.set(requestKey, now);
    
    let requestCount = 0;
    for (const key of requestLog.keys()) {
      if (key.startsWith(ip)) requestCount++;
    }
    
    if (requestCount > 10) {
      return new NextResponse('Too Many Requests', { status: 429 });
    }
  }

  // Protect portal routes
  const isPortalRoute =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/employee') ||
    pathname.startsWith('/client') ||
    pathname.startsWith('/jobs');

  if (isPortalRoute) {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      const role = payload.role as string;

      const getPortalUrl = (r: string) => {
        if (r === 'ADMIN') return new URL('/admin', request.url);
        if (r === 'EMPLOYEE') return new URL('/employee', request.url);
        if (r === 'CLIENT') return new URL('/client', request.url);
        if (r === 'JOB_SEEKER') return new URL('/jobs', request.url);
        return new URL('/auth/login', request.url);
      };

      // Strict Role-based access control for routes
      if (pathname.startsWith('/admin') && role !== 'ADMIN') {
        return NextResponse.redirect(getPortalUrl(role));
      }
      if (pathname.startsWith('/employee') && role !== 'EMPLOYEE') {
        return NextResponse.redirect(getPortalUrl(role));
      }
      if (pathname.startsWith('/client') && role !== 'CLIENT') {
        return NextResponse.redirect(getPortalUrl(role));
      }
      if (pathname.startsWith('/jobs') && role !== 'JOB_SEEKER') {
        return NextResponse.redirect(getPortalUrl(role));
      }
      
    } catch (error) {
      // Invalid or expired token
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/employee/:path*', '/client/:path*', '/jobs/:path*'],
};
