import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll("files") as File[]
    const folder = (formData.get("folder") as string) || "uploads"

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "没有选择文件" }, { status: 400 })
    }

    const uploadedFiles = []

    for (const file of files) {
      // 在实际应用中，这里会上传到 Cloudflare R2
      const fileData = {
        id: Date.now().toString() + Math.random().toString(36).substring(2),
        name: file.name,
        type: file.type,
        size: file.size,
        url: `https://blog-assets.r2.dev/${folder}/${file.name}`,
        uploadedAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        folder,
        etag: Math.random().toString(36).substring(2, 15),
        isPublic: true,
        downloadCount: 0,
        tags: [],
        metadata: {},
      }

      uploadedFiles.push(fileData)
    }

    return NextResponse.json({
      success: true,
      message: `成功上传 ${files.length} 个文件`,
      files: uploadedFiles,
    })
  } catch (error) {
    console.error("上传文件失败:", error)
    return NextResponse.json({ error: "上传文件失败" }, { status: 500 })
  }
}
