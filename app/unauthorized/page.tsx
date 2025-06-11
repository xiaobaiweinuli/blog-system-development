"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, ArrowLeft, Github, Crown, Users } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"

export default function UnauthorizedPage() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-red-600">访问被拒绝</h1>
          <p className="text-muted-foreground mt-2">您没有权限访问此页面</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              权限说明
            </CardTitle>
            <CardDescription>了解不同用户角色的访问权限</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>
                此博客系统使用基于 GitHub 仓库的权限控制。您的访问级别取决于您在 GitHub 仓库中的角色。
              </AlertDescription>
            </Alert>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  <h3 className="font-semibold">仓库所有者</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 完整管理员权限</li>
                  <li>• 管理所有内容</li>
                  <li>• 系统设置配置</li>
                  <li>• 用户权限管理</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <h3 className="font-semibold">协作者</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 创建和编辑文章</li>
                  <li>• 管理媒体文件</li>
                  <li>• 查看基础分析</li>
                  <li>• 有限的系统访问</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Github className="w-5 h-5 text-gray-500" />
                  <h3 className="font-semibold">其他用户</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 查看公开文章</li>
                  <li>• 阅读博客内容</li>
                  <li>• 无管理权限</li>
                  <li>• 只读访问</li>
                </ul>
              </div>
            </div>

            {user && (
              <Alert>
                <AlertDescription>
                  <strong>当前用户：</strong> {user.name} (@{user.githubUsername || "未知"})
                  <br />
                  <strong>角色：</strong> {user.role === "admin" ? "管理员" : "普通用户"}
                  <br />
                  <strong>权限：</strong> {user.permissions?.join(", ") || "基础权限"}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回首页
            </Link>
          </Button>

          {user && (
            <Button variant="outline" onClick={logout}>
              <Github className="w-4 h-4 mr-2" />
              切换账户
            </Button>
          )}

          <Button asChild>
            <Link href="/auth/login">重新登录</Link>
          </Button>
        </div>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">需要访问权限？</h3>
            <p className="text-sm text-muted-foreground mb-3">
              如果您需要管理此博客的权限，请联系仓库所有者将您添加为协作者。
            </p>
            <div className="text-xs text-muted-foreground">
              <p>仓库所有者可以在 GitHub 仓库设置中添加协作者：</p>
              <p className="font-mono bg-white px-2 py-1 rounded mt-1">
                Settings → Manage access → Invite a collaborator
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
