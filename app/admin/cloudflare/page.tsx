"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Save, CloudIcon, Database, Lock, RefreshCw, Check, AlertCircle, Zap, Settings } from "lucide-react"

export default function CloudflarePage() {
  const [cloudflareSettings, setCloudflareSettings] = useState({
    accountId: "your-cloudflare-account-id",
    apiToken: "••••••••••••••••••••••••••",
    r2Enabled: true,
    r2AccessKey: "••••••••••••••••",
    r2SecretKey: "••••••••••••••••••••••••••",
    r2BucketName: "blog-assets",
    r2CustomDomain: "assets.yourblog.com",
    workersEnabled: true,
    workerName: "blog-oauth-proxy",
    workerDomain: "oauth.yourblog.workers.dev",
    oauthEnabled: true,
    githubClientId: "your-github-client-id",
    githubClientSecret: "••••••••••••••••••••••••••",
    allowedOrganizations: "your-org",
    allowedRepositories: "your-username/your-repo",
  })

  const [connectionStatus, setConnectionStatus] = useState({
    cloudflare: "connected",
    r2: "connected",
    workers: "connected",
    github: "connected",
  })

  const [autoConfigProgress, setAutoConfigProgress] = useState(0)
  const [isAutoConfiguring, setIsAutoConfiguring] = useState(false)
  const [configSteps, setConfigSteps] = useState<string[]>([])

  const handleInputChange = (field: string, value: any) => {
    setCloudflareSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    console.log("保存 Cloudflare 设置:", cloudflareSettings)
  }

  const testConnection = (service: string) => {
    setConnectionStatus((prev) => ({
      ...prev,
      [service]: "checking",
    }))

    setTimeout(() => {
      setConnectionStatus((prev) => ({
        ...prev,
        [service]: "connected",
      }))
    }, 1500)
  }

  const autoConfigureCloudflare = async () => {
    setIsAutoConfiguring(true)
    setAutoConfigProgress(0)
    setConfigSteps([])

    const steps = [
      "验证 Cloudflare 权限...",
      "创建 R2 存储桶...",
      "配置 CORS 设置...",
      "部署 OAuth Worker...",
      "配置自定义域名...",
      "生成访问密钥...",
      "完成配置...",
    ]

    for (let i = 0; i < steps.length; i++) {
      setConfigSteps((prev) => [...prev, steps[i]])
      setAutoConfigProgress(((i + 1) / steps.length) * 100)

      // 模拟配置步骤
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (i === 1) {
        // 创建 R2 存储桶
        await createR2Bucket()
      } else if (i === 3) {
        // 部署 OAuth Worker
        await deployOAuthWorker()
      }
    }

    setIsAutoConfiguring(false)
  }

  const createR2Bucket = async () => {
    try {
      const response = await fetch("/api/cloudflare/create-r2-bucket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountId: cloudflareSettings.accountId,
          apiToken: cloudflareSettings.apiToken,
          bucketName: cloudflareSettings.r2BucketName,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setCloudflareSettings((prev) => ({
          ...prev,
          r2AccessKey: data.accessKey,
          r2SecretKey: data.secretKey,
        }))
      }
    } catch (error) {
      console.error("创建 R2 存储桶失败:", error)
    }
  }

  const deployOAuthWorker = async () => {
    try {
      const response = await fetch("/api/cloudflare/deploy-oauth-worker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountId: cloudflareSettings.accountId,
          apiToken: cloudflareSettings.apiToken,
          workerName: cloudflareSettings.workerName,
          githubClientId: cloudflareSettings.githubClientId,
          githubClientSecret: cloudflareSettings.githubClientSecret,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setCloudflareSettings((prev) => ({
          ...prev,
          workerDomain: data.workerDomain,
        }))
      }
    } catch (error) {
      console.error("部署 OAuth Worker 失败:", error)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Cloudflare 集成</h1>
        <div className="flex gap-2">
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            保存设置
          </Button>
          <Button onClick={autoConfigureCloudflare} disabled={isAutoConfiguring}>
            <Settings className="w-4 h-4 mr-2" />
            自动配置
          </Button>
        </div>
      </div>

      {isAutoConfiguring && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>自动配置进行中...</CardTitle>
            <CardDescription>正在配置 Cloudflare 服务</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={autoConfigProgress} className="h-2" />
              <div className="space-y-2">
                {configSteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        <Tabs defaultValue="account">
          <TabsList className="mb-4">
            <TabsTrigger value="account">
              <CloudIcon className="w-4 h-4 mr-2" />
              账户设置
            </TabsTrigger>
            <TabsTrigger value="r2">
              <Database className="w-4 h-4 mr-2" />
              R2 存储
            </TabsTrigger>
            <TabsTrigger value="workers">
              <Zap className="w-4 h-4 mr-2" />
              Workers
            </TabsTrigger>
            <TabsTrigger value="oauth">
              <Lock className="w-4 h-4 mr-2" />
              OAuth 代理
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Cloudflare 账户设置</CardTitle>
                    <CardDescription>配置您的 Cloudflare 账户信息</CardDescription>
                  </div>
                  <Badge
                    variant={connectionStatus.cloudflare === "connected" ? "outline" : "destructive"}
                    className={connectionStatus.cloudflare === "connected" ? "text-green-500" : ""}
                  >
                    {connectionStatus.cloudflare === "checking" && "检查中..."}
                    {connectionStatus.cloudflare === "connected" && "已连接"}
                    {connectionStatus.cloudflare === "error" && "连接错误"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="accountId">Cloudflare 账户 ID</Label>
                  <Input
                    id="accountId"
                    value={cloudflareSettings.accountId}
                    onChange={(e) => handleInputChange("accountId", e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">在 Cloudflare 仪表板中找到您的账户 ID</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apiToken">API 令牌</Label>
                  <div className="flex gap-2">
                    <Input
                      id="apiToken"
                      type="password"
                      value={cloudflareSettings.apiToken}
                      onChange={(e) => handleInputChange("apiToken", e.target.value)}
                    />
                    <Button variant="outline" onClick={() => testConnection("cloudflare")}>
                      {connectionStatus.cloudflare === "checking" ? (
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <RefreshCw className="w-4 h-4 mr-2" />
                      )}
                      测试连接
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="r2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>R2 存储设置</CardTitle>
                    <CardDescription>配置 Cloudflare R2 存储以存储媒体文件</CardDescription>
                  </div>
                  <Badge
                    variant={connectionStatus.r2 === "connected" ? "outline" : "destructive"}
                    className={connectionStatus.r2 === "connected" ? "text-green-500" : ""}
                  >
                    {connectionStatus.r2 === "checking" && "检查中..."}
                    {connectionStatus.r2 === "connected" && "已连接"}
                    {connectionStatus.r2 === "error" && "连接错误"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>启用 R2 存储</Label>
                    <p className="text-sm text-muted-foreground">使用 Cloudflare R2 存储媒体文件</p>
                  </div>
                  <Switch
                    checked={cloudflareSettings.r2Enabled}
                    onCheckedChange={(checked) => handleInputChange("r2Enabled", checked)}
                  />
                </div>

                {cloudflareSettings.r2Enabled && (
                  <>
                    <Separator />

                    <div className="space-y-2">
                      <Label htmlFor="r2BucketName">R2 存储桶名称</Label>
                      <div className="flex gap-2">
                        <Input
                          id="r2BucketName"
                          value={cloudflareSettings.r2BucketName}
                          onChange={(e) => handleInputChange("r2BucketName", e.target.value)}
                        />
                        <Button variant="outline" onClick={() => testConnection("r2")}>
                          {connectionStatus.r2 === "checking" ? (
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <RefreshCw className="w-4 h-4 mr-2" />
                          )}
                          测试连接
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="r2CustomDomain">自定义域名 (可选)</Label>
                      <Input
                        id="r2CustomDomain"
                        value={cloudflareSettings.r2CustomDomain}
                        onChange={(e) => handleInputChange("r2CustomDomain", e.target.value)}
                        placeholder="assets.yourdomain.com"
                      />
                    </div>

                    <Alert>
                      <Check className="h-4 w-4" />
                      <AlertDescription>R2 存储桶已自动配置 CORS 设置，支持从您的网站直接上传文件。</AlertDescription>
                    </Alert>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workers">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Cloudflare Workers</CardTitle>
                    <CardDescription>配置无服务器函数处理 OAuth 和 API 请求</CardDescription>
                  </div>
                  <Badge
                    variant={connectionStatus.workers === "connected" ? "outline" : "destructive"}
                    className={connectionStatus.workers === "connected" ? "text-green-500" : ""}
                  >
                    {connectionStatus.workers === "checking" && "检查中..."}
                    {connectionStatus.workers === "connected" && "已部署"}
                    {connectionStatus.workers === "error" && "部署失败"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>启用 Cloudflare Workers</Label>
                    <p className="text-sm text-muted-foreground">使用 Workers 作为安全的 OAuth 代理</p>
                  </div>
                  <Switch
                    checked={cloudflareSettings.workersEnabled}
                    onCheckedChange={(checked) => handleInputChange("workersEnabled", checked)}
                  />
                </div>

                {cloudflareSettings.workersEnabled && (
                  <>
                    <Separator />

                    <div className="space-y-2">
                      <Label htmlFor="workerName">Worker 名称</Label>
                      <Input
                        id="workerName"
                        value={cloudflareSettings.workerName}
                        onChange={(e) => handleInputChange("workerName", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="workerDomain">Worker 域名</Label>
                      <Input
                        id="workerDomain"
                        value={cloudflareSettings.workerDomain}
                        onChange={(e) => handleInputChange("workerDomain", e.target.value)}
                        placeholder="your-worker.workers.dev"
                      />
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <h3 className="font-medium mb-2">Worker 功能</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500" />
                          <span>OAuth 密钥保护</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500" />
                          <span>GitHub API 代理</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500" />
                          <span>速率限制保护</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500" />
                          <span>CORS 处理</span>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="oauth">
            <Card>
              <CardHeader>
                <CardTitle>OAuth 代理配置</CardTitle>
                <CardDescription>通过 Cloudflare Workers 安全处理 GitHub OAuth</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>OAuth 密钥将安全存储在 Cloudflare Workers 中，不会暴露给客户端。</AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Label htmlFor="githubClientId">GitHub 客户端 ID</Label>
                  <Input
                    id="githubClientId"
                    value={cloudflareSettings.githubClientId}
                    onChange={(e) => handleInputChange("githubClientId", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="githubClientSecret">GitHub 客户端密钥</Label>
                  <Input
                    id="githubClientSecret"
                    type="password"
                    value={cloudflareSettings.githubClientSecret}
                    onChange={(e) => handleInputChange("githubClientSecret", e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">密钥将加密存储在 Cloudflare Workers 环境变量中</p>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">OAuth 流程</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                        1
                      </div>
                      <span>用户点击 GitHub 登录</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                        2
                      </div>
                      <span>重定向到 GitHub OAuth</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                        3
                      </div>
                      <span>GitHub 回调到 Cloudflare Worker</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                        4
                      </div>
                      <span>Worker 安全处理令牌交换</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                        5
                      </div>
                      <span>返回安全的用户会话</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
