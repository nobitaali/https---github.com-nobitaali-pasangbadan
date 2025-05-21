// middleware.ts - Place this file in the root of your project
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get response and clone headers
  const response = NextResponse.next();
  
  // Add security headers
  const headers = response.headers;
  
  // Content Security Policy to prevent XSS attacks
  headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; img-src 'self' data: blob: https://*; font-src 'self' data:; connect-src 'self' https://*;"
  );
  
  // Strict Transport Security header
  headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );
  
  // Cross-Origin Opener Policy for better isolation
  headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  
  // X-Frame-Options to prevent clickjacking
  headers.set('X-Frame-Options', 'DENY');
  
  // X-Content-Type-Options to prevent MIME type sniffing
  headers.set('X-Content-Type-Options', 'nosniff');
  
  // Referrer-Policy
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions Policy
  headers.set(
    'Permissions-Policy', 
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );
  
  return response;
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};