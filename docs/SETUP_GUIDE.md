# 博客系统配置指南

本指南将帮助您完成博客系统的完整配置，包括 GitHub OAuth、Cloudflare 集成和 Vercel 部署。

## 📋 前置要求

- GitHub 账户
- Cloudflare 账户（可选，用于文件存储）
- Vercel 账户（用于部署）

## 🔧 第一步：GitHub OAuth 配置

### 1. 创建 GitHub OAuth 应用

1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
2. 点击 "New OAuth App"
3. 填写应用信息：
   - **应用名称**: `我的博客系统`
   - **主页 URL**: `https://your-blog.vercel.app`（部署后的域名）
   - **授权回调 URL**: `https://your-blog.vercel.app/api/auth/github`

4. 点击 "Register application"
5. 记录 **Client ID** 和 **Client Secret**

### 2. 设置环境变量

创建 `.env.local` 文件：

\`\`\`env
# GitHub OAuth 配置
GITHUB_CLIENT_ID=你的_github_client_id
GITHUB_CLIENT_SECRET=你的_github_client_secret
NEXT_PUBLIC_GITHUB_CLIENT_ID=你的_github_client_id

# 仓库信息
GITHUB_REPO_OWNER=你的_github_用户名
GITHUB_REPO_NAME=你的_仓库名称

# JWT 密钥（自动生成）
JWT_SECRET=你的_jwt_密钥

# 站点配置
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`

## ☁️ 第二步：Cloudflare 配置（可选）

### 1. 创建 R2 存储桶

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 "R2 Object Storage"
3. 创建新的存储桶
4. 记录存储桶名称

### 2. 生成 API 令牌

1. 进入 "My Profile" > "API Tokens"
2. 创建自定义令牌，权限包括：
   - `Zone:Zone:Read`
   - `Zone:Zone Settings:Edit`
   - `Account:Cloudflare R2:Edit`

### 3. 添加 Cloudflare 环境变量

\`\`\`env
# Cloudflare R2 存储
CLOUDFLARE_ACCOUNT_ID=你的_cloudflare_账户_id
CLOUDFLARE_R2_ACCESS_KEY_ID=你的_r2_访问密钥
CLOUDFLARE_R2_SECRET_ACCESS_KEY=你的_r2_密钥
CLOUDFLARE_R2_BUCKET_NAME=你的_存储桶名称
\`\`\`

## 🚀 第三步：Vercel 部署

### 1. 连接 GitHub 仓库

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 "New Project"
3. 选择您的 GitHub 仓库
4. 点击 "Import"

### 2. 配置环境变量

在 Vercel 项目设置中添加所有环境变量：

- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `NEXT_PUBLIC_GITHUB_CLIENT_ID`
- `GITHUB_REPO_OWNER`
- `GITHUB_REPO_NAME`
- `JWT_SECRET`
- `NEXT_PUBLIC_SITE_URL`
- `CLOUDFLARE_ACCOUNT_ID`（如果使用 Cloudflare）
- `CLOUDFLARE_R2_ACCESS_KEY_ID`（如果使用 Cloudflare）
- `CLOUDFLARE_R2_SECRET_ACCESS_KEY`（如果使用 Cloudflare）
- `CLOUDFLARE_R2_BUCKET_NAME`（如果使用 Cloudflare）

### 3. 更新 GitHub OAuth 回调 URL

部署完成后，更新 GitHub OAuth 应用的回调 URL：
- 将 `http://localhost:3000/api/auth/github` 改为 `https://your-domain.vercel.app/api/auth/github`

## ✅ 第四步：验证配置

### 1. 测试登录

1. 访问您的博客网站
2. 点击登录按钮
3. 使用 GitHub 账户登录
4. 确认能够访问管理面板

### 2. 测试文章功能

1. 在管理面板创建新文章
2. 发布文章
3. 在首页查看文章
4. 点击文章查看详情页

### 3. 测试文件上传（如果配置了 Cloudflare）

1. 进入媒体管理页面
2. 上传测试图片
3. 确认文件正确存储

## 🔧 故障排除

### 常见问题

#### 1. GitHub OAuth 错误
- **错误**: "Unknown error"
- **解决**: 检查 `GITHUB_CLIENT_ID` 和 `GITHUB_CLIENT_SECRET` 是否正确设置

#### 2. 文章页面 404
- **错误**: 点击文章跳转到错误页面
- **解决**: 确保 `app/posts/[slug]/page.tsx` 文件存在

#### 3. Vercel 部署错误
- **错误**: "The `functions` property cannot be used in conjunction with the `builds` property"
- **解决**: 使用更新后的 `vercel.json` 配置

#### 4. 权限问题
- **错误**: 无法访问管理面板
- **解决**: 确保您是仓库的所有者或协作者

### 环境变量检查清单

- [ ] `GITHUB_CLIENT_ID` - GitHub OAuth 客户端 ID
- [ ] `GITHUB_CLIENT_SECRET` - GitHub OAuth 客户端密钥
- [ ] `NEXT_PUBLIC_GITHUB_CLIENT_ID` - 公开的 GitHub 客户端 ID
- [ ] `GITHUB_REPO_OWNER` - GitHub 用户名
- [ ] `GITHUB_REPO_NAME` - 仓库名称
- [ ] `JWT_SECRET` - JWT 签名密钥
- [ ] `NEXT_PUBLIC_SITE_URL` - 网站 URL

## 📞 获取帮助

如果您在配置过程中遇到问题：

1. 检查浏览器控制台的错误信息
2. 查看 Vercel 部署日志
3. 确认所有环境变量都已正确设置
4. 参考本文档的故障排除部分

## 🎉 完成！

配置完成后，您就拥有了一个功能完整的博客系统：

- ✅ GitHub OAuth 登录
- ✅ 文章管理系统
- ✅ 响应式设计
- ✅ SEO 优化
- ✅ 媒体文件管理（如果配置了 Cloudflare）
- ✅ 自动部署

享受您的新博客吧！🎊
