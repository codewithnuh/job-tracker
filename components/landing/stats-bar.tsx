"use client"

import { useRef, useEffect } from "react"
import {
  motion,
  useInView,
  useSpring,
} from "motion/react"
import { LANDING_CONTENT } from "@/lib/constants/landing-content"
import { Container } from "@/components/primitives/container"
import { cn } from "@/lib/utils"

function AnimatedNumber({
  target,
  suffix = "",
}: {
  target: string
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const numericTarget = parseInt(target.replace(/[^0-9]/g, ""))
  const count = useSpring(0, { stiffness: 60, damping: 20 })

  useEffect(() => {
    if (isInView) {
      count.set(numericTarget)
    }
  }, [isInView, numericTarget, count])

  return (
    <span ref={ref} className="tabular-nums font-mono">
      {Math.round(count.get()).toLocaleString()}
      {suffix}
    </span>
  )
}

export function LandingStatsBar() {
  const { stats } = LANDING_CONTENT

  return (
    <section className="relative border-y-2 border-border bg-muted/10 py-16 md:py-24">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:16px_16px]",
          "[background-image:radial-gradient(#e5e5e5_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#262626_1px,transparent_1px)]"
        )}
      />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8"
        >
          {stats.items.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group text-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mb-4 inline-block"
              >
                <span className="text-4xl font-black tracking-tight text-foreground md:text-5xl lg:text-6xl">
                  <AnimatedNumber target={stat.value} />
                </span>
              </motion.div>
              <div className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-foreground">
                {stat.label}
              </div>
              <div className="mx-auto h-1 w-12 bg-gradient-to-r from-transparent via-primary/50 to-transparent transition-all group-hover:w-full group-hover:via-primary" />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}