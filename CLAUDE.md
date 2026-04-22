# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — run ESLint (flat config, `eslint.config.mjs`)
- `npm start` — serve production build

## Stack

- **Next.js 16** (App Router) with React 19 and TypeScript (strict mode)
- **Tailwind CSS v4** via `@tailwindcss/postcss` plugin
- Path alias: `@/*` maps to project root

## Architecture

Single-page personal site using the App Router (`app/` directory). `layout.tsx` is the root layout with Geist font family. All pages are server components by default.

## Key Conventions

- Tailwind v4 uses CSS-first configuration — theme customization goes in `app/globals.css`, not a `tailwind.config` file
- ESLint uses flat config with `eslint-config-next` core-web-vitals and TypeScript presets
