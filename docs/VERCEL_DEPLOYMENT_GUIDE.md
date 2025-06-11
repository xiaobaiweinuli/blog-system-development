# Vercel 部署指南

## 🚀 快速部署步骤

### 1. 准备环境变量

在 Vercel 项目设置中添加以下环境变量：

#### 必需的环境变量：
\`\`\`
GITHUB_CLIENT_ID=Ov23li4W54qglDu0Oj90
GITHUB_CLIENT_SECRET=你的_github_client_secret
NEXT_PUBLIC_GITHUB_CLIENT_ID=Ov23li4W54qglDu0Oj90
GITHUB_REPO_OWNER=你的_github_用户名
GITHUB_REPO_NAME=你的_仓库名称
NEXT_PUBLIC_SITE_URL=https://你的域名.vercel.app
JWT_SECRET=你的_jwt_密钥
\`\`\`

#### 可选的环境变量（用于文件存储）：
\`\`\`
CLOUDFLARE_ACCOUNT_ID=你的_cloudflare_账户_id
CLOUDFLARE_R2_ACCESS_KEY_ID=你的_r2_访问密钥
CLOUDFLARE_R2_SECRET_ACCESS_KEY=你的_r2_密钥
CLOUDFLARE_R2_BUCKET_NAME=你的_存储桶名称
\`\`\`

### 2. GitHub OAuth 应用设置

1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
2. 点击 "New OAuth App"
3. 填写应用信息：
   - **Application name**: 你的博客名称
   - **Homepage URL**: `https://你的域名.vercel.app`
   - **Authorization callback URL**: `https://你的域名.vercel.app/api/auth/github`
4. 创建应用后，复制 Client ID 和 Client Secret

### 3. 在 Vercel 中设置环境变量

1. 进入你的 Vercel 项目仪表板
2. 点击 "Settings" 标签
3. 点击 "Environment Variables"
4. 逐一添加上述环境变量：
   - **Name**: 变量名（如 `GITHUB_CLIENT_ID`）
   - **Value**: 变量值（如 `Ov23li4W54qglDu0Oj90`）
   - **Environment**: 选择 `Production`, `Preview`, 和 `Development`

### 4. 生成 JWT 密钥

如果你需要生成 JWT 密钥，可以使用以下方法：

#### 方法 1: 在线生成
访问 [JWT.io](https://jwt.io/) 或使用在线 Base64 生成器

#### 方法 2: 使用 Node.js
\`\`\`javascript
const crypto = require('crypto');
console.log(crypto.randomBytes(32).toString('base64'));
\`\`\`

#### 方法 3: 使用命令行
\`\`\`bash
openssl rand -base64 32
\`\`\`

### 5. 部署项目

1. 确保所有环境变量都已设置
2. 推送代码到 GitHub
3. Vercel 会自动部署
4. 或者点击 Vercel 仪表板中的 "Deploy" 按钮

### 6. 验证部署

部署完成后：

1. 访问你的网站 URL
2. 测试 GitHub 登录功能
3. 检查管理面板是否可访问
4. 确认所有功能正常工作

## 🔧 常见问题解决

### 问题 1: GitHub OAuth 错误
**解决方案**: 确保回调 URL 设置正确，格式为：
\`\`\`
https://你的域名.vercel.app/api/auth/github
\`\`\`

### 问题 2: 环境变量未生效
**解决方案**: 
1. 检查变量名是否正确（区分大小写）
2. 确保在所有环境（Production, Preview, Development）中都设置了变量
3. 重新部署项目

### 问题 3: JWT 相关错误
**解决方案**: 确保 `JWT_SECRET` 已设置且足够复杂（建议至少 32 字符）

### 问题 4: 仓库访问权限错误
**解决方案**: 
1. 确保 `GITHUB_REPO_OWNER` 和 `GITHUB_REPO_NAME` 正确
2. 确保 GitHub OAuth 应用有足够的权限
3. 检查仓库是否为公开或已授权访问

## 📞 获取帮助

如果遇到问题：
1. 检查 Vercel 部署日志
2. 查看浏览器控制台错误
3. 确认所有环境变量都已正确设置
4. 参考 GitHub OAuth 设置指南

## 🎉 部署成功！

部署成功后，你的博客系统将具备：
- ✅ GitHub OAuth 登录
- ✅ 文章管理系统
- ✅ 响应式设计
- ✅ SEO 优化
- ✅ 中文界面支持
