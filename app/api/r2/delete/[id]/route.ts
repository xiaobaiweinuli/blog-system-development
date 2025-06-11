import { type NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // 在实际应用中，这里会调用 Cloudflare R2 API 删除文件
    console.log("删除文件:", id)

    return NextResponse.json({
      success: true,
      message: "文件删除成功",
    })
  } catch (error) {
    console.error("删除文件失败:", error)
    return NextResponse.json({ error: "删除文件失败" }, { status: 500 })
  }
}
