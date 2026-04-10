"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { UserMenu } from "@/components/user-menu"
import { Separator } from "@/components/ui/separator"
import { useUser } from "@/lib/swr/hooks"

export function DashboardHeader() {
  const { user, isLoading } = useUser()

  if (isLoading) {
    return (
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-card px-4 md:px-6">
        <div className="flex flex-1 items-center gap-4 md:gap-8">
          <h1 className="text-sm font-medium md:hidden">Job Tracker</h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Separator orientation="vertical" className="h-6" />
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-card px-4 md:px-6">
      <div className="flex flex-1 items-center gap-4 md:gap-8">
        <h1 className="text-sm font-medium md:hidden">Job Tracker</h1>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Separator orientation="vertical" className="h-6" />
        {user && <UserMenu user={user} />}
      </div>
    </header>
  )
}
