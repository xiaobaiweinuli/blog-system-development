import { NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { cookies } from "next/headers"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const { payload } = await jwtVerify(token, JWT_SECRET)
    const user = payload as any

    // 获取用户的详细信息
    const userInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      githubUsername: user.githubUsername,
      isRepoOwner: user.isRepoOwner,
      permissions: user.permissions || [],
    }

    return NextResponse.json(userInfo)
  } catch (error) {
    console.error("Auth verification failed:", error)
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }
}
