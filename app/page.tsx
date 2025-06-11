import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight, BookOpen, Github } from "lucide-react"

// 模拟博客文章数据
const mockPosts = [
  {
    id: "1",
    title: "欢迎使用我的博客系统",
    excerpt: "这是一个基于 Next.js 和 GitHub 的现代化博客系统，支持 Markdown 编写和自动部署。",
    author: "博主",
    date: "2024-01-15",
    tags: ["博客", "Next.js", "技术"],
    readTime: "3 分钟",
  },
  {
    id: "2",
    title: "如何配置 GitHub OAuth",
    excerpt: "详细介绍如何设置 GitHub OAuth 应用，实现用户登录和权限管理功能。",
    author: "博主",
    date: "2024-01-14",
    tags: ["GitHub", "OAuth", "认证"],
    readTime: "5 分钟",
  },
  {
    id: "3",
    title: "Markdown 写作指南",
    excerpt: "学习如何使用 Markdown 语法编写优美的博客文章，包括代码高亮、表格等高级功能。",
    author: "博主",
    date: "2024-01-13",
    tags: ["Markdown", "写作", "教程"],
    readTime: "4 分钟",
  },
]

function PostCard({ post }: { post: (typeof mockPosts)[0] }) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
            <span>•</span>
            <User className="h-4 w-4" />
            <span>{post.author}</span>
            <span>•</span>
            <BookOpen className="h-4 w-4" />
            <span>{post.readTime}</span>
          </div>
        </div>
        <CardTitle className="group-hover:text-purple-600 transition-colors">
          <Link href={`/posts/${post.id}`} className="hover:underline">
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription className="text-base leading-relaxed">{post.excerpt}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-purple-50 text-purple-700 hover:bg-purple-100">
                {tag}
              </Badge>
            ))}
          </div>
          <Link href={`/posts/${post.id}`}>
            <Button variant="ghost" size="sm" className="group/btn">
              阅读更多
              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

function HeroSection() {
  return (
    <section className="py-20 px-4 text-center bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          我的博客
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          分享技术见解，记录学习历程，探索数字世界的无限可能
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/posts">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              <BookOpen className="mr-2 h-5 w-5" />
              浏览文章
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button size="lg" variant="outline" className="border-purple-200 hover:bg-purple-50">
              <Github className="mr-2 h-5 w-5" />
              GitHub 登录
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
            <div className="text-muted-foreground">技术文章</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-purple-600 mb-2">10K+</div>
            <div className="text-muted-foreground">阅读量</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-purple-600 mb-2">100+</div>
            <div className="text-muted-foreground">GitHub Stars</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* 导航栏 */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="font-bold text-xl">我的博客</span>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link href="/posts" className="text-muted-foreground hover:text-foreground transition-colors">
              文章
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              关于
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" size="sm">
                <Github className="mr-2 h-4 w-4" />
                登录
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* 主要内容 */}
      <main>
        <HeroSection />
        <StatsSection />

        {/* 最新文章 */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-2">最新文章</h2>
                <p className="text-muted-foreground">探索最新的技术见解和学习心得</p>
              </div>
              <Link href="/posts">
                <Button variant="outline">
                  查看全部
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <Suspense fallback={<div className="text-center py-8">加载中...</div>}>
              <div className="grid gap-6">
                {mockPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </Suspense>
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="border-t bg-muted/50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">关于博客</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                这是一个基于 Next.js 和 GitHub 的现代化博客系统，专注于技术分享和知识传播。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">快速链接</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/posts" className="text-muted-foreground hover:text-foreground">
                    所有文章
                  </Link>
                </li>
                <li>
                  <Link href="/tags" className="text-muted-foreground hover:text-foreground">
                    标签
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    关于我
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    联系方式
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">社交媒体</h3>
              <div className="flex space-x-4">
                <Link href="https://github.com" className="text-muted-foreground hover:text-foreground">
                  <Github className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 我的博客. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
