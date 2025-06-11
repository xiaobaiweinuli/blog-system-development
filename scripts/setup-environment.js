const fs = require("fs")
const path = require("path")
const crypto = require("crypto")

function generateJWTSecret() {
  return crypto.randomBytes(32).toString("base64")
}

function createEnvFile() {
  const envPath = path.join(process.cwd(), ".env.local")

  // 检查 .env.local 是否已存在
  if (fs.existsSync(envPath)) {
    console.log("⚠️  .env.local 已存在。请手动更新。")
    return
  }

  const jwtSecret = generateJWTSecret()

  const envContent = `# JWT 密钥用于令牌签名（自动生成）
JWT_SECRET=${jwtSecret}

# GitHub OAuth 用户登录配置
# 从这里获取: https://github.com/settings/developers
GITHUB_CLIENT_ID=你的_github_client_id
GITHUB_CLIENT_SECRET=你的_github_client_secret
NEXT_PUBLIC_GITHUB_CLIENT_ID=你的_github_client_id

# 仓库信息
GITHUB_REPO_OWNER=你的_github_用户名
GITHUB_REPO_NAME=你的_仓库名称

# Cloudflare R2 存储（可选）
CLOUDFLARE_ACCOUNT_ID=你的_cloudflare_账户_id
CLOUDFLARE_R2_ACCESS_KEY_ID=你的_r2_访问密钥
CLOUDFLARE_R2_SECRET_ACCESS_KEY=你的_r2_密钥
CLOUDFLARE_R2_BUCKET_NAME=你的_存储桶名称

# Cloudflare Workers OAuth（用于后端操作，可选）
CLOUDFLARE_GITHUB_CLIENT_ID=你的_worker_github_client_id
CLOUDFLARE_GITHUB_CLIENT_SECRET=你的_worker_github_client_secret

# 站点配置
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
`

  fs.writeFileSync(envPath, envContent)
  console.log("✅ 已创建 .env.local 文件并生成 JWT 密钥")
  console.log("📝 请更新 GitHub OAuth 凭据和其他设置")
  console.log("📖 详细配置指南请参考 docs/SETUP_GUIDE.md")
}

function validateEnvironment() {
  const requiredVars = [
    "JWT_SECRET",
    "GITHUB_CLIENT_ID",
    "GITHUB_CLIENT_SECRET",
    "NEXT_PUBLIC_GITHUB_CLIENT_ID",
    "GITHUB_REPO_OWNER",
    "GITHUB_REPO_NAME",
  ]

  const missing = []

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missing.push(varName)
    }
  }

  if (missing.length > 0) {
    console.log("❌ 缺少必需的环境变量:")
    missing.forEach((varName) => {
      console.log(`   - ${varName}`)
    })
    return false
  }

  console.log("✅ 所有必需的环境变量都已设置")
  return true
}

function main() {
  console.log("🔧 正在设置环境...")

  // 如果不存在则创建 .env.local
  createEnvFile()

  // 加载环境变量
  require("dotenv").config({ path: ".env.local" })

  // 验证环境
  const isValid = validateEnvironment()

  if (!isValid) {
    console.log("\n📖 请参考 docs/SETUP_GUIDE.md 获取详细的设置说明")
  }
}

if (require.main === module) {
  main()
}

module.exports = { generateJWTSecret, validateEnvironment }
