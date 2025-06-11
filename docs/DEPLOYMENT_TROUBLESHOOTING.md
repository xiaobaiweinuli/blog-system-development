# 部署故障排除指南

## 常见问题和解决方案

### 1. 中间件错误 (MIDDLEWARE_INVOCATION_FAILED)

**错误信息**: `500: INTERNAL_SERVER_ERROR Code: MIDDLEWARE_INVOCATION_FAILED`

**原因**: 
- 缺少 `JWT_SECRET` 环境变量
- 中间件配置错误
- JWT 验证失败

**解决方案**:
1. 在 Vercel 项目设置中添加环境变量：
   \`\`\`
   JWT_SECRET=your-super-secret-jwt-key-here
   \`\`\`

2. 确保环境变量已正确设置并重新部署

3. 检查中间件配置是否正确

### 2. 环境变量配置

在 Vercel 项目设置中添加以下环境变量：

\`\`\`bash
# GitHub OAuth 配置
GITHUB_CLIENT_ID=Ov23li4W54qglDu0Oj90
GITHUB_CLIENT_SECRET=你的GitHub客户端密钥
NEXT_PUBLIC_GITHUB_CLIENT_ID=Ov23li4W54qglDu0Oj90

# GitHub 仓库配置
GITHUB_REPO_OWNER=你的GitHub用户名
GITHUB_REPO_NAME=你的仓库名

# JWT 密钥
JWT_SECRET=一个强密码用于JWT签名

# 站点配置
NEXT_PUBLIC_SITE_URL=https://你的域名.vercel.app

# Cloudflare R2 配置（可选）
CLOUDFLARE_ACCOUNT_ID=你的Cloudflare账户ID
CLOUDFLARE_R2_ACCESS_KEY_ID=你的R2访问密钥ID
CLOUDFLARE_R2_SECRET_ACCESS_KEY=你的R2密钥
CLOUDFLARE_R2_BUCKET_NAME=你的R2存储桶名称
\`\`\`

### 3. GitHub OAuth 设置

1. 访问 GitHub Settings > Developer settings > OAuth Apps
2. 创建新的 OAuth 应用或编辑现有应用
3. 设置以下信息：
   - Application name: 你的博客名称
   - Homepage URL: `https://你的域名.vercel.app`
   - Authorization callback URL: `https://你的域名.vercel.app/api/auth/github`

### 4. 部署步骤

1. **推送代码到 GitHub**:
   \`\`\`bash
   git add .
   git commit -m "修复部署问题"
   git push
   \`\`\`

2. **在 Vercel 中配置环境变量**:
   - 进入项目设置
   - 添加所有必需的环境变量
   - 保存设置

3. **重新部署**:
   - Vercel 会自动检测代码更改并重新部署
   - 或者手动触发重新部署

### 5. 验证部署

部署成功后，访问你的网站应该能看到：
- 首页正常显示
- GitHub 登录按钮可用
- 管理员功能正常（如果你是仓库所有者）

### 6. 常见错误代码

- `MIDDLEWARE_INVOCATION_FAILED`: 中间件错误，通常是环境变量问题
- `FUNCTION_INVOCATION_FAILED`: API 路由错误，检查 API 代码
- `BUILD_FAILED`: 构建失败，检查代码语法和依赖

如果问题仍然存在，请检查 Vercel 部署日志获取更详细的错误信息。
