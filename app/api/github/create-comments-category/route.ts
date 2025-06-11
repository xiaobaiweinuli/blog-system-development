import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { repo } = await request.json()

    if (!repo) {
      return NextResponse.json({ error: "缺少仓库参数" }, { status: 400 })
    }

    // 模拟创建评论分类
    const newCategory = {
      id: "DIC_kwDOGVjYHs4C" + Math.random().toString(36).substring(2, 5),
      name: "Blog Comments",
      description: "Comments for blog posts",
      emoji: "💬",
      slug: "blog-comments",
    }

    return NextResponse.json({
      success: true,
      category: newCategory,
    })
  } catch (error) {
    console.error("创建评论分类失败:", error)
    return NextResponse.json({ error: "创建评论分类失败" }, { status: 500 })
  }
}
