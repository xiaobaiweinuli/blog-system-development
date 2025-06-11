"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { locales, localeNames, type Locale } from "@/lib/i18n"

interface LanguageSwitcherProps {
  currentLocale: Locale
  onLocaleChange: (locale: Locale) => void
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
}

export function LanguageSwitcher({
  currentLocale,
  onLocaleChange,
  variant = "outline",
  size = "sm",
}: LanguageSwitcherProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size}>
          <Globe className="w-4 h-4 mr-2" />
          {localeNames[currentLocale]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => onLocaleChange(locale)}
            className={currentLocale === locale ? "bg-accent" : ""}
          >
            {localeNames[locale]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
