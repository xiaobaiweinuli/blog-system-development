"use client"

import type React from "react"
import { useAuth } from "./auth-provider"
import { usePermissions } from "@/hooks/use-permissions"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock } from "lucide-react"

interface ProtectedContentProps {
  children: React.ReactNode
  permission?: string
  role?: "admin" | "user"
  fallback?: React.ReactNode
  showMessage?: boolean
}

export function ProtectedContent({ children, permission, role, fallback, showMessage = true }: ProtectedContentProps) {
  const { user, isAuthenticated } = useAuth()
  const permissions = usePermissions()

  // Check authentication
  if (!isAuthenticated()) {
    if (fallback) return <>{fallback}</>
    if (!showMessage) return null

    return (
      <Alert>
        <Lock className="h-4 w-4" />
        <AlertDescription>您需要登录才能查看此内容。</AlertDescription>
      </Alert>
    )
  }

  // Check role
  if (role && user?.role !== role) {
    if (fallback) return <>{fallback}</>
    if (!showMessage) return null

    return (
      <Alert variant="destructive">
        <Lock className="h-4 w-4" />
        <AlertDescription>您没有权限查看此内容。需要 {role} 角色。</AlertDescription>
      </Alert>
    )
  }

  // Check specific permission
  if (permission && !permissions.hasPermission(permission)) {
    if (fallback) return <>{fallback}</>
    if (!showMessage) return null

    return (
      <Alert variant="destructive">
        <Lock className="h-4 w-4" />
        <AlertDescription>您没有权限执行此操作。需要 {permission} 权限。</AlertDescription>
      </Alert>
    )
  }

  return <>{children}</>
}
