---
name: landing-page-ui
description: >
  Build standout, production-grade landing pages using Motion.dev (Framer Motion), Tailwind CSS,
  and React. Use this skill whenever the user asks to build a landing page, hero section,
  marketing page, product page, SaaS homepage, or any conversion-focused UI. This skill
  produces non-generic, product-aware designs with micro-interactions, Motion.dev animations,
  expert shadow/depth systems, and maintainable component architecture. Always trigger this
  skill when the user mentions landing page, hero, homepage, or marketing UI — even if they
  only show a rough idea or a product description. Do NOT produce generic layouts; every
  decision should be anchored to the product's actual purpose.
---

# Landing Page UI Skill

You are building a **standout, product-aware** landing page. Generic is the enemy.
Before writing a single line of code, think like a designer who has read the product brief three times.

---

## Phase 0 — Product Interrogation (always do this first)

Extract the following from the user's prompt before designing:

| Signal | What to infer |
|---|---|
| Product type | B2B SaaS / dev tool / consumer app / agency / e-commerce / open-source |
| Core promise | What pain does it eliminate? What desire does it fulfill? |
| Audience | Developers / founders / creatives / enterprise buyers / general public |
| Tone target | Serious/trustworthy / playful / technical / luxury / rebellious |
| Visual metaphor | What image/feeling does the product *want* to project? |

If the user hasn't given enough, make a confident creative decision and state it briefly. Do not ask five questions. One smart assumption beats five interrupting questions.

---

## Phase 1 — Design Direction (pick one, commit fully)

Map the product signal to a visual language. Never default to "clean minimal SaaS blue". Examples:

| Product type | Example direction |
|---|---|
| Dev tool / CLI | Dark terminal aesthetic, monospace accent, neon-on-void glow, code-like grid |
| Consumer productivity | Warm paper / parchment tones, editorial serif headers, generous whitespace |
| AI / ML product | Deep navy or charcoal, animated gradient orbs, soft glows, geometry |
| E-commerce / consumer | Rich saturated palette, editorial fashion layout, bold asymmetric type |
| Fintech / serious SaaS | Precision, fine grid lines, muted but high-contrast, zero decoration noise |
| Creative tool | Expressive, art-directed, color-forward, defy conventions |
| Open source / hacker | Brutalist grid, raw but intentional, terminal green, markdown-like type |

**NEVER USE:**
- Purple-to-blue gradient hero on white
- Inter/Roboto with gray-500 body text and a blue CTA button
- Card grid with drop-shadow-sm and "Our Features" heading
- Stock photo hero backgrounds
- Centered hero with one line title + one line subtitle + two buttons stacked

---

## Phase 2 — Architecture (maintainable code contract)

Structure every landing page as composable sections. Do not write one 600-line monolith.

```
LandingPage.tsx (orchestrator only — imports + section order)
├── sections/
│   ├── Hero.tsx
│   ├── SocialProof.tsx
│   ├── Features.tsx
│   ├── HowItWorks.tsx
│   ├── Testimonials.tsx
│   └── CTA.tsx
├── components/
│   ├── AnimatedText.tsx      (reusable word/char stagger wrapper)
│   ├── ScrollReveal.tsx      (reusable motion wrapper)
│   ├── GlowCard.tsx          (card with ambient glow effect)
│   └── MagneticButton.tsx    (button with cursor magnet effect)
└── lib/
    ├── motion-variants.ts    (all animation variants — centralized)
    └── tokens.ts             (design tokens as TS constants)
```

For a single-file artifact, use clearly labeled comment sections:
```tsx
// ─── MOTION VARIANTS ───────────────────────────────────────
// ─── DESIGN TOKENS ─────────────────────────────────────────
// ─── COMPONENTS ────────────────────────────────────────────
// ─── SECTIONS ──────────────────────────────────────────────
// ─── PAGE ──────────────────────────────────────────────────
```

---

## Phase 3 — Tailwind CSS Principles (use these, not defaults)

### Shadow System (not shadow-md on everything)
```tsx
// Ambient glow shadow — for dark themes
className="shadow-[0_0_40px_rgba(var(--accent-rgb),0.15)]"

// Depth shadow — layered, not uniform
className="shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.08),0_24px_48px_rgba(0,0,0,0.06)]"

// Inset highlight — glass/frosted effect top edge
className="shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"

// Color shadow — brand-tinted depth
className="shadow-[0_8px_32px_rgba(var(--brand-rgb),0.25)]"
```

### Typography Scale (opinionated)
```tsx
// Display — use clamp for fluid type, never fixed px
className="text-[clamp(2.5rem,6vw,5.5rem)] font-[900] leading-[0.95] tracking-tight"

// Subheading
className="text-[clamp(1.1rem,2.5vw,1.4rem)] font-[350] leading-[1.6] text-muted"

// Label / eyebrow
className="text-[0.7rem] font-[600] tracking-[0.15em] uppercase"
```

### Layout Tricks
```tsx
// Asymmetric hero grid
className="grid grid-cols-[1fr_auto] gap-x-24 items-end"

// Content-width with bleed for backgrounds
className="max-w-7xl mx-auto px-6 lg:px-12"

// Stacked z-layers with pseudo elements (use before:/after: Tailwind)
className="relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-background before:z-10"

// CSS grid for overlapping elements
className="grid [grid-template-areas:'stack'] *:[grid-area:stack]"
```

### Background Effects
```tsx
// Noise texture overlay (always add to hero sections)
// Add a <div> with this on top of the hero background:
className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,...')] pointer-events-none"

// Radial gradient glow
className="bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(var(--accent-rgb),0.15),transparent)]"

// Grid dot pattern
className="bg-[radial-gradient(circle,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:24px_24px]"
```

---

## Phase 4 — Motion.dev Integration

Always import from `motion/react`:
```tsx
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "motion/react"
```

### Centralize All Variants (motion-variants.ts pattern)
```ts
export const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

export const stagger = {
  visible: { transition: { staggerChildren: 0.08 } }
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
}
```

### ScrollReveal Component (reusable)
```tsx
function ScrollReveal({ children, className, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

### Hero Entrance Pattern (do this, not random opacity fade)
```tsx
// Stagger heading words
function AnimatedHeading({ text }) {
  const words = text.split(" ")
  return (
    <motion.h1 variants={stagger} initial="hidden" animate="visible">
      {words.map((word, i) => (
        <motion.span key={i} variants={fadeUp} className="inline-block mr-[0.25em]">
          {word}
        </motion.span>
      ))}
    </motion.h1>
  )
}
```

### Scroll-Driven Parallax
```tsx
function ParallaxSection({ children }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}
```

### Magnetic Button (micro-interaction)
```tsx
function MagneticButton({ children, className }) {
  const ref = useRef(null)
  const x = useSpring(0, { stiffness: 200, damping: 20 })
  const y = useSpring(0, { stiffness: 200, damping: 20 })

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.25)
    y.set((e.clientY - cy) * 0.25)
  }

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className={className}
    >
      {children}
    </motion.button>
  )
}
```

### Counting Number Animation
```tsx
function AnimatedNumber({ target, suffix = "" }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const count = useSpring(0, { stiffness: 60, damping: 20 })
  const display = useTransform(count, (v) => Math.round(v).toLocaleString() + suffix)
  useEffect(() => { if (isInView) count.set(target) }, [isInView])
  return <motion.span ref={ref}>{display}</motion.span>
}
```

---

## Phase 5 — Section Blueprints

### Hero
- Full viewport height (min-h-screen or 100dvh)
- ONE dominant visual decision (animated orb, code block, 3D object, bold type treatment)
- Eyebrow label → Display heading → Sub-copy → CTA(s)
- Background: noise texture + radial gradient glow
- Entrance: staggered word animation + slide-up sub-copy + fade CTA
- NEVER center everything unless the product calls for it — try left-aligned with right visual

### Social Proof / Logos
- Marquee scroll (CSS `@keyframes scroll` or motion `animate={{ x }}`)
- Grayscale logos, hover to full color
- "Trusted by X+ teams" eyebrow

### Features
- NOT a 3-column card grid with icons
- Alternating image-text rows, OR a large single-feature spotlight that scrolls through
- Each feature gets one tight headline + one sentence, max
- Micro-interaction on each: subtle glow on hover, icon animation on entry

### How It Works
- Numbered steps with a connecting line/track
- Each step animates in as you scroll past it
- For dev tools: show a real code snippet with syntax highlighting

### Testimonials
- Don't use a carousel by default — staggered card grid or masonry is more trustworthy
- Real quotes, real names, real roles. No placeholder text in delivered code.
- Cards: subtle border, deep shadow, avatar, role

### CTA Section
- Full-bleed, high contrast
- One heading. One sub-line. One button. Silence.
- Can use an ambient animated background (slow gradient shift, particle field)

---

## Phase 6 — Responsiveness Rules

```
Mobile first. But design desktop first mentally, then adapt.
```

```tsx
// Breakpoints to use (Tailwind defaults are fine)
// sm: 640px  md: 768px  lg: 1024px  xl: 1280px  2xl: 1536px

// Hero: stack on mobile, side-by-side on lg+
className="flex flex-col lg:flex-row"

// Display type: smaller on mobile, let clamp handle it
// Don't override clamp with fixed mobile sizes unless needed

// Reduce motion (always respect this)
// Wrap motion variants in:
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
// Or use Motion's built-in: variants are skipped if reduced motion is on
```

---

## Phase 7 — Quality Checklist (run before delivering)

- [ ] No purple gradient on white
- [ ] No Inter/Roboto as primary font unless brutally justified
- [ ] No generic "Our Features" section header
- [ ] Shadows are multi-layer or glow-based, not `shadow-md`
- [ ] Hero has a staggered entrance animation
- [ ] At least two distinct micro-interactions (hover, scroll-trigger, magnetic, count-up)
- [ ] All motion variants are centralized, not inlined everywhere
- [ ] Section components are separated by comment headers at minimum
- [ ] CTA button has hover state with transform + shadow change
- [ ] Background is not a flat color — has texture, gradient, or pattern
- [ ] Mobile layout does not break (check flex/grid col stacking)
- [ ] `prefers-reduced-motion` is considered (Motion handles automatically)
- [ ] Color palette has clear hierarchy: base / surface / muted / accent / on-accent

---

## Phase 8 — Code Quality Rules

1. **No magic numbers.** Extract spacing, color values, durations into named constants at the top.
2. **One motion variants object per animation family.** No inline `initial={{ opacity: 0, y: 20 }}` scattered everywhere.
3. **Components under 80 lines.** If a section component grows past 80 lines, split a sub-component out.
4. **Tailwind utility grouping order:** layout → sizing → spacing → typography → color → border → shadow → transition/animation
5. **No commented-out code** in delivered output.
6. **Accessible CTAs.** Buttons have `aria-label` if icon-only. Interactive elements have focus-visible styles.
7. **CSS variables for brand colors** so the palette is changeable in one place:
```tsx
// In :root or a <style> tag at the top of the file
:root {
  --accent: 139 92 246;  /* RGB triplet for Tailwind rgb() */
  --brand: #7c3aed;
}
```

---

## Delivery Format

For artifact output (single-file React):
- Full working `.jsx` file
- All imports at top
- Design tokens defined as `const` near top
- Motion variants object immediately below tokens
- Reusable micro-interaction components next
- Sections in order
- `export default function LandingPage()` at bottom

State any assumptions made about the product at the very top as a brief comment block:
```tsx
/*
 * Product: [name] — [one-line description]
 * Audience: [who]
 * Design direction: [adjective, adjective, adjective]
 * Palette: [dominant] / [accent] / [surface]
 * Font: [display] + [body]
 */
```

---

## Read These Reference Files When Needed

- `references/motion-patterns.md` — Advanced Motion.dev patterns (viewport animations, layout animations, shared layout, drag)
- `references/tailwind-tricks.md` — Deep Tailwind utility patterns (arbitrary values, CSS grid tricks, custom animations)
- `references/shadow-systems.md` — Full shadow design system with copy-paste Tailwind classes for light/dark themes
