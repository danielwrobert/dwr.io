# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — run ESLint (flat config, `eslint.config.mjs`)
- `npm start` — serve production build
- `npm test` — run unit + component tests (Vitest)
- `npm run test:e2e` — run end-to-end tests (Playwright)

## Stack

- **Next.js 16** (App Router) with React 19 and TypeScript (strict mode)
- **Tailwind CSS v4** via `@tailwindcss/postcss` plugin
- **Fonts**: Ovo (serif, `--font-serif`) and Mulish (sans-serif, `--font-sans`) via `next/font/google`
- **MDX**: `next-mdx-remote` for rendering blog post content
- **Testing**: Vitest (unit/component) + Playwright (e2e)
- Path alias: `@/*` maps to project root

## Architecture

Personal blog/portfolio site using the App Router (`app/` directory). All pages are server components by default.

### Routes

- `/` — home page; lists all published blog posts
- `/[slug]` — individual blog post page (MDX rendered via `next-mdx-remote`)
- `/about` — about page
- `/category/[category]` — posts filtered by category
- `/tags/[tag]` — posts filtered by tag
- `/rss.xml` — RSS feed (route handler)
- `/sitemap.ts` — auto-generated sitemap

### Content

Blog posts live in `content/` organized by year (`content/2012/`, `content/2013/`, … `content/2025/`). Both `.md` and `.mdx` files are supported. Drafts go in `content/_drafts/` and are excluded from listing via a `draft: true` frontmatter field.

Frontmatter fields: `title`, `date` (ISO), `excerpt`, `category`, `tags` (array), `updated` (ISO, optional), `draft` (boolean, optional).

### Components

All components are in `components/`, each in its own subdirectory with an `index.tsx` entry point (e.g. `components/Header/index.tsx`).

Key components: `Button`, `CodeSnippet`, `ColorThemeToggle`, `Footer`, `Header`, `Heading`, `Layout`, `Logo`, `Nav`, `NoteCard`, `PostList`, `SearchBox`, `SocialLinks`, `Stitch`, `TOC`, `VideoEmbed`.

### `lib/` Utilities

- `lib/constants.js` — `BLOG_TITLE`, `COLOR_THEME_COOKIE_NAME`, `DARK_TOKENS`, `LIGHT_TOKENS` (CSS custom property maps)
- `lib/utils.js` — `range()` helper
- `lib/helpers/file-helpers.js` — `getBlogPostList`, `loadBlogPost`, `getTagList`, `getCategoryList`, `getPostsByTag`, `getPostsByCategory`, `slugify`
- `lib/helpers/mdx-components.js` — MDX component map (`pre` → `CodeSnippet`, headings → `Heading`, `VideoEmbed`)

### Theme System

Light/dark mode is toggled via `ColorThemeToggle`. The selected theme is stored in a cookie (`color-theme`). The root layout reads this cookie server-side and injects the appropriate token object (`LIGHT_TOKENS` / `DARK_TOKENS` from `lib/constants.js`) as inline `style` props on `<html>`, overriding the CSS `@theme` defaults. Color tokens: `--color-background`, `--color-text`, `--color-highlight-1` through `5`, `--color-shadow`, `--color-shadow-light`.

## Key Conventions

- Tailwind v4 uses CSS-first configuration — theme customization goes in `app/globals.css` (`@theme` block), not a `tailwind.config` file
- ESLint uses flat config with `eslint-config-next` core-web-vitals and TypeScript presets
- Unit tests in `tests/unit/`, component tests in `tests/components/`, e2e tests in `tests/e2e/`
- `_resources/` contains archived prior versions of the site (Gatsby, WP export) — do not modify
