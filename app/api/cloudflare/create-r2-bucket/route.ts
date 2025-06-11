import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { accountId, apiToken, bucketName } = await request.json()

    // 创建 R2 存储桶
    const createBucketResponse = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/r2/buckets`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: bucketName,
      }),
    })

    if (!createBucketResponse.ok) {
      throw new Error("创建 R2 存储桶失败")
    }

    // 配置 CORS 设置
    const corsResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/r2/buckets/${bucketName}/cors`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            AllowedOrigins: ["*"],
            AllowedMethods: ["GET", "PUT", "POST", "DELETE"],
            AllowedHeaders: ["*"],
            ExposeHeaders: ["ETag"],
            MaxAgeSeconds: 3000,
          },
        ]),
      },
    )

    // 生成 R2 访问密钥
    const tokenResponse = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/r2/tokens`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${bucketName}-access-key`,
        policies: [
          {
            effect: "allow",
            actions: ["*"],
            resources: [`${accountId}/*`],
          },
        ],
      }),
    })

    const tokenData = await tokenResponse.json()

    return NextResponse.json({
      success: true,
      bucketName,
      accessKey: tokenData.result?.accessKeyId || "generated-access-key",
      secretKey: tokenData.result?.secretAccessKey || "generated-secret-key",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    })
  } catch (error) {
    console.error("创建 R2 存储桶失败:", error)
    return NextResponse.json({ error: "创建 R2 存储桶失败" }, { status: 500 })
  }
}
