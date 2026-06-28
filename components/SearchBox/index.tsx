"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { X } from "react-feather";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  tags?: string[];
};

export default function SearchBox({
  posts,
  onNavigate,
}: {
  posts: Post[];
  onNavigate?: () => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ["title", "excerpt", "tags"],
        threshold: 0.4,
        minMatchCharLength: 2,
      }),
    [posts]
  );

  const results =
    query.trim().length >= 2
      ? fuse.search(query.trim()).slice(0, 6).map((r) => r.item)
      : [];

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  function close() {
    setOpen(false);
    setQuery("");
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Escape") close();
          }}
          className="search-input bg-background text-text rounded-sm pl-2.5 pr-7.5 py-2.5 text-[1.6rem] sm:text-base outline-none border-0 w-full"
        />
        {query && (
          <button
            onClick={close}
            aria-label="Clear search"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 text-shadow-light hover:text-highlight-2 transition-colors duration-500"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {open && results.length > 0 && (
        <ul className="absolute top-full mt-1 right-0 bg-shadow rounded-sm list-none p-0 m-0 w-full sm:w-136 z-50 shadow-[0_0.3125rem_0.9375rem_0_rgba(0,0,0,0.4)] overflow-hidden">
          {results.map((post) => (
            <li
              key={post.slug}
              className="border-b border-background last:border-b-0"
            >
              <Link
                href={`/${post.slug}`}
                onClick={() => { close(); onNavigate?.(); }}
                className="block px-4 py-2.5 hover:bg-background"
              >
                <span className="block text-highlight-1">{post.title}</span>
                <span className="block text-shadow-light text-sm line-clamp-1">
                  {post.excerpt}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
