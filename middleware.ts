import { NextResponse } from 'next/server'
import { auth } from './lib/auth'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const session = await auth()
  const { pathname } = req.nextUrl

  // Protected routes that require authentication
  const protectedRoutes = ['/dashboard', '/projects', '/settings', '/billing']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // If trying to access protected route without session, redirect to signin
  if (isProtectedRoute && !session) {
    const signInUrl = new URL('/signin', req.url)
    signInUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(signInUrl)
  }

  // If logged in and trying to access signin/signup, redirect to dashboard
  if (session && (pathname === '/signin' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/projects/:path*',
    '/settings/:path*',
    '/billing/:path*',
    '/signin',
    '/signup'
  ]
}