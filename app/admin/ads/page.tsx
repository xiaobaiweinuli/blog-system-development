"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Save, Plus, MoreHorizontal, Edit, Trash2, DollarSign, BarChart3, LayoutTemplate } from "lucide-react"

// 模拟广告数据
const mockAds = [
  {
    id: "1",
    name: "顶部横幅广告",
    type: "banner",
    location: "header",
    code: '<div class="ad-container"><!-- Google AdSense 代码 --></div>',
    isActive: true,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    impressions: 12500,
    clicks: 320,
  },
  {
    id: "2",
    name: "侧边栏广告",
    type: "sidebar",
    location: "sidebar",
    code: '<div class="ad-container"><!-- 自定义广告代码 --></div>',
    isActive: true,
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    impressions: 8700,
    clicks: 145,
  },
  {
    id: "3",
    name: "文章内嵌广告",
    type: "in-article",
    location: "content",
    code: '<div class="ad-container"><!-- 文章内嵌广告代码 --></div>',
    isActive: false,
    startDate: "2024-02-01",
    endDate: "2024-04-30",
    impressions: 5200,
    clicks: 98,
  },
]

export default function AdsPage() {
  const [ads, setAds] = useState(mockAds)
  const [activeTab, setActiveTab] = useState("all")
  const [adSettings, setAdSettings] = useState({
    enableAdsense: true,
    adsenseId: "ca-pub-1234567890",
    enableAutoAds: true,
    disableAdsForLoggedIn: false,
  })

  const handleInputChange = (field: string, value: any) => {
    setAdSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveSettings = () => {
    console.log("保存广告设置:", adSettings)
    // 这里会保存到后端
  }

  const handleDeleteAd = (id: string) => {
    setAds(ads.filter((ad) => ad.id !== id))
  }

  const handleToggleAdStatus = (id: string) => {
    setAds(
      ads.map((ad) => {
        if (ad.id === id) {
          return { ...ad, isActive: !ad.isActive }
        }
        return ad
      }),
    )
  }

  const filteredAds = ads.filter((ad) => {
    if (activeTab === "all") return true
    if (activeTab === "active") return ad.isActive
    if (activeTab === "inactive") return !ad.isActive
    return true
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">广告管理</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSaveSettings}>
            <Save className="w-4 h-4 mr-2" />
            保存设置
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            添加广告
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <Tabs defaultValue="ads" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="ads">
              <LayoutTemplate className="w-4 h-4 mr-2" />
              广告位管理
            </TabsTrigger>
            <TabsTrigger value="settings">
              <DollarSign className="w-4 h-4 mr-2" />
              广告设置
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="w-4 h-4 mr-2" />
              广告分析
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ads">
            <Card>
              <CardHeader>
                <CardTitle>广告位管理</CardTitle>
                <CardDescription>管理网站上的所有广告位</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <Button
                    variant={activeTab === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab("all")}
                  >
                    全部
                  </Button>
                  <Button
                    variant={activeTab === "active" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab("active")}
                  >
                    已启用
                  </Button>
                  <Button
                    variant={activeTab === "inactive" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab("inactive")}
                  >
                    已禁用
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>广告名称</TableHead>
                        <TableHead>位置</TableHead>
                        <TableHead>类型</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead>展示次数</TableHead>
                        <TableHead>点击次数</TableHead>
                        <TableHead className="text-right">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAds.map((ad) => (
                        <TableRow key={ad.id}>
                          <TableCell className="font-medium">{ad.name}</TableCell>
                          <TableCell>{ad.location}</TableCell>
                          <TableCell>{ad.type}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-2 h-2 rounded-full ${ad.isActive ? "bg-green-500" : "bg-red-500"}`}
                              ></div>
                              <span>{ad.isActive ? "已启用" : "已禁用"}</span>
                            </div>
                          </TableCell>
                          <TableCell>{ad.impressions.toLocaleString()}</TableCell>
                          <TableCell>{ad.clicks.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">打开菜单</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>操作</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2" />
                                  编辑
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleToggleAdStatus(ad.id)}>
                                  {ad.isActive ? "禁用" : "启用"}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleDeleteAd(ad.id)} className="text-red-600">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  删除
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>广告设置</CardTitle>
                <CardDescription>配置网站的广告设置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>启用 Google AdSense</Label>
                    <p className="text-sm text-muted-foreground">在网站上启用 Google AdSense 广告</p>
                  </div>
                  <Switch
                    checked={adSettings.enableAdsense}
                    onCheckedChange={(checked) => handleInputChange("enableAdsense", checked)}
                  />
                </div>

                {adSettings.enableAdsense && (
                  <div className="space-y-2">
                    <Label htmlFor="adsenseId">AdSense 发布商 ID</Label>
                    <Input
                      id="adsenseId"
                      value={adSettings.adsenseId}
                      onChange={(e) => handleInputChange("adsenseId", e.target.value)}
                      placeholder="ca-pub-xxxxxxxxxx"
                    />
                    <p className="text-sm text-muted-foreground">您的 Google AdSense 发布商 ID</p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>启用自动广告</Label>
                    <p className="text-sm text-muted-foreground">允许 Google 自动在您的网站上放置广告</p>
                  </div>
                  <Switch
                    checked={adSettings.enableAutoAds}
                    onCheckedChange={(checked) => handleInputChange("enableAutoAds", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>对已登录用户禁用广告</Label>
                    <p className="text-sm text-muted-foreground">登录用户将不会看到广告</p>
                  </div>
                  <Switch
                    checked={adSettings.disableAdsForLoggedIn}
                    onCheckedChange={(checked) => handleInputChange("disableAdsForLoggedIn", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>广告分析</CardTitle>
                <CardDescription>查看广告表现数据</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">总展示次数</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {ads.reduce((sum, ad) => sum + ad.impressions, 0).toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">总点击次数</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {ads.reduce((sum, ad) => sum + ad.clicks, 0).toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">平均点击率</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {(
                          (ads.reduce((sum, ad) => sum + ad.clicks, 0) /
                            ads.reduce((sum, ad) => sum + ad.impressions, 0)) *
                          100
                        ).toFixed(2)}
                        %
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="h-[300px] flex items-center justify-center bg-muted rounded-lg">
                  <p className="text-muted-foreground">广告收入图表将显示在此处</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
