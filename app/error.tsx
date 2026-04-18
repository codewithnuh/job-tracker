"use client"

import { useEffect } from "react"
import { motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Alert01Icon, RefreshIcon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="relative text-center">
        {/* Glow effect */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-destructive/10 blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto mb-8 flex size-20 items-center justify-center rounded-3xl border border-destructive/20 bg-destructive/5">
            <HugeiconsIcon
              icon={Alert01Icon}
              className="size-10 text-destructive"
              strokeWidth={1.5}
            />
          </div>

          <h2 className="mb-4 text-3xl font-black tracking-tighter md:text-5xl">
            Something went wrong!
          </h2>
          <p className="mx-auto mb-10 max-w-md text-lg text-muted-foreground">
            We encountered an unexpected error while processing your job search data. 
            Don't worry, your applications are safe.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              onClick={reset}
              size="lg"
              className="h-12 rounded-xl bg-destructive px-8 text-destructive-foreground hover:bg-destructive/90"
            >
              <HugeiconsIcon icon={RefreshIcon} className="mr-2 size-5" />
              Try again
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-xl border-border px-8"
            >
              <a href="/">Back to Safety</a>
            </Button>
          </div>

          {error.digest && (
            <p className="mt-8 text-xs font-mono text-muted-foreground/50">
              Error Digest: {error.digest}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  )
}
