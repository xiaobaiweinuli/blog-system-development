"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"

interface RoleGuardProps {
  children: React.ReactNode
  requiredRole?: "admin" | "user"
  redirectTo?: string
}

export function RoleGuard({ children, requiredRole = "user", redirectTo = "/auth/login" }: RoleGuardProps) {
  const { user, isLoading, isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated()) {
        router.push(redirectTo)
        return
      }

      if (requiredRole === "admin" && !isAdmin()) {
        router.push("/unauthorized")
        return
      }
    }
  }, [user, isLoading, requiredRole, redirectTo, router, isAuthenticated, isAdmin])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!isAuthenticated()) {
    return null
  }

  if (requiredRole === "admin" && !isAdmin()) {
    return null
  }

  return <>{children}</>
}
