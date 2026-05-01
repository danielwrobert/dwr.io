# Remove the `font-size: 62.5%` hack from `app/globals.css`

## Context

`app/globals.css` lines 18–23 set `html { font-size: 62.5% }` to make `1rem = 10px`. This was carried over from a pre-Tailwind iteration of the site so authoring rem values felt "natural" (`2rem` for body text, `4rem` for h1, etc.).

The cost: **Tailwind's entire spacing/sizing scale gets multiplied by 0.625**. `p-4` produces 10px instead of 16px, `mb-6` produces 15px instead of 24px, `text-base` produces 10px instead of 16px, etc. Every utility class fights the design system. Authoring becomes guesswork ("how many `p-X` units do I want… in invisible 2.5px increments?"), and arbitrary rem values (`text-[2.5rem]`, `mb-[1.8rem]`, `px-[2rem]`) sprawl across components to compensate.

Goal: drop the hack, restore Tailwind's canonical `1rem = 16px` baseline, and rewrite all custom CSS rules and arbitrary `[Xrem]` utilities so the site renders at roughly its current pixel sizes — but expressed via Tailwind's standard scale wherever possible.

User decisions (confirmed):
- **Hybrid: snap to Tailwind scale where it maps cleanly**, fall back to clean arbitrary rem values (`1.25rem`, `0.25rem`) only when the standard scale doesn't have a close enough stop. Slight visual drift on a few sizes is acceptable.
- **Leave `resources/dwr-gatsby/` alone.** It's an archived snapshot and isn't part of the Next.js build.

## Conversion reference

After removal, `1rem = 16px`, so to preserve current rendering we multiply each existing rem value by `0.625`. Tailwind v4's `--spacing` unit is `0.25rem` (= 4px), so every step in the standard scale is 4px (`p-1 = 4px`, `p-2 = 8px`, … `p-10 = 40px`).

Key mappings used throughout the migration:

| Current rem (with hack) | Current px | New target | Method |
|---|---|---|---|
| `2rem` | 20px | `1.25rem` / `text-xl` / `mb-5` | exact |
| `1.6rem` | 16px | `1rem` / `text-base` / `mb-4` | exact |
| `1.5rem` | 15px | `1rem` (16px) / `mb-4` | snap (+1px) |
| `2.4rem` | 24px | `1.5rem` / `text-2xl` / `mb-6` | exact |
| `3rem` | 30px | `1.875rem` / `text-3xl` / `mb-7.5` | exact |
| `4rem` | 40px | `2.5rem` / `mb-10` | exact |
| `4.5rem` | 45px | `text-5xl` (3rem = 48px) / `mb-11` (44px) / `mb-12` (48px) | snap (±3px) |
| `1.8rem` | 18px | `1.125rem` / `mb-4.5` | exact (Tailwind v4 supports half-steps) |
| `2.5rem` | 25px | `1.5rem` (24px) / `mb-6` | snap (−1px) |
| `0.5rem` | 5px | `0.3125rem` (5px) / `rounded-sm` (≈4px) | snap |
| `0.4rem` | 4px | `rounded-sm` (4px) / `0.25rem` | exact |
| `0.6rem` | 6px | `1.5` step (6px) | exact |
| `5.5rem` | 55px | `mt-14` (56px) | snap (+1px) |
| `3.2rem` | 32px | `w-8 h-8` (32px) | exact |
| `2.4rem` (icon) | 24px | `w-6 h-6` (24px) | exact |
| `1.6rem` (icon) | 16px | `w-4 h-4` (16px) | exact |
| `18rem` (search box) | 180px | `w-[180px]` or `w-44` (176px) | snap or fixed px |
| `79rem` (max-w) | 790px | `max-w-[49.375rem]` (790px) — keep as fixed px-equivalent | exact |

For the existing standard utilities already in the JSX (e.g. `p-10`, `mb-6`, `py-28`, `pl-4`, `mr-8`), the hack also currently shrinks them by 0.625×. They need to be downsized after the fix to retain current visual rendering:

| Current utility | Current px (with hack) | Replacement | New px |
|---|---|---|---|
| `p-10` (header/footer/nav overlay) | 25px | `p-6` | 24px |
| `py-28` (Layout) | 70px | `py-18` | 72px |
| `px-10` (Layout) | 25px | `px-6` | 24px |
| `mb-6` (h3, p) | 15px | `mb-4` | 16px |
| `mb-4` (h5) | 10px | `mb-2.5` | 10px |
| `mt-6` (SocialLinks) | 15px | `mt-4` | 16px |
| `mr-8` (footer/social) | 20px | `mr-5` | 20px |
| `py-4` (Button, Search input) | 10px | `py-2.5` | 10px |
| `px-6` (Button) | 15px | `px-4` | 16px |
| `pl-4` (Search input) | 10px | `pl-2.5` | 10px |
| `pr-12` (Search input) | 30px | `pr-7.5` | 30px |
| `mt-2` (search dropdown) | 5px | `mt-1` | 4px |
| `p-6` (TOC) | 15px | `p-4` | 16px |
| `w-136` (search dropdown) | unclear (likely intentional fixed width) | leave as-is or convert to `w-[34rem]` | verify visually |

## Files to modify

### 1. `app/globals.css`

Replace the base layer entirely. Final content for `@layer base`:

```css
@layer base {
  html {
    box-sizing: border-box;
    line-height: 1.6;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    font-size: 1.25rem; /* 20px — base body text */
    -webkit-font-smoothing: antialiased;
  }

  p {
    margin: 0 0 1.25rem; /* 20px */
  }

  pre {
    border-radius: 0.3125rem; /* 5px */
    padding: 1rem;            /* 16px (was 15px) */
    overflow-x: auto;
  }

  :not(pre) > code {
    background-color: #282a36;
    border-radius: 3px;
    padding: 3px 5px;
  }

  img {
    max-width: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #bcc2cd;
    font-family: var(--font-ovo), serif;
    margin: 0;
  }

  h1 { font-size: 2.5rem; }   /* 40px */
  h2 { font-size: 1.875rem; } /* 30px (matches Tailwind text-3xl) */
  h3 { font-size: 1.5rem; }   /* 24px (matches text-2xl) */
  h4, h5, h6 { font-size: 1rem; } /* 16px (matches text-base) */

  h1, h2, h3 {
    color: #8be9fd;
  }

  .entry-title {
    font-size: 3rem;       /* 48px (was 45px — matches text-5xl) */
    text-align: center;
    line-height: 1.4;
    margin: 0.5625rem 0;   /* 9px */
  }

  /* Links — unchanged */
  a, a:link, a:visited { color: #ff79c6; text-decoration: none; transition: color 0.5s; }
  header a, header a:link, header a:visited { color: #bcc2cd; }
  header a:hover, header a.active { color: #ff79c6; }
  a:hover { color: #50fa7b; }

  .note h2 a, .note h3 a { color: #bd93f9; }

  .note {
    background-color: #282a36;
    border-radius: 0.25rem;       /* 4px */
    padding: 1rem 1.25rem;        /* 16px 20px (was 15px 20px) */
  }

  .note:not(:last-of-type) {
    margin-bottom: 3rem;          /* 48px (was 45px) */
  }

  .entry-meta,
  .entry-meta-updated {
    color: #bd93f9;
    font-style: italic;
    margin-bottom: 1rem;          /* 16px (was 15px) */
    text-align: center;
  }

  .entry-meta-updated { color: #ffb86c; }

  .search-input::placeholder { color: #bcc2cd; opacity: 1; }
}
```

Key removals/changes:
- Remove `font-size: 62.5%` from `html`.
- All rem values rebased so that `1rem = 16px`, snapping to Tailwind-aligned values where they match.
- Comment on line 18 ("the entire rem scale is built on 62.5%") deleted.

### 2. `components/Layout/Layout.tsx` (line 3)

```tsx
<div className="max-w-[49.375rem] mx-auto px-6 py-18 w-full">
```

- `max-w-[79rem]` (was 790px) → `max-w-[49.375rem]` (790px exact). Optionally fold the canonical content width into the `@theme` block as `--container-content: 49.375rem` and use `max-w-content`, but that's a follow-up.
- `px-10` (was 25px) → `px-6` (24px).
- `py-28` (was 70px) → `py-18` (72px).

### 3. `components/Header/Header.tsx` (line 8)

```tsx
<header className="bg-shadow shadow-[0_0.3125rem_0.625rem_0_rgba(0,0,0,0.15)] p-6">
```

- `shadow-[0_0.5rem_1rem_…]` → `shadow-[0_0.3125rem_0.625rem_…]` (5px 10px preserved).
- `p-10` → `p-6` (24px ≈ original 25px).

### 4. `components/Footer/Footer.tsx` (lines 5–6)

```tsx
<footer className="bg-shadow mt-auto p-6 sm:flex sm:items-center sm:justify-between">
  <p className="m-0 mr-5">
```

- `p-10` → `p-6`.
- `mr-8` → `mr-5` (20px exact).

### 5. `components/SocialLinks/SocialLinks.tsx`

```tsx
<div className="flex mt-4 sm:mt-0">
  …
  <Twitter className="w-8 h-8" />
  …
  <GitHub className="w-8 h-8" />
  …
  <Rss className="w-8 h-8" />
```

- `mt-6` → `mt-4` (16px ≈ original 15px).
- `mr-8` (×2) → `mr-5` (20px exact).
- `w-[3.2rem] h-[3.2rem]` (×3) → `w-8 h-8` (32px exact).

### 6. `components/Button/Button.tsx` (line 12)

```tsx
className="bg-highlight-2 !text-background rounded-sm block font-bold mt-14 mx-auto opacity-80 py-2.5 px-4 w-fit transition-opacity duration-500 hover:opacity-100"
```

- `rounded-[0.4rem]` → `rounded-sm` (4px).
- `mt-[5.5rem]` (was 55px) → `mt-14` (56px, +1px).
- `py-4` (was 10px) → `py-2.5` (10px exact).
- `px-6` (was 15px) → `px-4` (16px, +1px).

### 7. `components/Nav/Nav.tsx`

Replace every arbitrary rem and over-sized utility:

- Line 43: `text-[2.5rem] ml-[15px] mr-auto` → `text-2xl ml-[15px] mr-auto` (text-2xl = 24px ≈ 25px).
- Line 64: `ml-[15px] w-[18rem]` → `ml-[15px] w-44` (176px ≈ 180px) **OR** `w-[180px]` for exact.
- Line 74: `font-serif text-[2.5rem]` → `font-serif text-2xl`.
- Line 81: `… p-[0.5rem]` → `… p-2` (8px ≈ 5px) — accept slight growth, hit area improves; or `p-[0.3125rem]` for exact 5px.
- Line 83: `<Menu className="w-[2.4rem] h-[2.4rem]" />` → `<Menu className="w-6 h-6" />` (24px exact).
- Line 89: `… p-10 …` → `… p-6 …` (overlay container).
- Line 90: `mb-[3rem]` → `mb-7.5` (30px exact) **OR** `mb-8` (32px snap).
- Line 94: `… p-[0.5rem]` → `p-2` (or `p-[0.3125rem]` for exact 5px).
- Line 96: `<X className="w-[2.4rem] h-[2.4rem]" />` → `<X className="w-6 h-6" />`.
- Line 101: `gap-[3rem] mb-[4rem]` → `gap-7.5 mb-10` (30px / 40px exact).
- Line 115: `text-[3rem]` → `text-3xl` (30px exact).

Note: `ml-[15px]` and `mx-[15px]` are pixel-literal and unaffected; leave them.

### 8. `components/SearchBox/SearchBox.tsx`

- Line 68: `… rounded-[0.4rem] pl-4 pr-12 py-4 text-[1.4rem] …` → `… rounded-sm pl-2.5 pr-7.5 py-2.5 text-sm …` (text-sm = 14px exact, rest exact).
- Line 74: `right-[0.6rem]` → `right-1.5` (6px exact).
- Line 76: `<X className="w-[1.6rem] h-[1.6rem]" />` → `<X className="w-4 h-4" />`.
- Line 81: `mt-2 … rounded-[0.4rem] … w-136 … shadow-[0_0.5rem_1.5rem_0_rgba(0,0,0,0.4)]` → `mt-1 … rounded-sm … w-[34rem] … shadow-[0_0.3125rem_0.9375rem_0_rgba(0,0,0,0.4)]` (or keep `w-136` if it's intentional). Verify visually.
- Line 90: `px-[1.5rem] py-[1rem]` → `px-4 py-2.5` (16px / 10px).
- Line 93: `text-[1.4rem]` → `text-sm` (14px exact).

### 9. `components/TOC/TOC.tsx` (line 3)

```tsx
<div className="bg-shadow rounded-sm p-4 my-[1.125rem]">
```

- `rounded-[0.5rem]` → `rounded-sm` (4px) **OR** `rounded-[0.3125rem]` (5px exact).
- `p-6` (was 15px) → `p-4` (16px).
- `my-[1.8rem]` (was 18px) → `my-[1.125rem]` (18px exact) **OR** `my-4.5` (18px exact, half-step).

### 10. `components/Stitch/Stitch.tsx` (lines 11–12)

```tsx
width = '2.8125rem',
margin = '0 auto 2.8125rem',
```

- `4.5rem` (was 45px) → `2.8125rem` (45px exact). The Stitch is an SVG separator with intentional sizing, so preserve exact pixels rather than snapping.
- Verify no caller passes a custom `width`/`margin` prop assuming the old scale: `app/page.tsx:17` and `app/[slug]/page.tsx:53` both use the defaults — safe.

### 11. `app/page.tsx` (lines 13–25)

- Line 14: `mb-6` (was 15px) → `mb-4` (16px).
- Line 25: `mb-[1.8rem]` (was 18px) → `mb-[1.125rem]` (18px) or `mb-4.5`.
- Line 33: `mb-4` (was 10px) → `mb-2.5` (10px exact).

### 12. `app/[slug]/page.tsx` (lines 54–57)

```tsx
<div className="bg-shadow rounded-sm px-5 py-4">
  <MDXRemote source={content} components={COMPONENT_MAP} />
</div>
<hr className="mt-12 mb-6 opacity-50" />
```

- Line 54: `rounded-[0.4rem] px-[2rem] py-[1.5rem]` → `rounded-sm px-5 py-4` (px-5 = 20px exact, py-4 = 16px ≈ 15px).
- Line 57: `mt-[4.5rem] mb-[2.5rem]` → `mt-12 mb-6` (48px ≈ 45px, 24px ≈ 25px).

## Files NOT modified

- `resources/dwr-gatsby/**` — archived; per user decision.
- `lib/helpers/mdx-components.js` — only maps `<pre>` to `CodeSnippet`; unaffected.
- `components/CodeSnippet/CodeSnippet.tsx` — uses `rounded-lg` (canonical Tailwind, no rem hack dependency).
- Any module CSS files — none in active use depend on the hack.

## Optional follow-up (out of scope)

If we want the typography scale to be fully Tailwind v4 idiomatic, we could:
1. Define `--text-entry-title`, etc. via `@theme inline` in `globals.css`.
2. Replace the `h1`–`h6` rules with utility classes on each heading site (or keep base styles and just lean on Tailwind's `text-*` scale). This is a larger refactor; the current plan keeps the base-layer heading rules in CSS and just rebases their values.

## Verification

1. **Run the dev server**: `npm run dev`.
2. **Walk every page** and visually compare against the current branch in another tab/window:
   - `/` (homepage) — entry-title, h2 "Latest Notes:", note cards, Button.
   - `/notebook` — listing of notes.
   - `/about` — static content typography.
   - `/[any-slug]` — full blog post (entry-title, entry-meta, MDX body, headings inside content, code blocks, TOC, hr separator, back button).
   - 404 page.
3. **Headers/footer**: confirm Header padding, logo size, nav link sizing/positioning, Footer padding and SocialLinks icon size.
4. **Mobile (≤ sm breakpoint)**: open hamburger overlay, verify font sizes on overlay links, gap, close button, search box width/typography. Resize across breakpoints.
5. **Search**: type a query, verify dropdown width, item padding, excerpt font size (14px), clear-X button positioning.
6. **Code blocks** in a post: confirm `pre` padding/border-radius look right and that inline `code` chips still pad correctly.
7. **Lint**: `npm run lint` — must pass.
8. **Build**: `npm run build` — must succeed.
9. **Browser DevTools spot-check** on a couple of elements: confirm computed pixel values match the table above (e.g. `body` should be 20px, `h1` 40px, `.entry-title` 48px, Layout `py` 72px).

## Critical files (paths)

- `app/globals.css`
- `app/layout.tsx` (read-only; no changes needed)
- `app/page.tsx`
- `app/[slug]/page.tsx`
- `components/Layout/Layout.tsx`
- `components/Header/Header.tsx`
- `components/Footer/Footer.tsx`
- `components/Nav/Nav.tsx`
- `components/SearchBox/SearchBox.tsx`
- `components/Button/Button.tsx`
- `components/SocialLinks/SocialLinks.tsx`
- `components/Stitch/Stitch.tsx`
- `components/TOC/TOC.tsx`
