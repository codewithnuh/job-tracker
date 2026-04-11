"use client"

import { useRef, useMemo } from "react"
import { motion, Variants } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  BriefcaseIcon,
  Settings01Icon,
  Clock03Icon,
  ChartIcon,
  CheckmarkCircle02Icon,
  Link02Icon,
} from "@hugeicons/core-free-icons"
import { LANDING_CONTENT } from "@/lib/constants/landing-content"
import { Container } from "@/components/primitives/container"
import { t } from "@/lib/typography"
import { cn } from "@/lib/utils"

const iconMap: Record<string, typeof BriefcaseIcon> = {
  Briefcase: BriefcaseIcon,
  Pipeline: Settings01Icon,
  Timeline: Clock03Icon,
  Chart: ChartIcon,
  Zap: CheckmarkCircle02Icon,
  Link: Link02Icon,
}

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function LandingFeatures() {
  const { features } = LANDING_CONTENT
  const sectionRef = useRef<HTMLDivElement>(null)

  const featuresWithIcons = useMemo(
    () =>
      features.items.map((feature, index) => ({
        ...feature,
        Icon: iconMap[feature.icon] || BriefcaseIcon,
        // Define which ones are large (hero features)
        isLarge: index === 0 || index === 3, // Track Every Detail + Interview Stats
      })),
    [features.items]
  )

  return (
    <section
      id="features"
      className="relative overflow-hidden border-b border-border bg-background py-16 md:py-24"
      aria-labelledby="features-heading"
    >
      {/* Clean premium background */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          "[background-size:28px_28px]",
          "[background-image:radial-gradient(#e5e5e5_0.8px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#262626_0.8px,transparent_1px)]"
        )}
      />

      <div className="pointer-events-none absolute top-32 left-1/4 h-[650px] w-[650px] -translate-x-1/3 rounded-full bg-primary/4 blur-[140px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-20 h-[550px] w-[550px] translate-x-1/3 rounded-full bg-violet-500/4 blur-[110px]" />

      <Container className="relative">
        {/* Header */}
        <motion.div
          ref={sectionRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px 0px" }}
          variants={sectionVariants}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <motion.div variants={cardVariants} className="mb-6">
            <div className="mx-auto inline-flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-2.5">
              <div className="size-2.5 animate-pulse rounded-full bg-primary" />
              <span className="font-mono text-sm font-semibold tracking-[0.125em] text-primary uppercase">
                {features.badge}
              </span>
            </div>
          </motion.div>

          <motion.h2
            variants={cardVariants}
            id="features-heading"
            className="mb-6 text-4xl font-extrabold tracking-tighter text-balance md:text-5xl lg:text-6xl"
          >
            {features.headline}
          </motion.h2>

          <motion.p
            variants={cardVariants}
            className={cn(
              t.body,
              "mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground"
            )}
          >
            {features.subheadline}
          </motion.p>
        </motion.div>

        {/* Premium Bento Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="mx-auto grid max-w-6xl gap-6 md:grid-cols-12"
        >
          {featuresWithIcons.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={cn(
                "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-background transition-all duration-300 hover:border-primary/50 hover:shadow-2xl",
                feature.isLarge ? "md:col-span-8" : "md:col-span-4"
              )}
              whileHover={{ y: -10, transition: { duration: 0.4 } }}
            >
              <div className="relative flex-1 p-10 md:p-12">
                {/* Large Icon */}
                <div className="mb-10">
                  <div className="inline-flex size-24 items-center justify-center rounded-3xl border border-primary/10 bg-primary/5 transition-all group-hover:scale-105 group-hover:border-primary/30 group-hover:bg-primary/10">
                    <HugeiconsIcon
                      icon={feature.Icon}
                      strokeWidth={1.5}
                      className="size-14 text-primary"
                    />
                  </div>
                </div>

                {/* Subtle Number */}
                <div className="mb-6 font-mono text-7xl font-black text-primary/10 transition-all group-hover:text-primary/20">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Content */}
                <h3 className="mb-5 text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {feature.title}
                </h3>

                <p className="text-[17px] leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>

              {/* Premium bottom accent */}
              <div className="h-1.5 w-full scale-x-0 bg-gradient-to-r from-primary via-violet-500 to-primary transition-all duration-500 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mx-auto mt-20 max-w-lg"
        >
          <div className="rounded-3xl border border-border bg-muted/30 px-8 py-9 text-center">
            <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-10">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  <div className="size-10 rounded-2xl border-2 border-background bg-gradient-to-br from-primary to-violet-500" />
                  <div className="size-10 rounded-2xl border-2 border-background bg-gradient-to-br from-violet-500 to-primary" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">5,000+ job seekers</div>
                  <div className="text-sm text-muted-foreground">
                    already tracking smarter
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  className="size-7 text-emerald-500"
                />
                <div>
                  <div className="text-sm font-semibold">
                    Everything core is free
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Forever. No catch.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
