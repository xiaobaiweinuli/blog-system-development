import { type NextRequest, NextResponse } from "next/server"
import { SignJWT } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const state = searchParams.get("state") // 重定向 URL
  const error = searchParams.get("error")

  console.log("GitHub OAuth 回调接收:", { code: !!code, state, error })

  // 处理 OAuth 错误
  if (error) {
    console.error("GitHub OAuth 错误:", error)
    return NextResponse.redirect(new URL(`/auth/login?error=${error}`, request.url))
  }

  if (!code) {
    console.error("未收到授权码")
    return NextResponse.redirect(new URL("/auth/login?error=no_code", request.url))
  }

  try {
    console.log("正在交换授权码获取访问令牌...")

    // 检查必需的环境变量
    if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
      throw new Error("缺少 GitHub OAuth 配置。请检查 GITHUB_CLIENT_ID 和 GITHUB_CLIENT_SECRET 环境变量。")
    }

    // 1. 交换 code 获取 access token
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent": "BlogSystem/1.0",
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code,
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error(`令牌交换失败: ${tokenResponse.status}`)
    }

    const tokenData = await tokenResponse.json()
    console.log("令牌交换响应:", {
      hasAccessToken: !!tokenData.access_token,
      error: tokenData.error,
    })

    if (tokenData.error) {
      throw new Error(`GitHub OAuth 错误: ${tokenData.error_description || tokenData.error}`)
    }

    if (!tokenData.access_token) {
      throw new Error("未从 GitHub 收到访问令牌")
    }

    console.log("正在获取用户信息...")

    // 2. 获取用户信息
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "BlogSystem/1.0",
      },
    })

    if (!userResponse.ok) {
      throw new Error(`获取用户信息失败: ${userResponse.status}`)
    }

    const userData = await userResponse.json()
    console.log("用户数据接收:", {
      login: userData.login,
      id: userData.id,
      name: userData.name,
    })

    // 3. 检查用户权限
    const repoOwner = process.env.GITHUB_REPO_OWNER
    const repoName = process.env.GITHUB_REPO_NAME

    console.log("检查权限:", {
      userLogin: userData.login,
      repoOwner,
      repoName,
    })

    let userRole = "user"
    let isRepoOwner = false
    let permissions: string[] = ["read:posts"]

    // 检查是否为仓库所有者
    if (userData.login === repoOwner) {
      console.log("用户是仓库所有者 - 授予管理员角色")
      userRole = "admin"
      isRepoOwner = true
      permissions = [
        "read:posts",
        "write:posts",
        "delete:posts",
        "manage:users",
        "manage:settings",
        "manage:media",
        "manage:comments",
        "manage:analytics",
        "manage:seo",
        "manage:ads",
      ]
    } else if (repoOwner && repoName) {
      // 检查是否为协作者
      try {
        console.log("检查协作者状态...")
        const collaboratorResponse = await fetch(
          `https://api.github.com/repos/${repoOwner}/${repoName}/collaborators/${userData.login}`,
          {
            headers: {
              Authorization: `Bearer ${tokenData.access_token}`,
              Accept: "application/vnd.github.v3+json",
              "User-Agent": "BlogSystem/1.0",
            },
          },
        )

        if (collaboratorResponse.status === 204) {
          console.log("用户是协作者 - 授予有限权限")
          permissions = ["read:posts", "write:posts", "manage:media"]
        } else {
          console.log("用户不是协作者 - 只读访问")
        }
      } catch (error) {
        console.log("检查协作者状态时出错:", error)
      }
    }

    // 4. 获取用户邮箱（如果公开）
    let userEmail = userData.email
    if (!userEmail) {
      try {
        const emailResponse = await fetch("https://api.github.com/user/emails", {
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
            Accept: "application/vnd.github.v3+json",
            "User-Agent": "BlogSystem/1.0",
          },
        })

        if (emailResponse.ok) {
          const emails = await emailResponse.json()
          const primaryEmail = emails.find((email: any) => email.primary)
          userEmail = primaryEmail?.email || emails[0]?.email
        }
      } catch (error) {
        console.log("无法获取用户邮箱:", error)
      }
    }

    // 5. 创建 JWT token
    const user = {
      id: userData.id.toString(),
      name: userData.name || userData.login,
      email: userEmail || `${userData.login}@github.local`,
      avatar: userData.avatar_url,
      role: userRole,
      githubUsername: userData.login,
      isRepoOwner,
      permissions,
      githubToken: tokenData.access_token, // 存储用于后续 API 调用
    }

    console.log("为用户创建 JWT 令牌:", {
      id: user.id,
      role: user.role,
      permissions: user.permissions.length,
    })

    const token = await new SignJWT(user)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(JWT_SECRET)

    // 6. 设置 cookie 并重定向
    const redirectUrl = state || (userRole === "admin" ? "/admin" : "/")
    console.log("重定向到:", redirectUrl)

    const response = NextResponse.redirect(new URL(redirectUrl, request.url))

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 天
      path: "/",
    })

    return response
  } catch (error) {
    console.error("GitHub OAuth 错误:", error)
    const errorMessage = error instanceof Error ? error.message : "未知错误"
    console.error("完整错误详情:", errorMessage)

    return NextResponse.redirect(
      new URL(`/auth/login?error=oauth_failed&details=${encodeURIComponent(errorMessage)}`, request.url),
    )
  }
}
