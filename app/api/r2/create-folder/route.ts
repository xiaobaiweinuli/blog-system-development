import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { folderName } = await request.json()

    if (!folderName) {
      return NextResponse.json({ error: "文件夹名称不能为空" }, { status: 400 })
    }

    // 在实际应用中，这里会在 R2 中创建文件夹（通过创建一个占位符对象）
    console.log("创建文件夹:", folderName)

    return NextResponse.json({
      success: true,
      message: "文件夹创建成功",
      folderName,
    })
  } catch (error) {
    console.error("创建文件夹失败:", error)
    return NextResponse.json({ error: "创建文件夹失败" }, { status: 500 })
  }
}
