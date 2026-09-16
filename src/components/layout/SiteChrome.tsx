"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Sheet } from "@/components/ui/Overlay";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-hairline-8 bg-cream/92 backdrop-blur-md",
        compact ? "px-5 py-2.5" : "px-5 py-2.5 md:px-gutter md:py-[22px]",
      )}
    >
      <div className="flex items-center justify-between">
        <Link href="/" className="flex flex-col gap-0.5">
          <span className="font-display text-[19px] tracking-wordmark md:text-wordmark">
            {site.wordmark}
          </span>
          {!compact ? (
            <span className="hidden font-ui text-[9px] uppercase tracking-locale text-muted-subtle md:block">
              {site.city}
            </span>
          ) : null}
        </Link>

        <nav className="hidden items-center gap-[38px] font-ui text-[15px] tracking-[0.04em] lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "pb-0.5 transition-colors duration-hover ease-out",
                  active
                    ? "border-b border-ink text-ink"
                    : "text-muted hover:border-b hover:border-hairline-30 hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/reservations"
            className="text-muted transition-colors duration-hover ease-out hover:border-b hover:border-hairline-30 hover:text-ink"
          >
            Find booking
          </Link>
          <Button href="/book" size="sm">
            Book a Table
          </Button>
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
          <Button href="/book" size="sm" className="px-[18px] py-2.5 text-[14px]">
            Book
          </Button>
          <button
            type="button"
            aria-label="Open menu"
            className="flex h-11 w-11 items-center justify-center"
            onClick={() => setOpen(true)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      <Sheet open={open} onClose={() => setOpen(false)} labelledBy="mobile-nav-title">
        <h2 id="mobile-nav-title" className="font-display text-[28px] font-light">
          Menu
        </h2>
        <nav className="mt-6 flex flex-col gap-2">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="min-h-11 py-3 font-ui text-[18px]"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/reservations" onClick={() => setOpen(false)} className="min-h-11 py-3 font-ui text-[18px]">
            Find a booking
          </Link>
          <Button href="/book" fullWidth className="mt-4">
            Book a Table
          </Button>
        </nav>
      </Sheet>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink px-5 py-11 text-cream-72 md:px-gutter">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="font-display text-[20px] tracking-wordmark text-cream">
          {site.wordmark}
        </Link>
        <div className="flex flex-wrap gap-x-[30px] gap-y-2 font-ui text-[15px] font-light">
          <Link href="/menu" className="hover:text-cream">Menu</Link>
          <Link href="/about" className="hover:text-cream">About</Link>
          <Link href="/book" className="hover:text-cream">Reservations</Link>
          <Link href="/reservations" className="hover:text-cream">Find booking</Link>
          <Link href="/vouchers" className="hover:text-cream">Gift vouchers</Link>
          <a href={site.instagramUrl} className="hover:text-cream">
            Instagram
          </a>
        </div>
        <p className="font-ui text-small">
          © 2026 · <Link href="/policy" className="hover:text-cream">Reservation policy</Link>
        </p>
      </div>
    </footer>
  );
}
