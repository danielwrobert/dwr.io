# Plan: Tags & Categories Feature

## Context

Add `category` (single, "In: X") and `tags` (multiple, "Tags: X, Y") to posts with clickable links to filtered listing pages. Display only on single post pages (not the home archive). Tags already exist in MDX frontmatter; `category` is new. Routes follow the same `generateStaticParams` static generation pattern used by `[slug]`.

---

## What Changes

### 1. Update `lib/helpers/file-helpers.js`

- Update `@typedef BlogPost` to include `category?: string`
- Add `slugify(text)` — lowercase, decode HTML entities (`&amp;` → `&`), replace non-alphanumeric with `-`, collapse multiple hyphens
- Add `getTagList()` → `{ tag: string, slug: string, count: number }[]` (unique tags across all posts, sorted by count desc)
- Add `getCategoryList()` → `{ category: string, slug: string, count: number }[]`
- Add `getPostsByTag(tagSlug: string)` → filtered `BlogPost[]`, sorted newest-first
- Add `getPostsByCategory(categorySlug: string)` → filtered `BlogPost[]`, sorted newest-first

### 2. Add `category` to all 31 MDX files in `/content/`

Each post needs a `category` frontmatter field. Suggested groupings based on existing tags:

| Category | Existing tags that map to it |
|---|---|
| `JavaScript` | javascript, esnext, oop, react, web storage, nodejs, cli |
| `CSS` | css, css grid, media queries |
| `Unix` | unix, apache, vim, raspberry pi, ubuntu mate |
| `Workflow` | workflow, build tools, resources, quick-tips, tips & tricks |
| `General` | coding standards, post revisions, til, github, debugging, ios |

Example updated frontmatter:
```mdx
---
title: 'Nullish Coalescing'
date: '2021-01-30'
slug: nullish-coalescing-operator
category: 'JavaScript'
tags: ['Core JS', 'Modern JS']
---
```

### 3. Update `app/[slug]/page.tsx`

After the `<hr>` and before the `<Button>`, add a tags/category block:

```tsx
{/* In: [Category] */}
{frontmatter.category && (
  <p className="entry-meta">
    In:{' '}
    <Link
      href={`/category/${slugify(frontmatter.category)}`}
      className="text-highlight-1"
    >
      {frontmatter.category}
    </Link>
  </p>
)}
{/* Tags: X, Y */}
{frontmatter.tags?.length > 0 && (
  <p className="entry-meta">
    Tags:{' '}
    {frontmatter.tags.map((tag, i) => (
      <span key={tag}>
        <Link href={`/tags/${slugify(tag)}`} className="text-highlight-1">
          {tag}
        </Link>
        {i < frontmatter.tags.length - 1 ? ', ' : ''}
      </span>
    ))}
  </p>
)}
```

Import `slugify` from `file-helpers`. The `entry-meta` class already exists in `globals.css`.

### 4. Create `app/tags/[tag]/page.tsx`

Mirrors the home page layout but filtered. Uses `getPostsByTag(tag)` and `getTagList()` for `generateStaticParams`.

```tsx
export async function generateStaticParams() {
  const tags = await getTagList();
  return tags.map(({ slug }) => ({ tag: slug }));
}
```

Page heading: `<h1>Tagged: {displayName}</h1>` using `text-highlight-3`.  
Post list: same `<article className="note">` pattern as `app/page.tsx`.  
Include a "← All notes" back link.

### 5. Create `app/category/[category]/page.tsx`

Same pattern as the tag page but using `getPostsByCategory` and `getCategoryList`.

Page heading: `<h1>In: {categoryName}</h1>`.

### 6. Update `app/sitemap.ts`

Add tag and category URL entries:

```ts
const tagEntries = tags.map(({ slug }) => ({
  url: `${SITE_URL}/tags/${slug}`,
  changeFrequency: 'monthly' as const,
  priority: 0.4,
}));

const categoryEntries = categories.map(({ slug }) => ({
  url: `${SITE_URL}/category/${slug}`,
  changeFrequency: 'monthly' as const,
  priority: 0.4,
}));
```

---

## Files to Create
- `app/tags/[tag]/page.tsx`
- `app/category/[category]/page.tsx`

## Files to Modify
- `lib/helpers/file-helpers.js` — new helpers + typedef update
- `app/[slug]/page.tsx` — add tag/category display block
- `app/sitemap.ts` — add tag/category entries
- All 31 MDX files in `content/` — add `category` field

---

## Verification

1. `npm run dev` — navigate to a single post, confirm "In: X" and "Tags: Y, Z" appear after the `<hr>`
2. Click a category link → `/category/javascript` → filtered listing renders
3. Click a tag link → `/tags/core-js` → filtered listing renders
4. `npm run build` — confirms `generateStaticParams` resolves all tag/category slugs without error
5. Check `/sitemap.xml` in browser — tag and category URLs present
