"use client"

import { RoleGuard } from "@/components/role-guard"
import { SetupWizard } from "@/components/setup-wizard"

export default function SetupPage() {
  return (
    <RoleGuard requiredRole="admin" redirectTo="/unauthorized">
      <div className="min-h-screen bg-background">
        <SetupWizard />
      </div>
    </RoleGuard>
  )
}
