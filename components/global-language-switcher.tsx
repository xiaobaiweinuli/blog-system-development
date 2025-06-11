"use client"

import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/components/language-provider"

interface GlobalLanguageSwitcherProps {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
}

export function GlobalLanguageSwitcher({ variant, size }: GlobalLanguageSwitcherProps) {
  const { currentLocale, setLocale } = useLanguage()

  return <LanguageSwitcher currentLocale={currentLocale} onLocaleChange={setLocale} variant={variant} size={size} />
}
