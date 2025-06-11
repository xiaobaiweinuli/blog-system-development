"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, Eye, Send, Hash, X, FileText, Settings, Clock, BarChart3 } from "lucide-react"
import { RoleGuard } from "@/components/role-guard"
import { MarkdownEditor } from "@/components/editor/markdown-editor"

export default function NewPostPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("content")

  // 表单状态
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    tags: [],
    status: "draft",
    featured: false,
    coverImage: "",
  })

  const [tagInput, setTagInput] = useState("")

  // 自动生成 slug
  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: title
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
        .replace(/^-+|-+$/g, ""),
    }))
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }))
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSave = async (publish = false) => {
    setIsLoading(true)
    try {
      const postData = {
        ...formData,
        status: publish ? "published" : formData.status,
      }

      // 模拟 API 调用
      console.log("保存文章:", postData)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      router.push("/admin")
    } catch (error) {
      console.error("保存文章失败:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const wordCount = formData.content.split(/\s+/).filter(Boolean).length
  const readingTime = Math.ceil(wordCount / 200)

  return (
    <RoleGuard requiredRole="admin" redirectTo="/unauthorized">
      <div className="min-h-screen bg-gray-50">
        {/* 顶部工具栏 */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" asChild>
                  <Link href="/admin">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    返回管理后台
                  </Link>
                </Button>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">写文章</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={formData.status === "published" ? "default" : "secondary"}>
                      {formData.status === "published" ? "已发布" : "草稿"}
                    </Badge>
                    {formData.featured && (
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">精选</Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => handleSave(false)} disabled={isLoading || !formData.title}>
                  <Save className="w-4 h-4 mr-2" />
                  保存草稿
                </Button>
                <Button
                  onClick={() => handleSave(true)}
                  disabled={isLoading || !formData.title || !formData.content}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Send className="w-4 h-4 mr-2" />
                  发布文章
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* 主内容区 */}
            <div className="lg:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="content" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    内容编辑
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    文章设置
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-6">
                  {/* 基本信息 */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="title" className="text-base font-medium">
                            文章标题
                          </Label>
                          <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => handleTitleChange(e.target.value)}
                            placeholder="输入一个吸引人的标题..."
                            className="text-lg mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="slug" className="text-base font-medium">
                            URL 地址
                          </Label>
                          <Input
                            id="slug"
                            value={formData.slug}
                            onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                            placeholder="url-slug"
                            className="mt-2"
                          />
                          <p className="text-sm text-gray-500 mt-1">文章链接：/{formData.slug || "url-slug"}</p>
                        </div>
                        <div>
                          <Label htmlFor="excerpt" className="text-base font-medium">
                            文章摘要
                          </Label>
                          <Textarea
                            id="excerpt"
                            value={formData.excerpt}
                            onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                            placeholder="简要描述文章内容，将显示在文章列表中..."
                            rows={3}
                            className="mt-2"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 内容编辑器 */}
                  <Card>
                    <CardHeader>
                      <CardTitle>文章内容</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <MarkdownEditor
                        value={formData.content}
                        onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
                        placeholder="开始写作您的精彩内容..."
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings" className="space-y-6">
                  {/* 发布设置 */}
                  <Card>
                    <CardHeader>
                      <CardTitle>发布设置</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="status">文章状态</Label>
                        <Select
                          value={formData.status}
                          onValueChange={(status) => setFormData((prev) => ({ ...prev, status }))}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">草稿</SelectItem>
                            <SelectItem value="published">已发布</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="featured">精选文章</Label>
                          <p className="text-sm text-gray-600">在首页突出显示这篇文章</p>
                        </div>
                        <Switch
                          id="featured"
                          checked={formData.featured}
                          onCheckedChange={(featured) => setFormData((prev) => ({ ...prev, featured }))}
                        />
                      </div>

                      <div>
                        <Label htmlFor="coverImage">封面图片 URL</Label>
                        <Input
                          id="coverImage"
                          value={formData.coverImage}
                          onChange={(e) => setFormData((prev) => ({ ...prev, coverImage: e.target.value }))}
                          placeholder="https://example.com/image.jpg"
                          className="mt-2"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* 侧边栏 */}
            <div className="space-y-6">
              {/* 标签管理 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    文章标签
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 hover:text-red-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="添加标签..."
                      onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                    />
                    <Button onClick={handleAddTag} variant="outline" size="sm">
                      添加
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 文章预览 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    文章预览
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">标题</p>
                      <p className="font-semibold">{formData.title || "未设置标题"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">URL</p>
                      <p className="text-sm text-purple-600">/{formData.slug || "url-slug"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">字数统计</p>
                      <p className="text-sm flex items-center gap-1">
                        <BarChart3 className="w-4 h-4" />
                        {wordCount} 字
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">预计阅读时间</p>
                      <p className="text-sm flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {readingTime} 分钟
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">标签数量</p>
                      <p className="text-sm">{formData.tags.length} 个标签</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 写作提示 */}
              <Card>
                <CardHeader>
                  <CardTitle>写作提示</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• 使用清晰简洁的标题</p>
                    <p>• 添加相关标签便于分类</p>
                    <p>• 写一个吸引人的摘要</p>
                    <p>• 使用 Markdown 格式化内容</p>
                    <p>• 保存草稿避免内容丢失</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  )
}
