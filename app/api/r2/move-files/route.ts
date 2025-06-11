import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { fileIds, targetFolder } = await request.json()

    if (!fileIds || !Array.isArray(fileIds) || fileIds.length === 0) {
      return NextResponse.json({ error: "请选择要移动的文件" }, { status: 400 })
    }

    if (!targetFolder) {
      return NextResponse.json({ error: "请选择目标文件夹" }, { status: 400 })
    }

    // 在实际应用中，这里会调用 Cloudflare R2 API 移动文件
    console.log("移动文件:", { fileIds, targetFolder })

    return NextResponse.json({
      success: true,
      message: `成功移动 ${fileIds.length} 个文件到 ${targetFolder}`,
    })
  } catch (error) {
    console.error("移动文件失败:", error)
    return NextResponse.json({ error: "移动文件失败" }, { status: 500 })
  }
}
