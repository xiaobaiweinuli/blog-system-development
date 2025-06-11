"use client"

import { useAuth } from "@/components/auth-provider"

export function usePermissions() {
  const { user, isAuthenticated, isAdmin } = useAuth()

  const hasPermission = (permission: string): boolean => {
    if (!isAuthenticated()) return false
    if (isAdmin()) return true

    // Define permission mappings
    const userPermissions = user?.permissions || []
    return userPermissions.includes(permission)
  }

  const canCreatePosts = (): boolean => {
    return hasPermission("write:posts")
  }

  const canEditPosts = (): boolean => {
    return hasPermission("write:posts")
  }

  const canDeletePosts = (): boolean => {
    return isAdmin()
  }

  const canManageUsers = (): boolean => {
    return isAdmin()
  }

  const canManageSettings = (): boolean => {
    return isAdmin()
  }

  const isRepoOwner = (): boolean => {
    return user?.isRepoOwner || false
  }

  return {
    hasPermission,
    canCreatePosts,
    canEditPosts,
    canDeletePosts,
    canManageUsers,
    canManageSettings,
    isRepoOwner,
    isAdmin,
    isAuthenticated,
  }
}
