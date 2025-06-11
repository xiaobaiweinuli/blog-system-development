const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

async function autoDeploy() {
  try {
    console.log("🚀 Starting auto-deployment process...")

    // Check if this is a GitHub repository
    const isGitRepo = fs.existsSync(".git")
    if (!isGitRepo) {
      console.log("❌ Not a Git repository. Initializing...")
      execSync("git init")
      execSync("git add .")
      execSync('git commit -m "Initial commit"')
    }

    // Get repository information
    const repoUrl = execSync("git config --get remote.origin.url", { encoding: "utf8" }).trim()
    const repoName = repoUrl.split("/").pop().replace(".git", "")
    const repoOwner = repoUrl.split("/").slice(-2, -1)[0]

    console.log(`📦 Repository: ${repoOwner}/${repoName}`)

    // Check if Vercel CLI is installed
    try {
      execSync("vercel --version", { stdio: "ignore" })
    } catch (error) {
      console.log("📥 Installing Vercel CLI...")
      execSync("npm install -g vercel")
    }

    // Deploy to Vercel
    console.log("🚀 Deploying to Vercel...")
    const deployOutput = execSync("vercel --prod --yes", { encoding: "utf8" })

    // Extract deployment URL
    const deploymentUrl = deployOutput.match(/https:\/\/[^\s]+/)?.[0]

    if (deploymentUrl) {
      console.log(`✅ Deployed successfully: ${deploymentUrl}`)

      // Update README with deployment info
      execSync(`node scripts/update-readme.js "${deploymentUrl}"`)

      // Commit updated README
      execSync("git add README.md")
      execSync('git commit -m "📝 Update README with deployment info [skip ci]" || true')
      execSync("git push || true")

      console.log("📝 README.md updated with deployment information")
    } else {
      console.log("❌ Could not extract deployment URL")
    }

    // Generate deployment report
    const report = {
      timestamp: new Date().toISOString(),
      repository: `${repoOwner}/${repoName}`,
      deploymentUrl: deploymentUrl,
      status: "success",
      features: [
        "Content Management System",
        "GitHub OAuth Authentication",
        "Cloudflare R2 Storage",
        "Multi-language Support",
        "SEO Optimization",
        "Analytics Integration",
        "Responsive Design",
      ],
    }

    fs.writeFileSync("deployment-report.json", JSON.stringify(report, null, 2))
    console.log("📊 Deployment report generated")
  } catch (error) {
    console.error("❌ Deployment failed:", error.message)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  autoDeploy()
}

module.exports = { autoDeploy }
