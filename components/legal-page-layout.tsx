"use client"

import React from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { LandingNavbar } from "@/components/landing/navbar"
import { LandingFooter } from "@/components/landing/footer"
import { Container } from "@/components/primitives/container"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

interface LegalPageLayoutProps {
  title: string
  lastUpdated: string
  children: React.ReactNode
}

export function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <main className="relative min-h-screen overflow-hidden antialiased">
      <LandingNavbar />
      
      {/* Background decoration */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-full -translate-x-1/2 bg-gradient-to-b from-primary/5 to-transparent blur-[120px]" />

      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl"
          >
            <Link 
              href="/" 
              className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <HugeiconsIcon 
                icon={ArrowLeft02Icon} 
                className="size-4 transition-transform group-hover:-translate-x-1" 
              />
              Back to Home
            </Link>

            <div className="mb-12 border-b border-border pb-12 text-center md:pb-16 md:text-left">
              <h1 className="mb-4 text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
                {title}
              </h1>
              <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
                Last Updated: {lastUpdated}
              </p>
            </div>

            <div className="space-y-12">
              {children}
            </div>
          </motion.div>
        </Container>
      </section>

      <LandingFooter />
    </main>
  )
}
