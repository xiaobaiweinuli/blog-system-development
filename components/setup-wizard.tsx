"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Github,
  CloudIcon,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  Settings,
} from "lucide-react"

interface SetupStep {
  id: string
  title: string
  description: string
  completed: boolean
  required: boolean
}

interface SetupWizardProps {
  onComplete: () => void
  onSkip: () => void
}

export function SetupWizard({ onComplete, onSkip }: SetupWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [setupData, setSetupData] = useState({
    github: {
      clientId: "",
      clientSecret: "",
      repoOwner: "",
      repoName: "",
      hasPermissions: false,
    },
    cloudflare: {
      accountId: "",
      apiToken: "",
      r2AccessKey: "",
      r2SecretKey: "",
      r2BucketName: "",
      hasPermissions: false,
    },
    site: {
      title: "我的博客",
      description: "基于 GitHub Pages 的现代博客系统",
      language: "zh",
    },
  })

  const steps: SetupStep[] = [
    {
      id: "welcome",
      title: "欢迎使用",
      description: "配置您的博客系统",
      completed: true,
      required: true,
    },
    {
      id: "github",
      title: "GitHub 配置",
      description: "设置 GitHub OAuth 和仓库权限",
      completed: setupData.github.hasPermissions,
      required: true,
    },
    {
      id: "cloudflare",
      title: "Cloudflare 配置",
      description: "设置 Cloudflare R2 存储",
      completed: setupData.cloudflare.hasPermissions,
      required: true,
    },
    {
      id: "site",
      title: "网站设置",
      description: "配置基本网站信息",
      completed: false,
      required: true,
    },
  ]

  const progress = (steps.filter((step) => step.completed).length / steps.length) * 100

  const handleInputChange = (section: string, field: string, value: string) => {
    setSetupData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const requestGitHubPermissions = async () => {
    // 模拟请求 GitHub 权限
    const scope = "repo,read:org,read:user,user:email"
    const redirectUri = `${window.location.origin}/api/auth/github/setup`
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${setupData.github.clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=setup`

    window.open(githubAuthUrl, "_blank", "width=600,height=700")

    // 监听权限授权完成
    const checkPermissions = setInterval(() => {
      // 这里会检查权限状态
      setSetupData((prev) => ({
        ...prev,
        github: { ...prev.github, hasPermissions: true },
      }))
      clearInterval(checkPermissions)
    }, 3000)
  }

  const requestCloudflarePermissions = async () => {
    // 模拟 Cloudflare 权限验证
    try {
      const response = await fetch("/api/cloudflare/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountId: setupData.cloudflare.accountId,
          apiToken: setupData.cloudflare.apiToken,
        }),
      })

      if (response.ok) {
        setSetupData((prev) => ({
          ...prev,
          cloudflare: { ...prev.cloudflare, hasPermissions: true },
        }))
      }
    } catch (error) {
      console.error("Cloudflare 验证失败:", error)
    }
  }

  const autoConfigureR2 = async () => {
    // 自动配置 R2 存储桶
    try {
      const response = await fetch("/api/cloudflare/setup-r2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountId: setupData.cloudflare.accountId,
          apiToken: setupData.cloudflare.apiToken,
          bucketName: setupData.cloudflare.r2BucketName || "blog-assets",
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setSetupData((prev) => ({
          ...prev,
          cloudflare: {
            ...prev.cloudflare,
            r2AccessKey: data.accessKey,
            r2SecretKey: data.secretKey,
          },
        }))
      }
    } catch (error) {
      console.error("R2 自动配置失败:", error)
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const completeSetup = async () => {
    // 保存所有配置
    try {
      await fetch("/api/setup/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(setupData),
      })
      onComplete()
    } catch (error) {
      console.error("设置完成失败:", error)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">博客系统设置向导</CardTitle>
              <CardDescription>让我们配置您的博客系统</CardDescription>
            </div>
            <Badge variant="outline">
              步骤 {currentStep + 1} / {steps.length}
            </Badge>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>

        <CardContent>
          <Tabs value={steps[currentStep].id} className="w-full">
            <TabsContent value="welcome" className="space-y-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Settings className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">欢迎使用 GitHub 博客系统</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  我们将引导您完成初始设置，包括 GitHub OAuth 认证、Cloudflare R2 存储配置等。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <Card className="p-4">
                    <Github className="w-8 h-8 mb-2 text-blue-600" />
                    <h3 className="font-medium">GitHub 集成</h3>
                    <p className="text-sm text-muted-foreground">配置 OAuth 认证和仓库权限</p>
                  </Card>
                  <Card className="p-4">
                    <CloudIcon className="w-8 h-8 mb-2 text-orange-600" />
                    <h3 className="font-medium">Cloudflare 存储</h3>
                    <p className="text-sm text-muted-foreground">设置 R2 存储用于媒体文件</p>
                  </Card>
                  <Card className="p-4">
                    <Settings className="w-8 h-8 mb-2 text-green-600" />
                    <h3 className="font-medium">网站配置</h3>
                    <p className="text-sm text-muted-foreground">自定义您的博客设置</p>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="github" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Github className="w-5 h-5" />
                  <h2 className="text-xl font-semibold">GitHub 配置</h2>
                  {setupData.github.hasPermissions && <CheckCircle className="w-5 h-5 text-green-500" />}
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>我们需要访问您的 GitHub 账户来管理博客内容和用户认证。</AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="github-client-id">GitHub 客户端 ID</Label>
                    <Input
                      id="github-client-id"
                      value={setupData.github.clientId}
                      onChange={(e) => handleInputChange("github", "clientId", e.target.value)}
                      placeholder="输入您的 GitHub 客户端 ID"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github-client-secret">GitHub 客户端密钥</Label>
                    <Input
                      id="github-client-secret"
                      type="password"
                      value={setupData.github.clientSecret}
                      onChange={(e) => handleInputChange("github", "clientSecret", e.target.value)}
                      placeholder="输入您的 GitHub 客户端密钥"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="repo-owner">仓库所有者</Label>
                    <Input
                      id="repo-owner"
                      value={setupData.github.repoOwner}
                      onChange={(e) => handleInputChange("github", "repoOwner", e.target.value)}
                      placeholder="GitHub 用户名或组织名"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="repo-name">仓库名称</Label>
                    <Input
                      id="repo-name"
                      value={setupData.github.repoName}
                      onChange={(e) => handleInputChange("github", "repoName", e.target.value)}
                      placeholder="博客仓库名称"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={requestGitHubPermissions}
                    disabled={!setupData.github.clientId || !setupData.github.clientSecret}
                    className="flex-1"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    请求 GitHub 权限
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://github.com/settings/applications/new" target="_blank" rel="noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      创建 GitHub 应用
                    </a>
                  </Button>
                </div>

                {setupData.github.hasPermissions && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>GitHub 权限已成功获取！您现在可以继续下一步。</AlertDescription>
                  </Alert>
                )}
              </div>
            </TabsContent>

            <TabsContent value="cloudflare" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CloudIcon className="w-5 h-5" />
                  <h2 className="text-xl font-semibold">Cloudflare 配置</h2>
                  {setupData.cloudflare.hasPermissions && <CheckCircle className="w-5 h-5 text-green-500" />}
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Cloudflare R2 将用于存储您的媒体文件。我们可以自动为您配置存储桶。
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cf-account-id">Cloudflare 账户 ID</Label>
                    <Input
                      id="cf-account-id"
                      value={setupData.cloudflare.accountId}
                      onChange={(e) => handleInputChange("cloudflare", "accountId", e.target.value)}
                      placeholder="您的 Cloudflare 账户 ID"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cf-api-token">API 令牌</Label>
                    <Input
                      id="cf-api-token"
                      type="password"
                      value={setupData.cloudflare.apiToken}
                      onChange={(e) => handleInputChange("cloudflare", "apiToken", e.target.value)}
                      placeholder="Cloudflare API 令牌"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="r2-bucket-name">R2 存储桶名称</Label>
                    <Input
                      id="r2-bucket-name"
                      value={setupData.cloudflare.r2BucketName}
                      onChange={(e) => handleInputChange("cloudflare", "r2BucketName", e.target.value)}
                      placeholder="blog-assets"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={requestCloudflarePermissions}
                    disabled={!setupData.cloudflare.accountId || !setupData.cloudflare.apiToken}
                    className="flex-1"
                  >
                    <CloudIcon className="w-4 h-4 mr-2" />
                    验证 Cloudflare 权限
                  </Button>
                  <Button variant="outline" onClick={autoConfigureR2} disabled={!setupData.cloudflare.hasPermissions}>
                    自动配置 R2 存储
                  </Button>
                </div>

                {setupData.cloudflare.hasPermissions && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>Cloudflare 权限验证成功！R2 存储已准备就绪。</AlertDescription>
                  </Alert>
                )}
              </div>
            </TabsContent>

            <TabsContent value="site" className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">网站基本设置</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="site-title">网站标题</Label>
                    <Input
                      id="site-title"
                      value={setupData.site.title}
                      onChange={(e) => handleInputChange("site", "title", e.target.value)}
                      placeholder="我的博客"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site-language">默认语言</Label>
                    <select
                      id="site-language"
                      value={setupData.site.language}
                      onChange={(e) => handleInputChange("site", "language", e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md"
                    >
                      <option value="zh">中文</option>
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="site-description">网站描述</Label>
                  <Input
                    id="site-description"
                    value={setupData.site.description}
                    onChange={(e) => handleInputChange("site", "description", e.target.value)}
                    placeholder="基于 GitHub Pages 的现代博客系统"
                  />
                </div>

                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>设置完成后，您将可以开始使用博客系统的所有功能。</AlertDescription>
                </Alert>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-8">
            <div className="flex gap-2">
              {currentStep > 0 && (
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  上一步
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="ghost" onClick={onSkip}>
                跳过设置
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button onClick={nextStep}>
                  下一步
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={completeSetup}>完成设置</Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
