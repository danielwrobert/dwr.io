# Plan: Fix Mobile Navigation Issues

## Context

After merging PR #11 (post archive / home page rework), two mobile UX bugs were identified on the deployed site:

1. Tapping the search input zooms the viewport, causing overflow — a classic iOS Safari behavior triggered when an `<input>` has a font-size below 16px.
2. Clicking a search result navigates correctly but leaves the mobile overlay open — because the overlay's `mobileOpen` state lives in `Nav.tsx` and is never cleared when Next.js does client-side navigation via a `<Link>` in `SearchBox`.

---

## Fix 1 — Search input zoom (iOS auto-zoom prevention)

**File:** `components/SearchBox/SearchBox.tsx` — line 68

**Root cause:** The input uses `text-sm` (14px). iOS Safari auto-zooms any focused input with font-size < 16px.

**Change:** Replace `text-sm` with `text-base sm:text-sm` so mobile gets 16px (no zoom) and desktop keeps 14px.

```diff
- className="search-input bg-background text-text rounded-sm pl-2.5 pr-7.5 py-2.5 text-sm outline-none border-0 w-full"
+ className="search-input bg-background text-text rounded-sm pl-2.5 pr-7.5 py-2.5 text-base sm:text-sm outline-none border-0 w-full"
```

---

## Fix 2 — Mobile overlay not closing after search result navigation

**File:** `components/Nav/Nav.tsx` — after the existing `useEffect` blocks (around line 36)

**Root cause:** `mobileOpen` state persists across client-side route changes. The `SearchBox`'s `close()` only closes the search dropdown — it has no access to the parent's `mobileOpen` setter. The nav link `onClick` handlers (line 101) only fire for the hardcoded Home/About links, not for search results.

**Change:** Add a `useEffect` that watches `pathname` and closes the overlay whenever the route changes. `pathname` is already imported and in scope.

```typescript
// Close mobile overlay on any client-side navigation
useEffect(() => {
  setMobileOpen(false);
}, [pathname]);
```

Insert this after the existing Escape key `useEffect` (after line 36).

---

## Files to modify

| File | Change |
|------|--------|
| `components/SearchBox/SearchBox.tsx` | `text-sm` → `text-base sm:text-sm` on the `<input>` className (line 68) |
| `components/Nav/Nav.tsx` | Add `useEffect(() => { setMobileOpen(false); }, [pathname]);` after line 36 |

---

## Verification

1. `npm run dev` — start dev server
2. Open Chrome DevTools → toggle mobile device emulation (e.g. iPhone 15)
3. Open the mobile nav overlay (hamburger)
4. Tap the search input — confirm **no viewport zoom**
5. Type a query, click a result — confirm **overlay closes** and correct post page loads
6. Verify Escape key still closes both the search dropdown and the overlay
7. Verify Home/About nav links still close the overlay
8. `npm run build` — confirm no TypeScript or lint errors
