"use client"

import { useMemo } from "react"

interface MarkdownPreviewProps {
  content: string
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  const htmlContent = useMemo(() => {
    if (!content) return ""

    // 改进的 Markdown 转换
    let html = content
      // 代码块（必须在其他规则之前处理）
      .replace(/```([^`]*?)```/gims, '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto"><code>$1</code></pre>')
      // 行内代码
      .replace(/`([^`]+)`/gim, '<code class="bg-gray-100 px-2 py-1 rounded text-sm">$1</code>')
      // 标题
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-8 mb-4 text-gray-900">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-10 mb-6 text-gray-900">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-12 mb-8 text-gray-900">$1</h1>')
      // 链接
      .replace(
        /\[([^\]]*)\]$$([^)]*)$$/gim,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:text-purple-800 underline">$1</a>',
      )
      // 图片
      .replace(
        /!\[([^\]]*)\]$$([^)]*)$$/gim,
        '<img alt="$1" src="$2" class="max-w-full h-auto rounded-lg shadow-sm my-4" />',
      )
      // 粗体
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-semibold">$1</strong>')
      // 斜体
      .replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')
      // 无序列表
      .replace(/^- (.*$)/gim, '<li class="ml-4 mb-2">• $1</li>')
      // 有序列表
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 mb-2 list-decimal">$1</li>')
      // 引用
      .replace(
        /^> (.*$)/gim,
        '<blockquote class="border-l-4 border-purple-500 pl-4 py-2 my-4 bg-purple-50 italic">$1</blockquote>',
      )
      // 分隔线
      .replace(/^---$/gim, '<hr class="my-8 border-gray-300" />')
      // 段落（换行）
      .replace(/\n\n/gim, '</p><p class="mb-4 leading-relaxed text-gray-700">')
      // 单个换行
      .replace(/\n/gim, "<br />")

    // 包装在段落中
    html = '<p class="mb-4 leading-relaxed text-gray-700">' + html + "</p>"

    // 清理空段落
    html = html.replace(/<p class="mb-4 leading-relaxed text-gray-700"><\/p>/gim, "")

    return html
  }, [content])

  if (!content) {
    return <div className="text-gray-500 italic text-center py-8">开始输入内容以查看预览...</div>
  }

  return <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />
}
