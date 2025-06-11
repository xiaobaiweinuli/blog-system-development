import { type NextRequest, NextResponse } from "next/server"
import { SignJWT } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const state = searchParams.get("state") // 重定向 URL
  const error = searchParams.get("error")

  console.log("GitHub OAuth callback received:", { code: !!code, state, error })

  // Handle OAuth errors
  if (error) {
    console.error("GitHub OAuth error:", error)
    return NextResponse.redirect(new URL(`/auth/login?error=${error}`, request.url))
  }

  if (!code) {
    console.error("No authorization code received")
    return NextResponse.redirect(new URL("/auth/login?error=no_code", request.url))
  }

  try {
    console.log("Exchanging code for access token...")

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
      throw new Error(`Token exchange failed: ${tokenResponse.status}`)
    }

    const tokenData = await tokenResponse.json()
    console.log("Token exchange response:", {
      hasAccessToken: !!tokenData.access_token,
      error: tokenData.error,
    })

    if (tokenData.error) {
      throw new Error(`GitHub OAuth error: ${tokenData.error_description || tokenData.error}`)
    }

    if (!tokenData.access_token) {
      throw new Error("No access token received from GitHub")
    }

    console.log("Fetching user information...")

    // 2. 获取用户信息
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "BlogSystem/1.0",
      },
    })

    if (!userResponse.ok) {
      throw new Error(`Failed to fetch user info: ${userResponse.status}`)
    }

    const userData = await userResponse.json()
    console.log("User data received:", {
      login: userData.login,
      id: userData.id,
      name: userData.name,
    })

    // 3. 检查用户权限
    const repoOwner = process.env.GITHUB_REPO_OWNER
    const repoName = process.env.GITHUB_REPO_NAME

    console.log("Checking permissions:", {
      userLogin: userData.login,
      repoOwner,
      repoName,
    })

    let userRole = "user"
    let isRepoOwner = false
    let permissions: string[] = ["read:posts"]

    // 检查是否为仓库所有者
    if (userData.login === repoOwner) {
      console.log("User is repository owner - granting admin role")
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
        console.log("Checking collaborator status...")
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
          console.log("User is collaborator - granting limited permissions")
          permissions = ["read:posts", "write:posts", "manage:media"]
        } else {
          console.log("User is not a collaborator - read-only access")
        }
      } catch (error) {
        console.log("Error checking collaborator status:", error)
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
        console.log("Could not fetch user email:", error)
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

    console.log("Creating JWT token for user:", {
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
    console.log("Redirecting to:", redirectUrl)

    const response = NextResponse.redirect(new URL(redirectUrl, request.url))

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return response
  } catch (error) {
    console.error("GitHub OAuth error:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error("Full error details:", errorMessage)

    return NextResponse.redirect(
      new URL(`/auth/login?error=oauth_failed&details=${encodeURIComponent(errorMessage)}`, request.url),
    )
  }
}
