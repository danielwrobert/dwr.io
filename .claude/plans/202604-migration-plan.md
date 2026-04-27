# Migrate the Gatsby dev blog into the Next.js project

## Context

`dwr.io` was previously a Gatsby site (preserved at `resources/dwr-gatsby/`) — a personal "Digital Notebook" with 27 MDX posts (2012–2021), a Dracula-inspired dark theme, and an editorial layout (Ovo serif headings + Muli body, centered 74rem column, custom social/RSS handling). The new home is this Next.js 16 project (App Router + React 19 + TS strict + Tailwind v4), currently a bare `create-next-app` scaffold.

Goal: bring the entire blog over with **a faithful 1:1 visual port** — same colors, same fonts, same composition — but built on the new stack. Replace Emotion with Tailwind v4 utility classes and theme tokens. Replace GraphQL/`gatsby-plugin-mdx` with `next-mdx-remote/rsc` driven by the existing helpers in `lib/helpers/`. Replace `prismjs` highlighting with `bright` set to the Dracula theme. Replace Jest with Vitest + React Testing Library, plus Playwright for E2E.

**Important:** `AGENTS.md` in this repo warns that Next.js 16 has breaking changes from prior versions — before writing code in any phase, the implementer must consult the relevant guide in `node_modules/next/dist/docs/` (especially for App Router conventions, `next/font`, metadata/sitemap APIs, and route handlers).

## Execution workflow — IMPORTANT

**Each numbered step in "Implementation plan" below is its own self-contained PR.** The implementer must:

1. **Stop after every step** and wait for explicit user approval before starting the next one. Do not chain steps.
2. **Create a new git branch for each step**, named `migration/step-{N}-{short-name}` (e.g. `migration/step-1-theme-foundation`, `migration/step-2-content`, …). Branch off `main` at the start of each step.
3. After completing a step's work, run the relevant verification checks (see the "Verification" section), then summarize what changed and surface a short test plan for the user to validate locally.
4. **Wait for the user to test, merge to `main`, and explicitly say "proceed" / "next step"** before checking out a fresh branch and starting step N+1.
5. Never assume a prior step has been merged — at the start of each step, confirm `main` is up to date and branch from it.

If a step turns out to be larger than expected, propose splitting it before doing the work — do not silently expand scope.

## Decisions locked (from clarifying Q&A)

1. **Content layout**: flatten to `/content/{slug}.mdx`. Existing helper at `lib/helpers/file-helpers.js` is reused unchanged in shape; only the sort field is adjusted.
2. **Routing**: posts live at `/{slug}` (e.g. `/web-storage-api`). App Router resolves static segments before the catch-all `[slug]`, so `/about` and `/notebook` win automatically — no manual guard needed, but the implementer must avoid creating a post slug that matches a static page.
3. **Aesthetic**: faithful 1:1 port. Same Dracula palette (`#383a59` bg, `#f2f2f2` text, the five highlight colors), same `Ovo` serif headings + `Muli` body, same centered editorial layout, same shadow-dark `.note` cards.
4. **Testing**: configure Vitest + RTL + Playwright with one smoke test each (helper unit test, component RTL test, E2E nav test). Old Jest tests are not ported.

## Reuse — what already exists

- **`lib/helpers/file-helpers.js`** — `getBlogPostList()` and `loadBlogPost(slug)` (with `React.cache` dedup). Reads from `/content`, parses with `gray-matter`. Sort field needs to be changed from `publishedOn` to `date` to match the Gatsby frontmatter we're preserving.
- **`lib/helpers/mdx-components.js`** — already exports a `COMPONENT_MAP` shape. Currently references three components that don't exist; will be rewritten to map only `pre → CodeSnippet` (and any custom JSX components added later).
- **Existing dependencies** in `package.json` already cover this work: `next-mdx-remote`, `gray-matter`, `bright`, `react-feather`, `date-fns`, `clsx`. No new runtime deps required.

## Reference patterns

- **`resources/project-blog/src/helpers/file-helpers.js`** — same shape as our helper; the canonical pattern for the loader.
- **`resources/project-blog/src/components/CodeSnippet/CodeSnippet.js`** — the exact `bright` wrapper pattern: `<Code {...props} theme={dracula} />`. The `theme.js` next to it is a full VS Code Dracula JSON theme that can be copied wholesale (or fetched from the official `dracula/visual-studio-code` repo).
- **`resources/project-blog/src/app/[postSlug]/page.js`** — the canonical RSC route handler using `MDXRemote` from `next-mdx-remote/rsc`.
- **Gatsby originals** to mirror visually: `resources/dwr-gatsby/src/styles/global.css` (tokens), `src/components/{layout,header,nav,footer,button,stitch,toc,social-links,seo}.js`, `src/templates/note.js`, `src/pages/{index,notebook,about}.js`.

## Implementation plan

### 1. Theme + global foundation
*(Branch: `migration/step-1-theme-foundation` — STOP after this step and wait for approval.)*

**`app/globals.css`** — replace the boilerplate with the Dracula palette as Tailwind v4 `@theme inline` tokens. Mirror `resources/dwr-gatsby/src/styles/global.css` exactly:

```css
@import "tailwindcss";

@theme inline {
  --color-background: #383a59;
  --color-text: #f2f2f2;
  --color-highlight-1: #bd93f9; /* purple */
  --color-highlight-2: #ff79c6; /* pink */
  --color-highlight-3: #50fa7b; /* green */
  --color-highlight-4: #ffb86c; /* orange */
  --color-highlight-5: #8be9fd; /* cyan */
  --color-shadow: #282a36;
  --color-shadow-light: #bcc2cd;
  --font-serif: var(--font-ovo);
  --font-sans: var(--font-muli);
}

html { font-size: 62.5%; line-height: 1.6; }
body { background: var(--color-background); color: var(--color-text); font-size: 2rem; }
/* plus the link color rules and .entry-title / .note utilities from the original */
```

These CSS variables become Tailwind utilities (`bg-background`, `text-highlight-3`, `font-serif`, etc.) automatically under v4's CSS-first config.

**`app/layout.tsx`** — swap Geist for `Ovo` + `Mulish` (Google's current name for Muli) via `next/font/google`, expose CSS variables, and set proper `metadata` (title "Daniel W. Robert — Digital Notebook", description from the old `useSiteMetadata` hook). Keep the existing `min-h-full flex flex-col` body wiring for the sticky footer.

### 2. Content migration
*(Branch: `migration/step-2-content` — STOP after this step and wait for approval.)*

Move every post under `resources/dwr-gatsby/content/notebook/{year}/{slug}/` to `content/{slug}.mdx`:

- Rename `index.md` → `{slug}.mdx` (slug taken from each post's frontmatter `slug:` field, which already matches the directory name).
- Frontmatter is preserved as-is (`title`, `date`, `slug`, `excerpt`, `tags`, optional `updated`). No transformation needed.
- Co-located images (any `.png`/`.jpg`/`.gif` in the post directory) move to `public/images/{slug}/...`; rewrite `![alt](./img.png)` references to `![alt](/images/{slug}/img.png)`.
- After migration, run `ls content/*.mdx | wc -l` — expect 27 files.

Adjust `lib/helpers/file-helpers.js`:
- Change the sort comparator from `publishedOn` to `date`.
- No other changes; `slug` is still derived from filename.

### 3. Bright + MDX rendering
*(Branch: `migration/step-3-mdx-bright` — STOP after this step and wait for approval.)*

**`components/CodeSnippet/CodeSnippet.tsx`** — the `bright` wrapper. Pattern is identical to the project-blog reference:

```tsx
import { Code } from 'bright';
import draculaTheme from './dracula-theme.json';

export default function CodeSnippet(props) {
  return <Code {...props} theme={draculaTheme} className="rounded-lg overflow-x-auto text-base" />;
}
```

**`components/CodeSnippet/dracula-theme.json`** — copy from `resources/project-blog/src/components/CodeSnippet/theme.js` (it's already the Dracula VS Code theme).

**`lib/helpers/mdx-components.js`** — rewrite to:

```js
import CodeSnippet from '@/components/CodeSnippet/CodeSnippet';

const COMPONENT_MAP = { pre: CodeSnippet };
export default COMPONENT_MAP;
```

(The two demo-component imports are leftovers from the project-blog reference and must be removed.)

### 4. Component port (Emotion → Tailwind, 1:1 visuals)
*(Branch: `migration/step-4-components` — STOP after this step and wait for approval.)*

Create the following under `components/` — each is a faithful port of the Gatsby original, with Emotion styled-component CSS rewritten as Tailwind classes against the new tokens. Source paths in parentheses are the Gatsby originals to mirror.

- `components/Layout/Layout.tsx` — wrapper with `max-w-[79rem] mx-auto px-10 py-28 w-full`. (`src/components/layout.js`)
- `components/Header/Header.tsx` — dark `bg-shadow` band with shadow, contains `<Nav />`. (`src/components/header.js`)
- `components/Nav/Nav.tsx` — flex row, "DWR" logo (`font-serif text-[2.5rem]`) + Notebook + About links. Use `next/link`. (`src/components/nav.js`)
- `components/Footer/Footer.tsx` — copyright + `<SocialLinks />`, mirrors header band. (`src/components/footer.js`)
- `components/SocialLinks/SocialLinks.tsx` — Twitter / GitHub / RSS icons via `react-feather`. (`src/components/social-links.js`)
- `components/Button/Button.tsx` — pink-bg CTA Link. (`src/components/button.js`)
- `components/Stitch/Stitch.tsx` — decorative SVG separator with configurable color/width/margin props. (`src/components/stitch.js`)
- `components/TOC/TOC.tsx` — dark box with orange heading for series posts. (`src/components/toc.js`)

Layout chrome (Header / Layout / Footer) should be applied in `app/layout.tsx` so it wraps every route.

### 5. Pages (App Router)
*(Branch: `migration/step-5-pages` — STOP after this step and wait for approval.)*

All pages are server components (default).

- **`app/page.tsx`** — home. Mirror `src/pages/index.js`: green `entry-title` heading "Daniel W. Robert", purple italic tagline, `<Stitch />`, intro paragraphs, "Latest Notes:" subheading, then map the latest 3 posts from `getBlogPostList()` into `.note` cards (title, date via `date-fns`, excerpt, "Read note →"). End with "View all notes" `<Button>` to `/notebook`.
- **`app/notebook/page.tsx`** — full listing of every post (`.note` cards), sorted by date desc.
- **`app/about/page.tsx`** — port `src/pages/about.js` content verbatim into JSX/MDX.
- **`app/[slug]/page.tsx`** — individual post. Use `loadBlogPost(slug)`, render with `<MDXRemote source={content} components={COMPONENT_MAP} />`. Title via `.entry-title`, date line ("Updated on …" if `updated` exists, else "Published on …"), `<Stitch />`, body, `<hr>`, "← Back to all notes" `<Button>`. Implement `generateStaticParams()` listing all slugs and `generateMetadata({ params })` reading the post frontmatter for `<title>` and description.
- **`app/not-found.tsx`** — minimal 404.

### 6. SEO + feeds
*(Branch: `migration/step-6-seo-feeds` — STOP after this step and wait for approval.)*

- Replace the Gatsby `seo.js` (React Helmet) with Next's `metadata` / `generateMetadata` exports per route. Mirror the OG/Twitter fields from the original.
- **RSS** — port `gatsby-plugin-feed` output by adding `app/rss.xml/route.ts` that hand-builds an RSS 2.0 XML string from `getBlogPostList()`. This preserves the existing `/rss.xml` URL.
- **Sitemap** — use Next's built-in `app/sitemap.ts` convention; iterate `getBlogPostList()` plus the static routes.
- **Analytics** — out of scope for this PR; add a follow-up if needed.

### 7. Testing scaffold (configs + one smoke test each)
*(Branch: `migration/step-7-testing` — STOP after this step and wait for approval.)*

Install dev deps: `vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom @playwright/test`.

- **`vitest.config.ts`** — jsdom env, alias `@/* → ./*`, setup file that imports `@testing-library/jest-dom`.
- **`tests/unit/file-helpers.test.ts`** — call `getBlogPostList()`, assert at least one result with the expected frontmatter shape (sanity check after content migration).
- **`tests/components/Nav.test.tsx`** — RTL render `<Nav />`, assert "DWR", "Notebook", "About" links are present with correct `href`.
- **`playwright.config.ts`** — `webServer: { command: 'npm run dev', port: 3000 }`, single chromium project.
- **`tests/e2e/nav.spec.ts`** — visit `/`, click Notebook link, assert URL is `/notebook` and a known post title is visible; click into a post; back to home.
- **`package.json` scripts** — add `"test": "vitest"`, `"test:e2e": "playwright test"`.

## Files to create / modify (checklist)

**Modify**
- `app/globals.css` — Dracula tokens
- `app/layout.tsx` — fonts, metadata, Header/Footer chrome
- `app/page.tsx` — home page rewrite
- `lib/helpers/file-helpers.js` — sort by `date`
- `lib/helpers/mdx-components.js` — strip stale refs, map `pre → CodeSnippet`
- `package.json` — test deps + scripts

**Create**
- `app/notebook/page.tsx`, `app/about/page.tsx`, `app/[slug]/page.tsx`, `app/not-found.tsx`
- `app/sitemap.ts`, `app/rss.xml/route.ts`
- `components/{Layout,Header,Nav,Footer,SocialLinks,Button,Stitch,TOC}/...`
- `components/CodeSnippet/{CodeSnippet.tsx,dracula-theme.json}`
- `content/{slug}.mdx` × 27 (migrated)
- `public/images/{slug}/...` (any post-co-located assets)
- `vitest.config.ts`, `tests/setup.ts`, `tests/unit/file-helpers.test.ts`, `tests/components/Nav.test.tsx`
- `playwright.config.ts`, `tests/e2e/nav.spec.ts`

## Verification

1. **Content sanity** — `ls content/*.mdx | wc -l` returns 27.
2. **Dev server** — `npm run dev`; visit `/`, `/notebook`, `/about`, `/web-storage-api` (and one other post). Confirm Dracula palette, Ovo headings, Muli body, code blocks rendered with Dracula syntax colors.
3. **Lint + types** — `npm run lint`. Type-check passes (no errors from `app/` or `components/`).
4. **Build** — `npm run build`. All 27 post routes statically generate via `generateStaticParams`. `/rss.xml` and `/sitemap.xml` produced.
5. **Unit + component tests** — `npm run test` (Vitest) — both smoke tests green.
6. **E2E** — `npm run test:e2e` (Playwright) — nav test green.
7. **Visual diff (manual)** — open the old Gatsby site (`cd resources/dwr-gatsby && npm run develop`) and the new site side-by-side; confirm 1:1 fidelity on home, notebook listing, and a representative post.
