"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"

import {
  Home01Icon,
  BriefcaseIcon,
  FileChartPieIcon as ChartPieIcon,
  Menu01Icon,
  Logout03Icon,
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { logoutAction } from "@/lib/api/actions/auth"

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home01Icon,
  },
  {
    title: "Applications",
    href: "/applications",
    icon: BriefcaseIcon,
  },
  {
    title: "Stats",
    href: "/stats",
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
          (item.href !== "/" && pathname.startsWith(item.href))
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <HugeiconsIcon
              icon={item.icon}
              strokeWidth={2}
              className="size-5"
            />
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}

export function DashboardNav({ className }: DashboardNavProps) {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = React.useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await logoutAction()
    router.replace("/login")
  }

  return (
    <aside
      className={cn(
        "hidden w-64 shrink-0 border-r bg-card lg:flex lg:flex-col",
        className
      )}
    >
      <div className="flex h-14 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2">
          <HugeiconsIcon
            icon={BriefcaseIcon}
            strokeWidth={2}
            className="size-5"
          />
          <span className="text-base font-semibold">Job Tracker</span>
        </Link>
      </div>
      <div className="flex flex-1 flex-col px-3 py-4">
        <NavLinks />
        <div className="mt-auto pt-4">
          <Separator className="mb-4" />
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <HugeiconsIcon
              icon={Logout03Icon}
              strokeWidth={2}
              className="size-5"
            />
            {isLoggingOut ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </div>
    </aside>
  )
}

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = React.useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    setOpen(false)
    await logoutAction()
    router.replace("/login")
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button
        variant="ghost"
        size="icon"
        className="size-9 lg:hidden"
        onClick={() => setOpen(true)}
      >
        <HugeiconsIcon icon={Menu01Icon} strokeWidth={2} />
        <span className="sr-only">Open menu</span>
      </Button>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation Menu</SheetTitle>
        </SheetHeader>
        <div className="flex h-14 items-center justify-between border-b px-4">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2"
          >
            <HugeiconsIcon
              icon={BriefcaseIcon}
              strokeWidth={2}
              className="size-5"
            />
            <span className="text-base font-semibold">Job Tracker</span>
          </Link>
        </div>
        <div className="flex flex-1 flex-col px-3 py-4">
          <NavLinks onItemClick={() => setOpen(false)} />
          <div className="mt-auto pt-4">
            <Separator className="mb-4" />
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <HugeiconsIcon
                icon={Logout03Icon}
                strokeWidth={2}
                className="size-5"
              />
              {isLoggingOut ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
