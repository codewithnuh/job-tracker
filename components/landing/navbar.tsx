"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Menu01Icon,
  BriefcaseIcon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons"
import { LANDING_CONTENT } from "@/lib/constants/landing-content"
import { cn } from "@/lib/utils"

export function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const { nav } = LANDING_CONTENT

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        isScrolled
          ? "border-b bg-background/80 shadow-sm backdrop-blur-lg"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary">
            <HugeiconsIcon
              icon={BriefcaseIcon}
              strokeWidth={2}
              className="size-5 text-primary-foreground"
            />
          </div>
          <span className="text-lg font-semibold">{nav.logo}</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Button asChild>
            <Link href={nav.ctaHref}>{nav.cta}</Link>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <HugeiconsIcon icon={Menu01Icon} strokeWidth={2} className="size-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </nav>

      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="right" className="w-80">
          <SheetHeader className="sr-only">
            <SheetTitle>Mobile Menu</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-6 pt-6">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary">
                  <HugeiconsIcon
                    icon={BriefcaseIcon}
                    strokeWidth={2}
                    className="size-5 text-primary-foreground"
                  />
                </div>
                <span className="text-lg font-semibold">{nav.logo}</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <HugeiconsIcon
                  icon={Cancel01Icon}
                  strokeWidth={2}
                  className="size-5"
                />
              </Button>
            </div>

            <div className="flex flex-col gap-2">
              {nav.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-base font-medium transition-colors hover:bg-muted"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Button
              asChild
              className="w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Link href={nav.ctaHref}>{nav.cta}</Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
