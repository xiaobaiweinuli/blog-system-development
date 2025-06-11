"use client"

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-white shadow rounded-lg p-8">
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">访问被拒绝</h1>
            <p className="text-gray-600">您没有权限访问此页面</p>
          </div>

          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <h3 className="font-medium text-yellow-800 mb-2">权限说明</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• 仓库所有者：完整管理员权限</li>
                <li>• 协作者：内容创建和编辑权限</li>
                <li>• 其他用户：只读访问权限</li>
              </ul>
            </div>

            <div className="space-y-2">
              <a
                href="/"
                className="block w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
              >
                返回首页
              </a>
              <a
                href="/auth/login"
                className="block w-full py-2 px-4 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              >
                重新登录
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
