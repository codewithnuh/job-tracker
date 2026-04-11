# Tailwind CSS Advanced Tricks for Landing Pages

## Arbitrary Values — Use Them Freely
Tailwind's arbitrary value syntax is the escape hatch. Use it rather than fighting the framework.

```tsx
// Exact pixel values
className="w-[732px] top-[-2px] mt-[3.75rem]"

// Complex gradients
className="bg-[linear-gradient(135deg,#0f0f0f_0%,#1a1a2e_50%,#0f0f0f_100%)]"

// CSS custom properties
className="bg-[rgba(var(--accent-rgb),0.1)] text-[rgb(var(--accent-rgb))]"

// Arbitrary CSS properties
className="[perspective:1000px] [transform-style:preserve-3d] [backface-visibility:hidden]"
```

---

## Custom Animations in Tailwind Config (or @layer)

```css
/* In a <style> tag or global CSS */
@layer utilities {
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
  }

  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(var(--accent-rgb), 0.2); }
    50% { box-shadow: 0 0 40px rgba(var(--accent-rgb), 0.5); }
  }

  .animate-float { animation: float 4s ease-in-out infinite; }
  .animate-shimmer { 
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }
  .animate-marquee { animation: marquee 20s linear infinite; }
  .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
}
```

---

## Typography Utilities

```tsx
// Fluid type without a plugin (clamp)
className="text-[clamp(2rem,5vw,4.5rem)]"

// Precise letter spacing
className="tracking-[0.12em]"

// Text gradient
className="bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent"

// Brand gradient text
className="bg-gradient-to-r from-[rgb(var(--accent-rgb))] to-[rgb(var(--accent-2-rgb))] bg-clip-text text-transparent"

// Text balance (prevents orphans)
className="text-balance"

// Tight display leading
className="leading-[0.9] tracking-tight"
```

---

## Grid Patterns

```tsx
// Auto-fill responsive grid
className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6"

// Asymmetric 2-col
className="grid grid-cols-[2fr_1fr] gap-12"

// Overlapping stack (no z-index needed)
className="grid [&>*]:[grid-area:1/1]"
// same as:
className="grid grid-cols-1 grid-rows-1 [&>*]:col-start-1 [&>*]:row-start-1"

// Masonry-like (CSS columns)
className="columns-3 gap-4 [&>*]:break-inside-avoid [&>*]:mb-4"
```

---

## Background Effects

```tsx
// Dot grid
className="bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:20px_20px]"

// Line grid
className="bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]"

// Noise texture (inline SVG data URL)
className="bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50"

// Vignette overlay
className="after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.5))]"
```

---

## Glassmorphism (when product calls for it)

```tsx
className="bg-white/[0.04] backdrop-blur-xl backdrop-saturate-150
  border border-white/[0.08]
  shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_32px_rgba(0,0,0,0.3)]
  rounded-2xl"
```

---

## Pseudo-Element Tricks (Tailwind v3+)

```tsx
// Decorative line before heading
className="before:content-[''] before:block before:w-8 before:h-[2px] before:bg-accent before:mb-4"

// After gradient fade at bottom of a scrollable area
className="relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-24 
  after:bg-gradient-to-t after:from-background after:to-transparent after:pointer-events-none"

// Hover underline that grows from center
className="relative after:absolute after:bottom-0 after:left-1/2 after:right-1/2
  after:h-[1px] after:bg-current after:transition-all after:duration-300
  hover:after:left-0 hover:after:right-0"
```

---

## Scroll Behavior

```tsx
// Smooth scroll on anchor
className="scroll-smooth"

// Scroll snap carousel
className="flex overflow-x-auto snap-x snap-mandatory gap-4 [scrollbar-width:none] [-webkit-overflow-scrolling:touch]"
// Children:
className="shrink-0 snap-start w-[80vw]"

// Hide scrollbar cross-browser
className="[scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
```

---

## Focus & Accessibility

```tsx
// Modern focus ring (replaces outline)
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent-rgb))] focus-visible:ring-offset-2 focus-visible:ring-offset-background"

// Skip nav link (visually hidden until focus)
className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-background"
```

---

## Performance Utilities

```tsx
// Hardware accelerate transforms
className="will-change-transform"

// Prevent layout shifts
className="contain-[layout]"

// GPU layer for backdrop-blur
className="transform-gpu"

// Prevent text reflow during animation
className="backface-hidden"
```
