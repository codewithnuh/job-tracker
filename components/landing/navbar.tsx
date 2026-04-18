"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/primitives/container"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Menu01Icon,
  BriefcaseIcon,
  Cancel01Icon,
  Sun01Icon,
  Moon02Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"
import { LANDING_CONTENT } from "@/lib/constants/landing-content"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

export function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    setMounted(true)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  const { nav } = LANDING_CONTENT

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
          isScrolled
            ? "border-b border-border bg-background/80 shadow-sm backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <motion.div
          className="absolute right-0 bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          style={{ scaleX, transformOrigin: "left" }}
        />

        <Container className="flex h-14 items-center justify-between md:h-16">
          <Link href="/" className="group flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all group-hover:bg-primary/90 md:size-9">
              <HugeiconsIcon
                icon={BriefcaseIcon}
                strokeWidth={2}
                className="size-4 md:size-5"
              />
            </div>
            <span className="text-base font-black tracking-tight uppercase md:text-lg">
              {nav.logo}
            </span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-bold uppercase tracking-wider text-muted-foreground transition-all hover:text-foreground"
              >
                <span className="relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <HugeiconsIcon
                  icon={theme === "dark" ? Sun01Icon : Moon02Icon}
                  strokeWidth={2}
                  className="size-5"
                />
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}
            <Button
              asChild
              className="h-9 px-4 font-semibold tracking-tight shadow-sm transition-all hover:bg-primary/90 lg:h-10 lg:px-5"
            >
              <Link href={nav.ctaHref}>{nav.cta}</Link>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="relative z-[60] hover:bg-accent lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <HugeiconsIcon
              icon={isMobileMenuOpen ? Cancel01Icon : Menu01Icon}
              strokeWidth={2}
              className="size-5 transition-transform duration-300"
              style={{ transform: isMobileMenuOpen ? "rotate(90deg)" : "rotate(0deg)" }}
            />
            <span className="sr-only">{isMobileMenuOpen ? "Close menu" : "Open menu"}</span>
          </Button>
        </Container>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="flex min-h-screen flex-col px-6 pt-20 pb-8"
            >
              <nav
                className="flex flex-1 flex-col justify-center gap-3"
                onClick={(e) => e.stopPropagation()}
              >
                {nav.links.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08, type: "spring" }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center justify-between rounded-xl border border-border bg-card px-6 py-4 text-lg font-semibold tracking-tight transition-all hover:border-primary/50 hover:bg-accent"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                      <HugeiconsIcon
                        icon={ArrowRight01Icon}
                        strokeWidth={2}
                        className="size-5 text-muted-foreground"
                      />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div
                className="flex flex-col gap-4 pt-5 pb-8"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  variant="outline"
                  className="h-14 rounded-xl border border-border text-base font-semibold"
                  onClick={() => {
                    setTheme(theme === "dark" ? "light" : "dark")
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <HugeiconsIcon
                    icon={theme === "dark" ? Sun01Icon : Moon02Icon}
                    strokeWidth={2}
                    className="mr-3 size-5"
                  />
                  <span>
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </span>
                </Button>
                <Button
                  asChild
                  className="h-14 rounded-xl bg-primary text-base font-bold tracking-tight shadow-sm transition-all hover:bg-primary/90"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link href={nav.ctaHref}>{nav.cta}</Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}