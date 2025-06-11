"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Github, Settings, ExternalLink, Check, AlertCircle, RefreshCw } from "lucide-react"

interface Repository {
  id: string
  name: string
  full_name: string
  private: boolean
  discussions_enabled: boolean
}

interface GiscusConfig {
  repo: string
  repoId: string
  category: string
  categoryId: string
  mapping: string
  strict: boolean
  reactionsEnabled: boolean
  inputPosition: "top" | "bottom"
  theme: string
  loading: "lazy" | "eager"
}

export default function CommentsPage() {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null)
  const [giscusConfig, setGiscusConfig] = useState<GiscusConfig>({
    repo: "",
    repoId: "",
    category: "",
    categoryId: "",
    mapping: "pathname",
    strict: false,
    reactionsEnabled: true,
    inputPosition: "bottom",
    theme: "preferred_color_scheme",
    loading: "lazy",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    fetchRepositories()
  }, [])

  const fetchRepositories = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/github/repositories")
      const data = await response.json()
      setRepositories(data.repositories || [])
    } catch (error) {
      console.error("获取仓库列表失败:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchDiscussionCategories = async (repo: string) => {
    try {
      const response = await fetch(`/api/github/discussions/categories?repo=${repo}`)
      const data = await response.json()
      setCategories(data.categories || [])
    } catch (error) {
      console.error("获取讨论分类失败:", error)
    }
  }

  const enableDiscussions = async (repo: string) => {
    try {
      const response = await fetch("/api/github/enable-discussions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repo }),
      })

      if (response.ok) {
        // 刷新仓库列表
        fetchRepositories()
      }
    } catch (error) {
      console.error("启用讨论功能失败:", error)
    }
  }

  const createCommentsCategory = async (repo: string) => {
    try {
      const response = await fetch("/api/github/create-comments-category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repo }),
      })

      if (response.ok) {
        const data = await response.json()
        setGiscusConfig((prev) => ({
          ...prev,
          category: data.category.name,
          categoryId: data.category.id,
        }))
        fetchDiscussionCategories(repo)
      }
    } catch (error) {
      console.error("创建评论分类失败:", error)
    }
  }

  const handleRepoSelect = (repoFullName: string) => {
    const repo = repositories.find((r) => r.full_name === repoFullName)
    if (repo) {
      setSelectedRepo(repo)
      setGiscusConfig((prev) => ({
        ...prev,
        repo: repo.full_name,
        repoId: repo.id,
      }))
      fetchDiscussionCategories(repo.full_name)
    }
  }

  const handleConfigChange = (field: keyof GiscusConfig, value: any) => {
    setGiscusConfig((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const saveGiscusConfig = async () => {
    try {
      const response = await fetch("/api/giscus/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(giscusConfig),
      })

      if (response.ok) {
        console.log("Giscus 配置已保存")
      }
    } catch (error) {
      console.error("保存 Giscus 配置失败:", error)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">评论系统管理</h1>
          <p className="text-muted-foreground">配置基于 GitHub Discussions 的 Giscus 评论系统</p>
        </div>
        <Button onClick={saveGiscusConfig}>
          <Settings className="w-4 h-4 mr-2" />
          保存配置
        </Button>
      </div>

      <div className="grid gap-6">
        <Tabs defaultValue="setup">
          <TabsList className="mb-4">
            <TabsTrigger value="setup">
              <Github className="w-4 h-4 mr-2" />
              仓库设置
            </TabsTrigger>
            <TabsTrigger value="config">
              <Settings className="w-4 h-4 mr-2" />
              Giscus 配置
            </TabsTrigger>
            <TabsTrigger value="preview">
              <MessageSquare className="w-4 h-4 mr-2" />
              预览
            </TabsTrigger>
          </TabsList>

          <TabsContent value="setup">
            <Card>
              <CardHeader>
                <CardTitle>选择评论仓库</CardTitle>
                <CardDescription>
                  选择或创建一个 GitHub 仓库来存储博客评论。仓库必须启用 Discussions 功能。
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>选择仓库</Label>
                  <div className="flex gap-2">
                    <Select value={selectedRepo?.full_name || ""} onValueChange={handleRepoSelect}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="选择一个仓库" />
                      </SelectTrigger>
                      <SelectContent>
                        {repositories.map((repo) => (
                          <SelectItem key={repo.id} value={repo.full_name}>
                            <div className="flex items-center gap-2">
                              <span>{repo.full_name}</span>
                              {repo.private && <Badge variant="secondary">私有</Badge>}
                              {repo.discussions_enabled && (
                                <Badge variant="outline" className="text-green-500">
                                  Discussions
                                </Badge>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={fetchRepositories} disabled={isLoading}>
                      {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {selectedRepo && (
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{selectedRepo.full_name}</h3>
                        <div className="flex gap-2">
                          {selectedRepo.private && <Badge variant="secondary">私有</Badge>}
                          {selectedRepo.discussions_enabled ? (
                            <Badge variant="outline" className="text-green-500">
                              <Check className="w-3 h-3 mr-1" />
                              Discussions 已启用
                            </Badge>
                          ) : (
                            <Badge variant="destructive">Discussions 未启用</Badge>
                          )}
                        </div>
                      </div>

                      {!selectedRepo.discussions_enabled && (
                        <div className="space-y-2">
                          <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              此仓库未启用 Discussions 功能。您需要启用它才能使用 Giscus 评论系统。
                            </AlertDescription>
                          </Alert>
                          <div className="flex gap-2">
                            <Button onClick={() => enableDiscussions(selectedRepo.full_name)}>启用 Discussions</Button>
                            <Button variant="outline" asChild>
                              <a
                                href={`https://github.com/${selectedRepo.full_name}/settings`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <ExternalLink className="w-4 h-4 mr-2" />在 GitHub 中设置
                              </a>
                            </Button>
                          </div>
                        </div>
                      )}

                      {selectedRepo.discussions_enabled && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">评论分类</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => createCommentsCategory(selectedRepo.full_name)}
                            >
                              创建评论分类
                            </Button>
                          </div>
                          {categories.length > 0 && (
                            <Select
                              value={giscusConfig.categoryId}
                              onValueChange={(value) => {
                                const category = categories.find((c) => c.id === value)
                                if (category) {
                                  handleConfigChange("category", category.name)
                                  handleConfigChange("categoryId", category.id)
                                }
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="选择讨论分类" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="config">
            <Card>
              <CardHeader>
                <CardTitle>Giscus 配置</CardTitle>
                <CardDescription>自定义评论系统的外观和行为</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>页面映射方式</Label>
                    <Select
                      value={giscusConfig.mapping}
                      onValueChange={(value) => handleConfigChange("mapping", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pathname">路径名</SelectItem>
                        <SelectItem value="url">完整 URL</SelectItem>
                        <SelectItem value="title">页面标题</SelectItem>
                        <SelectItem value="og:title">OG 标题</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>主题</Label>
                    <Select value={giscusConfig.theme} onValueChange={(value) => handleConfigChange("theme", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="preferred_color_scheme">跟随系统</SelectItem>
                        <SelectItem value="light">浅色</SelectItem>
                        <SelectItem value="dark">深色</SelectItem>
                        <SelectItem value="dark_dimmed">深色（柔和）</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>输入框位置</Label>
                    <Select
                      value={giscusConfig.inputPosition}
                      onValueChange={(value: "top" | "bottom") => handleConfigChange("inputPosition", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="top">顶部</SelectItem>
                        <SelectItem value="bottom">底部</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>加载方式</Label>
                    <Select
                      value={giscusConfig.loading}
                      onValueChange={(value: "lazy" | "eager") => handleConfigChange("loading", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lazy">懒加载</SelectItem>
                        <SelectItem value="eager">立即加载</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>启用反应表情</Label>
                      <p className="text-sm text-muted-foreground">允许用户对评论添加表情反应</p>
                    </div>
                    <Switch
                      checked={giscusConfig.reactionsEnabled}
                      onCheckedChange={(checked) => handleConfigChange("reactionsEnabled", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>严格模式</Label>
                      <p className="text-sm text-muted-foreground">只显示与当前页面完全匹配的讨论</p>
                    </div>
                    <Switch
                      checked={giscusConfig.strict}
                      onCheckedChange={(checked) => handleConfigChange("strict", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>评论系统预览</CardTitle>
                <CardDescription>查看 Giscus 评论系统在您的博客中的显示效果</CardDescription>
              </CardHeader>
              <CardContent>
                {giscusConfig.repo && giscusConfig.repoId && giscusConfig.category && giscusConfig.categoryId ? (
                  <div className="border rounded-lg p-4">
                    <div className="mb-4">
                      <h3 className="font-medium">配置信息</h3>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>仓库: {giscusConfig.repo}</p>
                        <p>分类: {giscusConfig.category}</p>
                        <p>映射: {giscusConfig.mapping}</p>
                        <p>主题: {giscusConfig.theme}</p>
                      </div>
                    </div>

                    {/* 这里会显示实际的 Giscus 组件 */}
                    <div className="bg-muted/20 rounded-lg p-8 text-center">
                      <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Giscus 评论组件将显示在这里</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        在实际的博客文章页面中，用户可以在这里查看和发表评论
                      </p>
                    </div>
                  </div>
                ) : (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>请先完成仓库设置和配置，然后才能预览评论系统。</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
