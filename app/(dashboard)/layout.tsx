import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/api/actions/auth"
import { DashboardNav, MobileNav } from "@/components/dashboard-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserMenu } from "@/components/user-menu"
import { Separator } from "@/components/ui/separator"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardNav />
      <div className="flex w-full flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-card px-4 md:px-6">
          <MobileNav />
          <div className="flex flex-1 items-center gap-4 md:gap-8">
            <h1 className="text-sm font-medium md:hidden">Job Tracker</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Separator orientation="vertical" className="h-6" />
            <UserMenu user={user} />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
