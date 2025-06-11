# 部署故障排除指南

## 常见部署问题及解决方案

### 1. Functions 配置错误
**错误信息**: `The pattern "app/api/**/*.ts" defined in functions doesn't match any Serverless Functions`

**解决方案**: 
- 对于 Next.js App Router，Vercel 会自动检测和配置 API 路由
- 移除 `vercel.json` 中的 `functions` 配置
- 让 Vercel 自动处理函数配置

### 2. 环境变量配置
确保在 Vercel 项目设置中添加以下环境变量：

\`\`\`
GITHUB_CLIENT_ID=Ov23li4W54qglDu0Oj90
GITHUB_CLIENT_SECRET=你的GitHub客户端密钥
NEXT_PUBLIC_GITHUB_CLIENT_ID=Ov23li4W54qglDu0Oj90
GITHUB_REPO_OWNER=你的GitHub用户名
GITHUB_REPO_NAME=你的仓库名
NEXT_PUBLIC_SITE_URL=https://你的域名.vercel.app
CLOUDFLARE_ACCOUNT_ID=你的Cloudflare账户ID
CLOUDFLARE_R2_ACCESS_KEY_ID=你的R2访问密钥ID
CLOUDFLARE_R2_SECRET_ACCESS_KEY=你的R2密钥
CLOUDFLARE_R2_BUCKET_NAME=你的R2存储桶名
JWT_SECRET=随机生成的密钥
\`\`\`

### 3. GitHub OAuth 配置
1. 访问 GitHub Settings > Developer settings > OAuth Apps
2. 编辑你的 OAuth 应用
3. 设置 Authorization callback URL 为：
   \`\`\`
   https://你的域名.vercel.app/api/auth/github
   \`\`\`

### 4. 部署步骤
1. 推送代码到 GitHub
2. 在 Vercel 中导入项目
3. 添加环境变量
4. 部署项目
5. 配置 GitHub OAuth 回调 URL
6. 重新部署（如果需要）

### 5. 验证部署
部署成功后，访问以下 URL 验证：
- 主页: `https://你的域名.vercel.app`
- 登录: `https://你的域名.vercel.app/auth/login`
- API 健康检查: `https://你的域名.vercel.app/api/setup/status`

## 常见错误代码

### 500 Internal Server Error
- 检查环境变量是否正确设置
- 查看 Vercel 函数日志
- 确认 GitHub OAuth 配置正确

### 404 Not Found
- 检查路由配置
- 确认文件路径正确
- 验证 `vercel.json` 重写规则

### CORS 错误
- 检查 `vercel.json` 中的 headers 配置
- 确认 API 路由正确处理 CORS

## 获取帮助
如果问题仍然存在：
1. 检查 Vercel 部署日志
2. 查看浏览器开发者工具控制台
3. 参考 Next.js 和 Vercel 官方文档
