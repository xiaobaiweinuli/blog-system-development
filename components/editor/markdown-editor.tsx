"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bold, Italic, Link, List, Quote, Code, Eye, Edit, ImageIcon, Heading } from "lucide-react"

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState("edit")

  const insertMarkdown = (before: string, after = "") => {
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)

    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)
    onChange(newText)

    // 重置光标位置
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, end + before.length)
    }, 0)
  }

  const renderMarkdown = (text: string) => {
    // 简单的 Markdown 渲染预览
    return text
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2 text-gray-900">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mt-6 mb-3 text-gray-900">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-8 mb-4 text-gray-900">$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*)\*/gim, '<em class="italic">$1</em>')
      .replace(/\[([^\]]*)\]$$([^)]*)$$/gim, '<a href="$2" class="text-purple-600 hover:underline">$1</a>')
      .replace(
        /`([^`]*)`/gim,
        '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-purple-600">$1</code>',
      )
      .replace(
        /^> (.*$)/gim,
        '<blockquote class="border-l-4 border-purple-500 pl-4 italic text-gray-600 my-4">$1</blockquote>',
      )
      .replace(/^- (.*$)/gim, '<li class="ml-4">• $1</li>')
      .replace(/\n/gim, "<br />")
  }

  const toolbarButtons = [
    { icon: Heading, action: () => insertMarkdown("# "), title: "标题" },
    { icon: Bold, action: () => insertMarkdown("**", "**"), title: "粗体" },
    { icon: Italic, action: () => insertMarkdown("*", "*"), title: "斜体" },
    { icon: Link, action: () => insertMarkdown("[", "](url)"), title: "链接" },
    { icon: ImageIcon, action: () => insertMarkdown("![", "](url)"), title: "图片" },
    { icon: List, action: () => insertMarkdown("- "), title: "列表" },
    { icon: Quote, action: () => insertMarkdown("> "), title: "引用" },
    { icon: Code, action: () => insertMarkdown("`", "`"), title: "代码" },
  ]

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2">
          <div className="flex items-center gap-1">
            {toolbarButtons.map((button, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={button.action}
                title={button.title}
                className="h-8 w-8 p-0 hover:bg-purple-100"
              >
                <button.icon className="w-4 h-4" />
              </Button>
            ))}
          </div>

          <TabsList className="grid w-32 grid-cols-2">
            <TabsTrigger value="edit" className="text-xs">
              <Edit className="w-3 h-3 mr-1" />
              编辑
            </TabsTrigger>
            <TabsTrigger value="preview" className="text-xs">
              <Eye className="w-3 h-3 mr-1" />
              预览
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="edit" className="m-0">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="min-h-[500px] border-0 rounded-none resize-none focus:ring-0 font-mono"
          />
        </TabsContent>

        <TabsContent value="preview" className="m-0">
          <div className="min-h-[500px] p-6 prose prose-sm max-w-none">
            {value ? (
              <div dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }} className="leading-relaxed" />
            ) : (
              <p className="text-gray-500 italic">开始在编辑标签页中写作，这里将显示预览效果。</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
