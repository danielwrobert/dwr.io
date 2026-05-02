"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "react-feather";
import SearchBox from "@/components/SearchBox/SearchBox";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  tags?: string[];
};

export default function Nav({ posts = [] }: { posts?: Post[] }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll while overlay is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Dismiss on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // Close overlay on any client-side navigation
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* ── Desktop nav (hidden on mobile) ─────────────────────── */}
      <nav className="hidden sm:block">
        <ul className="flex flex-row items-center list-none m-0 p-0">
          <li className="font-serif text-2xl ml-[15px] mr-auto">
            <Link href="/" className={pathname === "/" ? "active" : ""}>
              DWR.IO
            </Link>
          </li>
          <li className="mx-[15px]">
            <Link
              href="/about"
              className={pathname === "/about" ? "active" : ""}
            >
              About
            </Link>
          </li>
          <li className="ml-[15px] w-[180px]">
            <SearchBox posts={posts} />
          </li>
        </ul>
      </nav>

      {/* ── Mobile bar (logo + hamburger) ──────────────────────── */}
      <div className="flex sm:hidden items-center justify-between">
        <Link
          href="/"
          className={`font-serif text-2xl${pathname === "/" ? " active" : ""}`}
        >
          DWR
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation menu"
          className="text-shadow-light hover:text-highlight-2 transition-colors duration-500 p-1.5"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* ── Mobile overlay ─────────────────────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-shadow z-50 flex flex-col p-6 overflow-y-auto">
          <div className="flex justify-end mb-7.5">
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
              className="border border-shadow-light text-shadow-light hover:text-highlight-2 hover:border-highlight-2 transition-colors duration-500 p-1.5"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav>
            <ul className="list-none p-0 m-0 flex flex-col gap-7.5 mb-10">
              {[
                { href: "/", label: "Home", active: pathname === "/" },
                { href: "/about", label: "About", active: pathname === "/about" },
              ].map(({ href, label, active }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-3xl block transition-colors duration-500 ${
                      active
                        ? "text-highlight-2"
                        : "text-shadow-light hover:text-highlight-2"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <SearchBox posts={posts} />
        </div>
      )}
    </>
  );
}
