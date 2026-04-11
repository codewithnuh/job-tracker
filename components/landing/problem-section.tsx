"use client"

import { useRef, useMemo } from "react"
import { motion, Variants } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  AlertCircleIcon,
  Delete02Icon as DeleteIcon,
  Cancel01Icon as CloseIcon,
} from "@hugeicons/core-free-icons"
import { LANDING_CONTENT } from "@/lib/constants/landing-content"
import { Container } from "@/components/primitives/container"
import { t } from "@/lib/typography"
import { cn } from "@/lib/utils"

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function LandingProblem() {
  const { problem } = LANDING_CONTENT
  const sectionRef = useRef<HTMLDivElement>(null)

  const icons = [AlertCircleIcon, DeleteIcon, CloseIcon]

  const painPointsWithIcons = useMemo(
    () =>
      problem.painPoints.map((point, index) => ({
        ...point,
        Icon: icons[index] || AlertCircleIcon,
      })),
    [problem.painPoints]
  )

  return (
    <section
      id="problem"
      className="relative overflow-hidden border-y border-border bg-muted/10 py-16 md:py-24"
      aria-labelledby="problem-heading"
    >
      {/* Subtle background grid */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          "[background-size:28px_28px]",
          "[background-image:radial-gradient(#e5e5e5_0.8px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#333333_0.8px,transparent_1px)]"
        )}
      />

      {/* Soft red ambient orbs for emotional weight (but not overwhelming) */}
      <div className="pointer-events-none absolute top-20 left-1/4 h-[500px] w-[500px] -translate-x-1/3 rounded-full bg-red-500/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-10 h-[450px] w-[450px] translate-x-1/3 rounded-full bg-red-500/5 blur-[100px]" />

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
            <div className="mx-auto inline-flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-50/80 px-6 py-2.5 dark:bg-red-950/30">
              <div className="size-2.5 animate-pulse rounded-full bg-red-500" />
              <span className="font-mono text-sm font-semibold tracking-[0.125em] text-red-600 uppercase dark:text-red-400">
                {problem.badge}
              </span>
            </div>
          </motion.div>

          <motion.h2
            variants={cardVariants}
            id="problem-heading"
            className="mb-8 text-4xl font-extrabold tracking-tighter text-balance md:text-5xl lg:text-6xl"
          >
            {problem.headline}
          </motion.h2>

          <motion.p
            variants={cardVariants}
            className={cn(
              t.body,
              "mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground"
            )}
          >
            {problem.subheadline}
          </motion.p>
        </motion.div>

        {/* Pain Points Grid - Clean & Balanced */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3"
        >
          {painPointsWithIcons.map((point, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-background transition-all duration-300 hover:border-red-400/60 hover:shadow-2xl"
              whileHover={{ y: -8 }}
            >
              <div className="relative flex-1 p-10">
                {/* Icon + Number */}
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex size-20 items-center justify-center rounded-2xl border border-red-500/10 bg-red-50 transition-all group-hover:border-red-400/30 group-hover:bg-red-100 dark:bg-red-950/30 dark:group-hover:bg-red-950/50">
                    <HugeiconsIcon
                      icon={point.Icon}
                      strokeWidth={2}
                      className="size-10 text-red-600 dark:text-red-400"
                    />
                  </div>

                  <div className="font-mono text-6xl font-black text-red-100 transition-all group-hover:text-red-200 dark:text-red-950 dark:group-hover:text-red-900">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Content */}
                <h3 className="mb-5 text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-red-600">
                  {point.title}
                </h3>

                <p className="text-[17px] leading-relaxed text-muted-foreground">
                  {point.description}
                </p>
              </div>

              {/* Subtle bottom accent */}
              <div className="h-1.5 w-full scale-x-0 bg-red-500 transition-all duration-500 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </motion.div>

        {/* Empathetic Closing Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-20 max-w-md text-center"
        >
          <div className="rounded-3xl border border-border bg-background px-8 py-7 shadow-sm">
            <div className="flex items-center justify-center gap-4">
              <div className="size-3 animate-pulse rounded-full bg-red-500" />
              <span className="font-medium text-muted-foreground">
                Sound familiar?
              </span>
              <div className="h-5 w-px bg-border" />
              <span className="font-semibold text-red-600 dark:text-red-400">
                You&apos;re not alone.
              </span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Thousands of job seekers were stuck in the same chaos — until they
              found clarity.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
