"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function SetupPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 简单的加载效果
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">博客系统设置</h1>
          <p className="text-gray-600 mt-2">配置您的博客系统</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-6 space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-medium">欢迎使用设置向导</h2>
              <p className="text-gray-600">请完成以下步骤来设置您的博客系统：</p>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                <h3 className="font-medium text-green-800">1. GitHub 连接</h3>
                <p className="text-sm text-green-700">配置 GitHub OAuth 应用</p>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                <h3 className="font-medium text-blue-800">2. 数据库设置</h3>
                <p className="text-sm text-blue-700">配置数据库连接</p>
              </div>

              <div className="p-3 bg-purple-50 border border-purple-200 rounded-md">
                <h3 className="font-medium text-purple-800">3. 内容配置</h3>
                <p className="text-sm text-purple-700">设置博客内容和主题</p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/"
                className="block w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white text-center rounded-md transition-colors"
              >
                返回首页
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
