"use client"

import { motion, Variants } from "motion/react"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HugeiconsIcon } from "@hugeicons/react"
import { HelpCircleIcon } from "@hugeicons/core-free-icons"
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
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function LandingFAQ() {
  const { faq } = LANDING_CONTENT

  return (
    <section
      id="faq"
      className="relative border-b border-border bg-muted/5 py-20 md:py-28"
      aria-labelledby="faq-heading"
    >
      {/* Background grid */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          "[background-size:36px_36px]",
          "[background-image:radial-gradient(#e5e5e5_0.7px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#2f2f2f_0.7px,transparent_1px)]"
        )}
      />

      <Container className="relative">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px 0px" }}
          variants={sectionVariants}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <motion.div variants={itemVariants}>
            <Badge
              variant="outline"
              className="mb-6 rounded-full border-primary/30 bg-background px-6 py-2 font-mono text-xs tracking-[0.125em] text-primary"
            >
              {faq.badge}
            </Badge>
          </motion.div>

          <motion.h2
            id="faq-heading"
            variants={itemVariants}
            className="mb-6 text-4xl font-extrabold tracking-tighter text-balance md:text-5xl lg:text-6xl"
          >
            {faq.headline}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className={cn(
              t.body,
              "mx-auto max-w-md text-lg text-muted-foreground"
            )}
          >
            We answered the most common questions from job seekers like you.
          </motion.p>
        </motion.div>

        {/* Clean FAQ Accordion */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="mx-auto max-w-3xl"
        >
          <div className="overflow-hidden rounded-3xl border border-border bg-background shadow-xl">
            <Accordion
              type="single"
              collapsible
              className="divide-y divide-border"
            >
              {faq.items.map((item, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <AccordionItem
                    value={`item-${index}`}
                    className="border-none px-4 md:px-8 py-1"
                  >
                    <AccordionTrigger className="group py-6 md:py-8 text-left hover:no-underline">
                      <div className="flex w-full items-start gap-4 md:gap-6">
                        {/* Helpful icon */}
                        <div className="mt-1 flex size-8 md:size-9 shrink-0 items-center justify-center rounded-xl md:rounded-2xl border border-primary/10 bg-primary/5">
                          <HugeiconsIcon
                            icon={HelpCircleIcon}
                            strokeWidth={2.5}
                            className="size-4 md:size-5 text-primary"
                          />
                        </div>

                        {/* Question */}
                        <span className="flex-1 pr-6 md:pr-8 text-base md:text-[17px] leading-snug md:leading-tight font-medium tracking-tight text-foreground transition-colors group-hover:text-primary">
                          {item.question}
                        </span>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="pr-4 md:pr-8 pb-6 md:pb-8 pl-12 md:pl-[60px] text-sm md:text-[17px] leading-relaxed text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </motion.div>

        {/* Friendly closing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-16 max-w-md text-center"
        >
          <div className="rounded-2xl border border-border bg-muted/40 px-8 py-7">
            <p className="mb-3 text-muted-foreground">Still have a question?</p>
            <a
              href="mailto:support@job-tracker.noorulhassan.com"
              className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
            >
              Reach out to us directly
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
