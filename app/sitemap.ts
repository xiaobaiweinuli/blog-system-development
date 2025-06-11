import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-blog.vercel.app"

  // In a real app, you would fetch this from your database or GitHub
  const posts = [
    {
      slug: "getting-started-nextjs-15",
      updatedAt: "2024-01-15T00:00:00.000Z",
    },
    {
      slug: "advanced-typescript-patterns",
      updatedAt: "2024-01-10T00:00:00.000Z",
    },
    {
      slug: "building-scalable-react-apps",
      updatedAt: "2024-01-05T00:00:00.000Z",
    },
  ]

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/admin`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...postUrls,
  ]
}
