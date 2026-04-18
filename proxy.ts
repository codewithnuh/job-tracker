import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const { pathname, searchParams } = request.nextUrl

  // 1. Check if the user is trying to access a protected route
  const isProtectedRoute = pathname.startsWith("/dashboard")

  // 2. If it's a protected route and there's no token, redirect to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("from", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // 3. If they have a token and try to go to login/register, send them to dashboard
  // BUT: only if they aren't coming from a protected route redirect (which implies an invalid token)
  const isAuthRoute = pathname === "/login" || pathname === "/register"
  const from = searchParams.get("from")

  if (isAuthRoute && token && !from) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  // Only run middleware on dashboard and auth routes to save performance
  matcher: ["/dashboard/:path*", "/login", "/register"],
}
