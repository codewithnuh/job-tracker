"use client"

import { motion, Variants } from "motion/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
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

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function LandingCTA() {
  const { cta } = LANDING_CONTENT

  return (
    <section
      className="relative overflow-hidden border-t border-border bg-gradient-to-b from-background to-muted/30 py-20 md:py-28"
      aria-labelledby="cta-heading"
    >
      {/* Clean subtle background */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          "[background-size:32px_32px]",
          "[background-image:radial-gradient(#e5e5e5_0.8px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#2a2a2a_0.8px,transparent_1px)]"
        )}
      />

      {/* Soft depth orbs for premium feel */}
      <div className="pointer-events-none absolute top-10 left-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/8 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-10 h-[500px] w-[500px] rounded-full bg-violet-500/8 blur-[100px]" />

      <Container className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px 0px" }}
          variants={sectionVariants}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={itemVariants}>
            <h2
              id="cta-heading"
              className="mb-6 text-4xl font-extrabold tracking-tighter text-balance md:text-5xl lg:text-6xl"
            >
              {cta.headline}
            </h2>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className={cn(
              t.body,
              "mx-auto mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground"
            )}
          >
            {cta.subheadline}
          </motion.p>

          {/* Primary CTA */}
          <motion.div variants={itemVariants} className="mb-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.985 }}
            >
              <Button
                size="lg"
                asChild
                className="group h-16 rounded-2xl border-2 border-foreground bg-primary px-12 text-lg font-semibold text-primary-foreground shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                <Link href={cta.buttonHref}>
                  {cta.button}
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    strokeWidth={2.5}
                    className="ml-3 size-6 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Reassurance microcopy */}
          <motion.div
            variants={itemVariants}
            className="mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
          >
            <span>No credit card required</span>
            <span className="hidden sm:inline">•</span>
            <span>Setup in under 60 seconds</span>
            <span className="hidden sm:inline">•</span>
            <span>Cancel anytime</span>
          </motion.div>

          {/* Secondary / Trust line */}
          <motion.div
            variants={itemVariants}
            className="text-sm text-muted-foreground"
          >
            Join <span className="font-medium text-foreground">5,000+</span> job
            seekers who turned chaos into clarity.
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
;("use client")

import { motion, Variants } from "motion/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
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

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function LandingCTA() {
  const { cta } = LANDING_CONTENT

  return (
    <section
      className="relative overflow-hidden border-t border-border bg-gradient-to-b from-background to-muted/30 py-20 md:py-28"
      aria-labelledby="cta-heading"
    >
      {/* Clean subtle background */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          "[background-size:32px_32px]",
          "[background-image:radial-gradient(#e5e5e5_0.8px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#2a2a2a_0.8px,transparent_1px)]"
        )}
      />

      {/* Soft depth orbs for premium feel */}
      <div className="pointer-events-none absolute top-10 left-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/8 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-10 h-[500px] w-[500px] rounded-full bg-violet-500/8 blur-[100px]" />

      <Container className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px 0px" }}
          variants={sectionVariants}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={itemVariants}>
            <h2
              id="cta-heading"
              className="mb-6 text-4xl font-extrabold tracking-tighter text-balance md:text-5xl lg:text-6xl"
            >
              {cta.headline}
            </h2>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className={cn(
              t.body,
              "mx-auto mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground"
            )}
          >
            {cta.subheadline}
          </motion.p>

          {/* Primary CTA */}
          <motion.div variants={itemVariants} className="mb-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.985 }}
            >
              <Button
                size="lg"
                asChild
                className="group h-16 rounded-2xl border-2 border-foreground bg-primary px-12 text-lg font-semibold text-primary-foreground shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                <Link href={cta.buttonHref}>
                  {cta.button}
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    strokeWidth={2.5}
                    className="ml-3 size-6 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Reassurance microcopy */}
          <motion.div
            variants={itemVariants}
            className="mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
          >
            <span>No credit card required</span>
            <span className="hidden sm:inline">•</span>
            <span>Setup in under 60 seconds</span>
            <span className="hidden sm:inline">•</span>
            <span>Cancel anytime</span>
          </motion.div>

          {/* Secondary / Trust line */}
          <motion.div
            variants={itemVariants}
            className="text-sm text-muted-foreground"
          >
            Join <span className="font-medium text-foreground">5,000+</span> job
            seekers who turned chaos into clarity.
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
