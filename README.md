# GitHub Blog System

A powerful, modern blog system built with Next.js, powered by GitHub Pages, and enhanced with advanced features for content management, SEO, and analytics.

## 🚀 Features

### Core Functionality
- **GitHub Pages Integration**: Seamless deployment and hosting
- **Admin Dashboard**: Comprehensive management panel for repository owners
- **Content Management**: Advanced CMS with Markdown and rich text editing
- **User Authentication**: GitHub OAuth integration via Cloudflare
- **File Storage**: Cloudflare R2 integration for media management

### Content Features
- **Dual Editor Modes**: Support for both Markdown and rich text editing
- **Advanced Metadata**: Tags, categories, status management, and visibility controls
- **Multilingual Support**: i18n internationalization for global reach
- **SEO Optimization**: Meta tags, structured data, sitemaps, and OpenGraph

### Analytics & Monetization
- **Analytics Integration**: Google Analytics, Plausible support
- **AdSense Integration**: Built-in advertising support
- **Performance Tracking**: Page views, user engagement metrics

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **Authentication**: Cloudflare + GitHub OAuth
- **Storage**: Cloudflare R2 for file uploads
- **Deployment**: Vercel with one-click deployment
- **Database**: PostgreSQL (Neon/Supabase compatible)

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- GitHub repository for content storage
- Cloudflare account for authentication and storage
- Vercel account for deployment

### Quick Start

1. **Clone and Install**
   \`\`\`bash
   git clone <your-repo-url>
   cd github-blog-system
   npm install
   \`\`\`

2. **Environment Setup**
   Create a \`.env.local\` file:
   \`\`\`env
   # GitHub OAuth
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   GITHUB_REPO_OWNER=your_username
   GITHUB_REPO_NAME=your_blog_repo

   # Cloudflare R2
   CLOUDFLARE_ACCOUNT_ID=your_account_id
   CLOUDFLARE_R2_ACCESS_KEY_ID=your_access_key
   CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_secret_key
   CLOUDFLARE_R2_BUCKET_NAME=your_bucket_name

   # Site Configuration
   NEXT_PUBLIC_SITE_URL=https://your-blog.vercel.app
   
   # Database (Optional)
   DATABASE_URL=your_database_url
   \`\`\`

3. **Database Setup**
   Run the setup scripts:
   \`\`\`bash
   npm run setup:db
   npm run seed:data
   \`\`\`

4. **Development**
   \`\`\`bash
   npm run dev
   \`\`\`

## 🔧 Configuration

### GitHub OAuth Setup
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App with:
   - Homepage URL: \`https://your-blog.vercel.app\`
   - Authorization callback URL: \`https://your-blog.vercel.app/api/auth/github\`

### Cloudflare R2 Setup
1. Create an R2 bucket in Cloudflare dashboard
2. Generate API tokens with R2 permissions
3. Configure CORS settings for file uploads

### Analytics Setup
Add your analytics tracking codes in \`app/layout.tsx\`:

\`\`\`typescript
// Google Analytics
<Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />

// Plausible Analytics  
<Script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js" />
\`\`\`

## 📝 Usage

### Admin Access
Only GitHub repository owners and collaborators can access the admin panel at \`/admin\`.

### Creating Posts
1. Navigate to \`/admin\`
2. Click "New Post"
3. Fill in post details and content
4. Choose publication settings
5. Save as draft or publish immediately

### Content Management
- **Status**: Draft, Published, Archived
- **Visibility**: Public, Logged-in users only
- **Pinning**: Feature important posts
- **Multilingual**: Create posts in multiple languages

## 🌐 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy with automatic GitHub integration

### Custom Domain
1. Add your domain in Vercel dashboard
2. Configure DNS settings
3. Enable HTTPS (automatic with Vercel)

## 🔍 SEO Features

- **Automatic Sitemaps**: Generated at \`/sitemap.xml\`
- **Robots.txt**: SEO-friendly crawler instructions
- **Meta Tags**: Dynamic Open Graph and Twitter Card tags
- **Structured Data**: JSON-LD for rich search results
- **Performance**: Optimized Core Web Vitals

## 🌍 Internationalization

The system supports multiple languages:
- English (en)
- Spanish (es) 
- French (fr)
- German (de)
- Chinese (zh)

Add new languages by extending \`lib/i18n.ts\`.

## 📊 Analytics

### Built-in Analytics
- Page views tracking
- User engagement metrics
- Popular posts identification
- Traffic source analysis

### Third-party Integration
- Google Analytics 4
- Plausible Analytics
- Custom analytics solutions

## 🛡 Security

- **Authentication**: Secure GitHub OAuth flow
- **Authorization**: Repository-based access control
- **CSRF Protection**: Built-in Next.js security
- **Content Validation**: Input sanitization and validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

- **Documentation**: Check the \`/docs\` folder
- **Issues**: Report bugs on GitHub Issues
- **Discussions**: Join GitHub Discussions for questions

## 🚀 Roadmap

- [ ] Comment system integration
- [ ] Newsletter subscription
- [ ] Advanced search functionality
- [ ] Theme customization
- [ ] Mobile app companion
- [ ] AI-powered content suggestions

---

Built with ❤️ using Next.js, Tailwind CSS, and modern web technologies.
\`\`\`
