"use client"

import Link from "next/link"
import { Github, Twitter, Mail, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 关于 */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-bold text-gray-900">我的博客</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-md">
              一个简洁优雅的博客系统，专注于内容创作与分享。使用 Next.js 构建，追求极致的用户体验。
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                className="text-gray-400 hover:text-purple-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-purple-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a href="mailto:contact@example.com" className="text-gray-400 hover:text-purple-600 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">快速链接</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-purple-600 transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link href="/til" className="text-gray-600 hover:text-purple-600 transition-colors">
                  T.I.L
                </Link>
              </li>
              <li>
                <Link href="/stats" className="text-gray-600 hover:text-purple-600 transition-colors">
                  统计
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-purple-600 transition-colors">
                  关于
                </Link>
              </li>
            </ul>
          </div>

          {/* 技术栈 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">技术栈</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Next.js 15</li>
              <li>React 18</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>GitHub OAuth</li>
              <li>Cloudflare R2</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p className="flex items-center gap-1">
            © 2024 我的博客. 用
            <Heart className="w-4 h-4 text-red-500" />
            制作
          </p>
          <p className="mt-2 md:mt-0">Powered by Next.js & Vercel</p>
        </div>
      </div>
    </footer>
  )
}
