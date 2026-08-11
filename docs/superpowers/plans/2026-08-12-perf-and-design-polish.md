# Plan: Performance & Design Polish for Ai Solutions

**Date:** 2026-08-12
**Audit:** See `SESSION_PROMPT.md` in repo root for full audit findings.
**Goal:** Cut initial JS bundle by ~50%, fix broken theme toggle, clean up design inconsistencies.
**Build check:** `npm run build` must pass after each phase.

---

## File Map

| File | Phase | Action |
|------|-------|--------|
| `src/app/layout.tsx` | 1, 3 | Remove 2 fonts, remove theme toggle |
| `src/components/layout/nav.tsx` | 3 | Remove theme toggle button |
| `src/components/sections/hero.tsx` | 1, 3 | Remove GSAP, inline styles to Tailwind |
| `src/components/sections/home-client.tsx` | 1, 2 | Remove inline `<style>`, lazy-load sections |
| `tailwind.config.js` | 1 | Remove duplicate marquee keyframe |
| `src/app/globals.css` | 3 | Add Ticker utility class |
| `src/components/three/neural-network.tsx` | 4 | Reduce node count, drop HDR |
| `src/components/layout/command-palette.tsx` | 3 | Fix rounded-* dead classes |
| `next.config.js` | 2 | Add compress, poweredByHeader, optimizePackageImports |

---

## Phase 1: Fast Wins - Remove Dead Weight

**Deliverable:** ~120KB font savings, ~30KB JS savings. Build passes.

### Task 1.1: Remove DM Sans and Geist Mono fonts

**File:** `src/app/layout.tsx`

- Remove `DM_Sans` from the `next/font/google` import.
- Remove `Geist_Mono` from the `next/font/google` import.
- Remove `dmSans` and `geistMono` font declarations.
- Remove `${dmSans.variable}` and `${geistMono.variable}` from the body `className`.
- Keep 3 fonts: Geist (sans via `--font-geist-sans`), Space Grotesk (display via `--font-space-grotesk`), IBM Plex Mono (mono via `--font-ibm-plex-mono`).

**Verify:** `npm run build` passes. `git diff src/app/layout.tsx` shows only removals.

### Task 1.2: Remove GSAP + ScrollTrigger from Hero

**File:** `src/components/sections/hero.tsx`

- Remove `import gsap from "gsap"` and `import { ScrollTrigger } from "gsap/ScrollTrigger"`.
- Remove `gsap.registerPlugin(ScrollTrigger)` call.
- Replace the page wipe `gsap.to()` with a `useState` + framer-motion `motion.div`:
  ```tsx
  const [wipeDone, setWipeDone] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setWipeDone(true), 700);
    return () => clearTimeout(timer);
  }, []);
  ```
  Then in JSX:
  ```tsx
  {!wipeDone && (
    <motion.div
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      transition={{ duration: 0.7, ease: [0.87, 0, 0.13, 1] }}
      style={{ position: "fixed", inset: 0, background: "#000", zIndex: 9998, transformOrigin: "top", borderBottom: "3px solid #00F5FF", pointerEvents: "none" }}
    />
  )}
  ```
- Keep the vanilla JS text scramble (uses `requestAnimationFrame`, no dependencies).
- The existing fade-in animations for `#hero-tag`, `#hero-sub`, `#hero-actions` use `gsap.from()`. Convert these to framer-motion `motion.div` with `animate` + `transition.delay` OR simplify: wrap them in `<FadeIn>` and add `delay` props (reuses the existing motion primitive).

**Verify:** `npm run build` passes. Hero entry animation (wipe, text scramble, content fade) looks identical visually.

### Task 1.3: Remove duplicate `@keyframes marquee`

**File:** `src/components/sections/home-client.tsx`

- Remove the inline `<style>` tag that defines `@keyframes marquee` (lines ~35-36).
- The keyframe already exists in `tailwind.config.js` as `animation.marquee`. Update the Ticker's `<div>` to use `className="animate-marquee"` instead of the inline `style={{ animation: "marquee 28s linear infinite" }}`.

**File:** `tailwind.config.js` (optional - keep or remove)

- Note: the config `marquee` keyframe is correct, keep it.

**Verify:** Ticker marquee scrolls identically. Build passes.

### Task 1.4: Commit and push Phase 1

```bash
git add src/app/layout.tsx src/components/sections/hero.tsx src/components/sections/home-client.tsx
git commit -m "perf(layout): remove unused fonts, GSAP, and duplicate keyframes"
git push
```

---

## Phase 2: Lazy Loading Below-Fold Sections

**Deliverable:** Initial JS bundle cut by ~40-50%. TBT improved. Build passes.

### Task 2.1: Create a lazy-load helper

**File:** `src/lib/lazy-section.ts` (new file)

```tsx
import dynamic from "next/dynamic";
import type { ComponentType } from "react";

export function lazySection<T extends object>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  displayName: string
) {
  return dynamic(importFn, {
    ssr: true, // SSR the HTML, hydrate below fold
    loading: () => <div className="h-24" />, // minimal placeholder for CLS
  });
}
```

**Verify:** File exists, TypeScript compiles.

### Task 2.2: Wrap below-fold sections with `next/dynamic`

**File:** `src/components/sections/home-client.tsx`

Define which sections are "above fold" vs "below fold":

- **Above fold (eager):** Hero, WhoWeAre, Capabilities (first 3 sections)
- **Below fold (lazy):** AutomationJourney, Industries, FeaturedSolutions, EnterpriseBenefits, WhyAiSolutions, ImplementationProcess, TechnologyStack, CaseStudies, Testimonials, FAQ, Contact (11 sections)

Import pattern for lazy sections:
```tsx
const AutomationJourney = dynamic(
  () => import("@/components/sections/automation-journey").then((m) => ({ default: m.AutomationJourney })),
  { ssr: true }
);
const Industries = dynamic(
  () => import("@/components/sections/industries").then((m) => ({ default: m.Industries })),
  { ssr: true }
);
// ... repeat for all 11 sections
```

The Hero stays with `ssr: false` (it has R3F canvas). Everything else loads `ssr: true` - HTML appears in initial render, JS hydrates when scrolled into view.

**Verify:** `npm run build` passes. `npm run dev` - scroll through all sections, verify no layout shifts (CLS), all animations trigger. Use Chrome DevTools Coverage tab on `/` to confirm below-fold components are in separate chunks, not the initial bundle.

### Task 2.3: Update `next.config.js`

**File:** `next.config.js`

Add:
```js
compress: true,
poweredByHeader: false,
```

Add to `optimizePackageImports`:
```js
"framer-motion",
"gsap", // if any GSAP remains
"@react-three/fiber",
"@react-three/drei",
"three",
```

**Verify:** `npm run build` passes.

### Task 2.4: Commit and push Phase 2

```bash
git add src/lib/lazy-section.ts src/components/sections/home-client.tsx next.config.js
git commit -m "perf(home): lazy-load below-fold sections, optimize package imports"
git push
```

---

## Phase 3: Design Polish - Theme & Inline Styles

**Deliverable:** Theme toggle no longer breaks visuals. Inline styles moved to Tailwind. Cleaner code.

### Task 3.1: Force dark-only theme (remove toggle)

**File:** `src/app/layout.tsx`

- Change `ThemeProvider` props to `forcedTheme="dark"` instead of `defaultTheme="dark" enableSystem`.
- Remove `enableSystem` and `disableTransitionOnChange` props.
- This makes the toggle a no-op (always dark) without needing to remove it from every component immediately.

**File:** `src/components/layout/nav.tsx`

- Remove the theme toggle button (the Sun/Moon button and its `onClick` handler).
- Remove `import { Sun, Moon } from "lucide-react"`.
- Remove `const { theme, setTheme } = useTheme()`.
- Remove `const [mounted, setMounted]` and the `useEffect` that sets it.
- Remove `import { useTheme } from "next-themes"` (if no other usage).

**Verify:** `npm run build` passes. `npm run dev` - nav has no theme toggle. Page always renders dark.

### Task 3.2: Move Hero inline styles to Tailwind

**File:** `src/components/sections/hero.tsx`

Replace all inline `style={{}}` with Tailwind classes:

| Inline Style | Tailwind Equivalent |
|---|---|
| `{ paddingTop: "64px" }` | `pt-16` |
| Grid background div | Use `grid-bg` utility class (already defined in `globals.css`) |
| Glow orb divs | Use `absolute pointer-events-none rounded-full blur-[40px]` + `w-[400px] h-[400px]` |
| Headline `fontSize: "clamp(3.5rem, 9vw, 8.5rem)"` | Use `text-[clamp(3.5rem,9vw,8.5rem)]` (Tailwind v3 arbitrary value) |
| CTA button inline styles | Already partially class-based; complete via Tailwind config `shadow-neon-cyan` variants |

The text scramble DOM manipulation stays (it's dynamic). Only static styles move.

**Verify:** Hero renders identically. No visual regressions. `npm run build` passes.

### Task 3.3: Move Ticker inline styles to CSS utility

**File:** `src/components/sections/home-client.tsx`

- Replace the Ticker's inline styles with Tailwind classes.
- Move the container styles to a `className`. Example:
  ```tsx
  <div className="border-t-2 border-b-2 border-violet bg-violet/4 overflow-hidden py-[0.7rem]">
    <div className="flex w-max animate-marquee">
      {items.map((item, i) => (
        <span key={i} className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-violet px-[2.5rem] whitespace-nowrap">
          {item}
        </span>
      ))}
    </div>
  </div>
  ```
- Note: `animate-marquee` uses the config `marquee` keyframe. The config has `animation: "marquee 28s linear infinite"` - verify it works with `animate-marquee`.

**Verify:** Ticker looks identical. Build passes.

### Task 3.4: Fix CommandPalette rounded classes

**File:** `src/components/layout/command-palette.tsx`

- Replace `rounded-2xl` with `rounded-none` (brutalist style) or just remove it (default is `rounded-none`).
- Replace `rounded-lg` with `rounded-none` on the item buttons.
- Replace `rounded` on the kbd element with `rounded-sm` (acceptable for tiny kbd keys, or `px-2 py-0.5` without rounded).

**Verify:** Build passes. Command palette renders with brutalist square corners matching the rest of the site.

### Task 3.5: Commit and push Phase 3

```bash
git add src/app/layout.tsx src/components/layout/nav.tsx src/components/sections/hero.tsx src/components/sections/home-client.tsx src/components/layout/command-palette.tsx
git commit -m "fix(design): force dark theme, move inline styles to Tailwind, fix border-radius"
git push
```

---

## Phase 4: 3D Optimization (Optional - can defer)

**Deliverable:** Reduced GPU load, smaller Three.js render cost on mobile.

### Task 4.1: Reduce Neural Network complexity

**File:** `src/components/three/neural-network.tsx`

- Reduce `NeuralNodes` count from 200 to 80.
- Reduce `Connections` count from 80 to 40.
- Reduce `ParticleField` count from 500 to 200.
- Remove `<Environment preset="city" />` - it downloads an HDR texture (~150KB). Replace with a simple ambient + directional lights setup (already has `SceneLights`).
- Replace `<sphereGeometry args={[nodeSize, 8, 8]} />` with `<sphereGeometry args={[nodeSize, 4, 4]} />` (fewer segments, these are tiny dots anyway).
- Remove the `<Float>` wrapper from each node - replace with a manual oscillation using `useFrame` on the parent group (avoids 80 individual Float components registering their own animation loops).
- Add a `frameloop` optimization to the Canvas: `frameloop="demand"` pauses the render loop when nothing changes (the rotation uses `useFrame`, so `demand` may not work. Alternative: `frameloop="always"` with `dpr={[1, 1]}` to cap pixel ratio at 1x even on retina).

**Verify:** Canvas still renders a neural-looking sphere of particles. FPS remains at 60. `npm run build` passes. Check Three.js bundle size drops (should be ~30-40KB savings from removing the HDR preset).

### Task 4.2: Commit and push Phase 4

```bash
git add src/components/three/neural-network.tsx
git commit -m "perf(three): reduce node count, remove Environment HDR, optimize geometry"
git push
```

---

## Verification Checklist

After all phases:

1. [ ] `npm run build` passes with no errors
2. [ ] `npm run dev` - scroll through all 14 sections, all animations trigger
3. [ ] No theme toggle in nav
4. [ ] Ticker marquee scrolls smoothly
5. [ ] Hero wipe animation + text scramble works
6. [ ] Command palette opens (Ctrl+K), search works, ESC closes
7. [ ] Chrome DevTools Network tab: font downloads reduced from 5 to 3
8. [ ] Chrome DevTools Coverage tab: initial JS bundle is notably smaller
9. [ ] Lighthouse score improved (target: Performance 80+, Best Practices 90+)
10. [ ] Push to main, verify `https://aisolutions.in/api/health` returns updated sha
11. [ ] Visual check on production: all sections render, no broken styles

---

## Rollback Plan

Each phase is an independent commit. To roll back:
```bash
git revert <phase-commit-sha>
```

Phase 1-3 are production-safe (no visual regression risk). Phase 4 (3D) is the highest risk for visual changes; defer if unsure.