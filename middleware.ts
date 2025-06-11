import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// 需要认证的路由
const PROTECTED_ROUTES = ["/admin", "/setup"]

// 只有管理员可以访问的路由
const ADMIN_ONLY_ROUTES = ["/admin", "/setup"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 跳过不需要中间件处理的路径
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/public/") ||
    pathname.includes(".") ||
    pathname === "/auth/login" ||
    pathname === "/unauthorized"
  ) {
    return NextResponse.next()
  }

  // 检查是否为受保护的路由
  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route))

  // 如果不是受保护的路由，直接通过
  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // 对于受保护的路由，检查认证
  const token = request.cookies.get("auth_token")?.value

  if (!token) {
    // 未登录，重定向到登录页面
    const loginUrl = new URL("/auth/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  try {
    // 简单的 token 验证（这里可以根据需要调整）
    if (token && token.length > 10) {
      // Token 存在且看起来有效
      const isAdminOnlyRoute = ADMIN_ONLY_ROUTES.some((route) => pathname.startsWith(route))

      // 这里可以添加更复杂的权限检查
      // 暂时假设有 token 就有权限

      return NextResponse.next()
    } else {
      throw new Error("Invalid token")
    }
  } catch (error) {
    console.error("认证错误:", error)
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
     * 匹配所有请求路径，除了以下开头的路径：
     * - api (API 路由)
     * - _next/static (静态文件)
     * - _next/image (图片优化文件)
     * - favicon.ico (网站图标)
     * - public 文件夹
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}
