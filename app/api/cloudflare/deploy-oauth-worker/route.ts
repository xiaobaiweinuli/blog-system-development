import { type NextRequest, NextResponse } from "next/server"

const OAUTH_WORKER_SCRIPT = `
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // 处理 CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    // GitHub OAuth 回调处理
    if (url.pathname === '/auth/github/callback') {
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');
      
      if (!code) {
        return new Response('Missing authorization code', { status: 400 });
      }

      try {
        // 使用存储在 Worker 环境变量中的密钥交换访问令牌
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: env.GITHUB_CLIENT_ID,
            client_secret: env.GITHUB_CLIENT_SECRET,
            code: code,
          }),
        });

        const tokenData = await tokenResponse.json();
        
        if (tokenData.error) {
          throw new Error(tokenData.error_description);
        }

        // 获取用户信息
        const userResponse = await fetch('https://api.github.com/user', {
          headers: {
            'Authorization': \`Bearer \${tokenData.access_token}\`,
            'Accept': 'application/vnd.github.v3+json',
          },
        });

        const userData = await userResponse.json();

        // 重定向回主站点，带上安全的用户信息
        const redirectUrl = new URL(env.SITE_URL + '/auth/callback');
        redirectUrl.searchParams.set('token', tokenData.access_token);
        redirectUrl.searchParams.set('user', JSON.stringify(userData));
        
        return Response.redirect(redirectUrl.toString(), 302);
      } catch (error) {
        console.error('OAuth error:', error);
        return new Response('OAuth authentication failed', { status: 500 });
      }
    }

    // GitHub API 代理
    if (url.pathname.startsWith('/api/github/')) {
      const githubPath = url.pathname.replace('/api/github/', '');
      const githubUrl = \`https://api.github.com/\${githubPath}\`;
      
      const authHeader = request.headers.get('Authorization');
      if (!authHeader) {
        return new Response('Missing authorization header', { status: 401 });
      }

      const githubResponse = await fetch(githubUrl, {
        method: request.method,
        headers: {
          'Authorization': authHeader,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Blog-System-Worker',
        },
        body: request.method !== 'GET' ? await request.text() : undefined,
      });

      const responseData = await githubResponse.text();
      
      return new Response(responseData, {
        status: githubResponse.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    return new Response('Not found', { status: 404 });
  },
};
`

export async function POST(request: NextRequest) {
  try {
    const { accountId, apiToken, workerName, githubClientId, githubClientSecret } = await request.json()

    // 部署 Worker 脚本
    const deployResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/${workerName}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/javascript",
        },
        body: OAUTH_WORKER_SCRIPT,
      },
    )

    if (!deployResponse.ok) {
      throw new Error("部署 Worker 失败")
    }

    // 设置环境变量
    const envResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/${workerName}/settings`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          settings: [
            {
              name: "GITHUB_CLIENT_ID",
              value: githubClientId,
              type: "secret_text",
            },
            {
              name: "GITHUB_CLIENT_SECRET",
              value: githubClientSecret,
              type: "secret_text",
            },
            {
              name: "SITE_URL",
              value: process.env.NEXT_PUBLIC_SITE_URL,
              type: "secret_text",
            },
          ],
        }),
      },
    )

    // 创建自定义域名路由
    const routeResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/${workerName}/routes`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pattern: `${workerName}.workers.dev/*`,
          script: workerName,
        }),
      },
    )

    return NextResponse.json({
      success: true,
      workerName,
      workerDomain: `${workerName}.workers.dev`,
      endpoints: {
        oauth: `https://${workerName}.workers.dev/auth/github/callback`,
        api: `https://${workerName}.workers.dev/api/github/`,
      },
    })
  } catch (error) {
    console.error("部署 OAuth Worker 失败:", error)
    return NextResponse.json({ error: "部署 OAuth Worker 失败" }, { status: 500 })
  }
}
