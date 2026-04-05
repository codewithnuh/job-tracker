"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"

import {
  Home01Icon,
  BriefcaseIcon,
  FileChartPieIcon as ChartPieIcon,
  Menu01Icon,
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home01Icon,
  },
  {
    title: "Applications",
    href: "/dashboard/applications",
    icon: BriefcaseIcon,
  },
  {
    title: "Stats",
    href: "/dashboard/stats",
    icon: ChartPieIcon,
  },
]

interface DashboardNavProps {
  className?: string
}

function NavLinks({
  className,
  onItemClick,
}: {
  className?: string
  onItemClick?: () => void
}) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex flex-col gap-1", className)}>
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname.startsWith(item.href))
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <HugeiconsIcon icon={item.icon} strokeWidth={2} />
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}

export function DashboardNav({ className }: DashboardNavProps) {
  return (
    <aside
      className={cn(
        "hidden w-64 shrink-0 border-r bg-card md:flex md:flex-col",
        className
      )}
    >
      <div className="flex h-14 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <HugeiconsIcon icon={BriefcaseIcon} strokeWidth={2} />
          <span className="text-base font-semibold">Job Tracker</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <NavLinks />
      </div>
    </aside>
  )
}

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <HugeiconsIcon icon={Menu01Icon} strokeWidth={2} />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex h-14 items-center border-b px-6">
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2"
          >
            <HugeiconsIcon icon={BriefcaseIcon} strokeWidth={2} />
            <span className="text-base font-semibold">Job Tracker</span>
          </Link>
        </div>
        <div className="px-3 py-4">
          <NavLinks onItemClick={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
