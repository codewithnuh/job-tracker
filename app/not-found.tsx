"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft02Icon, Search01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="relative text-center">
        {/* Glow effect */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto mb-8 flex size-20 items-center justify-center rounded-3xl border border-primary/20 bg-primary/5">
            <HugeiconsIcon
              icon={Search01Icon}
              className="size-10 text-primary"
              strokeWidth={1.5}
            />
          </div>

          <h1 className="mb-4 text-6xl font-black tracking-tighter md:text-8xl">
            404
          </h1>
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Page Not Found
          </h2>
          <p className="mx-auto mb-10 max-w-md text-lg text-muted-foreground">
            The page you're looking for was lost in the job search chaos. 
            Let's get you back to tracking!
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-xl px-8">
              <Link href="/">
                <HugeiconsIcon icon={ArrowLeft02Icon} className="mr-2 size-5" />
                Back to Home
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-xl border-border px-8"
            >
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
