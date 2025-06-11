"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  FileText,
  Users,
  BarChart3,
  Settings,
  ArrowLeft,
  TrendingUp,
  Clock,
  MessageCircle,
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { RoleGuard } from "@/components/role-guard"

// 模拟数据
const mockPosts = [
  {
    id: "1",
    title: "如何搭建设计自己的博客网站？",
    slug: "how-to-build-blog-website",
    status: "published",
    publishedAt: "2024-10-18",
    views: 1234,
    comments: 23,
    featured: true,
  },
  {
    id: "2",
    title: "Next.js 15 新特性详解",
    slug: "nextjs-15-new-features",
    status: "published",
    publishedAt: "2024-01-15",
    views: 856,
    comments: 15,
    featured: false,
  },
  {
    id: "3",
    title: "现代前端开发工具链",
    slug: "modern-frontend-toolchain",
    status: "draft",
    publishedAt: null,
    views: 0,
    comments: 0,
    featured: false,
  },
]

const mockStats = {
  totalPosts: 12,
  publishedPosts: 8,
  draftPosts: 4,
  totalViews: 15420,
  totalComments: 89,
  todayViews: 234,
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState(mockPosts)
  const [searchQuery, setSearchQuery] = useState("")
  const { user } = useAuth()

  const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleDeletePost = (id: string) => {
    if (confirm("确定要删除这篇文章吗？")) {
      setPosts(posts.filter((post) => post.id !== id))
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">已发布</Badge>
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">草稿</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <RoleGuard requiredRole="admin" redirectTo="/unauthorized">
      <div className="min-h-screen bg-gray-50">
        {/* 顶部导航 */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" asChild>
                  <Link href="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    返回博客
                  </Link>
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">管理后台</h1>
                  <p className="text-gray-600">欢迎回来，{user?.name || "管理员"}</p>
                </div>
              </div>
              <Button asChild className="bg-purple-600 hover:bg-purple-700">
                <Link href="/admin/posts/new">
                  <Plus className="w-4 h-4 mr-2" />
                  写文章
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* 统计卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">总文章数</p>
                    <p className="text-3xl font-bold text-gray-900">{mockStats.totalPosts}</p>
                    <p className="text-xs text-green-600 mt-1">+{mockStats.publishedPosts} 已发布</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">总阅读量</p>
                    <p className="text-3xl font-bold text-gray-900">{mockStats.totalViews.toLocaleString()}</p>
                    <p className="text-xs text-green-600 mt-1">+{mockStats.todayViews} 今日</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">总评论数</p>
                    <p className="text-3xl font-bold text-gray-900">{mockStats.totalComments}</p>
                    <p className="text-xs text-green-600 mt-1">活跃互动</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">草稿文章</p>
                    <p className="text-3xl font-bold text-gray-900">{mockStats.draftPosts}</p>
                    <p className="text-xs text-yellow-600 mt-1">待发布</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 文章管理 */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>最近文章</CardTitle>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="搜索文章..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                      <Button variant="outline" asChild>
                        <Link href="/admin/posts">查看全部</Link>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredPosts.map((post) => (
                      <div
                        key={post.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900 truncate">{post.title}</h3>
                            {getStatusBadge(post.status)}
                            {post.featured && (
                              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">精选</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>/{post.slug}</span>
                            {post.publishedAt && <span>{new Date(post.publishedAt).toLocaleDateString()}</span>}
                            <span>{post.views} 阅读</span>
                            <span>{post.comments} 评论</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/posts/${post.slug}`}>
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/admin/posts/${post.id}/edit`}>
                              <Edit className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeletePost(post.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 快捷操作 */}
            <div className="space-y-6">
              <Card className="hover-lift cursor-pointer">
                <CardContent className="p-6">
                  <Link href="/admin/posts" className="block">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">文章管理</h3>
                        <p className="text-sm text-gray-600">创建、编辑和管理您的博客文章</p>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover-lift cursor-pointer">
                <CardContent className="p-6">
                  <Link href="/admin/analytics" className="block">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">数据分析</h3>
                        <p className="text-sm text-gray-600">查看博客访问量和用户行为</p>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover-lift cursor-pointer">
                <CardContent className="p-6">
                  <Link href="/admin/settings" className="block">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Settings className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">系统设置</h3>
                        <p className="text-sm text-gray-600">配置博客基本信息和偏好</p>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover-lift cursor-pointer">
                <CardContent className="p-6">
                  <Link href="/admin/media" className="block">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">媒体管理</h3>
                        <p className="text-sm text-gray-600">管理图片、文件等媒体资源</p>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  )
}
