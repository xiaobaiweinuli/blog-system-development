"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Save, RefreshCw, FileText, Globe, ImageIcon, Share2 } from "lucide-react"

export default function SEOPage() {
  const [seoSettings, setSeoSettings] = useState({
    siteTitle: "GitHub 博客系统",
    siteDescription: "由 Next.js 和 GitHub Pages 提供支持的现代博客系统",
    siteKeywords: "博客, GitHub, Next.js, Tailwind CSS, 内容管理",
    ogImage: "/og-image.png",
    twitterHandle: "@yourtwitterhandle",
    googleVerification: "",
    bingVerification: "",
    baiduVerification: "",
    robotsTxt: `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\nDisallow: /auth/\n\nSitemap: https://yourblog.com/sitemap.xml`,
    generateSitemap: true,
    enableStructuredData: true,
    enableCanonicalUrls: true,
    enableOpenGraph: true,
    enableTwitterCards: true,
  })

  const handleInputChange = (field: string, value: any) => {
    setSeoSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    console.log("保存 SEO 设置:", seoSettings)
    // 这里会保存到后端
  }

  const handleGenerateSitemap = () => {
    console.log("生成站点地图")
    // 这里会触发站点地图生成
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">SEO 设置</h1>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          保存设置
        </Button>
      </div>

      <div className="grid gap-6">
        <Tabs defaultValue="general">
          <TabsList className="mb-4">
            <TabsTrigger value="general">
              <Globe className="w-4 h-4 mr-2" />
              基本设置
            </TabsTrigger>
            <TabsTrigger value="social">
              <Share2 className="w-4 h-4 mr-2" />
              社交媒体
            </TabsTrigger>
            <TabsTrigger value="advanced">
              <FileText className="w-4 h-4 mr-2" />
              高级设置
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>基本 SEO 设置</CardTitle>
                <CardDescription>配置网站的基本 SEO 信息</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="siteTitle">网站标题</Label>
                  <Input
                    id="siteTitle"
                    value={seoSettings.siteTitle}
                    onChange={(e) => handleInputChange("siteTitle", e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">显示在浏览器标签和搜索结果中的网站标题</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteDescription">网站描述</Label>
                  <Textarea
                    id="siteDescription"
                    value={seoSettings.siteDescription}
                    onChange={(e) => handleInputChange("siteDescription", e.target.value)}
                    rows={3}
                  />
                  <p className="text-sm text-muted-foreground">简短描述您的网站，将显示在搜索结果中</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteKeywords">关键词</Label>
                  <Input
                    id="siteKeywords"
                    value={seoSettings.siteKeywords}
                    onChange={(e) => handleInputChange("siteKeywords", e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">用逗号分隔的关键词列表</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ogImage">默认社交分享图片</Label>
                  <div className="flex items-center gap-4">
                    <div className="border rounded-md p-2 w-24 h-24 flex items-center justify-center">
                      {seoSettings.ogImage ? (
                        <img
                          src={seoSettings.ogImage || "/placeholder.svg"}
                          alt="OG Image"
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <ImageIcon className="w-8 h-8 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <Input
                        id="ogImage"
                        value={seoSettings.ogImage}
                        onChange={(e) => handleInputChange("ogImage", e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        当分享您的网站时显示的图片 (建议尺寸: 1200x630)
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="googleVerification">Google 站点验证</Label>
                  <Input
                    id="googleVerification"
                    value={seoSettings.googleVerification}
                    onChange={(e) => handleInputChange("googleVerification", e.target.value)}
                    placeholder="Google-Site-Verification 代码"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bingVerification">Bing 站点验证</Label>
                  <Input
                    id="bingVerification"
                    value={seoSettings.bingVerification}
                    onChange={(e) => handleInputChange("bingVerification", e.target.value)}
                    placeholder="MS-Site-Verification 代码"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="baiduVerification">百度站点验证</Label>
                  <Input
                    id="baiduVerification"
                    value={seoSettings.baiduVerification}
                    onChange={(e) => handleInputChange("baiduVerification", e.target.value)}
                    placeholder="百度站点验证代码"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle>社交媒体设置</CardTitle>
                <CardDescription>配置社交媒体分享信息</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>启用 Open Graph 标签</Label>
                    <p className="text-sm text-muted-foreground">允许在 Facebook、微信等平台上更好地分享您的内容</p>
                  </div>
                  <Switch
                    checked={seoSettings.enableOpenGraph}
                    onCheckedChange={(checked) => handleInputChange("enableOpenGraph", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>启用 Twitter Cards</Label>
                    <p className="text-sm text-muted-foreground">允许在 Twitter 上更好地分享您的内容</p>
                  </div>
                  <Switch
                    checked={seoSettings.enableTwitterCards}
                    onCheckedChange={(checked) => handleInputChange("enableTwitterCards", checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitterHandle">Twitter 用户名</Label>
                  <Input
                    id="twitterHandle"
                    value={seoSettings.twitterHandle}
                    onChange={(e) => handleInputChange("twitterHandle", e.target.value)}
                    placeholder="@yourusername"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>高级 SEO 设置</CardTitle>
                <CardDescription>配置高级 SEO 功能</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>自动生成站点地图</Label>
                    <p className="text-sm text-muted-foreground">自动创建和更新 sitemap.xml 文件</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={seoSettings.generateSitemap}
                      onCheckedChange={(checked) => handleInputChange("generateSitemap", checked)}
                    />
                    <Button variant="outline" size="sm" onClick={handleGenerateSitemap}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      立即生成
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>启用结构化数据</Label>
                    <p className="text-sm text-muted-foreground">添加 JSON-LD 结构化数据以增强搜索结果</p>
                  </div>
                  <Switch
                    checked={seoSettings.enableStructuredData}
                    onCheckedChange={(checked) => handleInputChange("enableStructuredData", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>启用规范 URL</Label>
                    <p className="text-sm text-muted-foreground">为每个页面添加规范 URL 标签</p>
                  </div>
                  <Switch
                    checked={seoSettings.enableCanonicalUrls}
                    onCheckedChange={(checked) => handleInputChange("enableCanonicalUrls", checked)}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="robotsTxt">robots.txt 内容</Label>
                  <Textarea
                    id="robotsTxt"
                    value={seoSettings.robotsTxt}
                    onChange={(e) => handleInputChange("robotsTxt", e.target.value)}
                    rows={8}
                    className="font-mono text-sm"
                  />
                  <p className="text-sm text-muted-foreground">自定义您的 robots.txt 文件内容</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
