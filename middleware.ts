import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const hostname = request.headers.get('host') || ''
  const rootDomain = 'bw-events.com'

  if (hostname.includes(`.${rootDomain}`)) {
    const subdomain = hostname.replace(`.${rootDomain}`, '')
    if (subdomain && subdomain !== 'www') {
      return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}