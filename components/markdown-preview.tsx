"use client"

import { useMemo } from "react"

interface MarkdownPreviewProps {
  content: string
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  const htmlContent = useMemo(() => {
    if (!content) return ""

    // 简单的 Markdown 转换
    const html = content
      // 标题
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      // 粗体
      .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
      // 斜体
      .replace(/\*(.*)\*/gim, "<em>$1</em>")
      // 链接
      .replace(/\[([^\]]*)\]$$([^)]*)$$/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      // 图片
      .replace(/!\[([^\]]*)\]$$([^)]*)$$/gim, '<img alt="$1" src="$2" />')
      // 代码块
      .replace(/```([^`]*)```/gim, "<pre><code>$1</code></pre>")
      // 行内代码
      .replace(/`([^`]*)`/gim, "<code>$1</code>")
      // 换行
      .replace(/\n/gim, "<br />")

    return html
  }, [content])

  if (!content) {
    return <div className="text-gray-500 italic text-center py-8">开始输入内容以查看预览...</div>
  }

  return <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />
}
