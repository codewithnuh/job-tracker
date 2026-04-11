# Shadow Design System

A shadow is not a drop-shadow-md. Shadows communicate material, elevation, and light source.
Build them in layers. Always.

---

## The Four Shadow Families

### 1. Depth Shadows (light themes — realistic material)
```
shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.06),0_12px_32px_rgba(0,0,0,0.04)]
shadow-[0_2px_4px_rgba(0,0,0,0.05),0_8px_24px_rgba(0,0,0,0.08),0_24px_64px_rgba(0,0,0,0.06)]
shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_32px_rgba(0,0,0,0.1),0_48px_96px_rgba(0,0,0,0.08)]
```

### 2. Ambient Glow Shadows (dark themes — light emission)
```
/* Soft accent glow */
shadow-[0_0_24px_rgba(var(--accent-rgb),0.12),0_0_80px_rgba(var(--accent-rgb),0.06)]

/* Stronger focus glow */
shadow-[0_0_0_1px_rgba(var(--accent-rgb),0.2),0_0_32px_rgba(var(--accent-rgb),0.2)]

/* White glow (for light cards on dark) */
shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_8px_32px_rgba(0,0,0,0.4)]
```

### 3. Inset Shadows (glass / frosted / pressed states)
```
/* Glass top-edge highlight */
shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.08)]

/* Pressed button */
shadow-[inset_0_2px_8px_rgba(0,0,0,0.15)]

/* Frosted card */
shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_24px_rgba(0,0,0,0.3)]
```

### 4. Color Shadows (brand-tinted depth)
```
/* Primary CTA button glow */
shadow-[0_4px_16px_rgba(var(--accent-rgb),0.3),0_1px_4px_rgba(var(--accent-rgb),0.4)]

/* Hover state escalation */
hover:shadow-[0_8px_32px_rgba(var(--accent-rgb),0.4),0_2px_8px_rgba(var(--accent-rgb),0.5)]

/* Danger / destructive */
shadow-[0_4px_16px_rgba(239,68,68,0.25)]
```

---

## Card Shadow by Theme

### Light Theme Card
```tsx
className="bg-white rounded-2xl 
  shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.06),0_12px_32px_rgba(0,0,0,0.04)]
  border border-black/[0.04]
  hover:shadow-[0_2px_6px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.1),0_24px_48px_rgba(0,0,0,0.08)]
  transition-shadow duration-300"
```

### Dark Theme Card (with glow)
```tsx
className="bg-white/[0.04] backdrop-blur-md rounded-2xl 
  shadow-[0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.08),0_8px_32px_rgba(0,0,0,0.4)]
  hover:shadow-[0_0_0_1px_rgba(var(--accent-rgb),0.2),inset_0_1px_0_rgba(255,255,255,0.1),0_0_40px_rgba(var(--accent-rgb),0.1),0_16px_48px_rgba(0,0,0,0.5)]
  transition-shadow duration-300"
```

### Feature Highlight Card (glowing accent border)
```tsx
className="rounded-2xl p-[1px]
  bg-gradient-to-br from-[rgba(var(--accent-rgb),0.4)] via-transparent to-transparent
  shadow-[0_0_48px_rgba(var(--accent-rgb),0.15)]"
// Inner content div:
className="bg-[#0f0f0f] rounded-[calc(1rem-1px)] p-6 h-full"
```

---

## Button Shadows by State

```
Default:  shadow-[0_1px_2px_rgba(0,0,0,0.1),0_2px_8px_rgba(var(--accent-rgb),0.2)]
Hover:    shadow-[0_2px_4px_rgba(0,0,0,0.12),0_4px_16px_rgba(var(--accent-rgb),0.35)]
Active:   shadow-[inset_0_1px_4px_rgba(0,0,0,0.2)]
Focus:    ring-2 ring-[rgba(var(--accent-rgb),0.5)] ring-offset-2
```

---

## Hero Background Glow (scene lighting)

```tsx
// Centered orb behind hero content
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  <div className="absolute top-[-20%] left-[50%] translate-x-[-50%] 
    w-[800px] h-[600px] rounded-full 
    bg-[radial-gradient(ellipse,rgba(var(--accent-rgb),0.15)_0%,transparent_70%)]
    blur-[80px]" 
  />
</div>
```

---

## Text Shadows

```
/* Glowing display heading on dark */
text-shadow: 0 0 80px rgba(var(--accent-rgb), 0.4);
// Tailwind: [text-shadow:0_0_80px_rgba(var(--accent-rgb),0.4)] (arbitrary property)

/* Subtle lift on light */
text-shadow: 0 1px 2px rgba(0,0,0,0.08);
```

---

## Common Mistakes to Avoid

- `shadow-md` alone — too uniform, no depth
- `shadow-xl` alone — too harsh, no subtlety  
- Same shadow on every card — no elevation hierarchy
- Using black rgba shadows on colored backgrounds — use the background color instead
- Forgetting hover state shadow escalation — shadows should respond to interaction
