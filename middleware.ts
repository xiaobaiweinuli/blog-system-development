import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

// 需要认证的路由
const PROTECTED_ROUTES = ["/admin", "/setup"]

// 只有管理员可以访问的路由
const ADMIN_ONLY_ROUTES = ["/admin", "/setup"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 检查是否为受保护的路由
  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route))
  const isAdminOnlyRoute = ADMIN_ONLY_ROUTES.some((route) => pathname.startsWith(route))

  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // 获取认证 token
  const token = request.cookies.get("auth_token")?.value

  if (!token) {
    // 未登录，重定向到登录页面
    const loginUrl = new URL("/auth/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  try {
    // 验证 JWT token
    const { payload } = await jwtVerify(token, JWT_SECRET)
    const user = payload as any

    // 检查管理员权限
    if (isAdminOnlyRoute && user.role !== "admin") {
      // 非管理员访问管理员页面，重定向到无权限页面
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }

    // 在请求头中添加用户信息
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("x-user-id", user.id)
    requestHeaders.set("x-user-role", user.role)
    requestHeaders.set("x-user-email", user.email)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  } catch (error) {
    // Token 无效，重定向到登录页面
    const loginUrl = new URL("/auth/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    const response = NextResponse.redirect(loginUrl)
    response.cookies.delete("auth_token")
    return response
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (authentication endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)",
  ],
}
