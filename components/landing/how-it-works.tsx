"use client"

import { useRef, useMemo } from "react"
import { motion, Variants } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  UserIcon,
  AddCircleIcon,
  TrendingUp as TrendingUpIcon,
} from "@hugeicons/core-free-icons"
import { LANDING_CONTENT } from "@/lib/constants/landing-content"
import { Container } from "@/components/primitives/container"
import { t } from "@/lib/typography"
import { cn } from "@/lib/utils"

const stepIcons = [UserIcon, AddCircleIcon, TrendingUpIcon]

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function LandingHowItWorks() {
  const { howItWorks } = LANDING_CONTENT
  const sectionRef = useRef<HTMLDivElement>(null)

  const stepsWithIcons = useMemo(
    () =>
      howItWorks.steps.map((step, index) => ({
        ...step,
        Icon: stepIcons[index] || TrendingUpIcon,
      })),
    [howItWorks.steps]
  )

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden border-b border-border bg-muted/10 py-16 md:py-24"
      aria-labelledby="how-it-works-heading"
    >
      {/* Background elements */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          "[background-size:28px_28px]",
          "[background-image:radial-gradient(#e5e5e5_0.8px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#2a2a2a_0.8px,transparent_1px)]"
        )}
      />
      <div className="pointer-events-none absolute top-20 left-1/3 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 bottom-10 h-80 w-80 rounded-full bg-purple-500/5 blur-3xl" />

      <Container className="relative">
        {/* Header */}
        <motion.div
          ref={sectionRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px 0px" }}
          variants={sectionVariants}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <motion.div
            variants={cardVariants}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-6 py-2"
          >
            <div className="size-2.5 animate-pulse rounded-full bg-primary" />
            <span className="font-mono text-sm font-semibold tracking-[0.125em] text-primary uppercase">
              {howItWorks.badge}
            </span>
          </motion.div>

          <motion.h2
            variants={cardVariants}
            id="how-it-works-heading"
            className="mb-6 text-4xl font-extrabold tracking-tighter text-balance md:text-5xl lg:text-6xl"
          >
            {howItWorks.headline}
          </motion.h2>

          <motion.p
            variants={cardVariants}
            className={cn(
              t.body,
              "mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground"
            )}
          >
            {howItWorks.subheadline}
          </motion.p>
        </motion.div>

        {/* Steps Grid - Fixed Height Cards */}
        <div className="relative mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-3">
            {stepsWithIcons.map((step, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative flex h-full"
                whileHover={{ y: -6 }}
              >
                <div className="relative flex h-full w-full flex-col rounded-3xl border-2 border-border bg-background p-9 transition-all duration-300 hover:border-primary/40 hover:shadow-2xl">
                  {/* Icon + Number Row */}
                  <div className="mb-8 flex items-center justify-between">
                    <div className="flex size-20 items-center justify-center rounded-2xl border border-primary/10 bg-primary/5 transition-all group-hover:border-primary/30 group-hover:bg-primary/10">
                      <HugeiconsIcon
                        icon={step.Icon}
                        strokeWidth={1.8}
                        className="size-10 text-primary"
                      />
                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-primary bg-primary font-mono text-3xl font-black text-primary-foreground shadow">
                      {step.number}
                    </div>
                  </div>

                  {/* Text Content - Takes available space */}
                  <div className="flex-1">
                    <h3 className="mb-4 text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {step.title}
                    </h3>
                    <p className="text-[17px] leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>

                  {/* Screenshot Placeholder - Pushed to bottom, consistent height */}
                  <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-muted/60">
                    <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-muted to-background">
                      <div className="text-center">
                        <div className="mx-auto mb-2 h-px w-12 bg-border" />
                        <p className="font-mono text-xs tracking-widest text-muted-foreground">
                          STEP {step.number} • APP PREVIEW
                        </p>
                        <p className="mt-1 text-[10px] text-muted-foreground/70">
                          Screenshot will go here
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute right-9 bottom-0 left-9 h-0.5 origin-left scale-x-0 bg-primary transition-all duration-500 group-hover:scale-x-100" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mx-auto mt-20 max-w-md"
        >
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 rounded-3xl border-2 border-border bg-background px-10 py-7 text-center">
            <div className="flex items-center gap-3 whitespace-nowrap">
              <div className="size-3 animate-pulse rounded-full bg-emerald-500" />
              <span className="text-sm font-medium">100% Free to start</span>
            </div>
            <div className="hidden h-5 w-px bg-border sm:block" />
            <div className="flex items-center gap-3 whitespace-nowrap">
              <HugeiconsIcon
                icon={AddCircleIcon}
                className="size-5 text-primary"
              />
              <span className="text-sm font-semibold text-primary">
                Setup in under 60 seconds
              </span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
