import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// 暂时禁用中间件，只返回 NextResponse.next()
export function middleware(request: NextRequest) {
  // 直接放行所有请求
  return NextResponse.next()
}

// 限制中间件只在管理路由上运行
export const config = {
  matcher: [
    // 只匹配管理路由
    "/admin/:path*",
    "/setup/:path*",
  ],
}
