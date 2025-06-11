"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { Github, LogOut, Settings, BarChart3, FileText } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const { user, isAuthenticated, logout, login } = useAuth()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
              我的博客
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
              博客
            </Link>
            <Link href="/til" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
              T.I.L
            </Link>
            <Link href="/stats" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
              统计
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
              关于
            </Link>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {isAuthenticated() ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 hover:bg-purple-50">
                    <img
                      src={user?.avatar || "/placeholder.svg"}
                      alt="头像"
                      className="w-6 h-6 rounded-full border border-gray-200"
                    />
                    <span className="hidden sm:inline font-medium">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      管理后台
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/posts" className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      文章管理
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/analytics" className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      数据统计
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="flex items-center gap-2 text-red-600 focus:text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                    退出登录
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => login()} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700">
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">GitHub 登录</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
