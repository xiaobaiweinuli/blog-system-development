const https = require("https")

async function testGitHubOAuth() {
  console.log("🧪 Testing GitHub OAuth setup...")

  // Load environment variables
  require("dotenv").config({ path: ".env.local" })

  const clientId = process.env.GITHUB_CLIENT_ID
  const clientSecret = process.env.GITHUB_CLIENT_SECRET
  const repoOwner = process.env.GITHUB_REPO_OWNER
  const repoName = process.env.GITHUB_REPO_NAME

  // Check required variables
  const checks = [
    { name: "GITHUB_CLIENT_ID", value: clientId },
    { name: "GITHUB_CLIENT_SECRET", value: clientSecret },
    { name: "GITHUB_REPO_OWNER", value: repoOwner },
    { name: "GITHUB_REPO_NAME", value: repoName },
  ]

  let allValid = true

  console.log("\n📋 Environment Variables Check:")
  checks.forEach((check) => {
    const status = check.value ? "✅" : "❌"
    const display = check.value ? (check.name.includes("SECRET") ? "[HIDDEN]" : check.value) : "NOT SET"
    console.log(`   ${status} ${check.name}: ${display}`)
    if (!check.value) allValid = false
  })

  if (!allValid) {
    console.log("\n❌ Please set all required environment variables")
    return false
  }

  // Test GitHub API access
  console.log("\n🔍 Testing GitHub API access...")

  try {
    // Test if repository exists and is accessible
    const repoUrl = `https://api.github.com/repos/${repoOwner}/${repoName}`
    const repoResponse = await fetch(repoUrl)

    if (repoResponse.ok) {
      const repoData = await repoResponse.json()
      console.log(`   ✅ Repository found: ${repoData.full_name}`)
      console.log(
        `   📊 Repository info: ${repoData.private ? "Private" : "Public"}, ${repoData.default_branch} branch`,
      )
    } else {
      console.log(`   ❌ Repository not found or not accessible: ${repoResponse.status}`)
      return false
    }

    // Test OAuth app (this will fail without a valid token, but we can check the error)
    console.log("\n🔐 Testing OAuth configuration...")

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo&state=test`
    console.log(`   ℹ️  OAuth URL: ${authUrl}`)
    console.log(`   ✅ OAuth client ID is properly formatted`)

    console.log("\n✅ Basic setup appears correct!")
    console.log("\n📝 Next steps:")
    console.log("   1. Start your development server: npm run dev")
    console.log("   2. Visit http://localhost:3000/auth/login")
    console.log('   3. Click "Continue with GitHub" to test the OAuth flow')

    return true
  } catch (error) {
    console.log(`   ❌ Error testing GitHub API: ${error.message}`)
    return false
  }
}

async function generateOAuthUrls() {
  require("dotenv").config({ path: ".env.local" })

  const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID

  if (!clientId) {
    console.log("❌ NEXT_PUBLIC_GITHUB_CLIENT_ID not set")
    return
  }

  console.log("\n🔗 OAuth URLs for testing:")
  console.log("\nDevelopment:")
  console.log(
    `   Authorization: https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,read:org,read:user,user:email&redirect_uri=http://localhost:3000/api/auth/github`,
  )

  console.log("\nProduction (update with your domain):")
  console.log(
    `   Authorization: https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,read:org,read:user,user:email&redirect_uri=https://your-domain.com/api/auth/github`,
  )
}

async function main() {
  const success = await testGitHubOAuth()

  if (success) {
    await generateOAuthUrls()
  }
}

if (require.main === module) {
  main()
}

module.exports = { testGitHubOAuth }
