const fs = require("fs")
const path = require("path")

const deploymentUrl = process.argv[2] || "your-blog.vercel.app"
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] || "github-blog-system"
const repoOwner = process.env.GITHUB_REPOSITORY?.split("/")[0] || "your-username"

const readmeContent = `# 🚀 GitHub Blog System

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F${repoOwner}%2F${repoName}&env=GITHUB_CLIENT_ID,GITHUB_CLIENT_SECRET,GITHUB_REPO_OWNER,GITHUB_REPO_NAME,CLOUDFLARE_ACCOUNT_ID,CLOUDFLARE_R2_ACCESS_KEY_ID,CLOUDFLARE_R2_SECRET_ACCESS_KEY,CLOUDFLARE_R2_BUCKET_NAME,NEXT_PUBLIC_SITE_URL,NEXT_PUBLIC_GITHUB_CLIENT_ID&envDescription=Required%20environment%20variables%20for%20the%20blog%20system&envLink=https%3A%2F%2Fgithub.com%2F${repoOwner}%2F${repoName}%23environment-setup&project-name=${repoName}&repository-name=${repoName})

> 🌐 **Live Demo**: [${deploymentUrl}](https://${deploymentUrl})
> 
> 📅 **Last Updated**: ${new Date().toISOString().split("T")[0]}
> 
> ⚡ **Status**: ![Vercel](https://img.shields.io/badge/vercel-deployed-brightgreen) ![Build](https://github.com/${repoOwner}/${repoName}/workflows/Auto%20Deploy%20and%20Update%20Documentation/badge.svg)

A powerful, modern blog system built with Next.js, powered by GitHub Pages, and enhanced with advanced features for content management, SEO, and analytics.

## 🎯 Quick Start

### 1️⃣ One-Click Deployment

Click the button above to deploy to Vercel instantly! The deployment wizard will guide you through:

- ✅ Automatic repository cloning
- ✅ Environment variable setup
- ✅ Domain configuration
- ✅ SSL certificate provisioning

### 2️⃣ Manual Setup

\`\`\`bash
# Clone the repository
git clone https://github.com/${repoOwner}/${repoName}.git
cd ${repoName}

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
npm run dev
\`\`\`

## 🚀 Features

### 📝 **Content Management System**
- **Dual Editor Modes**: Markdown and Rich Text with live preview
- **Advanced Metadata**: Tags, categories, SEO optimization
- **Media Management**: Cloudflare R2 integration for file storage
- **Draft System**: Save, preview, and schedule posts

### 🔐 **Authentication & Security**
- **GitHub OAuth**: Secure authentication via Cloudflare Workers
- **Role-Based Access**: Repository owners and collaborators only
- **CSRF Protection**: Built-in Next.js security features

### 🌍 **Internationalization**
- **Multi-Language Support**: English, Spanish, French, German, Chinese
- **Dynamic Language Switching**: Real-time UI updates
- **SEO-Friendly URLs**: Language-specific routing

### 📊 **Analytics & Monetization**
- **Built-in Analytics**: Page views, user engagement tracking
- **Google Analytics**: GA4 integration
- **AdSense Support**: Automated ad placement
- **Performance Monitoring**: Core Web Vitals tracking

### 🎨 **Design & UX**
- **Responsive Design**: Mobile-first approach
- **Dark/Light Mode**: System preference detection
- **Customizable Themes**: Tailwind CSS + shadcn/ui
- **Accessibility**: WCAG 2.1 compliant

## 📖 Complete Tutorial

### 🔧 Environment Setup

Create a \`.env.local\` file with the following variables:

\`\`\`env
# GitHub OAuth Configuration
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_REPO_OWNER=your_username
GITHUB_REPO_NAME=your_blog_repo

# Cloudflare R2 Storage
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_R2_ACCESS_KEY_ID=your_access_key
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_secret_key
CLOUDFLARE_R2_BUCKET_NAME=your_bucket_name

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://${deploymentUrl}
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id

# Optional: Database (for analytics)
DATABASE_URL=your_database_url
\`\`\`

### 🔑 GitHub OAuth Setup

1. **Create OAuth App**:
   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Click "New OAuth App"
   - Fill in the details:
     - **Application name**: \`${repoName}\`
     - **Homepage URL**: \`https://${deploymentUrl}\`
     - **Authorization callback URL**: \`https://${deploymentUrl}/api/auth/github\`

2. **Get Credentials**:
   - Copy the **Client ID** and **Client Secret**
   - Add them to your environment variables

### ☁️ Cloudflare R2 Setup

1. **Create R2 Bucket**:
   \`\`\`bash
   # Using Wrangler CLI
   npx wrangler r2 bucket create ${repoName}-media
   \`\`\`

2. **Generate API Tokens**:
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
   - Create token with R2:Edit permissions
   - Add credentials to environment variables

3. **Configure CORS**:
   \`\`\`json
   [
     {
       "AllowedOrigins": ["https://${deploymentUrl}"],
       "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
       "AllowedHeaders": ["*"]
     }
   ]
   \`\`\`

### 📝 Using the Blog System

#### **Admin Access**
1. Visit \`https://${deploymentUrl}/admin\`
2. Sign in with your GitHub account
3. Only repository owners/collaborators can access admin features

#### **Creating Posts**
1. **Navigate to Admin Panel**:
   - Click "New Post" in the admin dashboard
   
2. **Fill Basic Information**:
   - **Title**: Your post title (auto-generates URL slug)
   - **Description**: Brief summary for SEO and previews
   - **Tags**: Comma-separated tags for categorization
   - **Cover Image**: Upload or drag-and-drop image

3. **Configure Settings**:
   - **Status**: Draft, Published, or Archived
   - **Visibility**: Public, Logged-in users, or Private
   - **Language**: Select content language
   - **Pinned**: Feature important posts

4. **Content Creation**:
   - **Markdown Mode**: Full syntax support with toolbar
   - **Rich Text Mode**: WYSIWYG editor with formatting
   - **Live Preview**: Real-time rendering in split view

5. **SEO Optimization**:
   - **Meta Title**: Custom title for search engines
   - **Meta Description**: Search result snippet
   - **Keywords**: Relevant search terms
   - **Preview**: See how it appears in search results

#### **Media Management**
1. **Upload Files**:
   - Drag and drop files to upload area
   - Supports images, documents, videos
   - Automatic optimization and CDN delivery

2. **Organize Content**:
   - Create folders for organization
   - Bulk operations (move, delete, rename)
   - Search and filter capabilities

3. **Insert Media**:
   - Click media button in editor
   - Select from uploaded files
   - Automatic URL insertion

#### **Analytics Dashboard**
1. **View Metrics**:
   - Page views and unique visitors
   - Popular posts and traffic sources
   - User engagement statistics

2. **Performance Monitoring**:
   - Core Web Vitals scores
   - Loading speed analysis
   - Mobile vs desktop usage

#### **SEO Management**
1. **Global SEO Settings**:
   - Site title and description
   - Default meta tags
   - Social media integration

2. **Per-Post Optimization**:
   - Custom meta titles and descriptions
   - Open Graph tags for social sharing
   - Structured data markup

### 🎨 Customization

#### **Themes and Styling**
1. **Color Scheme**:
   - Edit \`tailwind.config.ts\`
   - Customize CSS variables in \`app/globals.css\`

2. **Layout Modifications**:
   - Update components in \`components/\` directory
   - Modify page layouts in \`app/\` directory

#### **Adding Features**
1. **Custom Components**:
   \`\`\`tsx
   // components/custom-feature.tsx
   export function CustomFeature() {
     return <div>Your custom feature</div>
   }
   \`\`\`

2. **API Extensions**:
   \`\`\`typescript
   // app/api/custom/route.ts
   export async function GET() {
     return Response.json({ message: 'Custom API endpoint' })
   }
   \`\`\`

### 🚀 Deployment Options

#### **Vercel (Recommended)**
1. **One-Click Deploy**: Use the button at the top of this README
2. **Manual Deploy**:
   \`\`\`bash
   npm install -g vercel
   vercel --prod
   \`\`\`

#### **Other Platforms**
- **Netlify**: \`npm run build && npm run export\`
- **GitHub Pages**: Configure in repository settings
- **Docker**: \`docker build -t blog-system .\`

### 🔧 Advanced Configuration

#### **Database Setup (Optional)**
\`\`\`bash
# Run database migrations
npm run setup:db

# Seed sample data
npm run seed:data
\`\`\`

#### **Analytics Integration**
1. **Google Analytics**:
   \`\`\`typescript
   // Add to app/layout.tsx
   <Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
   \`\`\`

2. **Plausible Analytics**:
   \`\`\`typescript
   <Script defer data-domain="${deploymentUrl}" src="https://plausible.io/js/script.js" />
   \`\`\`

#### **Comment System**
1. **Giscus Setup**:
   - Enable GitHub Discussions in your repository
   - Configure in admin panel under Comments section

### 🛠 Development

#### **Local Development**
\`\`\`bash
# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Start production server
npm start
\`\`\`

#### **Code Quality**
\`\`\`bash
# Lint code
npm run lint

# Format code
npm run format

# Type checking
npm run type-check
\`\`\`

## 📚 API Reference

### **Posts API**
- \`GET /api/posts\` - List all posts
- \`POST /api/posts\` - Create new post
- \`PUT /api/posts/[id]\` - Update post
- \`DELETE /api/posts/[id]\` - Delete post

### **Media API**
- \`GET /api/r2/files\` - List files
- \`POST /api/r2/upload\` - Upload file
- \`DELETE /api/r2/delete/[id]\` - Delete file

### **Analytics API**
- \`GET /api/analytics/views\` - Get page views
- \`POST /api/analytics/track\` - Track event

## 🔒 Security

### **Best Practices**
- ✅ Environment variables for sensitive data
- ✅ CSRF protection enabled
- ✅ Input validation and sanitization
- ✅ Rate limiting on API endpoints
- ✅ Secure headers configuration

### **Access Control**
- Repository owners have full admin access
- Collaborators can create and edit posts
- Public users can only view published content

## 🐛 Troubleshooting

### **Common Issues**

#### **Authentication Problems**
\`\`\`bash
# Check OAuth configuration
curl -X GET "https://${deploymentUrl}/api/auth/github"
\`\`\`

#### **File Upload Issues**
\`\`\`bash
# Verify R2 credentials
npm run test:r2
\`\`\`

#### **Build Errors**
\`\`\`bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
\`\`\`

### **Performance Optimization**
1. **Image Optimization**: Automatic WebP conversion
2. **Caching**: Redis for API responses
3. **CDN**: Cloudflare for static assets
4. **Code Splitting**: Automatic with Next.js

## 📈 Monitoring

### **Health Checks**
- \`GET /api/health\` - System status
- \`GET /api/health/db\` - Database connectivity
- \`GET /api/health/r2\` - Storage connectivity

### **Logging**
- Application logs via Vercel
- Error tracking with Sentry (optional)
- Performance monitoring with Web Vitals

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**: \`git checkout -b feature/amazing-feature\`
3. **Commit changes**: \`git commit -m 'Add amazing feature'\`
4. **Push to branch**: \`git push origin feature/amazing-feature\`
5. **Open Pull Request**

### **Development Guidelines**
- Follow TypeScript best practices
- Write tests for new features
- Update documentation
- Follow conventional commit messages

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Wiki](https://github.com/${repoOwner}/${repoName}/wiki)
- **Issues**: [GitHub Issues](https://github.com/${repoOwner}/${repoName}/issues)
- **Discussions**: [GitHub Discussions](https://github.com/${repoOwner}/${repoName}/discussions)
- **Email**: support@${deploymentUrl}

## 🎉 Acknowledgments

- **Next.js** - React framework
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - Component library
- **Cloudflare** - Edge computing platform
- **Vercel** - Deployment platform

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

[🚀 Deploy Now](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F${repoOwner}%2F${repoName}) • [📖 Documentation](https://github.com/${repoOwner}/${repoName}/wiki) • [💬 Community](https://github.com/${repoOwner}/${repoName}/discussions)

</div>
`

fs.writeFileSync(path.join(process.cwd(), "README.md"), readmeContent)
console.log("✅ README.md updated successfully!")
