"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { defaultLocale, type Locale, getTranslations, type Translations } from "@/lib/i18n"

interface LanguageContextType {
  currentLocale: Locale
  translations: Translations
  setLocale: (locale: Locale) => void
  availableLocales: Locale[]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLocale, setCurrentLocale] = useState<Locale>(defaultLocale)
  const [translations, setTranslations] = useState<Translations>(getTranslations(defaultLocale))
  const [isClient, setIsClient] = useState(false)

  // 可用的语言列表
  const availableLocales: Locale[] = ["zh", "en", "es", "fr", "de", "ja", "ko", "ru"]

  useEffect(() => {
    setIsClient(true)

    // 从本地存储中获取用户之前选择的语言
    const savedLocale = localStorage.getItem("preferred-locale") as Locale | null

    // 如果有保存的语言设置，使用它；否则尝试使用浏览器语言；最后使用默认语言
    if (savedLocale && availableLocales.includes(savedLocale)) {
      setCurrentLocale(savedLocale)
      setTranslations(getTranslations(savedLocale))
    } else {
      // 尝试检测浏览器语言
      const browserLang = navigator.language.split("-")[0] as Locale
      if (availableLocales.includes(browserLang)) {
        setCurrentLocale(browserLang)
        setTranslations(getTranslations(browserLang))
        localStorage.setItem("preferred-locale", browserLang)
      }
    }

    // 更新 HTML lang 属性
    document.documentElement.lang = currentLocale
  }, [])

  // 当语言变化时更新 HTML lang 属性
  useEffect(() => {
    if (isClient) {
      document.documentElement.lang = currentLocale
    }
  }, [currentLocale, isClient])

  const setLocale = (locale: Locale) => {
    setCurrentLocale(locale)
    setTranslations(getTranslations(locale))
    localStorage.setItem("preferred-locale", locale)
  }

  return (
    <LanguageContext.Provider value={{ currentLocale, translations, setLocale, availableLocales }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
