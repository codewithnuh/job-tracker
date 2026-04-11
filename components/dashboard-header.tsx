"use client"

import * as React from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserMenu } from "@/components/user-menu"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/dashboard-nav"
import { useUser } from "@/lib/swr/hooks"
import { HugeiconsIcon } from "@hugeicons/react"
import { Menu01Icon } from "@hugeicons/core-free-icons"

export function DashboardHeader() {
  const { user, isLoading } = useUser()

  if (isLoading) {
    return (
      <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-card px-4 lg:px-6">
        <div className="flex flex-1 items-center">
          <h1 className="text-sm font-medium">Job Tracker</h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Separator orientation="vertical" className="h-6" />
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-card px-4 lg:px-6">
      <MobileNav />
      <div className="flex flex-1 items-center">
        <h1 className="text-sm font-medium lg:hidden">Job Tracker</h1>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Separator orientation="vertical" className="h-6" />
        {user && <UserMenu user={user} />}
      </div>
    </header>
  )
}
