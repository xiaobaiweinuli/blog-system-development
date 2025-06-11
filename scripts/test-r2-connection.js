const { S3Client, ListBucketsCommand } = require("@aws-sdk/client-s3")

async function testR2Connection() {
  try {
    const client = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
      },
    })

    const command = new ListBucketsCommand({})
    const response = await client.send(command)

    console.log("✅ R2 connection successful!")
    console.log(
      "📦 Available buckets:",
      response.Buckets?.map((b) => b.Name),
    )

    return true
  } catch (error) {
    console.error("❌ R2 connection failed:", error.message)
    return false
  }
}

if (require.main === module) {
  testR2Connection()
}

module.exports = { testR2Connection }
