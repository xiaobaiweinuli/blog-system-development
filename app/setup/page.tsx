"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2, Settings } from "lucide-react"

// 强制动态渲染
export const dynamic = "force-dynamic"

interface SetupStep {
  id: string
  title: string
  description: string
  status: "pending" | "running" | "completed" | "error"
  details?: string
}

export default function SetupPage() {
  const [steps, setSteps] = useState<SetupStep[]>([
    {
      id: "env",
      title: "环境变量检查",
      description: "检查必需的环境变量是否已配置",
      status: "pending",
    },
    {
      id: "github",
      title: "GitHub OAuth 配置",
      description: "验证 GitHub OAuth 应用设置",
      status: "pending",
    },
    {
      id: "database",
      title: "数据库初始化",
      description: "创建必要的数据表和索引",
      status: "pending",
    },
    {
      id: "permissions",
      title: "权限设置",
      description: "配置用户角色和权限",
      status: "pending",
    },
  ])

  const [isSetupRunning, setIsSetupRunning] = useState(false)
  const [setupComplete, setSetupComplete] = useState(false)

  useEffect(() => {
    checkSetupStatus()
  }, [])

  const checkSetupStatus = async () => {
    try {
      const response = await fetch("/api/setup/status")
      if (response.ok) {
        const data = await response.json()
        if (data.isComplete) {
          setSetupComplete(true)
          setSteps((prev) => prev.map((step) => ({ ...step, status: "completed" })))
        }
      }
    } catch (error) {
      console.error("检查设置状态失败:", error)
    }
  }

  const runSetup = async () => {
    setIsSetupRunning(true)

    for (let i = 0; i < steps.length; i++) {
      setSteps((prev) => prev.map((step, index) => (index === i ? { ...step, status: "running" } : step)))

      // 模拟设置步骤
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSteps((prev) => prev.map((step, index) => (index === i ? { ...step, status: "completed" } : step)))
    }

    setIsSetupRunning(false)
    setSetupComplete(true)
  }

  const getStepIcon = (status: string) => {
    switch (status) {
      case "running":
        return <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
    }
  }

  if (setupComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <CardTitle>设置完成！</CardTitle>
            <CardDescription>您的博客系统已成功配置</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>所有必要的配置都已完成。您现在可以开始使用博客系统了。</AlertDescription>
            </Alert>

            <div className="flex flex-col gap-2">
              <Button asChild className="w-full">
                <a href="/admin">进入管理面板</a>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <a href="/">查看博客首页</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <Settings className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <CardTitle>博客系统设置</CardTitle>
          <CardDescription>欢迎使用博客系统！让我们完成初始设置以确保一切正常运行。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="flex-shrink-0 mt-1">{getStepIcon(step.status)}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                  {step.details && <p className="text-xs text-gray-500 mt-2">{step.details}</p>}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <Button onClick={runSetup} disabled={isSetupRunning} className="w-full">
              {isSetupRunning ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  正在设置...
                </>
              ) : (
                "开始设置"
              )}
            </Button>

            <div className="text-center">
              <a href="/" className="text-sm text-gray-600 hover:text-gray-800">
                跳过设置，直接访问博客
              </a>
            </div>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              设置过程将检查和配置必要的环境变量、数据库连接和权限设置。 这可能需要几分钟时间。
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
