export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">博客系统</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="/" className="text-purple-600 hover:text-purple-800">
                  首页
                </a>
              </li>
              <li>
                <a href="/auth/login" className="text-gray-600 hover:text-gray-800">
                  登录
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">欢迎使用博客系统</h2>
            <p className="mt-4 text-lg text-gray-600">一个简单、高效的博客管理系统</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">示例文章 {i}</h3>
                  <p className="mt-2 text-gray-600">这是一篇示例文章的摘要，展示了博客系统的基本功能和设计。</p>
                  <div className="mt-4">
                    <a href="#" className="text-purple-600 hover:text-purple-800">
                      阅读更多 &rarr;
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500">&copy; 2025 博客系统. 保留所有权利.</p>
        </div>
      </footer>
    </div>
  )
}
