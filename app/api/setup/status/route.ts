import { NextResponse } from "next/server"

export async function GET() {
  try {
    // 检查环境变量是否已配置
    const githubConfigured = !!(
      process.env.GITHUB_CLIENT_ID &&
      process.env.GITHUB_CLIENT_SECRET &&
      process.env.GITHUB_REPO_OWNER &&
      process.env.GITHUB_REPO_NAME
    )

    const cloudflareConfigured = !!(
      process.env.CLOUDFLARE_ACCOUNT_ID &&
      process.env.CLOUDFLARE_R2_ACCESS_KEY_ID &&
      process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY &&
      process.env.CLOUDFLARE_R2_BUCKET_NAME
    )

    const isComplete = githubConfigured && cloudflareConfigured

    return NextResponse.json({
      isComplete,
      github: githubConfigured,
      cloudflare: cloudflareConfigured,
      details: {
        githubOAuth: !!process.env.GITHUB_CLIENT_ID,
        githubRepo: !!process.env.GITHUB_REPO_OWNER,
        cloudflareAccount: !!process.env.CLOUDFLARE_ACCOUNT_ID,
        r2Storage: !!process.env.CLOUDFLARE_R2_BUCKET_NAME,
      },
    })
  } catch (error) {
    console.error("检查设置状态失败:", error)
    return NextResponse.json({ error: "检查设置状态失败" }, { status: 500 })
  }
}
