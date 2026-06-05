# ON REPEAT — Splash Page Rebuild
### Prompt for Claude Code (VS Code)

---

## CONTEXT

You are rebuilding the **On Repeat** pre-launch splash page for a hand cream brand. The current project is a Next.js + React + Tailwind CSS app located in the `on-repeat-splash` folder. The current live page has a working EmailJS contact form — keep that integration and extend it with the new fields.

The designer has provided a reference HTML file (`On Repeat.html`) and all assets. This document is the full specification. Rebuild `page.tsx` (or `page.jsx`) as a single scrolling page that matches this spec exactly.

---

## TECH STACK

- **Framework:** Next.js (App Router preferred)
- **Styling:** Tailwind CSS + `tailwind.config.js` custom tokens (see below) + small `globals.css` for animations
- **Font:** Google Fonts — `DM Mono` (weights 400, 500). Helvetica Neue via system stack for body/headings.
- **Form:** EmailJS (already configured — extend with new fields)
- **Images:** All in `/public/images/` (copy from assets provided)

---

## TAILWIND CONFIG — Add to `tailwind.config.js`

```js
theme: {
  extend: {
    colors: {
      cream:   '#F2EBDD',
      paper:   '#F8F3EA',
      sand:    '#E7DAC4',
      ink:     '#211B17',
      'ink-soft': '#6a6157',
      plum:    '#3A2A3E',
      'plum-soft': '#5a4760',
      coral:   '#F47D6E',
      mint:    '#7FD2C4',
      butter:  '#EDE08A',
      cloud:   '#EDEAE3',
    },
    fontFamily: {
      sans:  ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      mono:  ['"DM Mono"', 'ui-monospace', 'Menlo', 'monospace'],
    },
    letterSpacing: {
      tightest: '-0.045em',
      tighter:  '-0.04em',
      tight:    '-0.02em',
    },
  },
}
```

---

## GLOBALS.CSS — Animations (add to `globals.css`)

```css
@keyframes spin-record {
  to { transform: rotate(360deg); }
}
@keyframes marquee-left {
  to { transform: translateX(-50%); }
}
.animate-spin-record {
  animation: spin-record 7s linear infinite;
}
.animate-marquee {
  animation: marquee-left 32s linear infinite;
  width: max-content;
  display: flex;
}
@media (prefers-reduced-motion: reduce) {
  .animate-spin-record, .animate-marquee { animation: none; }
}
```

---

## PAGE SECTIONS (top to bottom)

---

### 1. NAV

**Behavior:** Fixed top. On scroll past 30px — background becomes `cream/80` with `backdrop-blur`, and the logo shrinks.

```tsx
// Pseudo-code
const [scrolled, setScrolled] = useState(false);
useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 30);
  window.addEventListener('scroll', onScroll);
  return () => window.removeEventListener('scroll', onScroll);
}, []);
```

**Layout:** `flex justify-between items-center px-[var(--pad)] py-5`

- **Left:** `<Image src="/images/logotype.png" alt="On Repeat" />` 
  - Big: `w-[clamp(200px,34vw,500px)]` 
  - Scrolled: `w-[clamp(130px,16vw,210px)]`
  - Use `transition-all duration-400` for smooth shrink
- **Right:** `<a href="#signup">` styled as a pill — ink background, cream text, mono font, rounded-full, `px-5 py-3 text-xs tracking-wide uppercase hover:-translate-y-0.5 transition`

---

### 2. HERO

**Background:** `bg-cream`  
**Layout:** Two-column grid, `min-h-screen`, `items-center`, responsive (stacks on mobile)

**Left column (text):**

```
Eyebrow: spinning vinyl icon + "COLLECTIBLE HAND CREAM" in mono caps
  - vinyl: <Image className="animate-spin-record w-8 h-8" src="/images/vinyl.png" />

H1 (3 lines, large bold, tight tracking):
  "The hand cream"
  "you'll use"
  "on repeat."   ← this line has a butter-yellow highlight background

CSS for highlight:
  em { 
    font-style: normal; 
    background: theme('colors.butter'); 
    box-decoration-break: clone; 
    padding: 0 0.1em; 
    margin-left: -0.1em;
  }

Font size: clamp(38px, 6vw, 82px), font-weight: 800, line-height: 0.94

Lead paragraph:
  "Like the song you can't stop playing — the hand cream you'll reach for again and again. 
  Fast-absorbing, rich, and never greasy."
  Color: ink-soft, font-weight: 500, max-width: 34ch

Note (mono caps, ink-soft):
  "PRESS PLAY · REAPPLY · REPEAT"
```

**Right column (product images — transparent PNG, no frame):**

```tsx
<div className="relative">
  <div className="relative pb-[14%]">
    {/* Main front-facing render */}
    <Image 
      src="/images/prod-hero-1.png" 
      alt="On Repeat hand cream"
      className="w-[82%] mx-auto block"
      style={{ filter: 'drop-shadow(0 30px 90px rgba(200,110,160,0.32))' }}
    />
    {/* Angled view — overlapping bottom-right */}
    <Image 
      src="/images/prod-hero-2.png"
      alt="On Repeat angled view"
      className="absolute right-[-4%] bottom-[-14%] w-[46%]"
      style={{ filter: 'drop-shadow(0 18px 50px rgba(200,110,160,0.26))' }}
    />
  </div>
  {/* Spinning vinyl badge bottom-left */}
  <Image
    src="/images/vinyl.png"
    alt=""
    className="absolute left-[-28px] bottom-[-24px] w-[clamp(80px,11vw,130px)] animate-spin-record"
    style={{ filter: 'drop-shadow(0 12px 28px rgba(33,27,23,0.22))' }}
  />
</div>
```

---

### 3. INGREDIENTS TICKER (marquee)

**Background:** `bg-butter`  
**Height:** `py-4 overflow-hidden`

Content scrolls left infinitely. Duplicate the items (2× the list) so the loop is seamless.

```
Items (bold name + lighter italic description):
• Jojoba Oil + Squalane — nourish & soften skin
• Shea Butter — rich moisture & comfort
• Glycerin + Panthenol — attract & retain hydration
• Ceramides — strengthen the skin barrier
[repeat above 4 again]
```

Each item: `font-bold text-[clamp(15px,2.1vw,30px)] tracking-[-0.01em] whitespace-nowrap px-[0.45em]`  
After each item: a small filled circle bullet `●`  
Description text: `font-normal opacity-60`

---

### 4. LIFESTYLE FULL-BLEED BANNER

**Image:** `/images/lifestyle-hero.jpg` — `object-cover object-[center_38%]`  
**Height:** `h-[clamp(440px,82vh,800px)]`  
**Overlay:** gradient scrim `from-plum/60 via-plum/12 to-transparent` (bottom to top)  
**Text (bottom-left, cream):**
```
Small cap: "SUN'S OUT"
H2: "Made for all your moments."
  font-size: clamp(32px, 5.6vw, 78px), font-weight: 800, max-width: 18ch
  text-shadow: 0 2px 30px rgba(58,42,62,0.4)
```

---

### 5. STATEMENT (dark section)

**Background:** `bg-plum` **Text:** `text-paper`  
**Layout:** Two-column grid, `items-center`

**Left (text):**
```
H2: "Rich, but weightless."
  "weightless." has color: coral
  font-size: clamp(34px, 5.6vw, 80px), font-weight: 800

Paragraph:
  "It melts in and disappears — silky finish, never greasy. Tossed in a bag or left on 
  the nightstand, it's the one on heavy rotation."
  color: paper/70, font-size: clamp(15px,1.4vw,19px), line-height: 1.55
```

**Right:** `/images/prod-4.jpg` — rounded-xl, aspect-ratio 4/5, object-cover

---

### 6. GALLERY — "In the wild."

**Background:** `bg-paper`  
**Heading:** `"In the wild."` + `"Palm-sized"` cap (mono, right)

**Grid (6-column):**
```
Row 1: [prod-3.jpg spans 4 cols, 16/11 ratio] [prod-1.jpg spans 2 cols, 3/4 ratio]
Row 2: [prod-2.jpg spans 2 cols, 3/4 ratio] [prod-0.jpg spans 4 cols, 16/11 ratio]
```
All: `rounded-[18px] overflow-hidden hover:scale-[1.04] transition-transform duration-700`

Mobile (< 768px): 2-column, all 1:1 ratio

---

### 7. FOUR VIBES

**Background:** `bg-cream`, `text-center`

```
H2: "FOUR"
    "VIBES."
  font-size: clamp(40px, 8vw, 120px), font-weight: 800, letter-spacing: -0.045em

Subtext: "One little record, four covers. Pick your mood."

Image: /images/all-products.png — max-width: 1000px, centered, contains transparency

Color dots row:
● Coral    (#F47D6E)
● Mint     (#7FD2C4)
● Sunset   (#EDE08A)
○ Cloud    (#EDEAE3, with border)
```

---

### 8. SIGN UP — "Get on the list."

**Background:** `bg-cream`, `text-center`  
**ID:** `id="signup"` (pill button scrolls here)

```
H2: "Get on the "list.""
  "list." has mint (#7FD2C4) highlight background (same em treatment as hero)

Subtext: "Be first to know when On Repeat drops. No spam — just the good stuff."
```

**Form fields (all underline style — border-bottom only, no box):**
```
Row 1 (side by side):
  [First name] [Last name]

Row 2 (full width):
  Email address

Row 3 (full width, textarea):
  Your message (optional)

Button (centered, pill):
  "NOTIFY ME ↗"
  bg-ink, text-cream, rounded-full, mono font, hover:-translate-y-0.5
```

Font for inputs: `font-sans font-semibold text-[clamp(16px,1.8vw,21px)]`  
Each field: `border-b-2 border-ink/35 pb-3 mb-6`  
Max-width of form: 540px, text-align: left

---

### 9. FOOTER

**Background:** `bg-plum`, **Text:** `text-paper`, `text-center`

```
• Spinning vinyl: /images/vinyl.png — filter: invert(1), w-[clamp(80px,11vw,120px)], animate-spin-record
• Logotype: /images/logotype.png — filter: invert(1), w-[clamp(130px,16vw,240px)]
• Tagline: "Hand cream you'll use on repeat."
• Legal: "©2026 On Repeat Beauty, Inc. All Rights Reserved."
  (mono, xs, uppercase, tracking-widest, opacity-55)
```

---

## EMAILJS INTEGRATION

Your current EmailJS setup works. Extend `templateParams` in your existing `sendEmail` handler to include all new fields:

```js
const templateParams = {
  first_name: formData.firstName,
  last_name:  formData.lastName,
  email:      formData.email,
  message:    formData.message,
  // Keep any existing params your template uses
};
```

Update your **EmailJS template** on emailjs.com to include:
- `{{first_name}}` 
- `{{last_name}}`
- `{{email}}`
- `{{message}}`

In your EmailJS template, the "To" and "Reply-To" fields should use `{{email}}`.

---

## SCROLL REVEAL ANIMATIONS

All major sections reveal on scroll (fade up). Use `IntersectionObserver` or a Framer Motion `whileInView` approach:

```tsx
// With Framer Motion (recommended for Next.js):
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-10% 0px' }}
  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
>
```

Stagger children using `transition={{ delay: 0.1 * index }}`.

---

## ASSETS LIST (`/public/images/`)

| File | Used in |
|------|---------|
| `logotype.png` | Nav (large → small on scroll), Footer (inverted white) |
| `vinyl.png` | Hero eyebrow (spinning), Hero badge (spinning), Footer (spinning, inverted) |
| `prod-hero-1.png` | Hero — main product render (transparent bg, pink glass) |
| `prod-hero-2.png` | Hero — angled product render (transparent bg, pink glass) |
| `all-products.png` | Four Vibes section (transparent bg, 4 color variants) |
| `lifestyle-hero.jpg` | Full-bleed lifestyle banner (poolside, golden-hour) |
| `prod-0.jpg` | Gallery — hand holding product against sky |
| `prod-1.jpg` | Gallery — product on wood cutting board (front) |
| `prod-2.jpg` | Gallery — product on wood (top view) |
| `prod-3.jpg` | Gallery — hand holding against river rocks |
| `prod-4.jpg` | Dark statement section — product in bag lifestyle |

---

## RESPONSIVE NOTES

- `--pad` (horizontal padding) = `clamp(22px, 6vw, 96px)` — use Tailwind `px-[clamp(22px,6vw,96px)]` or set as CSS var in globals
- Hero: 2-col on desktop → 1-col on mobile (product images stack below text)
- Gallery grid: 6-col on desktop → 2-col on mobile
- Four Vibes shade names: flex-wrap on mobile
- Nav pill: always visible (no hide on mobile)

---

## REFERENCE FILE

The complete reference HTML (`On Repeat.html`) is included. Open it in a browser to see exactly what the final page should look like. The CSS in the `<style>` block maps directly to the Tailwind tokens above.

---

*Built in Claude Design — June 2026*
