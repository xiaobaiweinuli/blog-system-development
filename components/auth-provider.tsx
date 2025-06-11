"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: "admin" | "user"
  githubUsername: string
  isRepoOwner: boolean
  permissions: string[]
}

interface AuthContextType {
  user: User | null
  login: (redirectUrl?: string) => void
  logout: () => void
  isLoading: boolean
  hasPermission: (permission: string) => boolean
  isAdmin: () => boolean
  isAuthenticated: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/api/auth/me", {
        credentials: "include",
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = (redirectUrl?: string) => {
    const githubAuthUrl = new URL("https://github.com/login/oauth/authorize")
    githubAuthUrl.searchParams.set("client_id", process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || "Ov23li4W54qglDu0Oj90")
    githubAuthUrl.searchParams.set("scope", "repo,read:org,read:user,user:email")
    githubAuthUrl.searchParams.set("redirect_uri", `${window.location.origin}/api/auth/github`)

    if (redirectUrl) {
      githubAuthUrl.searchParams.set("state", redirectUrl)
    }

    window.location.href = githubAuthUrl.toString()
  }

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })
      setUser(null)
      router.push("/")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const hasPermission = (permission: string): boolean => {
    if (!user) return false
    if (user.role === "admin") return true
    return user.permissions.includes(permission)
  }

  const isAdmin = (): boolean => {
    return user?.role === "admin" || false
  }

  const isAuthenticated = (): boolean => {
    return user !== null
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    hasPermission,
    isAdmin,
    isAuthenticated,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth 必须在 AuthProvider 内使用")
  }
  return context
}
