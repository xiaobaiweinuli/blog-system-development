import { type NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "fallback-secret-key")

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ error: "未认证" }, { status: 401 })
    }

    // 验证 JWT token
    const { payload } = await jwtVerify(token, JWT_SECRET)
    const user = payload as any

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      role: user.role || "user",
    })
  } catch (error) {
    console.error("认证验证失败:", error)
    return NextResponse.json({ error: "认证失败" }, { status: 401 })
  }
}
