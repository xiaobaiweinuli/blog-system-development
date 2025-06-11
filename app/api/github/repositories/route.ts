import { NextResponse } from "next/server"

export async function GET() {
  try {
    // 模拟获取用户的 GitHub 仓库
    const mockRepositories = [
      {
        id: "1",
        name: "blog-comments",
        full_name: "username/blog-comments",
        private: false,
        discussions_enabled: true,
      },
      {
        id: "2",
        name: "my-blog",
        full_name: "username/my-blog",
        private: false,
        discussions_enabled: false,
      },
      {
        id: "3",
        name: "personal-website",
        full_name: "username/personal-website",
        private: true,
        discussions_enabled: true,
      },
    ]

    return NextResponse.json({
      repositories: mockRepositories,
    })
  } catch (error) {
    console.error("获取仓库列表失败:", error)
    return NextResponse.json({ error: "获取仓库列表失败" }, { status: 500 })
  }
}
