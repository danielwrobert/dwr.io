# dwr.io

Personal blog and portfolio site for Daniel W. Robert, built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4.

## Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript (strict)
- **Styles**: Tailwind CSS v4 via `@tailwindcss/postcss`
- **Fonts**: Ovo (serif) + Mulish (sans-serif) via `next/font/google`
- **Content**: Markdown/MDX files rendered with `next-mdx-remote`, frontmatter via `gray-matter`
- **Search**: `fuse.js` (client-side fuzzy search)
- **Testing**: Vitest (unit/component) + Playwright (e2e)

## Project Structure

```
app/                        # Next.js App Router pages
  [slug]/page.tsx           # Blog post page
  about/page.tsx            # About page
  category/[category]/      # Posts filtered by category
  tags/[tag]/               # Posts filtered by tag
  rss.xml/route.ts          # RSS feed
  sitemap.ts                # Auto-generated sitemap
  globals.css               # Tailwind @theme config + global base styles
  layout.tsx                # Root layout (fonts, theme, header/footer)
  page.tsx                  # Home page (post list)

components/                 # UI components (each in its own dir/index.tsx)
  Button/
  CodeSnippet/              # Syntax-highlighted code blocks (Bright)
  ColorThemeToggle/         # Light/dark mode toggle
  Footer/
  Header/
  Heading/
  Layout/
  Logo/
  Nav/
  NoteCard/
  PostList/
  SearchBox/
  SocialLinks/
  Stitch/
  TOC/
  VideoEmbed/

content/                    # Blog posts organized by year
  2012/ … 2025/             # .md and .mdx files
  _drafts/                  # Draft posts (excluded from listing)

lib/
  constants.js              # Theme tokens, cookie name, blog title
  utils.js                  # range() utility
  helpers/
    file-helpers.js         # Post reading/parsing, tag/category helpers
    mdx-components.js       # MDX component map

tests/
  unit/                     # Vitest unit tests
  components/               # Vitest component tests
  e2e/                      # Playwright end-to-end tests
```

## Commands

```bash
npm run dev       # Start dev server (http://localhost:3000)
npm run build     # Production build
npm start         # Serve production build
npm run lint      # Run ESLint
npm test          # Run unit + component tests (Vitest)
npm run test:e2e  # Run e2e tests (Playwright)
```

## Content

Blog posts live in `content/` in year-based subdirectories. Both `.md` and `.mdx` are supported.

Frontmatter fields:

| Field      | Type     | Required | Description                          |
|------------|----------|----------|--------------------------------------|
| `title`    | string   | yes      | Post title                           |
| `date`     | ISO date | yes      | Publication date                     |
| `excerpt`  | string   | yes      | Short description (used in meta)     |
| `category` | string   | no       | Single category                      |
| `tags`     | string[] | no       | Array of tags                        |
| `updated`  | ISO date | no       | Last updated date (shown in post)    |
| `draft`    | boolean  | no       | Set to `true` to exclude from listing|

## Theme System

Light/dark mode is toggled via `ColorThemeToggle`. The choice is persisted in a `color-theme` cookie. The root layout reads this cookie server-side and injects CSS custom properties directly onto `<html>` as inline styles, overriding the `@theme` defaults in `globals.css`.

Color tokens: `--color-background`, `--color-text`, `--color-highlight-1` through `-5`, `--color-shadow`, `--color-shadow-light`. Token values for both themes are defined in `lib/constants.js`.

## Key Conventions

- Tailwind v4: theme customization lives in the `@theme` block in `app/globals.css` — there is no `tailwind.config` file
- All components follow the `components/ComponentName/index.tsx` pattern
- Path alias `@/*` resolves to the project root
- `_resources/` contains archived prior versions of the site — do not modify
