"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Sun01Icon, Moon02Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <HugeiconsIcon icon={Sun01Icon} strokeWidth={2} />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <HugeiconsIcon
        icon={theme === "dark" ? Sun01Icon : Moon02Icon}
        strokeWidth={2}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
