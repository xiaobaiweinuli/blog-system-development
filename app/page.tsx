export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-700">我的博客</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="/" className="text-purple-700 hover:text-purple-900">
                  首页
                </a>
              </li>
              <li>
                <a href="/posts" className="text-gray-600 hover:text-purple-700">
                  文章
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-purple-700">
                  关于
                </a>
              </li>
              <li>
                <a href="/auth/login" className="text-gray-600 hover:text-purple-700">
                  登录
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-purple-800">欢迎来到我的博客</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            这是一个基于 Next.js 和 GitHub 的现代化博客系统，专注于内容创作与分享。
          </p>
          <div className="mt-8">
            <a href="/posts" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md">
              浏览文章
            </a>
          </div>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-2">简洁设计</h3>
            <p>专注于内容展示的简洁设计，让读者能够更好地沉浸在阅读体验中。</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-2">GitHub 集成</h3>
            <p>与 GitHub 深度集成，利用 GitHub 的强大功能进行内容管理和版本控制。</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-2">响应式设计</h3>
            <p>完全响应式的设计，在任何设备上都能提供出色的阅读体验。</p>
          </div>
        </section>

        <section className="bg-purple-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center text-purple-800">开始使用</h2>
          <p className="text-center mb-6">只需几个简单的步骤，即可开始使用这个强大的博客系统。</p>
          <div className="flex justify-center">
            <a
              href="/auth/login"
              className="border border-purple-600 text-purple-600 hover:bg-purple-100 px-6 py-2 rounded-md"
            >
              立即登录
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">我的博客</h3>
              <p className="text-gray-300">基于 Next.js 和 GitHub 的现代化博客系统</p>
            </div>
            <div>
              <p>&copy; {new Date().getFullYear()} 我的博客. 保留所有权利.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
