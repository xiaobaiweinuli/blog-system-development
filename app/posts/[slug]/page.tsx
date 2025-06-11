"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, Tag, ArrowLeft, Share2, Edit, Eye } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { MarkdownPreview } from "@/components/markdown-preview"

// 模拟文章数据
const mockPosts = [
  {
    id: "1",
    title: "如何搭建设计自己的博客网站？",
    slug: "how-to-build-blog-website",
    excerpt:
      "博客是我一直以来都想拥有的东西，但一直没有找到合适的平台来写。因此，我自己动手，花了一些时间，终于把博客搭建起来了。",
    content: `# 如何搭建设计自己的博客网站？

博客是我一直以来都想拥有的东西，但一直没有找到合适的平台来写。因此，我自己动手，花了一些时间，终于把博客搭建起来了。

## 目录

1. [合适的架构](#合适的架构)
2. [静态：Hexo 和 Hugo](#静态hexo-和-hugo)
3. [我全部的想法：Next.js](#我全部的想法nextjs)

## 合适的架构

在开始搭建博客之前，我需要考虑几个关键问题：

- **性能要求**：页面加载速度要快
- **SEO 优化**：搜索引擎友好
- **维护成本**：易于维护和更新
- **扩展性**：支持未来功能扩展

## 静态：Hexo 和 Hugo

最初我考虑了静态网站生成器：

### Hexo
- 基于 Node.js
- 丰富的主题生态
- 简单的配置

### Hugo
- 构建速度极快
- Go 语言编写
- 强大的模板系统

但是静态生成器有一些限制：
- 动态功能有限
- 评论系统需要第三方服务
- 管理界面不够友好

## 我全部的想法：Next.js

最终我选择了 Next.js，原因如下：

### 技术优势
- **服务端渲染 (SSR)**：更好的 SEO 和首屏加载速度
- **静态生成 (SSG)**：可以预生成静态页面
- **API 路由**：可以构建后端 API
- **React 生态**：丰富的组件库

### 功能特性
- **管理后台**：可以在线编辑文章
- **用户认证**：GitHub OAuth 登录
- **评论系统**：集成 Giscus
- **媒体管理**：Cloudflare R2 存储

### 部署方案
- **Vercel**：一键部署，自动 CI/CD
- **GitHub**：代码托管和版本控制
- **Cloudflare**：CDN 和存储服务

## 总结

通过使用 Next.js + GitHub + Cloudflare + Vercel 的技术栈，我成功搭建了一个功能完整、性能优秀的博客系统。

这个方案的优点：
- ✅ 完全免费（在合理使用范围内）
- ✅ 性能优秀
- ✅ SEO 友好
- ✅ 易于维护
- ✅ 功能丰富

如果你也想搭建自己的博客，不妨试试这个方案！`,
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
    content: `# Next.js 15 新特性详解

Next.js 15 是一个重要的版本更新，带来了许多令人兴奋的新特性和改进。

## 主要新特性

### 1. 新的编译器
- 基于 Rust 的 Turbopack
- 更快的构建速度
- 改进的热重载

### 2. 改进的 App Router
- 更好的路由性能
- 新的布局系统
- 改进的错误处理

### 3. 服务器组件优化
- 更好的流式渲染
- 改进的缓存策略
- 新的数据获取模式

## 升级指南

如果你想升级到 Next.js 15，请按照以下步骤：

1. 更新 package.json
2. 检查破坏性变更
3. 测试应用功能
4. 部署到生产环境

## 总结

Next.js 15 是一个值得升级的版本，带来了显著的性能提升和开发体验改进。`,
    publishedAt: "2024-01-15",
    tags: ["Next.js", "React", "前端开发"],
    author: "作者",
    readingTime: 6,
    views: 856,
    featured: false,
  },
]

export default function PostPage() {
  const params = useParams()
  const slug = params.slug as string
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [relatedPosts, setRelatedPosts] = useState<any[]>([])
  const { isAdmin } = useAuth()

  useEffect(() => {
    // 模拟加载文章
    const foundPost = mockPosts.find((p) => p.slug === slug)
    if (foundPost) {
      setPost(foundPost)
      // 查找相关文章
      const related = mockPosts
        .filter((p) => p.slug !== slug && p.tags.some((tag) => foundPost.tags.includes(tag)))
        .slice(0, 3)
      setRelatedPosts(related)
    }
    setLoading(false)
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-8"></div>
            <div className="h-64 bg-gray-300 rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">文章未找到</h1>
          <p className="text-gray-600 mb-8">抱歉，您访问的文章不存在或已被删除。</p>
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回首页
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* 返回按钮 */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回首页
            </Link>
          </Button>
        </div>

        {/* 文章头部 */}
        <article className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <header className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.publishedAt}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readingTime} 分钟阅读
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {post.views} 次阅读
                </span>
              </div>
              <div className="flex gap-2">
                {isAdmin() && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/posts/${post.id}/edit`}>
                      <Edit className="w-4 h-4 mr-2" />
                      编辑
                    </Link>
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  分享
                </Button>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

            <div className="flex items-center gap-2 mb-6">
              {post.featured && <Badge className="bg-purple-100 text-purple-800">精选</Badge>}
              {post.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="hover:bg-purple-100">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>

            <p className="text-xl text-gray-600 leading-relaxed">{post.excerpt}</p>
          </header>

          <Separator className="mb-8" />

          {/* 文章内容 */}
          <div className="prose prose-lg max-w-none">
            <MarkdownPreview content={post.content} />
          </div>
        </article>

        {/* 相关文章 */}
        {relatedPosts.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">相关文章</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="p-6 hover-lift">
                  <Link href={`/posts/${relatedPost.slug}`}>
                    <h3 className="font-bold text-gray-900 hover:text-purple-600 transition-colors mb-2">
                      {relatedPost.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{relatedPost.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{relatedPost.publishedAt}</span>
                    <span>{relatedPost.readingTime} 分钟阅读</span>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
