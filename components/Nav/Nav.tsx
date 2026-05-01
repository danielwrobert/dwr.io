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

  return (
    <>
      {/* ── Desktop nav (hidden on mobile) ─────────────────────── */}
      <nav className="hidden sm:block">
        <ul className="flex flex-row items-center list-none m-0 p-0">
          <li className="font-serif text-[2.5rem] ml-[15px] mr-auto">
            <Link href="/" className={pathname === "/" ? "active" : ""}>
              DWR
            </Link>
          </li>
          <li className="mx-[15px]">
            <Link
              href="/notebook"
              className={pathname?.startsWith("/notebook") ? "active" : ""}
            >
              Notebook
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
          <li className="ml-[15px] w-[18rem]">
            <SearchBox posts={posts} />
          </li>
        </ul>
      </nav>

      {/* ── Mobile bar (logo + hamburger) ──────────────────────── */}
      <div className="flex sm:hidden items-center justify-between">
        <Link
          href="/"
          className={`font-serif text-[2.5rem]${pathname === "/" ? " active" : ""}`}
        >
          DWR
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation menu"
          className="text-shadow-light hover:text-highlight-2 transition-colors duration-500 p-[0.5rem]"
        >
          <Menu className="w-[2.4rem] h-[2.4rem]" />
        </button>
      </div>

      {/* ── Mobile overlay ─────────────────────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-shadow z-50 flex flex-col p-10 overflow-y-auto">
          <div className="flex justify-end mb-[3rem]">
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
              className="border border-shadow-light text-shadow-light hover:text-highlight-2 hover:border-highlight-2 transition-colors duration-500 p-[0.5rem]"
            >
              <X className="w-[2.4rem] h-[2.4rem]" />
            </button>
          </div>

          <nav>
            <ul className="list-none p-0 m-0 flex flex-col gap-[3rem] mb-[4rem]">
              {[
                { href: "/", label: "Home", active: pathname === "/" },
                {
                  href: "/notebook",
                  label: "Notebook",
                  active: !!pathname?.startsWith("/notebook"),
                },
                { href: "/about", label: "About", active: pathname === "/about" },
              ].map(({ href, label, active }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-[3rem] block transition-colors duration-500 ${
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
