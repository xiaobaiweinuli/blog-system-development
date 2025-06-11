"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Calendar, Clock, Tag, Edit, Plus, TrendingUp } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

// 模拟文章数据
const mockPosts = [
  {
    id: "1",
    title: "如何搭建设计自己的博客网站？",
    slug: "how-to-build-blog-website",
    excerpt:
      "博客是我一直以来都想拥有的东西，但一直没有找到合适的平台来写。因此，我自己动手，花了一些时间，终于把博客搭建起来了。",
    content: "# 如何搭建设计自己的博客网站？\n\n博客是我一直以来都想拥有的东西...",
    publishedAt: "2024-10-18",
    tags: ["博客", "网站设计", "技术分享"],
    author: "作者",
    readingTime: 8,
    views: 1234,
    featured: true,
  },
  {
    id: "2",
    title: "Next.js 15 新特性详解",
    slug: "nextjs-15-new-features",
    excerpt: "深入了解 Next.js 15 带来的革命性变化，包括新的编译器、改进的性能和开发体验。",
    content: "# Next.js 15 新特性详解\n\n这是一篇关于 Next.js 15 新特性的详细介绍...",
    publishedAt: "2024-01-15",
    tags: ["Next.js", "React", "前端开发"],
    author: "作者",
    readingTime: 6,
    views: 856,
    featured: false,
  },
  {
    id: "3",
    title: "现代前端开发工具链",
    slug: "modern-frontend-toolchain",
    excerpt: "探索现代前端开发中必不可少的工具链，从构建工具到部署平台的完整指南。",
    content: "# 现代前端开发工具链\n\n本文将介绍现代前端开发的工具链...",
    publishedAt: "2024-01-12",
    tags: ["前端", "工具", "开发"],
    author: "作者",
    readingTime: 10,
    views: 642,
    featured: false,
  },
]

const mockStats = {
  totalPosts: 12,
  totalViews: 15420,
  totalTags: 8,
}

export default function HomePage() {
  const [posts, setPosts] = useState(mockPosts)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState("")
  const { isAuthenticated, isAdmin } = useAuth()

  // 获取所有标签
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)))

  // 过滤文章
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = !selectedTag || post.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  // 分离置顶文章
  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* 主要内容区域 */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* 博客介绍 */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">我的博客</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">分享技术思考与生活感悟，记录成长路上的点点滴滴</p>

          {/* 统计信息 */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{mockStats.totalPosts}</div>
              <div className="text-sm text-gray-600">篇文章</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{mockStats.totalViews.toLocaleString()}</div>
              <div className="text-sm text-gray-600">次阅读</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{mockStats.totalTags}</div>
              <div className="text-sm text-gray-600">个标签</div>
            </div>
          </div>

          {/* 搜索框 */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="搜索文章..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-3 text-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </section>

        {/* 管理员快捷操作 */}
        {isAdmin() && (
          <div className="mb-8 p-4 bg-purple-50 rounded-lg border border-purple-200 fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-purple-900">管理面板</h3>
                <p className="text-sm text-purple-700">快速管理您的博客内容</p>
              </div>
              <div className="flex gap-2">
                <Button asChild size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Link href="/admin/posts/new">
                    <Plus className="w-4 h-4 mr-2" />
                    写文章
                  </Link>
                </Button>
                <Button variant="outline" asChild size="sm">
                  <Link href="/admin">
                    <Edit className="w-4 h-4 mr-2" />
                    管理后台
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 主内容区 */}
          <div className="lg:col-span-3 space-y-8">
            {/* 标签过滤 */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedTag === "" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag("")}
                  className={selectedTag === "" ? "bg-purple-600 hover:bg-purple-700" : ""}
                >
                  全部
                </Button>
                {allTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTag(tag)}
                    className={selectedTag === tag ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            )}

            {/* 置顶文章 */}
            {featuredPosts.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                  精选文章
                </h2>
                <div className="space-y-6">
                  {featuredPosts.map((post) => (
                    <Card key={post.id} className="p-6 hover-lift border-l-4 border-l-purple-500">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">精选</Badge>
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {post.publishedAt}
                            </span>
                          </div>
                          <Link href={`/posts/${post.slug}`}>
                            <h3 className="text-2xl font-bold text-gray-900 hover:text-purple-600 transition-colors mb-3">
                              {post.title}
                            </h3>
                          </Link>
                          <p className="text-gray-600 leading-relaxed mb-4">{post.excerpt}</p>
                        </div>
                        {isAdmin() && (
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/admin/posts/${post.id}/edit`}>
                              <Edit className="w-4 h-4" />
                            </Link>
                          </Button>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readingTime} 分钟阅读
                          </span>
                          <span>{post.views} 次阅读</span>
                        </div>
                        <div className="flex gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="cursor-pointer hover:bg-purple-100"
                              onClick={() => setSelectedTag(tag)}
                            >
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* 最新文章 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {featuredPosts.length > 0 ? "最新文章" : "所有文章"}
              </h2>

              {regularPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">没有找到匹配的文章</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {regularPosts.map((post) => (
                    <Card key={post.id} className="p-6 hover-lift">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>{post.publishedAt}</span>
                            <span>•</span>
                            <Clock className="w-4 h-4" />
                            <span>{post.readingTime} 分钟阅读</span>
                          </div>
                          <Link href={`/posts/${post.slug}`}>
                            <h3 className="text-xl font-bold text-gray-900 hover:text-purple-600 transition-colors mb-3">
                              {post.title}
                            </h3>
                          </Link>
                          <p className="text-gray-600 leading-relaxed mb-4">{post.excerpt}</p>
                        </div>
                        {isAdmin() && (
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/admin/posts/${post.id}/edit`}>
                              <Edit className="w-4 h-4" />
                            </Link>
                          </Button>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">{post.views} 次阅读</div>
                        <div className="flex gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="cursor-pointer hover:bg-purple-100"
                              onClick={() => setSelectedTag(tag)}
                            >
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* 侧边栏 */}
          <div className="space-y-6">
            {/* 关于我 */}
            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">关于我</h3>
              <div className="text-center mb-4">
                <img
                  src="/placeholder.svg?height=80&width=80"
                  alt="头像"
                  className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-purple-100"
                />
                <h4 className="font-semibold text-gray-900">博主</h4>
                <p className="text-sm text-gray-600">前端开发工程师</p>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                热爱技术，专注于前端开发和用户体验设计。喜欢分享技术心得和生活感悟。
              </p>
            </Card>

            {/* 热门标签 */}
            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5 text-purple-600" />
                热门标签
              </h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => {
                  const count = posts.filter((post) => post.tags.includes(tag)).length
                  return (
                    <Badge
                      key={tag}
                      variant={selectedTag === tag ? "default" : "secondary"}
                      className={`cursor-pointer transition-colors ${
                        selectedTag === tag ? "bg-purple-600 hover:bg-purple-700" : "hover:bg-purple-100"
                      }`}
                      onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
                    >
                      {tag} ({count})
                    </Badge>
                  )
                })}
              </div>
            </Card>

            {/* 最新评论 */}
            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">最新评论</h3>
              <div className="space-y-3">
                <div className="flex space-x-3">
                  <img src="/placeholder.svg?height=32&width=32" alt="用户头像" className="w-8 h-8 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">张三</p>
                    <p className="text-xs text-gray-600 truncate">这篇文章写得很好，学到了很多...</p>
                    <p className="text-xs text-gray-500">2 小时前</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <img src="/placeholder.svg?height=32&width=32" alt="用户头像" className="w-8 h-8 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">李四</p>
                    <p className="text-xs text-gray-600 truncate">感谢分享，期待更多内容...</p>
                    <p className="text-xs text-gray-500">1 天前</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
