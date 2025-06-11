import { type NextRequest, NextResponse } from "next/server"

// Mock data - in a real app, this would interact with GitHub API or your database
const posts = [
  {
    id: "1",
    title: "Getting Started with Next.js 15",
    slug: "getting-started-nextjs-15",
    content: "# Getting Started with Next.js 15\n\nNext.js 15 brings exciting new features...",
    description: "Learn the latest features and improvements in Next.js 15",
    tags: ["Next.js", "React", "Web Development"],
    coverImage: "/placeholder.svg?height=400&width=800",
    language: "en",
    status: "published",
    visibility: "public",
    isPinned: true,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    author: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const status = searchParams.get("status")
  const visibility = searchParams.get("visibility")
  const language = searchParams.get("language")

  let filteredPosts = posts

  if (status && status !== "all") {
    filteredPosts = filteredPosts.filter((post) => post.status === status)
  }

  if (visibility && visibility !== "all") {
    filteredPosts = filteredPosts.filter((post) => post.visibility === visibility)
  }

  if (language && language !== "all") {
    filteredPosts = filteredPosts.filter((post) => post.language === language)
  }

  return NextResponse.json(filteredPosts)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 })
    }

    // In a real app, you would:
    // 1. Validate user permissions
    // 2. Save to GitHub repository or database
    // 3. Handle file uploads to Cloudflare R2
    // 4. Generate SEO metadata

    const newPost = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: {
        name: "Current User", // Get from session
        email: "user@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    }

    posts.push(newPost)

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
