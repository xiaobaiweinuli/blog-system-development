import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center text-center">
          <div className="p-3 bg-purple-100 rounded-full mb-4">
            <FileQuestion className="h-8 w-8 text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">页面未找到</h1>
          <p className="text-gray-600 mb-6">抱歉，您访问的页面不存在或已被移除。</p>

          <Link href="/" className="w-full">
            <Button className="w-full">
              <Home className="mr-2 h-4 w-4" />
              返回首页
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
