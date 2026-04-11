"use client"

import { useRef, useMemo } from "react"
import { motion, Variants } from "motion/react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { HugeiconsIcon } from "@hugeicons/react"
import { QuotesIcon } from "@hugeicons/core-free-icons"
import { LANDING_CONTENT } from "@/lib/constants/landing-content"
import { Container } from "@/components/primitives/container"
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
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function LandingTestimonials() {
  const { testimonials } = LANDING_CONTENT
  const sectionRef = useRef<HTMLDivElement>(null)

  const items = useMemo(
    () =>
      testimonials.items.map((item) => ({
        ...item,
        company: item.company || "",
        result: item.result || "",
        rating: item.rating || 5,
        avatarSrc: item.avatar?.startsWith("/")
          ? item.avatar
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=1f2937&color=ffffff&size=256`,
      })),
    [testimonials.items]
  )

  if (items.length === 0) return null

  const featured = items[0]
  const gridItems = items.slice(1)

  return (
    <section
      id="testimonials"
      className="relative border-b border-border bg-muted/20 py-16 md:py-24"
      aria-labelledby="testimonials-heading"
    >
      {/* Subtle grid background */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          "[background-size:32px_32px]",
          "[background-image:radial-gradient(#e5e5e5_0.7px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#333333_0.7px,transparent_1px)]"
        )}
      />

      <Container className="relative z-10">
        <motion.div
          ref={sectionRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px 0px" }}
          variants={sectionVariants}
          className="mb-16 text-center"
        >
          <motion.div variants={itemVariants}>
            <Badge
              variant="outline"
              className="mb-6 rounded-none border-2 border-primary bg-background px-5 py-2 font-mono text-xs tracking-[0.125em] text-primary uppercase shadow-[2px_2px_0px_0px_var(--primary)]"
            >
              {testimonials.badge}
            </Badge>
          </motion.div>

          <motion.h2
            id="testimonials-heading"
            variants={itemVariants}
            className="mb-6 text-4xl font-extrabold tracking-tighter text-balance md:text-5xl lg:text-6xl"
          >
            {testimonials.headline}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className={cn(
              t.body,
              "mx-auto max-w-xl text-lg text-muted-foreground"
            )}
          >
            {testimonials.subheadline}
          </motion.p>
        </motion.div>

        {/* Featured Testimonial */}
        {featured && (
          <motion.div
            variants={itemVariants}
            className="mb-16 grid items-center gap-10 border-2 border-foreground bg-background p-8 shadow-[12px_12px_0px_0px_var(--border)] md:grid-cols-12 md:p-12"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border md:col-span-5 md:aspect-square">
              <Image
                src={featured.avatarSrc}
                alt={`${featured.name} testimonial`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>

            <div className="flex flex-col justify-center md:col-span-7">
              <HugeiconsIcon
                icon={QuotesIcon}
                className="mb-8 h-14 w-14 text-primary/60"
              />

              <blockquote className="mb-8 text-[22px] leading-tight tracking-tight md:text-3xl">
                “{featured.quote}”
              </blockquote>

              {featured.result && (
                <div className="mb-8 inline-flex rounded-full bg-emerald-100 px-5 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                  {featured.result}
                </div>
              )}

              <div>
                <div className="text-lg font-semibold">{featured.name}</div>
                <div className="text-sm text-muted-foreground">
                  {featured.role} {featured.company && `• ${featured.company}`}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Grid Testimonials */}
        {gridItems.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {gridItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group flex flex-col border border-border bg-background p-8 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl"
                whileHover={{ y: -4 }}
              >
                <HugeiconsIcon
                  icon={QuotesIcon}
                  className="mb-6 h-10 w-10 text-muted-foreground/70"
                />

                <blockquote className="mb-8 flex-1 text-[17px] leading-relaxed text-foreground/90">
                  “{item.quote}”
                </blockquote>

                {item.result && (
                  <div className="mb-6 text-sm font-medium text-primary">
                    {item.result}
                  </div>
                )}

                <div className="mt-auto flex items-center gap-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full border border-border">
                    <Image
                      src={item.avatarSrc}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.role}
                      {item.company && ` • ${item.company}`}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center text-sm text-muted-foreground">
          Real feedback from job seekers in Pakistan and beyond. No paid reviews
          or cherry-picked quotes.
        </div>
      </Container>
    </section>
  )
}
