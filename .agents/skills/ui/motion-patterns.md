# Motion.dev Advanced Patterns

## Import Convention
```tsx
import {
  motion, AnimatePresence,
  useScroll, useTransform, useSpring,
  useInView, useMotionValue, useVelocity,
  LayoutGroup, Reorder
} from "motion/react"
```

---

## Viewport Entry Patterns

### Blur + Slide (premium feel)
```ts
export const blurSlideUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
}
```

### Scale Reveal (cards, images)
```ts
export const scaleReveal = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } // spring-like ease
  }
}
```

### Clip Reveal (text lines — cinematic)
```tsx
// Wrap each line in overflow-hidden, animate y from 100% to 0%
export const clipReveal = {
  hidden: { y: "105%" },
  visible: {
    y: "0%",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
}
// Usage: <div className="overflow-hidden"><motion.p variants={clipReveal}>Line</motion.p></div>
```

---

## Scroll-Driven Patterns

### Full Horizontal Scroll Track
```tsx
function HorizontalScroll({ children }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"])
  return (
    <section ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 overflow-hidden h-screen flex items-center">
        <motion.div style={{ x }} className="flex gap-8 will-change-transform">
          {children}
        </motion.div>
      </div>
    </section>
  )
}
```

### Progress Bar
```tsx
function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-accent z-50"
    />
  )
}
```

### Number Ticker on Scroll
```tsx
function Ticker({ from = 0, to, duration = 1.5, suffix = "" }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const v = useMotionValue(from)
  const rounded = useTransform(v, (x) => Math.round(x).toLocaleString() + suffix)
  useEffect(() => {
    if (!isInView) return
    const controls = animate(v, to, { duration, ease: "easeOut" })
    return controls.stop
  }, [isInView])
  return <motion.span ref={ref}>{rounded}</motion.span>
}
```

---

## Hover Micro-Interactions

### Tilt Card (3D)
```tsx
function TiltCard({ children }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-50, 50], [8, -8])
  const rotateY = useTransform(x, [-50, 50], [-8, 8])

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className="transform-gpu"
    >
      {children}
    </motion.div>
  )
}
```

### Border Glow Trace
```tsx
// CSS trick — animated conic-gradient border
// Use Tailwind arbitrary + CSS var:
// className="relative before:absolute before:inset-0 before:rounded-[inherit] before:p-[1px]
//            before:bg-[conic-gradient(from_var(--angle),transparent_80%,rgba(var(--accent-rgb),0.8)_100%)]"
// Animate --angle with motion or CSS @property animation
```

---

## Layout Animations

### Expanding FAQ
```tsx
function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button onClick={() => setOpen(!open)}>{question}</button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pt-3">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

### Animated Tab Underline (layout animation)
```tsx
function Tabs({ tabs }) {
  const [active, setActive] = useState(tabs[0])
  return (
    <div className="flex gap-6 relative">
      {tabs.map(tab => (
        <button key={tab} onClick={() => setActive(tab)} className="relative pb-2">
          {tab}
          {active === tab && (
            <motion.div
              layoutId="underline"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
            />
          )}
        </button>
      ))}
    </div>
  )
}
```

---

## Performance Notes

- Use `will-change-transform` on elements with transform animations
- Prefer `transform` and `opacity` — GPU-composited, no layout reflow
- Avoid animating `width`, `height`, `padding`, `margin` — use `scaleX`/`scaleY` instead
- Use `layout` prop on motion elements that change size: `<motion.div layout>`
- Batch stagger children rather than individual `useInView` hooks per element
- `once: true` on `useInView` to avoid re-triggering on scroll-up
