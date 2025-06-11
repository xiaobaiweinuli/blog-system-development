import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const repo = searchParams.get("repo")

    if (!repo) {
      return NextResponse.json({ error: "缺少仓库参数" }, { status: 400 })
    }

    // 模拟获取讨论分类
    const mockCategories = [
      {
        id: "DIC_kwDOGVjYHs4CAg",
        name: "General",
        description: "Chat about anything and everything here",
        emoji: "💬",
        slug: "general",
      },
      {
        id: "DIC_kwDOGVjYHs4CAh",
        name: "Comments",
        description: "Blog post comments",
        emoji: "💭",
        slug: "comments",
      },
      {
        id: "DIC_kwDOGVjYHs4CAi",
        name: "Q&A",
        description: "Ask the community for help",
        emoji: "❓",
        slug: "q-a",
      },
    ]

    return NextResponse.json({
      categories: mockCategories,
    })
  } catch (error) {
    console.error("获取讨论分类失败:", error)
    return NextResponse.json({ error: "获取讨论分类失败" }, { status: 500 })
  }
}
