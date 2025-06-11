"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/components/auth-provider"
import { Github, ArrowLeft, AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get error and redirect parameters from URL
  const urlError = searchParams.get("error")
  const redirectUrl = searchParams.get("redirect")

  useEffect(() => {
    // If user is already authenticated, redirect them
    if (isAuthenticated()) {
      const destination = redirectUrl || "/admin"
      router.push(destination)
    }

    // Handle OAuth errors from URL parameters
    if (urlError) {
      switch (urlError) {
        case "no_code":
          setError("GitHub 授权失败：未收到授权码")
          break
        case "oauth_failed":
          setError("GitHub OAuth 认证失败，请重试")
          break
        case "unauthorized":
          setError("您没有权限访问此应用。请确保您是仓库所有者或协作者。")
          break
        default:
          setError("登录过程中发生未知错误")
      }
    }
  }, [isAuthenticated, router, redirectUrl, urlError])

  const handleGitHubLogin = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Check if GitHub Client ID is configured
      const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
      if (!clientId) {
        throw new Error("GitHub OAuth 未配置。请检查 NEXT_PUBLIC_GITHUB_CLIENT_ID 环境变量。")
      }

      // Construct GitHub OAuth URL
      const githubAuthUrl = new URL("https://github.com/login/oauth/authorize")
      githubAuthUrl.searchParams.set("client_id", clientId)
      githubAuthUrl.searchParams.set("scope", "repo,read:org,read:user,user:email")
      githubAuthUrl.searchParams.set("redirect_uri", `${window.location.origin}/api/auth/github`)

      // Add state parameter for redirect after login
      if (redirectUrl) {
        githubAuthUrl.searchParams.set("state", redirectUrl)
      }

      console.log("Redirecting to GitHub OAuth:", githubAuthUrl.toString())

      // Redirect to GitHub
      window.location.href = githubAuthUrl.toString()
    } catch (error) {
      console.error("GitHub OAuth setup error:", error)
      setError(error instanceof Error ? error.message : "GitHub OAuth 配置错误")
      setIsLoading(false)
    }
  }

  // Show success message if user is authenticated
  if (isAuthenticated()) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <CardTitle>登录成功</CardTitle>
            <CardDescription>正在重定向到管理面板...</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回博客
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">欢迎回来</h1>
          <p className="text-muted-foreground">使用 GitHub 账户登录以访问管理面板</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>登录</CardTitle>
            <CardDescription>使用您的 GitHub 账户登录以访问管理功能</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="default" className="w-full" onClick={handleGitHubLogin} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  正在重定向到 GitHub...
                </>
              ) : (
                <>
                  <Github className="w-4 h-4 mr-2" />
                  使用 GitHub 继续
                </>
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground space-y-2">
              <p>只有仓库所有者和协作者可以访问管理面板。</p>
              <div className="bg-muted p-3 rounded-lg text-left">
                <p className="font-medium mb-1">权限说明：</p>
                <ul className="text-xs space-y-1">
                  <li>
                    • <strong>仓库所有者</strong>：完整管理员权限
                  </li>
                  <li>
                    • <strong>协作者</strong>：内容创建和编辑权限
                  </li>
                  <li>
                    • <strong>其他用户</strong>：只读访问权限
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Debug Information (only in development) */}
        {process.env.NODE_ENV === "development" && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-sm text-yellow-800">开发调试信息</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-yellow-700 space-y-1">
              <p>GitHub Client ID: {process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ? "✅ 已配置" : "❌ 未配置"}</p>
              <p>当前域名: {typeof window !== "undefined" ? window.location.origin : "服务器端"}</p>
              <p>回调 URL: {typeof window !== "undefined" ? `${window.location.origin}/api/auth/github` : "N/A"}</p>
              {redirectUrl && <p>重定向目标: {redirectUrl}</p>}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
