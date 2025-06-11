import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// 简单的中间件，不做任何拦截
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

// 空匹配器，不匹配任何路径
export const config = {
  matcher: [],
}
