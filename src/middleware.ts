import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the referer header
  const referer = request.headers.get('referer');
  
  // Check if the request is for an image
  if (request.nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
    // If there's no referer (direct access) or the referer is not from our domain
    if (!referer || !referer.includes(request.headers.get('host') || '')) {
      // Return a 403 Forbidden response
      return new NextResponse(null, { status: 403 });
    }

    // Add security headers
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');
    response.headers.set('Content-Security-Policy', "img-src 'self' data: blob:; default-src 'self';");
    
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all image files
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 