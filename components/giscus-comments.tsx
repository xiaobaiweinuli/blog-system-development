"use client"

import { useEffect, useRef } from "react"
import { useLanguage } from "@/components/language-provider"

interface GiscusCommentsProps {
  repo: string
  repoId: string
  category: string
  categoryId: string
  mapping?: string
  strict?: boolean
  reactionsEnabled?: boolean
  emitMetadata?: boolean
  inputPosition?: "top" | "bottom"
  theme?: string
  loading?: "lazy" | "eager"
}

export function GiscusComments({
  repo,
  repoId,
  category,
  categoryId,
  mapping = "pathname",
  strict = false,
  reactionsEnabled = true,
  emitMetadata = false,
  inputPosition = "bottom",
  theme = "preferred_color_scheme",
  loading = "lazy",
}: GiscusCommentsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { currentLocale } = useLanguage()

  useEffect(() => {
    if (!ref.current || !repo || !repoId || !category || !categoryId) return

    // 清除现有的 Giscus
    ref.current.innerHTML = ""

    const script = document.createElement("script")
    script.src = "https://giscus.app/client.js"
    script.setAttribute("data-repo", repo)
    script.setAttribute("data-repo-id", repoId)
    script.setAttribute("data-category", category)
    script.setAttribute("data-category-id", categoryId)
    script.setAttribute("data-mapping", mapping)
    script.setAttribute("data-strict", strict.toString())
    script.setAttribute("data-reactions-enabled", reactionsEnabled.toString())
    script.setAttribute("data-emit-metadata", emitMetadata.toString())
    script.setAttribute("data-input-position", inputPosition)
    script.setAttribute("data-theme", theme)
    script.setAttribute("data-lang", currentLocale)
    script.setAttribute("data-loading", loading)
    script.crossOrigin = "anonymous"
    script.async = true

    ref.current.appendChild(script)

    return () => {
      if (ref.current) {
        ref.current.innerHTML = ""
      }
    }
  }, [
    repo,
    repoId,
    category,
    categoryId,
    mapping,
    strict,
    reactionsEnabled,
    emitMetadata,
    inputPosition,
    theme,
    loading,
    currentLocale,
  ])

  return <div ref={ref} className="giscus-container" />
}
