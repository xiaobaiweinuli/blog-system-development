"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Github, AlertCircle, CheckCircle } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export default function LoginPage() {
  const searchParams = useSearchParams()
  const { login, isAuthenticated } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // 检查 URL 参数中的错误
    const errorParam = searchParams.get("error")
    const details = searchParams.get("details")

    if (errorParam) {
      switch (errorParam) {
        case "oauth_failed":
          setError(details ? decodeURIComponent(details) : "GitHub OAuth 认证失败")
          break
        case "no_code":
          setError("未收到 GitHub 授权码，请重试")
          break
        case "access_denied":
          setError("您拒绝了 GitHub 授权请求")
          break
        default:
          setError("登录过程中发生未知错误")
      }
    }

    // 如果已经登录，重定向到首页
    if (isAuthenticated()) {
      window.location.href = "/"
    }
  }, [searchParams, isAuthenticated])

  const handleGitHubLogin = () => {
    setIsLoading(true)
    setError(null)

    try {
      login("/admin")
    } catch (err) {
      setError("启动登录流程失败，请检查网络连接")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">欢迎回来</CardTitle>
          <CardDescription>登录以访问博客管理面板</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <Button
              onClick={handleGitHubLogin}
              disabled={isLoading}
              className="w-full bg-gray-900 hover:bg-gray-800"
              size="lg"
            >
              <Github className="w-5 h-5 mr-2" />
              {isLoading ? "正在跳转..." : "使用 GitHub 登录"}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">只有仓库所有者和协作者可以访问管理面板</p>
            </div>
          </div>

          {/* 配置提示 */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">配置要求</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>GitHub OAuth 应用已配置</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>环境变量已设置</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>仓库权限已授予</span>
              </div>
            </div>
          </div>

          {/* 故障排除 */}
          <details className="text-sm">
            <summary className="cursor-pointer font-medium text-gray-700 hover:text-gray-900">登录遇到问题？</summary>
            <div className="mt-2 space-y-2 text-gray-600">
              <p>• 确保您是仓库的所有者或协作者</p>
              <p>• 检查 GitHub OAuth 应用配置</p>
              <p>• 验证环境变量设置正确</p>
              <p>• 清除浏览器缓存后重试</p>
            </div>
          </details>
        </CardContent>
      </Card>
    </div>
  )
}
