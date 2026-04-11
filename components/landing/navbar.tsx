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
            ? "border-b border-white/5 bg-background/80 shadow-lg backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <motion.div
          className="absolute right-0 bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          style={{ scaleX, transformOrigin: "left" }}
        />

        <Container className="flex h-14 items-center justify-between md:h-16">
          <Link href="/" className="group flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-none bg-gradient-to-br from-primary to-primary/80 shadow-[2px_2px_0px_0px_var(--primary)] transition-all group-hover:shadow-[4px_4px_0px_0px_var(--primary)] md:size-9">
              <HugeiconsIcon
                icon={BriefcaseIcon}
                strokeWidth={2}
                className="size-4 text-primary-foreground md:size-5"
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
                className="rounded-none border-2 border-transparent hover:border-foreground hover:bg-transparent"
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
              className="rounded-none h-10 border-2 border-foreground bg-primary px-5 font-bold uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none lg:h-11 lg:px-6"
            >
              <Link href={nav.ctaHref}>{nav.cta}</Link>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-none hover:bg-white/10 lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <HugeiconsIcon icon={Menu01Icon} strokeWidth={2} className="size-5" />
            <span className="sr-only">Open menu</span>
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
              className="flex min-h-screen flex-col p-6"
            >
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex size-9 items-center justify-center rounded-none bg-gradient-to-br from-primary to-primary/80 shadow-[2px_2px_0px_0px_var(--primary)]">
                    <HugeiconsIcon
                      icon={BriefcaseIcon}
                      strokeWidth={2}
                      className="size-5 text-primary-foreground"
                    />
                  </div>
                  <span className="text-lg font-black uppercase">{nav.logo}</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-none"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <HugeiconsIcon
                    icon={Cancel01Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                </Button>
              </div>

              <nav className="flex flex-1 flex-col justify-center gap-3 py-8">
                {nav.links.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08, type: "spring" }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center justify-between rounded-none border-2 border-border bg-background px-6 py-4 text-lg font-bold uppercase tracking-wider transition-all hover:border-primary hover:bg-muted/50"
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

              <div className="flex flex-col gap-4 pb-8">
                <Button
                  variant="outline"
                  className="rounded-none h-14 border-2 border-foreground text-base font-bold uppercase"
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
                  <span className="font-bold uppercase">
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </span>
                </Button>
                <Button
                  asChild
                  className="rounded-none h-14 border-2 border-foreground bg-primary text-base font-bold uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
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