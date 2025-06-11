"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart3, TrendingUp, Users, Clock, Globe, LineChart, PieChart } from "lucide-react"

// 模拟分析数据
const mockAnalytics = {
  overview: {
    pageViews: 25840,
    visitors: 12350,
    avgTimeOnSite: "2m 45s",
    bounceRate: "42%",
  },
  topPosts: [
    {
      id: "1",
      title: "Getting Started with Next.js 15",
      views: 4250,
      visitors: 3120,
      avgTimeOnPage: "3m 12s",
    },
    {
      id: "2",
      title: "Advanced TypeScript Patterns",
      views: 3180,
      visitors: 2450,
      avgTimeOnPage: "4m 05s",
    },
    {
      id: "3",
      title: "Building Scalable React Applications",
      views: 2760,
      visitors: 1980,
      avgTimeOnPage: "3m 45s",
    },
    {
      id: "4",
      title: "Vue.js vs React: A Comprehensive Comparison",
      views: 2150,
      visitors: 1640,
      avgTimeOnPage: "5m 20s",
    },
    {
      id: "5",
      title: "Introduction to Tailwind CSS",
      views: 1890,
      visitors: 1420,
      avgTimeOnPage: "2m 50s",
    },
  ],
  trafficSources: [
    { source: "Google", visitors: 5840, percentage: "47.3%" },
    { source: "Direct", visitors: 2450, percentage: "19.8%" },
    { source: "Twitter", visitors: 1380, percentage: "11.2%" },
    { source: "GitHub", visitors: 980, percentage: "7.9%" },
    { source: "Hacker News", visitors: 750, percentage: "6.1%" },
    { source: "Others", visitors: 950, percentage: "7.7%" },
  ],
  countries: [
    { country: "United States", visitors: 4250, percentage: "34.4%" },
    { country: "China", visitors: 2180, percentage: "17.7%" },
    { country: "India", visitors: 1450, percentage: "11.7%" },
    { country: "Germany", visitors: 980, percentage: "7.9%" },
    { country: "United Kingdom", visitors: 840, percentage: "6.8%" },
    { country: "Others", visitors: 2650, percentage: "21.5%" },
  ],
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">分析统计</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="选择时间范围" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">过去 7 天</SelectItem>
            <SelectItem value="30d">过去 30 天</SelectItem>
            <SelectItem value="90d">过去 90 天</SelectItem>
            <SelectItem value="12m">过去 12 个月</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">页面浏览量</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAnalytics.overview.pageViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12.5% 相比上期</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">访问者</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAnalytics.overview.visitors.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+8.2% 相比上期</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">平均访问时长</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAnalytics.overview.avgTimeOnSite}</div>
              <p className="text-xs text-muted-foreground">+5.1% 相比上期</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">跳出率</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAnalytics.overview.bounceRate}</div>
              <p className="text-xs text-muted-foreground">-3.4% 相比上期</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>访问者趋势</CardTitle>
              <CardDescription>
                过去{" "}
                {timeRange === "7d"
                  ? "7 天"
                  : timeRange === "30d"
                    ? "30 天"
                    : timeRange === "90d"
                      ? "90 天"
                      : "12 个月"}{" "}
                的访问者数量
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg">
              <div className="flex flex-col items-center text-muted-foreground">
                <LineChart className="h-8 w-8 mb-2" />
                <p>访问者趋势图表将显示在此处</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>页面浏览量趋势</CardTitle>
              <CardDescription>
                过去{" "}
                {timeRange === "7d"
                  ? "7 天"
                  : timeRange === "30d"
                    ? "30 天"
                    : timeRange === "90d"
                      ? "90 天"
                      : "12 个月"}{" "}
                的页面浏览量
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg">
              <div className="flex flex-col items-center text-muted-foreground">
                <BarChart3 className="h-8 w-8 mb-2" />
                <p>页面浏览量图表将显示在此处</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="top-posts">
          <TabsList className="mb-4">
            <TabsTrigger value="top-posts">
              <TrendingUp className="w-4 h-4 mr-2" />
              热门文章
            </TabsTrigger>
            <TabsTrigger value="traffic-sources">
              <Globe className="w-4 h-4 mr-2" />
              流量来源
            </TabsTrigger>
            <TabsTrigger value="countries">
              <Globe className="w-4 h-4 mr-2" />
              访问国家/地区
            </TabsTrigger>
          </TabsList>

          <TabsContent value="top-posts">
            <Card>
              <CardHeader>
                <CardTitle>热门文章</CardTitle>
                <CardDescription>访问量最高的文章</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>文章标题</TableHead>
                        <TableHead className="text-right">浏览量</TableHead>
                        <TableHead className="text-right">访问者</TableHead>
                        <TableHead className="text-right">平均访问时长</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockAnalytics.topPosts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium">{post.title}</TableCell>
                          <TableCell className="text-right">{post.views.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{post.visitors.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{post.avgTimeOnPage}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="traffic-sources">
            <Card>
              <CardHeader>
                <CardTitle>流量来源</CardTitle>
                <CardDescription>访问者来源渠道分析</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <PieChart className="h-8 w-8 mb-2" />
                      <p>流量来源饼图将显示在此处</p>
                    </div>
                  </div>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>来源</TableHead>
                          <TableHead className="text-right">访问者</TableHead>
                          <TableHead className="text-right">百分比</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockAnalytics.trafficSources.map((source) => (
                          <TableRow key={source.source}>
                            <TableCell className="font-medium">{source.source}</TableCell>
                            <TableCell className="text-right">{source.visitors.toLocaleString()}</TableCell>
                            <TableCell className="text-right">{source.percentage}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="countries">
            <Card>
              <CardHeader>
                <CardTitle>访问国家/地区</CardTitle>
                <CardDescription>访问者地理位置分析</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <Globe className="h-8 w-8 mb-2" />
                      <p>访问国家/地区地图将显示在此处</p>
                    </div>
                  </div>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>国家/地区</TableHead>
                          <TableHead className="text-right">访问者</TableHead>
                          <TableHead className="text-right">百分比</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockAnalytics.countries.map((country) => (
                          <TableRow key={country.country}>
                            <TableCell className="font-medium">{country.country}</TableCell>
                            <TableCell className="text-right">{country.visitors.toLocaleString()}</TableCell>
                            <TableCell className="text-right">{country.percentage}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
