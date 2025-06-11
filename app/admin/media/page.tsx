"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Upload,
  File,
  MoreHorizontal,
  Trash2,
  Download,
  Copy,
  FolderIcon,
  Grid3X3,
  List,
  Eye,
  Edit,
  CloudIcon,
  FolderPlus,
  ImageIcon,
  FileText,
  Video,
  Music,
  Archive,
  RefreshCw,
  SortAsc,
  SortDesc,
  HardDrive,
  Info,
  Share2,
  Move,
} from "lucide-react"

// 扩展的 R2 文件数据结构
interface R2File {
  id: string
  name: string
  type: string
  size: number
  url: string
  uploadedAt: string
  lastModified: string
  folder: string
  etag: string
  dimensions?: string
  metadata?: Record<string, string>
  isPublic: boolean
  downloadCount: number
  tags: string[]
}

// 模拟更丰富的 R2 文件数据
const mockR2Files: R2File[] = [
  {
    id: "1",
    name: "hero-banner.jpg",
    type: "image/jpeg",
    size: 2048000,
    url: "https://blog-assets.r2.dev/images/hero-banner.jpg",
    uploadedAt: "2024-01-15T10:30:00Z",
    lastModified: "2024-01-15T10:30:00Z",
    folder: "images",
    etag: "d41d8cd98f00b204e9800998ecf8427e",
    dimensions: "1920x1080",
    isPublic: true,
    downloadCount: 156,
    tags: ["banner", "hero", "homepage"],
    metadata: { alt: "Hero banner image", author: "John Doe" },
  },
  {
    id: "2",
    name: "user-guide.pdf",
    type: "application/pdf",
    size: 5120000,
    url: "https://blog-assets.r2.dev/documents/user-guide.pdf",
    uploadedAt: "2024-01-14T14:20:00Z",
    lastModified: "2024-01-16T09:15:00Z",
    folder: "documents",
    etag: "098f6bcd4621d373cade4e832627b4f6",
    isPublic: false,
    downloadCount: 89,
    tags: ["guide", "documentation"],
    metadata: { version: "1.2", pages: "24" },
  },
  {
    id: "3",
    name: "product-demo.mp4",
    type: "video/mp4",
    size: 15360000,
    url: "https://blog-assets.r2.dev/videos/product-demo.mp4",
    uploadedAt: "2024-01-13T09:15:00Z",
    lastModified: "2024-01-13T09:15:00Z",
    folder: "videos",
    etag: "5d41402abc4b2a76b9719d911017c592",
    dimensions: "1280x720",
    isPublic: true,
    downloadCount: 234,
    tags: ["demo", "product", "video"],
    metadata: { duration: "3:45", quality: "HD" },
  },
  {
    id: "4",
    name: "background-music.mp3",
    type: "audio/mpeg",
    size: 3840000,
    url: "https://blog-assets.r2.dev/audio/background-music.mp3",
    uploadedAt: "2024-01-12T16:45:00Z",
    lastModified: "2024-01-12T16:45:00Z",
    folder: "audio",
    etag: "aab3238922bcc25a6f606eb525ffdc56",
    isPublic: true,
    downloadCount: 67,
    tags: ["music", "background", "audio"],
    metadata: { duration: "4:12", bitrate: "320kbps" },
  },
  {
    id: "5",
    name: "assets-backup.zip",
    type: "application/zip",
    size: 25600000,
    url: "https://blog-assets.r2.dev/backups/assets-backup.zip",
    uploadedAt: "2024-01-11T11:10:00Z",
    lastModified: "2024-01-11T11:10:00Z",
    folder: "backups",
    etag: "e4d909c290d0fb1ca068ffaddf22cbd0",
    isPublic: false,
    downloadCount: 12,
    tags: ["backup", "archive"],
    metadata: { files: "156", compressed: "true" },
  },
  {
    id: "6",
    name: "thumbnail-grid.png",
    type: "image/png",
    size: 512000,
    url: "https://blog-assets.r2.dev/thumbnails/thumbnail-grid.png",
    uploadedAt: "2024-01-10T13:25:00Z",
    lastModified: "2024-01-10T13:25:00Z",
    folder: "thumbnails",
    etag: "25f9e794323b453885f5181f1b624d0b",
    dimensions: "800x600",
    isPublic: true,
    downloadCount: 445,
    tags: ["thumbnail", "grid", "ui"],
    metadata: { transparent: "true", optimized: "true" },
  },
]

export default function MediaPage() {
  const [r2Files, setR2Files] = useState<R2File[]>(mockR2Files)
  const [searchTerm, setSearchTerm] = useState("")
  const [folderFilter, setFolderFilter] = useState("all")
  const [fileTypeFilter, setFileTypeFilter] = useState("all")
  const [sortBy, setSortBy] = useState<"name" | "size" | "date" | "downloads">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentFolder, setCurrentFolder] = useState("")
  const [showCreateFolder, setShowCreateFolder] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")
  const [selectedFile, setSelectedFile] = useState<R2File | null>(null)
  const [showFileDetails, setShowFileDetails] = useState(false)
  const [showMoveDialog, setShowMoveDialog] = useState(false)
  const [targetFolder, setTargetFolder] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 获取所有文件夹
  const folders = Array.from(new Set(r2Files.map((file) => file.folder))).filter(Boolean)

  // 获取文件类型图标
  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <ImageIcon className="w-4 h-4" />
    if (type.startsWith("video/")) return <Video className="w-4 h-4" />
    if (type.startsWith("audio/")) return <Music className="w-4 h-4" />
    if (type.includes("pdf") || type.includes("document")) return <FileText className="w-4 h-4" />
    if (type.includes("zip") || type.includes("archive")) return <Archive className="w-4 h-4" />
    return <File className="w-4 h-4" />
  }

  // 获取文件类型颜色
  const getFileTypeColor = (type: string) => {
    if (type.startsWith("image/")) return "text-green-500"
    if (type.startsWith("video/")) return "text-blue-500"
    if (type.startsWith("audio/")) return "text-purple-500"
    if (type.includes("pdf")) return "text-red-500"
    if (type.includes("zip")) return "text-orange-500"
    return "text-gray-500"
  }

  // 模拟上传文件到 R2
  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setIsUploading(true)
    setUploadProgress(0)

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      // 模拟上传进度
      for (let progress = 0; progress <= 100; progress += 10) {
        setUploadProgress(progress)
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      // 模拟上传到 R2
      const newFile: R2File = {
        id: Date.now().toString() + i,
        name: file.name,
        type: file.type,
        size: file.size,
        url: `https://blog-assets.r2.dev/${currentFolder || "uploads"}/${file.name}`,
        uploadedAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        folder: currentFolder || "uploads",
        etag: Math.random().toString(36).substring(2, 15),
        dimensions: file.type.startsWith("image/") ? "800x600" : undefined,
        isPublic: true,
        downloadCount: 0,
        tags: [],
        metadata: {},
      }

      setR2Files((prev) => [newFile, ...prev])
    }

    setIsUploading(false)
    setUploadProgress(0)
  }

  // 拖拽上传处理
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const files = e.dataTransfer.files
      handleUpload(files)
    },
    [currentFolder],
  )

  // 排序和过滤文件
  const filteredAndSortedFiles = r2Files
    .filter((file) => {
      const matchesSearch =
        file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesFolder = folderFilter === "all" || file.folder === folderFilter
      const matchesType =
        fileTypeFilter === "all" ||
        (fileTypeFilter === "image" && file.type.startsWith("image/")) ||
        (fileTypeFilter === "video" && file.type.startsWith("video/")) ||
        (fileTypeFilter === "audio" && file.type.startsWith("audio/")) ||
        (fileTypeFilter === "document" && (file.type.includes("pdf") || file.type.includes("document"))) ||
        (fileTypeFilter === "archive" && (file.type.includes("zip") || file.type.includes("archive")))

      return matchesSearch && matchesFolder && matchesType
    })
    .sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
        case "size":
          comparison = a.size - b.size
          break
        case "date":
          comparison = new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime()
          break
        case "downloads":
          comparison = a.downloadCount - b.downloadCount
          break
      }
      return sortOrder === "asc" ? comparison : -comparison
    })

  // 格式化文件大小
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + " MB"
    else return (bytes / 1073741824).toFixed(1) + " GB"
  }

  // 删除文件
  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/r2/delete/${id}`, { method: "DELETE" })
      setR2Files(r2Files.filter((file) => file.id !== id))
      setSelectedFiles(selectedFiles.filter((fileId) => fileId !== id))
    } catch (error) {
      console.error("删除文件失败:", error)
    }
  }

  // 复制链接
  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url)
  }

  // 批量操作
  const handleBatchDelete = async () => {
    for (const id of selectedFiles) {
      await handleDelete(id)
    }
    setSelectedFiles([])
  }

  // 创建文件夹
  const createFolder = async () => {
    if (!newFolderName.trim()) return

    try {
      await fetch("/api/r2/create-folder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folderName: newFolderName }),
      })
      setNewFolderName("")
      setShowCreateFolder(false)
    } catch (error) {
      console.error("创建文件夹失败:", error)
    }
  }

  // 移动文件
  const moveFiles = async () => {
    if (!targetFolder || selectedFiles.length === 0) return

    try {
      await fetch("/api/r2/move-files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileIds: selectedFiles, targetFolder }),
      })

      setR2Files((prev) =>
        prev.map((file) => (selectedFiles.includes(file.id) ? { ...file, folder: targetFolder } : file)),
      )

      setSelectedFiles([])
      setShowMoveDialog(false)
      setTargetFolder("")
    } catch (error) {
      console.error("移动文件失败:", error)
    }
  }

  // 刷新文件列表
  const refreshFiles = async () => {
    setIsRefreshing(true)
    try {
      const response = await fetch("/api/r2/files")
      const data = await response.json()
      setR2Files(data.files || mockR2Files)
    } catch (error) {
      console.error("刷新文件列表失败:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  // 计算存储统计
  const storageStats = {
    totalFiles: r2Files.length,
    totalSize: r2Files.reduce((sum, file) => sum + file.size, 0),
    publicFiles: r2Files.filter((f) => f.isPublic).length,
    totalDownloads: r2Files.reduce((sum, file) => sum + file.downloadCount, 0),
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">R2 存储管理</h1>
          <p className="text-muted-foreground">管理存储在 Cloudflare R2 中的所有媒体文件</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refreshFiles} disabled={isRefreshing}>
            {isRefreshing ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            刷新
          </Button>
          <Dialog open={showCreateFolder} onOpenChange={setShowCreateFolder}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FolderPlus className="w-4 h-4 mr-2" />
                新建文件夹
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>创建新文件夹</DialogTitle>
                <DialogDescription>为您的文件创建一个新的组织文件夹</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="folder-name">文件夹名称</Label>
                  <Input
                    id="folder-name"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="输入文件夹名称"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCreateFolder(false)}>
                  取消
                </Button>
                <Button onClick={createFolder}>创建</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={(e) => handleUpload(e.target.files)}
            className="hidden"
            id="file-upload"
          />
          <Button asChild>
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="w-4 h-4 mr-2" />
              上传文件
            </label>
          </Button>
          {selectedFiles.length > 0 && (
            <>
              <Dialog open={showMoveDialog} onOpenChange={setShowMoveDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Move className="w-4 h-4 mr-2" />
                    移动 ({selectedFiles.length})
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>移动文件</DialogTitle>
                    <DialogDescription>选择要移动到的目标文件夹</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Select value={targetFolder} onValueChange={setTargetFolder}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择目标文件夹" />
                      </SelectTrigger>
                      <SelectContent>
                        {folders.map((folder) => (
                          <SelectItem key={folder} value={folder}>
                            {folder}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowMoveDialog(false)}>
                      取消
                    </Button>
                    <Button onClick={moveFiles}>移动</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button variant="destructive" onClick={handleBatchDelete}>
                <Trash2 className="w-4 h-4 mr-2" />
                删除 ({selectedFiles.length})
              </Button>
            </>
          )}
        </div>
      </div>

      {/* 存储统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总文件数</CardTitle>
            <File className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{storageStats.totalFiles}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总存储大小</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatFileSize(storageStats.totalSize)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">公开文件</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{storageStats.publicFiles}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总下载次数</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{storageStats.totalDownloads}</div>
          </CardContent>
        </Card>
      </div>

      {isUploading && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">正在上传到 Cloudflare R2...</span>
                <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CloudIcon className="w-5 h-5" />
                文件管理器
              </CardTitle>
              <CardDescription>拖拽文件到此区域快速上传</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent onDragOver={handleDragOver} onDrop={handleDrop} className="min-h-[400px]">
          {/* 面包屑导航 */}
          {currentFolder && (
            <div className="flex items-center gap-2 mb-4 text-sm">
              <Button variant="ghost" size="sm" onClick={() => setCurrentFolder("")}>
                根目录
              </Button>
              <span>/</span>
              <span className="font-medium">{currentFolder}</span>
            </div>
          )}

          {/* 过滤器和排序 */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="搜索文件名或标签..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={folderFilter} onValueChange={setFolderFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="文件夹" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有文件夹</SelectItem>
                {folders.map((folder) => (
                  <SelectItem key={folder} value={folder}>
                    {folder}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={fileTypeFilter} onValueChange={setFileTypeFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有类型</SelectItem>
                <SelectItem value="image">图片</SelectItem>
                <SelectItem value="video">视频</SelectItem>
                <SelectItem value="audio">音频</SelectItem>
                <SelectItem value="document">文档</SelectItem>
                <SelectItem value="archive">压缩包</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="排序" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">日期</SelectItem>
                <SelectItem value="name">名称</SelectItem>
                <SelectItem value="size">大小</SelectItem>
                <SelectItem value="downloads">下载量</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
              {sortOrder === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
            </Button>
          </div>

          {/* 文件夹视图 */}
          {!currentFolder && (
            <div className="mb-6">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <FolderIcon className="w-4 h-4" />
                文件夹
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {folders.map((folder) => (
                  <Card
                    key={folder}
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => setCurrentFolder(folder)}
                  >
                    <CardContent className="p-4 text-center">
                      <FolderIcon className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                      <p className="text-sm font-medium truncate">{folder}</p>
                      <p className="text-xs text-muted-foreground">
                        {r2Files.filter((f) => f.folder === folder).length} 个文件
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* 文件视图 */}
          <Tabs value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
            <TabsContent value="grid" className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {filteredAndSortedFiles.map((file) => (
                  <Card key={file.id} className="overflow-hidden group relative">
                    {/* 选择复选框 */}
                    <div className="absolute top-2 left-2 z-10">
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes(file.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedFiles([...selectedFiles, file.id])
                          } else {
                            setSelectedFiles(selectedFiles.filter((id) => id !== file.id))
                          }
                        }}
                        className="rounded"
                      />
                    </div>

                    <div className="relative aspect-square bg-muted flex items-center justify-center">
                      {file.type.startsWith("image/") ? (
                        <img
                          src={file.url || "/placeholder.svg"}
                          alt={file.name}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className={`w-12 h-12 ${getFileTypeColor(file.type)}`}>{getFileIcon(file.type)}</div>
                      )}

                      {/* 悬停操作 */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button size="sm" variant="secondary" onClick={() => window.open(file.url, "_blank")}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            setSelectedFile(file)
                            setShowFileDetails(true)
                          }}
                        >
                          <Info className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="secondary" onClick={() => handleCopyLink(file.url)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* 文件状态标识 */}
                      <div className="absolute top-2 right-2 flex gap-1">
                        {file.isPublic ? (
                          <Badge variant="secondary" className="text-xs">
                            <Eye className="w-3 h-3 mr-1" />
                            公开
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">
                            私有
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <div className="space-y-1">
                        <p className="text-sm font-medium truncate" title={file.name}>
                          {file.name}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{formatFileSize(file.size)}</span>
                          {file.dimensions && <span>{file.dimensions}</span>}
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{new Date(file.uploadedAt).toLocaleDateString()}</span>
                          <span>{file.downloadCount} 下载</span>
                        </div>
                        {file.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {file.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {file.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{file.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list" className="mt-0">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedFiles(filteredAndSortedFiles.map((f) => f.id))
                            } else {
                              setSelectedFiles([])
                            }
                          }}
                          checked={
                            selectedFiles.length === filteredAndSortedFiles.length && filteredAndSortedFiles.length > 0
                          }
                        />
                      </th>
                      <th className="py-3 px-4 text-left font-medium">文件名</th>
                      <th className="py-3 px-4 text-left font-medium">类型</th>
                      <th className="py-3 px-4 text-left font-medium">大小</th>
                      <th className="py-3 px-4 text-left font-medium">文件夹</th>
                      <th className="py-3 px-4 text-left font-medium">状态</th>
                      <th className="py-3 px-4 text-left font-medium">下载量</th>
                      <th className="py-3 px-4 text-left font-medium">上传日期</th>
                      <th className="py-3 px-4 text-right font-medium">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSortedFiles.map((file) => (
                      <tr key={file.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <input
                            type="checkbox"
                            checked={selectedFiles.includes(file.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedFiles([...selectedFiles, file.id])
                              } else {
                                setSelectedFiles(selectedFiles.filter((id) => id !== file.id))
                              }
                            }}
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            {file.type.startsWith("image/") ? (
                              <img
                                src={file.url || "/placeholder.svg"}
                                alt={file.name}
                                className="w-10 h-10 object-cover rounded"
                              />
                            ) : (
                              <div
                                className={`w-10 h-10 flex items-center justify-center ${getFileTypeColor(file.type)}`}
                              >
                                {getFileIcon(file.type)}
                              </div>
                            )}
                            <div>
                              <p className="font-medium truncate max-w-[200px]" title={file.name}>
                                {file.name}
                              </p>
                              {file.dimensions && <p className="text-xs text-muted-foreground">{file.dimensions}</p>}
                              {file.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {file.tags.slice(0, 3).map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="text-xs">
                            {file.type.split("/")[1]?.toUpperCase()}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">{formatFileSize(file.size)}</td>
                        <td className="py-3 px-4 text-muted-foreground">{file.folder}</td>
                        <td className="py-3 px-4">
                          {file.isPublic ? (
                            <Badge variant="secondary" className="text-xs">
                              <Eye className="w-3 h-3 mr-1" />
                              公开
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              私有
                            </Badge>
                          )}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">{file.downloadCount}</td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {new Date(file.uploadedAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">打开菜单</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>操作</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => window.open(file.url, "_blank")}>
                                <Eye className="w-4 h-4 mr-2" />
                                预览
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedFile(file)
                                  setShowFileDetails(true)
                                }}
                              >
                                <Info className="w-4 h-4 mr-2" />
                                详情
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleCopyLink(file.url)}>
                                <Copy className="w-4 h-4 mr-2" />
                                复制链接
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="w-4 h-4 mr-2" />
                                下载
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="w-4 h-4 mr-2" />
                                分享
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                重命名
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleDelete(file.id)} className="text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                删除
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>

          {filteredAndSortedFiles.length === 0 && (
            <div className="text-center py-12">
              <CloudIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">没有找到文件</h3>
              <p className="text-muted-foreground mb-4">{searchTerm ? "没有匹配的文件" : "还没有上传任何文件"}</p>
              <Button asChild>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  上传第一个文件
                </label>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 文件详情对话框 */}
      <Dialog open={showFileDetails} onOpenChange={setShowFileDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>文件详情</DialogTitle>
            <DialogDescription>查看和编辑文件信息</DialogDescription>
          </DialogHeader>
          {selectedFile && (
            <div className="space-y-6">
              {/* 文件预览 */}
              <div className="flex items-center gap-4">
                {selectedFile.type.startsWith("image/") ? (
                  <img
                    src={selectedFile.url || "/placeholder.svg"}
                    alt={selectedFile.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                ) : (
                  <div
                    className={`w-24 h-24 flex items-center justify-center border rounded ${getFileTypeColor(selectedFile.type)}`}
                  >
                    {getFileIcon(selectedFile.type)}
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{selectedFile.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedFile.type}</p>
                  <p className="text-sm text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
                  {selectedFile.dimensions && (
                    <p className="text-sm text-muted-foreground">{selectedFile.dimensions}</p>
                  )}
                </div>
              </div>

              {/* 基本信息 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">上传时间</Label>
                  <p className="text-sm text-muted-foreground">{new Date(selectedFile.uploadedAt).toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">最后修改</Label>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedFile.lastModified).toLocaleString()}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">文件夹</Label>
                  <p className="text-sm text-muted-foreground">{selectedFile.folder}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">下载次数</Label>
                  <p className="text-sm text-muted-foreground">{selectedFile.downloadCount}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">访问权限</Label>
                  <Badge variant={selectedFile.isPublic ? "secondary" : "outline"} className="text-xs">
                    {selectedFile.isPublic ? "公开" : "私有"}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">ETag</Label>
                  <p className="text-sm text-muted-foreground font-mono">{selectedFile.etag}</p>
                </div>
              </div>

              {/* 标签 */}
              <div>
                <Label className="text-sm font-medium">标签</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedFile.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {selectedFile.tags.length === 0 && <p className="text-sm text-muted-foreground">暂无标签</p>}
                </div>
              </div>

              {/* 元数据 */}
              {selectedFile.metadata && Object.keys(selectedFile.metadata).length > 0 && (
                <div>
                  <Label className="text-sm font-medium">元数据</Label>
                  <div className="mt-2 space-y-2">
                    {Object.entries(selectedFile.metadata).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="font-medium">{key}:</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* URL */}
              <div>
                <Label className="text-sm font-medium">文件 URL</Label>
                <div className="flex gap-2 mt-2">
                  <Input value={selectedFile.url} readOnly className="font-mono text-xs" />
                  <Button size="sm" onClick={() => handleCopyLink(selectedFile.url)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFileDetails(false)}>
              关闭
            </Button>
            <Button onClick={() => window.open(selectedFile?.url, "_blank")}>
              <Eye className="w-4 h-4 mr-2" />
              预览文件
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
