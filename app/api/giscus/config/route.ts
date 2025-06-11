import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const giscusConfig = await request.json()

    // 在实际应用中，这里会保存配置到数据库或环境变量
    console.log("保存 Giscus 配置:", giscusConfig)

    return NextResponse.json({
      success: true,
      message: "Giscus 配置已保存",
    })
  } catch (error) {
    console.error("保存 Giscus 配置失败:", error)
    return NextResponse.json({ error: "保存 Giscus 配置失败" }, { status: 500 })
  }
}
