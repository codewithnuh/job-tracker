"use client"

import { useRef, useEffect } from "react"
import { motion, useSpring, useInView, useTransform, Variants } from "motion/react"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowUpRight01Icon,
  BriefcaseIcon,
  CheckmarkCircle01Icon,
  Clock01Icon,
  ChartLineData01Icon,
} from "@hugeicons/core-free-icons"
import { LANDING_CONTENT } from "@/lib/constants/landing-content"
import { cn } from "@/lib/utils"

// ─── MOTION VARIANTS ────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.065, delayChildren: 0.1 } },
}

const wordVariant: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const mockupVariant: Variants = {
  hidden: { opacity: 0, y: 48, rotateX: 12 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.35 },
  },
}

// ─── STATUS PILL DATA ────────────────────────────────────────────────────────
const STATUS_COLORS: Record<string, string> = {
  APPLIED: "bg-blue-500/15 text-blue-500 border-blue-500/20",
  INTERVIEW: "bg-violet-500/15 text-violet-500 border-violet-500/20",
  OFFER: "bg-emerald-500/15 text-emerald-500 border-emerald-500/20",
  REJECTED: "bg-red-500/15 text-red-500 border-red-500/20",
  SCREENING: "bg-amber-500/15 text-amber-500 border-amber-500/20",
}

const MOCK_APPS = [
  { company: "Stripe", role: "Senior Frontend Eng.", status: "INTERVIEW", date: "Apr 14" },
  { company: "Vercel", role: "Product Designer", status: "OFFER", date: "Apr 12" },
  { company: "Linear", role: "Full-Stack Developer", status: "SCREENING", date: "Apr 10" },
  { company: "Figma", role: "React Engineer", status: "APPLIED", date: "Apr 8" },
  { company: "Notion", role: "Frontend Developer", status: "REJECTED", date: "Apr 5" },
]

// ─── MICRO-INTERACTION COMPONENTS ───────────────────────────────────────────
function MagneticButton({
  children,
  className,
  href,
}: {
  children: React.ReactNode
  className?: string
  href: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 200, damping: 20 })
  const y = useSpring(0, { stiffness: 200, damping: 20 })

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.3)
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className="inline-block"
    >
      <Link href={href} className={className}>
        {children}
      </Link>
    </motion.div>
  )
}

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const count = useSpring(0, { stiffness: 50, damping: 18 })
  const display = useTransform(count, (v) => `${Math.round(v).toLocaleString()}${suffix}`)

  useEffect(() => {
    if (isInView) count.set(value)
  }, [isInView, count, value])

  return <motion.span ref={ref}>{display}</motion.span>
}

// ─── INLINE DASHBOARD MOCKUP ─────────────────────────────────────────────────
function DashboardMockup() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-[0_32px_80px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.05)] dark:shadow-[0_32px_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]">
      {/* Browser Chrome Bar */}
      <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
        <div className="flex gap-1.5">
          <div className="size-2.5 rounded-full bg-destructive/70" />
          <div className="size-2.5 rounded-full bg-amber-500/70" />
          <div className="size-2.5 rounded-full bg-emerald-500/70" />
        </div>
        <div className="mx-auto flex items-center gap-2 rounded-md bg-background/50 px-3 py-1 text-[10px] text-muted-foreground/60">
          <div className="size-2 rounded-full bg-emerald-500" />
          jobtracker.app/dashboard
        </div>
      </div>

      {/* Sidebar + Content */}
      <div className="flex min-h-[380px]">
        {/* Sidebar */}
        <div className="hidden w-44 shrink-0 flex-col border-r border-border bg-muted/30 p-3 sm:flex">
          <div className="mb-4 flex items-center gap-2 px-2 py-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10">
              <HugeiconsIcon icon={BriefcaseIcon} className="size-3.5 text-primary" strokeWidth={2} />
            </div>
            <span className="text-xs font-semibold text-foreground/80">JobTracker</span>
          </div>
          {[
            { label: "Dashboard", active: false },
            { label: "Applications", active: true },
            { label: "Stats", active: false },
          ].map((item) => (
            <div
              key={item.label}
              className={cn(
                "mb-0.5 rounded-lg px-3 py-2 text-[11px] font-medium transition-colors",
                item.active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground/60 hover:text-foreground/80"
              )}
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-px border-b border-border bg-border">
            {[
              { label: "Total", value: "24" },
              { label: "Interviews", value: "6" },
              { label: "Offers", value: "2" },
            ].map((s) => (
              <div key={s.label} className="bg-card px-4 py-3">
                <div className="font-mono text-xl font-bold text-foreground">{s.value}</div>
                <div className="text-[10px] text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Application Rows */}
          <div className="flex-1 divide-y divide-border">
            {MOCK_APPS.map((app, i) => (
              <motion.div
                key={app.company}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center justify-between gap-3 px-4 py-2.5"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted text-[10px] font-bold text-muted-foreground">
                    {app.company[0]}
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-foreground/85">{app.company}</div>
                    <div className="text-[10px] text-muted-foreground/60">{app.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-muted-foreground/40">{app.date}</span>
                  <span
                    className={cn(
                      "rounded-full border px-2 py-0.5 text-[9px] font-semibold",
                      STATUS_COLORS[app.status]
                    )}
                  >
                    {app.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── HERO SECTION ────────────────────────────────────────────────────────────
export const LandingHero = () => {
  const { hero, stats } = LANDING_CONTENT

  const headline = hero.headline
  const words = headline.split(" ")

  return (
    <section className="relative min-h-dvh overflow-hidden pt-24 pb-20 lg:pt-28">
      {/* Ambient background layers */}
      <div className="pointer-events-none absolute inset-0">

        {/* Grid dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.2]"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Fade-to-background at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        {/* — HERO GRID — */}
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">

          {/* ── LEFT: Content ── */}
          <div>
            {/* Eyebrow badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5"
            >
              <div className="size-1.5 rounded-full bg-primary shadow-[0_0_6px_2px_rgba(0,0,0,0.1)] dark:shadow-[0_0_6px_2px_rgba(255,255,255,0.2)]" />
              <span className="text-[11px] font-semibold tracking-[0.1em] text-primary uppercase">
                {hero.badge}
              </span>
            </motion.div>

            {/* Staggered headline */}
            <motion.h1
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="text-[clamp(2.6rem,5.5vw,4.5rem)] font-[900] leading-[1.0] tracking-tight text-foreground"
              aria-label={headline}
            >
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariant}
                  className="mr-[0.22em] inline-block last:mr-0"
                  style={
                    i >= words.length - 2
                      ? {
                        background:
                          "linear-gradient(135deg, #818cf8 0%, #a78bfa 50%, #c084fc 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }
                      : undefined
                  }
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Sub-copy */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.45 }}
              className="mt-6 max-w-[480px] text-[clamp(1rem,2vw,1.15rem)] font-[350] leading-[1.7] text-muted-foreground"
            >
              {hero.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.55 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <MagneticButton
                href={hero.ctaHref}
                className="group inline-flex items-center gap-2.5 rounded-xl bg-primary px-7 py-3.5 text-[0.95rem] font-semibold text-primary-foreground shadow-[0_4px_32px_rgba(0,0,0,0.1)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90"
              >
                {hero.cta}
                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  className="size-4.5 transition-transform duration-200 group-hover:rotate-45"
                  strokeWidth={2.5}
                />
              </MagneticButton>

              <MagneticButton
                href={hero.secondaryCtaHref}
                className="inline-flex items-center gap-2.5 rounded-xl border border-border bg-secondary px-7 py-3.5 text-[0.95rem] font-semibold text-secondary-foreground backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary/80"
              >
                {hero.secondaryCta}
              </MagneticButton>
            </motion.div>

            {/* Trust line */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.65 }}
              className="mt-8 flex flex-wrap items-center gap-5 text-[11px] font-medium tracking-wide text-muted-foreground/60 uppercase"
            >
              {[
                { icon: CheckmarkCircle01Icon, label: "Free forever" },
                { icon: Clock01Icon, label: "5-min setup" },
                { icon: ChartLineData01Icon, label: "Built for job seekers" },
              ].map(({ icon, label }) => (
                <span key={label} className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={icon} className="size-3.5 text-primary" strokeWidth={2} />
                  {label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Dashboard Mockup ── */}
          <motion.div
            variants={mockupVariant}
            initial="hidden"
            animate="visible"
            className="relative"
            style={{ perspective: "1200px" }}
          >
            <DashboardMockup />

            {/* Floating notification — offer received */}
            <motion.div
              initial={{ opacity: 0, x: 24, y: 8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -right-4 -top-5 flex items-center gap-3 rounded-2xl border border-border bg-card/90 px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:bg-card/90 backdrop-blur-md"
            >
              <div className="flex size-8 items-center justify-center rounded-xl bg-emerald-500/20">
                <div className="size-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_2px_rgba(52,211,153,0.3)]" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-foreground">Offer Received 🎉</div>
                <div className="text-[10px] text-muted-foreground">Vercel · 2 hours ago</div>
              </div>
            </motion.div>

            {/* Floating stat pill — bottom left */}
            <motion.div
              initial={{ opacity: 0, x: -24, y: -8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl border border-border bg-card/90 px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-md"
            >
              <div className="flex size-8 items-center justify-center rounded-xl bg-primary/20">
                <HugeiconsIcon icon={ChartLineData01Icon} className="size-3.5 text-primary" strokeWidth={2} />
              </div>
              <div>
                <div className="font-mono text-lg font-black text-foreground leading-none">92%</div>
                <div className="text-[10px] text-muted-foreground">Stay organized rate</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── STATS BAR ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-28"
        >
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
            {[
              { raw: 10000, suffix: "+", label: "Applications Tracked" },
              { raw: 5000, suffix: "+", label: "Active Job Seekers" },
              { raw: 92, suffix: "%", label: "Stay Organized" },
              { raw: 15, suffix: "min", label: "Saved per Week" },
            ].map((stat, i) => (
              <div
                key={i}
                className="group bg-card px-8 py-8 text-center transition-colors duration-300 hover:bg-primary/5"
              >
                <div className="font-mono text-[clamp(1.8rem,3.5vw,2.6rem)] font-[900] leading-none text-foreground">
                  <AnimatedNumber value={stat.raw} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
