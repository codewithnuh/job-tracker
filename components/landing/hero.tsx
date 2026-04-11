"use client"

import { useRef } from "react"
import { motion, Variants } from "motion/react"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUpRight01Icon, PlayCircleIcon } from "@hugeicons/core-free-icons"
import { LANDING_CONTENT } from "@/lib/constants/landing-content"
import { Container } from "@/components/primitives/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { t } from "@/lib/typography"
import { cn } from "@/lib/utils"

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export const LandingHero = () => {
  const { hero, stats } = LANDING_CONTENT
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section className="relative min-h-[100dvh] overflow-hidden border-b border-border bg-background pt-20 pb-16 lg:pt-24 lg:pb-20">
      {/* Refined background grid */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          "[background-size:32px_32px]",
          "[background-image:radial-gradient(#e5e5e5_0.8px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#262626_0.8px,transparent_1px)]"
        )}
      />

      {/* Soft depth orbs */}
      <div className="pointer-events-none absolute top-20 left-1/3 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-primary/5 blur-[140px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-10 h-[600px] w-[600px] rounded-full bg-violet-500/5 blur-[120px]" />

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Content */}
          <motion.div
            ref={sectionRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="flex flex-col justify-center lg:col-span-7"
          >
            <motion.div variants={itemVariants}>
              <Badge
                variant="outline"
                className="mb-6 rounded-none border-2 border-primary bg-background px-5 py-2 font-mono text-xs tracking-[0.125em] text-primary uppercase shadow-[2px_2px_0px_0px_var(--primary)]"
              >
                {hero.badge}
              </Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl font-extrabold tracking-tighter text-balance md:text-6xl lg:text-7xl"
            >
              {hero.headline}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className={cn(
                t.body,
                "mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
              )}
            >
              {hero.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Button
                size="lg"
                className="group h-16 rounded-none border-2 border-foreground bg-primary px-10 text-lg font-semibold tracking-wide text-primary-foreground shadow-[6px_6px_0px_0px_var(--border)] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-none"
              >
                {hero.cta}
                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  className="ml-3 size-6 transition-transform group-hover:rotate-45"
                  strokeWidth={2.5}
                />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="group h-16 rounded-none border-2 border-foreground px-10 text-lg font-semibold tracking-wide hover:bg-muted"
              >
                <HugeiconsIcon
                  icon={PlayCircleIcon}
                  className="mr-3 size-6"
                  strokeWidth={2}
                />
                {hero.secondaryCta}
              </Button>
            </motion.div>

            {/* Trust line */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex items-center gap-2 text-sm text-muted-foreground"
            >
              <div className="h-px w-8 bg-border" />
              No credit card • Cancel anytime • Built for job seekers in
              Pakistan & beyond
            </motion.div>
          </motion.div>

          {/* Right Visual - App Mockup */}
          <motion.div
            variants={itemVariants}
            className="relative flex justify-center lg:col-span-5"
          >
            <div className="relative w-full max-w-[520px]">
              {/* Main Dashboard Mockup */}
              <div className="relative overflow-hidden rounded-3xl border-4 border-foreground bg-background shadow-2xl">
                <Image
                  src="/mockups/jobtracker-dashboard.png" // ← Replace with your actual screenshot
                  alt="JobTracker Dashboard - Visual Pipeline"
                  width={520}
                  height={620}
                  className="w-full object-cover"
                  priority
                />

                {/* Floating badge overlay on mockup */}
                <div className="absolute -top-3 -right-3 rounded-2xl border-2 border-primary bg-background px-4 py-2 font-mono text-xs font-bold tracking-widest text-primary shadow-xl">
                  LIVE PIPELINE
                </div>
              </div>

              {/* Subtle floating elements for depth */}
              <div className="absolute -bottom-8 -left-6 rounded-2xl border border-border bg-background p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="size-3 rounded-full bg-emerald-500" />
                  <div>
                    <div className="text-xs font-medium">Offer Received</div>
                    <div className="text-[10px] text-muted-foreground">
                      2 days ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Bar - Below fold, elegant */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-24"
        >
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-px bg-border lg:grid-cols-4">
            {stats.items.map((stat, i) => (
              <div
                key={i}
                className="group bg-background p-8 text-center transition-all hover:bg-primary hover:text-primary-foreground"
              >
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all group-hover:bg-primary-foreground group-hover:text-primary">
                  {/* You can map real icons here if desired */}
                </div>
                <div className="font-mono text-4xl font-black tracking-tighter">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm font-medium text-muted-foreground group-hover:text-primary-foreground/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
