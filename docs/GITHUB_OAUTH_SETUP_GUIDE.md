# GitHub OAuth Setup & Role-Based Access Control Guide

This comprehensive guide will help you set up GitHub OAuth authentication, implement role-based access control, and deploy your blog system with automated role assignment.

## Table of Contents

1. [GitHub OAuth Configuration](#github-oauth-configuration)
2. [Environment Variables Setup](#environment-variables-setup)
3. [Role-Based Access Control Implementation](#role-based-access-control-implementation)
4. [Cloudflare Workers Integration](#cloudflare-workers-integration)
5. [Deployment Instructions](#deployment-instructions)
6. [Troubleshooting](#troubleshooting)

## 1. GitHub OAuth Configuration

### Step 1: Create GitHub OAuth Application for User Login

1. **Navigate to GitHub Developer Settings:**
   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Click "OAuth Apps" in the left sidebar
   - Click "New OAuth App"

2. **Configure OAuth Application:**
   \`\`\`
   Application name: Your Blog System Login
   Homepage URL: https://your-domain.com
   Application description: OAuth for blog system user authentication
   Authorization callback URL: https://your-domain.com/api/auth/github
   \`\`\`

3. **For Development (Local Testing):**
   \`\`\`
   Application name: Your Blog System Login (Dev)
   Homepage URL: http://localhost:3000
   Application description: Development OAuth for blog system
   Authorization callback URL: http://localhost:3000/api/auth/github
   \`\`\`

4. **Save and Note Credentials:**
   - Copy the **Client ID**
   - Generate and copy the **Client Secret**
   - Keep these secure - you'll need them for environment variables

### Step 2: Create GitHub OAuth Application for Cloudflare Workers

1. **Create Second OAuth App:**
   \`\`\`
   Application name: Your Blog System Backend
   Homepage URL: https://your-domain.com
   Application description: OAuth for backend operations and content management
   Authorization callback URL: https://your-cloudflare-worker.workers.dev/auth/callback
   \`\`\`

2. **Configure Permissions:**
   - This app needs repository write access
   - Will be used for automated content publishing

## 2. Environment Variables Setup

### Required Environment Variables

Create a \`.env.local\` file in your project root:

\`\`\`env
# JWT Secret for token signing
JWT_SECRET=your-super-secret-jwt-key-min-32-characters

# GitHub OAuth for User Login
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id

# Repository Information
GITHUB_REPO_OWNER=your-github-username
GITHUB_REPO_NAME=your-repository-name

# Cloudflare R2 Storage
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
CLOUDFLARE_R2_ACCESS_KEY_ID=your_r2_access_key
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_r2_secret_key
CLOUDFLARE_R2_BUCKET_NAME=your_bucket_name

# Cloudflare Workers OAuth (for backend operations)
CLOUDFLARE_GITHUB_CLIENT_ID=your_worker_github_client_id
CLOUDFLARE_GITHUB_CLIENT_SECRET=your_worker_github_client_secret

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NODE_ENV=production
\`\`\`

### Environment Variable Descriptions

| Variable | Purpose | Example |
|----------|---------|---------|
| \`JWT_SECRET\` | Signs authentication tokens | \`your-super-secret-jwt-key-min-32-characters\` |
| \`GITHUB_CLIENT_ID\` | GitHub OAuth client ID for login | \`Iv1.a1b2c3d4e5f6g7h8\` |
| \`GITHUB_CLIENT_SECRET\` | GitHub OAuth secret for login | \`1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0\` |
| \`GITHUB_REPO_OWNER\` | Your GitHub username | \`yourusername\` |
| \`GITHUB_REPO_NAME\` | Repository name | \`my-blog\` |

## 3. Role-Based Access Control Implementation

The system automatically assigns roles based on GitHub repository permissions:

### Role Assignment Logic

\`\`\`typescript
// Automatic role assignment during OAuth
if (userData.login === process.env.GITHUB_REPO_OWNER) {
  // Repository owner gets admin role
  userRole = "admin"
  permissions = ["read:posts", "write:posts", "delete:posts", "manage:users", ...]
} else if (isCollaborator) {
  // Collaborators get limited permissions
  userRole = "user"
  permissions = ["read:posts", "write:posts", "manage:media"]
} else {
  // Public users get read-only access
  userRole = "user"
  permissions = ["read:posts"]
}
\`\`\`

### Permission Levels

| Role | Permissions | Access Level |
|------|-------------|--------------|
| **Admin** (Repo Owner) | All permissions | Full system access |
| **Collaborator** | Limited write access | Content creation only |
| **Public User** | Read-only | View published posts |

## 4. Cloudflare Workers Integration

### Step 1: Create Cloudflare Worker for Backend Operations

\`\`\`javascript
// worker.js - Cloudflare Worker for backend operations
export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    
    if (url.pathname === '/auth/callback') {
      return handleGitHubCallback(request, env)
    }
    
    if (url.pathname === '/api/publish') {
      return handlePublishContent(request, env)
    }
    
    return new Response('Not Found', { status: 404 })
  }
}

async function handleGitHubCallback(request, env) {
  const code = new URL(request.url).searchParams.get('code')
  
  // Exchange code for access token
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: env.CLOUDFLARE_GITHUB_CLIENT_ID,
      client_secret: env.CLOUDFLARE_GITHUB_CLIENT_SECRET,
      code: code,
    }),
  })
  
  const tokenData = await tokenResponse.json()
  
  // Store token securely for backend operations
  await env.KV_STORE.put('github_token', tokenData.access_token)
  
  return new Response('Authentication successful', { status: 200 })
}
\`\`\`

### Step 2: Configure Worker Environment Variables

In Cloudflare Dashboard:
1. Go to Workers & Pages
2. Select your worker
3. Go to Settings > Environment Variables
4. Add the following variables:

\`\`\`
CLOUDFLARE_GITHUB_CLIENT_ID=your_worker_client_id
CLOUDFLARE_GITHUB_CLIENT_SECRET=your_worker_client_secret
GITHUB_REPO_OWNER=your_username
GITHUB_REPO_NAME=your_repo_name
\`\`\`

## 5. Deployment Instructions

### Deploying to Vercel

1. **Install Vercel CLI:**
   \`\`\`bash
   npm install -g vercel
   \`\`\`

2. **Login to Vercel:**
   \`\`\`bash
   vercel login
   \`\`\`

3. **Deploy Project:**
   \`\`\`bash
   vercel --prod
   \`\`\`

4. **Set Environment Variables in Vercel:**
   \`\`\`bash
   # Set each environment variable
   vercel env add JWT_SECRET
   vercel env add GITHUB_CLIENT_ID
   vercel env add GITHUB_CLIENT_SECRET
   vercel env add NEXT_PUBLIC_GITHUB_CLIENT_ID
   vercel env add GITHUB_REPO_OWNER
   vercel env add GITHUB_REPO_NAME
   \`\`\`

5. **Update OAuth Callback URL:**
   - Go to your GitHub OAuth app settings
   - Update callback URL to: \`https://your-vercel-domain.vercel.app/api/auth/github\`

### Deploying to GitHub Pages (with Actions)

1. **Create GitHub Actions Workflow:**
   \`\`\`yaml
   # .github/workflows/deploy.yml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         
         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '18'
             
         - name: Install dependencies
           run: npm ci
           
         - name: Build application
           run: npm run build
           env:
             JWT_SECRET: \${{ secrets.JWT_SECRET }}
             GITHUB_CLIENT_ID: \${{ secrets.GITHUB_CLIENT_ID }}
             GITHUB_CLIENT_SECRET: \${{ secrets.GITHUB_CLIENT_SECRET }}
             NEXT_PUBLIC_GITHUB_CLIENT_ID: \${{ secrets.NEXT_PUBLIC_GITHUB_CLIENT_ID }}
             
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: \${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./out
   \`\`\`

2. **Add Repository Secrets:**
   - Go to Repository Settings > Secrets and Variables > Actions
   - Add all required environment variables as secrets

## 6. Troubleshooting

### Common Issues and Solutions

#### Issue 1: "Continue with GitHub" Button Not Working

**Symptoms:**
- Button clicks don't redirect to GitHub
- Console errors about missing client ID

**Solutions:**
1. **Check Environment Variables:**
   \`\`\`bash
   # Verify variables are set
   echo \$NEXT_PUBLIC_GITHUB_CLIENT_ID
   \`\`\`

2. **Verify OAuth App Configuration:**
   - Ensure callback URL matches exactly
   - Check client ID is correct

3. **Update Login Component:**
   \`\`\`typescript
   const handleGitHubLogin = () => {
     const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
     if (!clientId) {
       console.error('GitHub Client ID not configured')
       return
     }
     
     const githubAuthUrl = new URL('https://github.com/login/oauth/authorize')
     githubAuthUrl.searchParams.set('client_id', clientId)
     githubAuthUrl.searchParams.set('scope', 'repo,read:org,read:user,user:email')
     githubAuthUrl.searchParams.set('redirect_uri', \`\${window.location.origin}/api/auth/github\`)
     
     window.location.href = githubAuthUrl.toString()
   }
   \`\`\`

#### Issue 2: OAuth Callback Errors

**Symptoms:**
- "OAuth failed" error after GitHub redirect
- 500 errors in callback handler

**Solutions:**
1. **Check Server Environment Variables:**
   \`\`\`bash
   # These must be set on server
   GITHUB_CLIENT_SECRET=your_secret
   JWT_SECRET=your_jwt_secret
   \`\`\`

2. **Verify Callback URL:**
   - Must match exactly in GitHub OAuth app
   - Include protocol (https://)

#### Issue 3: Role Assignment Not Working

**Symptoms:**
- Users not getting admin role
- Permission errors

**Solutions:**
1. **Verify Repository Owner:**
   \`\`\`bash
   # Check environment variable
   echo \$GITHUB_REPO_OWNER
   \`\`\`

2. **Debug Role Assignment:**
   \`\`\`typescript
   console.log('GitHub username:', userData.login)
   console.log('Repo owner:', process.env.GITHUB_REPO_OWNER)
   console.log('Is owner:', userData.login === process.env.GITHUB_REPO_OWNER)
   \`\`\`

#### Issue 4: JWT Token Issues

**Symptoms:**
- Users logged out immediately
- "Invalid token" errors

**Solutions:**
1. **Generate Strong JWT Secret:**
   \`\`\`bash
   # Generate 32+ character secret
   openssl rand -base64 32
   \`\`\`

2. **Check Token Expiration:**
   \`\`\`typescript
   // Extend token expiration if needed
   .setExpirationTime('30d') // 30 days instead of 7
   \`\`\`

### Testing Your Setup

1. **Test OAuth Flow:**
   \`\`\`bash
   # Start development server
   npm run dev
   
   # Visit http://localhost:3000/auth/login
   # Click "Continue with GitHub"
   # Should redirect to GitHub and back
   \`\`\`

2. **Test Role Assignment:**
   \`\`\`typescript
   // Add debug logging in auth callback
   console.log('User role assigned:', userRole)
   console.log('User permissions:', permissions)
   \`\`\`

3. **Test Protected Routes:**
   - Try accessing /admin without login (should redirect)
   - Login and verify admin access
   - Test permission-based UI elements

### Support and Resources

- [GitHub OAuth Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)

For additional support, check the project's GitHub issues or create a new issue with detailed error logs.
