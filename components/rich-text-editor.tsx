"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Bold, Italic, Link, List, ListOrdered, Quote, Code, ImageIcon } from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [selection, setSelection] = useState({ start: 0, end: 0 })

  const insertText = (before: string, after = "") => {
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)

    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)
    onChange(newText)

    // 重新设置光标位置
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, end + before.length)
    }, 0)
  }

  const toolbarButtons = [
    { icon: Bold, action: () => insertText("**", "**"), title: "粗体" },
    { icon: Italic, action: () => insertText("*", "*"), title: "斜体" },
    { icon: Link, action: () => insertText("[", "](url)"), title: "链接" },
    { icon: List, action: () => insertText("- "), title: "无序列表" },
    { icon: ListOrdered, action: () => insertText("1. "), title: "有序列表" },
    { icon: Quote, action: () => insertText("> "), title: "引用" },
    { icon: Code, action: () => insertText("`", "`"), title: "代码" },
    { icon: ImageIcon, action: () => insertText("![", "](url)"), title: "图片" },
  ]

  return (
    <div className="h-full flex flex-col">
      {/* 工具栏 */}
      <div className="flex items-center space-x-1 p-2 border-b bg-gray-50">
        {toolbarButtons.map((button, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={button.action}
            title={button.title}
            className="h-8 w-8 p-0"
          >
            {typeof button.icon === "function" ? <button.icon className="w-4 h-4" /> : button.icon}
          </Button>
        ))}
      </div>

      {/* 编辑器 */}
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="开始写作..."
        className="flex-1 resize-none border-0 rounded-none focus:ring-0"
        onSelect={(e) => {
          const target = e.target as HTMLTextAreaElement
          setSelection({ start: target.selectionStart, end: target.selectionEnd })
        }}
      />
    </div>
  )
}
