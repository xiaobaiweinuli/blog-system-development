"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Github,
  CloudIcon,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Settings,
  Shield,
  ExternalLink,
  Key,
} from "lucide-react"

interface PermissionStatus {
  service: string
  connected: boolean
  permissions: string[]
  lastChecked: string
  issues?: string[]
}

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState<PermissionStatus[]>([
    {
      service: "GitHub",
      connected: true,
      permissions: ["repo", "read:org", "read:user", "user:email"],
      lastChecked: "2024-01-15 10:30:00",
      issues: [],
    },
    {
      service: "Cloudflare",
      connected: true,
      permissions: ["Account.R2 Storage:Edit", "Account.Workers Scripts:Edit", "Zone.DNS:Edit"],
      lastChecked: "2024-01-15 10:25:00",
      issues: [],
    },
  ])

  const [isChecking, setIsChecking] = useState<string | null>(null)

  const checkPermissions = async (service: string) => {
    setIsChecking(service)

    try {
      // 模拟权限检查
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setPermissions((prev) =>
        prev.map((p) => (p.service === service ? { ...p, lastChecked: new Date().toLocaleString() } : p)),
      )
    } catch (error) {
      console.error(`检查 ${service} 权限失败:`, error)
    } finally {
      setIsChecking(null)
    }
  }

  const requestPermissions = async (service: string) => {
    if (service === "GitHub") {
      const scope = "repo,read:org,read:user,user:email,admin:repo_hook"
      const redirectUri = `${window.location.origin}/api/auth/github/permissions`
      const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${redirectUri}&scope=${scope}&state=permissions`

      window.open(githubAuthUrl, "_blank", "width=600,height=700")
    } else if (service === "Cloudflare") {
      // 打开 Cloudflare API 令牌创建页面
      window.open("https://dash.cloudflare.com/profile/api-tokens", "_blank")
    }
  }

  const autoConfigureService = async (service: string) => {
    try {
      if (service === "GitHub") {
        // 自动配置 GitHub OAuth 应用
        const response = await fetch("/api/github/auto-configure", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })

        if (response.ok) {
          console.log("GitHub OAuth 自动配置成功")
        }
      } else if (service === "Cloudflare") {
        // 自动配置 R2 存储桶
        const response = await fetch("/api/cloudflare/auto-configure", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })

        if (response.ok) {
          console.log("Cloudflare R2 自动配置成功")
        }
      }
    } catch (error) {
      console.error(`自动配置 ${service} 失败:`, error)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">权限管理</h1>
          <p className="text-muted-foreground">管理 GitHub 和 Cloudflare 服务权限</p>
        </div>
        <Button variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          重新配置
        </Button>
      </div>

      <div className="grid gap-6">
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">
              <Shield className="w-4 h-4 mr-2" />
              权限概览
            </TabsTrigger>
            <TabsTrigger value="github">
              <Github className="w-4 h-4 mr-2" />
              GitHub 权限
            </TabsTrigger>
            <TabsTrigger value="cloudflare">
              <CloudIcon className="w-4 h-4 mr-2" />
              Cloudflare 权限
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-4">
              {permissions.map((permission) => (
                <Card key={permission.service}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {permission.service === "GitHub" ? (
                          <Github className="w-5 h-5" />
                        ) : (
                          <CloudIcon className="w-5 h-5" />
                        )}
                        <CardTitle>{permission.service}</CardTitle>
                        <Badge
                          variant={permission.connected ? "outline" : "destructive"}
                          className={permission.connected ? "text-green-500" : ""}
                        >
                          {permission.connected ? "已连接" : "未连接"}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => checkPermissions(permission.service)}
                          disabled={isChecking === permission.service}
                        >
                          {isChecking === permission.service ? (
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <RefreshCw className="w-4 h-4 mr-2" />
                          )}
                          检查权限
                        </Button>
                        <Button size="sm" onClick={() => requestPermissions(permission.service)}>
                          <Key className="w-4 h-4 mr-2" />
                          请求权限
                        </Button>
                      </div>
                    </div>
                    <CardDescription>最后检查: {permission.lastChecked}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">当前权限:</h4>
                        <div className="flex flex-wrap gap-2">
                          {permission.permissions.map((perm) => (
                            <Badge key={perm} variant="secondary" className="text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {perm}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {permission.issues && permission.issues.length > 0 && (
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>发现权限问题: {permission.issues.join(", ")}</AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="github">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Github className="w-5 h-5" />
                  GitHub 权限详情
                </CardTitle>
                <CardDescription>管理 GitHub OAuth 应用和仓库权限</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>为了完整使用博客系统功能，我们需要以下 GitHub 权限：</AlertDescription>
                </Alert>

                <div className="grid gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">仓库权限 (repo)</h4>
                    <p className="text-sm text-muted-foreground mb-2">用于读取和写入博客内容到您的 GitHub 仓库</p>
                    <Badge variant="outline" className="text-green-500">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      已授权
                    </Badge>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">组织读取权限 (read:org)</h4>
                    <p className="text-sm text-muted-foreground mb-2">用于验证用户是否属于指定的 GitHub 组织</p>
                    <Badge variant="outline" className="text-green-500">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      已授权
                    </Badge>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">用户信息权限 (read:user, user:email)</h4>
                    <p className="text-sm text-muted-foreground mb-2">用于获取用户基本信息和邮箱地址</p>
                    <Badge variant="outline" className="text-green-500">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      已授权
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button onClick={() => autoConfigureService("GitHub")}>自动配置 GitHub OAuth</Button>
                  <Button variant="outline" asChild>
                    <a href="https://github.com/settings/applications" target="_blank" rel="noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      管理 GitHub 应用
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cloudflare">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CloudIcon className="w-5 h-5" />
                  Cloudflare 权限详情
                </CardTitle>
                <CardDescription>管理 Cloudflare API 权限和 R2 存储配置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>为了使用 Cloudflare R2 存储和其他服务，我们需要以下权限：</AlertDescription>
                </Alert>

                <div className="grid gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">R2 存储权限 (Account.R2 Storage:Edit)</h4>
                    <p className="text-sm text-muted-foreground mb-2">用于创建和管理 R2 存储桶，上传和管理媒体文件</p>
                    <Badge variant="outline" className="text-green-500">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      已授权
                    </Badge>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Workers 脚本权限 (Account.Workers Scripts:Edit)</h4>
                    <p className="text-sm text-muted-foreground mb-2">用于部署和管理 Cloudflare Workers（如果需要）</p>
                    <Badge variant="outline" className="text-green-500">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      已授权
                    </Badge>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">DNS 权限 (Zone.DNS:Edit)</h4>
                    <p className="text-sm text-muted-foreground mb-2">用于配置自定义域名和 DNS 记录</p>
                    <Badge variant="outline" className="text-green-500">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      已授权
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button onClick={() => autoConfigureService("Cloudflare")}>自动配置 R2 存储</Button>
                  <Button variant="outline" asChild>
                    <a href="https://dash.cloudflare.com/profile/api-tokens" target="_blank" rel="noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      管理 API 令牌
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
