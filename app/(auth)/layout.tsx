import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { BriefcaseIcon } from "@hugeicons/core-free-icons"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 py-12">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/8 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.12]" style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />
      </div>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors">
          <HugeiconsIcon icon={BriefcaseIcon} strokeWidth={2} className="size-4" />
          JobTracker
        </Link>
        <ThemeToggle />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[420px]">
        {children}
      </div>
    </div>
  )
}
