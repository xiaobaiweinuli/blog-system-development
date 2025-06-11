# Vercel 部署指南

## 环境变量设置

在 Vercel 部署时，需要设置以下环境变量：

1. **GitHub 相关配置**
   - `GITHUB_CLIENT_ID` - GitHub OAuth 应用的客户端 ID
   - `GITHUB_CLIENT_SECRET` - GitHub OAuth 应用的客户端密钥
   - `GITHUB_REPO_OWNER` - GitHub 仓库所有者用户名
   - `GITHUB_REPO_NAME` - GitHub 仓库名称
   - `NEXT_PUBLIC_GITHUB_CLIENT_ID` - 公开的 GitHub 客户端 ID（与 GITHUB_CLIENT_ID 相同）

2. **Cloudflare 相关配置**（如果使用）
   - `CLOUDFLARE_ACCOUNT_ID` - Cloudflare 账户 ID
   - `CLOUDFLARE_R2_ACCESS_KEY_ID` - Cloudflare R2 访问密钥 ID
   - `CLOUDFLARE_R2_SECRET_ACCESS_KEY` - Cloudflare R2 访问密钥
   - `CLOUDFLARE_R2_BUCKET_NAME` - Cloudflare R2 存储桶名称

3. **其他必要配置**
   - `NEXT_PUBLIC_SITE_URL` - 网站的公开 URL
   - `JWT_SECRET` - 用于 JWT 令牌的密钥

## 部署步骤

1. **Fork 或克隆仓库**
   \`\`\`bash
   git clone https://github.com/xiaobaiweinuli/blog-system-development.git
   cd blog-system-development
   \`\`\`

2. **在 Vercel 上导入项目**
   - 登录 Vercel 账户
   - 点击 "Import Project"
   - 选择 "Import Git Repository"
   - 输入仓库 URL 或从列表中选择

3. **配置项目**
   - 项目名称：自定义或使用默认
   - 框架预设：Next.js
   - 根目录：./（默认）
   - 构建命令：默认
   - 输出目录：默认

4. **添加环境变量**
   - 在 Vercel 项目设置中添加上述所有环境变量

5. **部署项目**
   - 点击 "Deploy" 按钮

## GitHub OAuth 应用设置

1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
2. 点击 "New OAuth App"
3. 填写应用信息：
   - **Application name**: 你的博客名称
   - **Homepage URL**: `https://你的域名.vercel.app`
   - **Authorization callback URL**: `https://你的域名.vercel.app/api/auth/github`
4. 创建应用后，复制 Client ID 和 Client Secret

## 在 Vercel 中设置环境变量

1. 进入你的 Vercel 项目仪表板
2. 点击 "Settings" 标签
3. 点击 "Environment Variables"
4. 逐一添加上述环境变量：
   - **Name**: 变量名（如 `GITHUB_CLIENT_ID`）
   - **Value**: 变量值（如 `Ov23li4W54qglDu0Oj90`）
   - **Environment**: 选择 `Production`, `Preview`, 和 `Development`

## 生成 JWT 密钥

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

## 常见问题排查

### 部署失败

如果部署失败，请检查以下几点：

1. **环境变量是否正确设置**
   - 检查所有必需的环境变量是否已添加
   - 确保没有拼写错误

2. **GitHub OAuth 配置**
   - 确保 GitHub OAuth 应用的回调 URL 设置为：
     \`\`\`
     https://你的域名.vercel.app/api/auth/github
     \`\`\`

3. **API 超时问题**
   - 如果 API 请求超时，可以在项目设置中增加函数超时时间

4. **构建错误**
   - 检查构建日志以获取详细错误信息
   - 确保所有依赖项都已正确安装

## 更新部署

当你对代码进行更改后，只需推送到 GitHub 仓库，Vercel 将自动重新部署。

\`\`\`bash
git add .
git commit -m "更新内容"
git push
\`\`\`

## 自定义域名设置

1. 在 Vercel 项目设置中，转到 "Domains" 选项卡
2. 添加你的自定义域名
3. 按照 Vercel 提供的说明更新 DNS 记录
4. 等待 DNS 传播（最多可能需要 48 小时）

## 验证部署

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

## 需要帮助？

如果你在部署过程中遇到任何问题，请查看 Vercel 的官方文档或联系支持团队。
\`\`\`

## 🎉 部署成功！

部署成功后，你的博客系统将具备：
- ✅ GitHub OAuth 登录
- ✅ 文章管理系统
- ✅ 响应式设计
- ✅ SEO 优化
- ✅ 中文界面支持
