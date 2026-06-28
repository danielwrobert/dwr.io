# Light/Dark Mode Toggle

## Context

The site is currently dark-only. Colors are defined once in `app/globals.css` inside a
Tailwind v4 `@theme inline { … }` block and consumed almost entirely through generated
utility classes (`bg-background`, `text-text`, `bg-shadow`, `text-highlight-1..5`,
`text-shadow-light`, `bg-highlight-2`). A token system already exists in
`lib/constants.js` (`LIGHT_TOKENS` / `DARK_TOKENS`, `COLOR_THEME_COOKIE_NAME`) — copied
verbatim from the reference project at `_resources/project-blog/` — but it holds an
unrelated palette and is **not wired up to anything** (only `BLOG_TITLE` is imported, by
`components/Logo/Logo.tsx`).

Goal: implement a cookie-backed light/dark toggle using the same approach as
`_resources/project-blog/` (SSR reads a cookie → applies CSS-variable tokens as inline
styles on `<html>` → a client toggle swaps the cookie and rewrites the variables at
runtime). Keep the existing palette for **dark mode**; add the user's new palette for
**light mode**. Default theme when no cookie is set: **dark** (preserves current look).

### Key constraint — Tailwind v4 `@theme inline`
`@theme inline` bakes the literal hex value into each utility, so overriding the
`--color-*` variables at runtime would have no effect. Dropping `inline` makes the
utilities emit `var(--color-*)` instead, so overriding those variables on `<html>`
(via SSR inline style + runtime `setProperty`) re-colors the whole UI. This is the
single pivotal change that makes the reference pattern work here.

---

## Changes

### 1. `app/globals.css`
- Change `@theme inline {` → `@theme {` so utilities reference `var(--color-*)`.
  Leave the values as-is — they remain the **dark defaults** on `:root`.
- Replace the hardcoded hex in the `@layer base` block with the matching variables so
  those rules also respond to the theme:
  - `:not(pre) > code` background `#282a36` → `var(--color-shadow)`
  - link color `#ff79c6` → `var(--color-highlight-2)`
  - `header a` `#bcc2cd` → `var(--color-shadow-light)`
  - `header a:hover` `#ff79c6` → `var(--color-highlight-2)`
  - `a:hover` `#50fa7b` → `var(--color-highlight-3)`
  - `.search-input::placeholder` `#bcc2cd` → `var(--color-shadow-light)`
- Leave `components/CodeSnippet/dracula-theme.json` untouched (syntax highlighting, not UI chrome).

### 2. `lib/constants.js`
Replace the entire `LIGHT_*`/`DARK_*` token system with this site's palette, keyed by the
**same `--color-*` names** the Tailwind utilities use. Preserve `BLOG_TITLE` and
`COLOR_THEME_COOKIE_NAME`.

```js
export const BLOG_TITLE = 'DWR.IO';
export const COLOR_THEME_COOKIE_NAME = 'color-theme';

export const DARK_TOKENS = {
  '--color-background': '#383a59',
  '--color-text': '#f2f2f2',
  '--color-highlight-1': '#bd93f9',
  '--color-highlight-2': '#ff79c6',
  '--color-highlight-3': '#50fa7b',
  '--color-highlight-4': '#ffb86c',
  '--color-highlight-5': '#8be9fd',
  '--color-shadow': '#282a36',
  '--color-shadow-light': '#bcc2cd',
};

export const LIGHT_TOKENS = {
  '--color-background': '#FAF9FA',
  '--color-text': '#2C2C2C',
  '--color-highlight-1': '#9A63B4',
  '--color-highlight-2': '#a650a6',
  '--color-highlight-3': '#2E8B57', // green  — h1 accent + link hover
  '--color-highlight-4': '#B45309', // amber  — draft/series labels
  '--color-highlight-5': '#0E7490', // teal   — card headings
  '--color-shadow': '#2D3142',
  '--color-shadow-light': '#3D435A',
};
```

(Drop the old `LIGHT_COLORS`/`DARK_COLORS`/`*_SHADOWS` exports — nothing imports them.)

### 3. `app/layout.tsx`
Mirror the reference `layout.js`. Make `RootLayout` `async`, read the cookie, and apply
the tokens + a `data-color-theme` attribute on `<html>` for no-flash SSR.

```tsx
import { cookies } from 'next/headers';
import { COLOR_THEME_COOKIE_NAME, LIGHT_TOKENS, DARK_TOKENS } from '@/lib/constants';

export default async function RootLayout({ children }: …) {
  const saved = (await cookies()).get(COLOR_THEME_COOKIE_NAME);
  const theme = saved?.value === 'light' ? 'light' : 'dark'; // default dark
  const tokens = theme === 'light' ? LIGHT_TOKENS : DARK_TOKENS;

  return (
    <html
      lang="en"
      data-color-theme={theme}
      className={`${ovo.variable} ${mulish.variable} h-full antialiased`}
      style={tokens as React.CSSProperties}
    >
      <body className="…">
        <Header initialTheme={theme} />
        …
```

### 4. `components/Header/Header.tsx`
- Accept `initialTheme: 'light' | 'dark'` and render the new toggle next to `Nav` (it
  stays in the always-visible header bar, so it works on both mobile and desktop):
  `<ColorThemeToggle initialTheme={initialTheme} />`.
- Header remains a server component; the toggle is the only client piece.

### 5. `components/ColorThemeToggle/ColorThemeToggle.tsx` (new client component)
Follows the reference's `handleToggleTheme` exactly: tracks theme in state, persists the
cookie, sets `data-color-theme`, and rewrites every token via `setProperty`. Use
`react-feather` `Sun`/`Moon` (already used elsewhere in this repo) and `js-cookie`
(already a dependency). Match existing button styling
(`text-shadow-light hover:text-highlight-2 transition-colors duration-500 p-1.5`) and
add an `aria-label`.

```tsx
'use client';
import { useState } from 'react';
import { Sun, Moon } from 'react-feather';
import Cookie from 'js-cookie';
import { COLOR_THEME_COOKIE_NAME, LIGHT_TOKENS, DARK_TOKENS } from '@/lib/constants';

export default function ColorThemeToggle({ initialTheme }: { initialTheme: 'light' | 'dark' }) {
  const [theme, setTheme] = useState(initialTheme);
  function toggle() {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    Cookie.set(COLOR_THEME_COOKIE_NAME, next, { expires: 1000 });
    const root = document.documentElement;
    root.setAttribute('data-color-theme', next);
    Object.entries(next === 'light' ? LIGHT_TOKENS : DARK_TOKENS)
      .forEach(([k, v]) => root.style.setProperty(k, v));
  }
  return (
    <button onClick={toggle} aria-label="Toggle light / dark mode"
      className="text-shadow-light hover:text-highlight-2 transition-colors duration-500 p-1.5">
      {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
    </button>
  );
}
```

### 6. Types for `js-cookie`
`js-cookie` is installed but `@types/js-cookie` is not. Add it so the `.tsx` import
type-checks under strict mode: `npm i -D @types/js-cookie`. (Alternative if avoiding a new
dev dep: set the cookie with `document.cookie` instead of `js-cookie` and skip this step.)

---

## Notes / known trade-offs
- The light palette intentionally keeps `--color-shadow`/`--color-shadow-light` dark, so
  the header, footer, cards, TOC, NoteCard and mobile overlay (all `bg-shadow`) render as
  dark "chrome" panels on a light page. This is by design per the supplied palette.
- `Stitch.tsx` already defaults its color to `var(--color-shadow-light)`, so it will
  follow the theme automatically — no change needed.

## Verification
1. `npm run dev` — load the site (no cookie): renders **dark** as today.
2. Click the toggle: page recolors to light instantly (background, text, links, headings,
   panels, search box). Toggle back: returns to dark.
3. Reload after toggling to light: cookie persists, page renders light from SSR with **no
   flash** of dark.
4. Check representative pages: `/` (highlight-1 subtitle, highlight-3 h1), `/about`,
   a post `/[slug]` (TOC, NoteCard, draft/series labels = highlight-4), mobile nav overlay.
5. `npm run lint` and `npm run build` pass.
6. If present, sanity-check `tests/` (unit/e2e) still pass; update any color/snapshot
   assertions that assumed the old hardcoded hex.
