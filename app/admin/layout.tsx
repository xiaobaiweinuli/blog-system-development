"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RoleGuard } from "@/components/role-guard"
import { useAuth } from "@/components/auth-provider"
import { usePermissions } from "@/hooks/use-permissions"
import { GlobalLanguageSwitcher } from "@/components/global-language-switcher"
import { useLanguage } from "@/components/language-provider"
import {
  LayoutDashboard,
  FileText,
  Settings,
  BarChart3,
  CloudIcon,
  Github,
  ImageIcon,
  MessageSquare,
  Tag,
  Globe,
  LogOut,
  Shield,
  DollarSign,
  User,
  Crown,
} from "lucide-react"

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  href: string
  active: boolean
  permission?: string
  adminOnly?: boolean
}

function SidebarItem({ icon, label, href, active, permission, adminOnly }: SidebarItemProps) {
  const permissions = usePermissions()

  // 检查权限
  if (adminOnly && !permissions.isAdmin()) {
    return null
  }

  if (permission && !permissions.hasPermission(permission)) {
    return null
  }

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-accent ${
        active ? "bg-accent text-accent-foreground" : "text-muted-foreground"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { translations } = useLanguage()
  const { user, logout } = useAuth()
  const permissions = usePermissions()

  return (
    <RoleGuard requiredRole="admin" redirectTo="/unauthorized">
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">{translations.admin.adminPanel}</h1>
                <p className="text-muted-foreground">{translations.admin.manageContent}</p>
              </div>
              <div className="flex items-center gap-4">
                <GlobalLanguageSwitcher />

                {/* 用户信息 */}
                <div className="flex items-center gap-2">
                  <img src={user?.avatar || "/placeholder.svg"} alt="Avatar" className="w-8 h-8 rounded-full" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user?.name}</span>
                    <div className="flex items-center gap-1">
                      {permissions.isRepoOwner() ? (
                        <Badge variant="default" className="text-xs">
                          <Crown className="w-3 h-3 mr-1" />
                          所有者
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">
                          <User className="w-3 h-3 mr-1" />
                          管理员
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* 连接状态 */}
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-green-500">
                    <Github className="w-3 h-3 mr-1" />
                    GitHub {translations.cloudflare.connected}
                  </Badge>
                  <Badge variant="outline" className="text-orange-500">
                    <CloudIcon className="w-3 h-3 mr-1" />
                    Cloudflare {translations.cloudflare.connected}
                  </Badge>
                </div>

                <Button variant="outline" asChild>
                  <Link href="/">{translations.admin.viewBlog}</Link>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 border-r min-h-[calc(100vh-73px)] p-4 hidden md:block">
            <nav className="space-y-1">
              <SidebarItem
                icon={<LayoutDashboard className="w-4 h-4" />}
                label={translations.admin.dashboard}
                href="/admin"
                active={pathname === "/admin"}
              />

              <div className="pt-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {translations.admin.contentManagement}
                </p>
                <SidebarItem
                  icon={<FileText className="w-4 h-4" />}
                  label={translations.admin.posts}
                  href="/admin/posts"
                  active={pathname.startsWith("/admin/posts")}
                  permission="write:posts"
                />
                <SidebarItem
                  icon={<ImageIcon className="w-4 h-4" />}
                  label={translations.admin.media}
                  href="/admin/media"
                  active={pathname.startsWith("/admin/media")}
                  permission="manage:media"
                />
                <SidebarItem
                  icon={<Tag className="w-4 h-4" />}
                  label={translations.admin.tags}
                  href="/admin/tags"
                  active={pathname.startsWith("/admin/tags")}
                  permission="write:posts"
                />
                <SidebarItem
                  icon={<MessageSquare className="w-4 h-4" />}
                  label={translations.admin.comments}
                  href="/admin/comments"
                  active={pathname.startsWith("/admin/comments")}
                  permission="manage:comments"
                />
              </div>

              <div className="pt-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {translations.admin.marketingTools}
                </p>
                <SidebarItem
                  icon={<Globe className="w-4 h-4" />}
                  label={translations.admin.seo}
                  href="/admin/seo"
                  active={pathname.startsWith("/admin/seo")}
                  permission="manage:seo"
                />
                <SidebarItem
                  icon={<DollarSign className="w-4 h-4" />}
                  label={translations.admin.ads}
                  href="/admin/ads"
                  active={pathname.startsWith("/admin/ads")}
                  permission="manage:ads"
                />
                <SidebarItem
                  icon={<BarChart3 className="w-4 h-4" />}
                  label={translations.admin.analytics}
                  href="/admin/analytics"
                  active={pathname.startsWith("/admin/analytics")}
                  permission="manage:analytics"
                />
              </div>

              <div className="pt-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {translations.admin.systemIntegration}
                </p>
                <SidebarItem
                  icon={<CloudIcon className="w-4 h-4" />}
                  label={translations.admin.cloudflare}
                  href="/admin/cloudflare"
                  active={pathname.startsWith("/admin/cloudflare")}
                  adminOnly
                />
                <SidebarItem
                  icon={<Github className="w-4 h-4" />}
                  label={translations.admin.github}
                  href="/admin/github"
                  active={pathname.startsWith("/admin/github")}
                  adminOnly
                />
                <SidebarItem
                  icon={<Shield className="w-4 h-4" />}
                  label={translations.admin.permissions}
                  href="/admin/permissions"
                  active={pathname.startsWith("/admin/permissions")}
                  adminOnly
                />
              </div>

              <div className="pt-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {translations.common.settings}
                </p>
                <SidebarItem
                  icon={<Settings className="w-4 h-4" />}
                  label={translations.admin.systemSettings}
                  href="/admin/settings"
                  active={pathname.startsWith("/admin/settings")}
                  permission="manage:settings"
                />
              </div>

              <div className="pt-4 mt-4 border-t">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {translations.admin.logout}
                </Button>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </RoleGuard>
  )
}
