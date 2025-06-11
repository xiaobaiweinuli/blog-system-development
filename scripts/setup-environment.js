const fs = require("fs")
const path = require("path")
const crypto = require("crypto")

function generateJWTSecret() {
  return crypto.randomBytes(32).toString("base64")
}

function createEnvFile() {
  const envPath = path.join(process.cwd(), ".env.local")

  // Check if .env.local already exists
  if (fs.existsSync(envPath)) {
    console.log("⚠️  .env.local already exists. Please update it manually.")
    return
  }

  const jwtSecret = generateJWTSecret()

  const envContent = `# JWT Secret for token signing (auto-generated)
JWT_SECRET=${jwtSecret}

# GitHub OAuth for User Login
# Get these from: https://github.com/settings/developers
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id_here

# Repository Information
GITHUB_REPO_OWNER=your_github_username
GITHUB_REPO_NAME=your_repository_name

# Cloudflare R2 Storage
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
CLOUDFLARE_R2_ACCESS_KEY_ID=your_r2_access_key
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_r2_secret_key
CLOUDFLARE_R2_BUCKET_NAME=your_bucket_name

# Cloudflare Workers OAuth (for backend operations)
CLOUDFLARE_GITHUB_CLIENT_ID=your_worker_github_client_id
CLOUDFLARE_GITHUB_CLIENT_SECRET=your_worker_github_client_secret

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
`

  fs.writeFileSync(envPath, envContent)
  console.log("✅ Created .env.local file with JWT secret")
  console.log("📝 Please update the GitHub OAuth credentials and other settings")
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
    console.log("❌ Missing required environment variables:")
    missing.forEach((varName) => {
      console.log(`   - ${varName}`)
    })
    return false
  }

  console.log("✅ All required environment variables are set")
  return true
}

function main() {
  console.log("🔧 Setting up environment...")

  // Create .env.local if it doesn't exist
  createEnvFile()

  // Load environment variables
  require("dotenv").config({ path: ".env.local" })

  // Validate environment
  const isValid = validateEnvironment()

  if (!isValid) {
    console.log("\n📖 Please refer to docs/GITHUB_OAUTH_SETUP_GUIDE.md for detailed setup instructions")
  }
}

if (require.main === module) {
  main()
}

module.exports = { generateJWTSecret, validateEnvironment }
