"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("应用错误:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center text-center">
          <div className="p-3 bg-red-100 rounded-full mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">出现错误</h1>
          <p className="text-gray-600 mb-6">抱歉，应用遇到了一个错误。请尝试刷新页面或返回首页。</p>

          {process.env.NODE_ENV === "development" && (
            <div className="p-3 bg-gray-100 rounded-md mb-6 w-full">
              <p className="text-sm text-gray-600 font-mono text-left">{error.message}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button onClick={reset} className="flex-1">
              <RefreshCw className="mr-2 h-4 w-4" />
              重试
            </Button>
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full">
                <Home className="mr-2 h-4 w-4" />
                返回首页
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
