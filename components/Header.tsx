"use client";

import { ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CTA, EXTRA, NAV } from "@/lib/nav";
import { Logo } from "./BrandMark";
import { ctaClass } from "./CtaButton";
import { LogoBadge } from "./LogoBadge";
import { SaFlag } from "./SaFlag";
import { ShortlistLink } from "./ShortlistButton";

export interface HeaderCategory {
  slug: string;
  name: string;
  description: string;
  count: number;
}

export interface HeaderProduct {
  slug: string;
  name: string;
  /** The price in rand with its basis, already formatted. */
  price: string;
  local: boolean;
}

export interface HeaderPair {
  slug: string;
  a: { slug: string; name: string };
  b: { slug: string; name: string };
}

export interface HeaderGuide {
  slug: string;
  title: string;
  topic: string;
}

export interface HeaderPost {
  slug: string;
  title: string;
  category: string;
}

interface Props {
  /** Three computed lines for the publication stamp. Never hardcoded. */
  stamp: string[];
  /** The six categories, with live counts, for the Software menu. */
  categories: HeaderCategory[];
  total: number;
  /** Six places to start, shown by name with their price in rand. */
  popular: HeaderProduct[];
  /** Six head to head pairs for the Compare menu. */
  pairs: HeaderPair[];
  /** The latest guides for the Resources menu. */
  guides: HeaderGuide[];
  /** The latest blog posts for the Resources menu. */
  posts: HeaderPost[];
}

type MenuKey = "software" | "compare" | "resources";

const NEEDS = [
  { label: "Free software", href: "/register?price=free" },
  { label: "Sold in South Africa", href: "/register?local=1", flag: true },
  { label: "Handles VAT201", href: "/register?sars=VAT201" },
  { label: "Handles payroll returns", href: "/register?sars=EMP201" },
  { label: "Has a free trial", href: "/register?avail=trial" },
  { label: "Feeds from your bank", href: "/briefings/bank-feeds-by-bank" },
] as const;

function isActive(pathname: string, match: readonly string[]): boolean {
  return match.some((m) => pathname === m || pathname.startsWith(`${m}/`));
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="stamp mb-4 text-muted">{children}</p>;
}

function SearchField({ id, onSubmit, className = "" }: { id: string; onSubmit?: () => void; className?: string }) {
  return (
    <form action="/lookup" method="get" role="search" onSubmit={onSubmit} className={`relative ${className}`}>
      <Search size={18} strokeWidth={1.5} aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted" />
      <label htmlFor={id} className="sr-only">
        Search software
      </label>
      <input
        id={id}
        name="q"
        type="search"
        placeholder="Search software or a category"
        autoComplete="off"
        className="block h-10 w-full rounded-[10px] border border-line-firm bg-paper pr-3 pl-10 text-[14px] outline-none placeholder:text-muted hover:border-ink focus:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-deep"
      />
    </form>
  );
}

/**
 * The header, in the shape large B2B sites use.
 *
 * A slim strip on top says who the site is for. Under it a full width bar holds
 * the logo, three menus that open into wide panels (Software, Compare, Guides),
 * a search field, a quiet Write a review link and one lime action, Add a
 * product. The panels open on hover for a mouse and on click or the keyboard
 * for everyone else, and close on Escape, on a click outside, or when the page
 * changes. About and Contact live in the footer.
 *
 * Below 1280px the bar collapses to the logo and a Menu button that opens a
 * full screen sheet.
 */
export function Header({ stamp, categories, total, popular, pairs, guides, posts }: Props) {
  const pathname = usePathname();
  // Each panel is open only for the path it was opened on, so any route change closes it without an effect.
  const [menu, setMenu] = useState<{ key: MenuKey; path: string } | null>(null);
  const [sheetFor, setSheetFor] = useState<string | null>(null);
  const open: MenuKey | null = menu && menu.path === pathname ? menu.key : null;
  const sheetOpen = sheetFor === pathname;
  const closeRef = useRef<HTMLButtonElement>(null);
  const sheetTriggerRef = useRef<HTMLButtonElement>(null);
  const wrapRef = useRef<HTMLElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = (key: MenuKey) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setMenu({ key, path: pathname });
  };
  const hideSoon = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setMenu(null), 160);
  };

  // The full screen sheet: lock scroll, close on Escape, move focus in and back out.
  useEffect(() => {
    if (!sheetOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSheetFor(null);
    };
    document.addEventListener("keydown", onKey);
    const trigger = sheetTriggerRef.current;
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [sheetOpen]);

  // The menus: close on Escape or a click anywhere outside the header.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(null);
    };
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  const softwareActive = isActive(pathname, NAV.software.match);
  const compareActive = isActive(pathname, NAV.compare.match);
  const resourcesActive = isActive(pathname, NAV.resources.match);

  const trigger = (key: MenuKey, label: string, active: boolean) => (
    <button
      type="button"
      onMouseEnter={(e) => {
        // A mouse opens a panel by hovering. Touch and keyboard use the click below.
        if (e.nativeEvent instanceof MouseEvent) show(key);
      }}
      onClick={(e) => {
        // A keyboard press (detail 0) toggles. A mouse click keeps the panel the hover opened.
        if (open === key && e.detail === 0) setMenu(null);
        else show(key);
      }}
      aria-expanded={open === key}
      aria-controls={`menu-${key}`}
      className={`flex h-[68px] cursor-pointer items-center gap-1.5 border-b-[3px] px-3.5 text-[15px] ${
        open === key || active ? "border-lime-deep font-semibold text-ink" : "border-transparent font-medium text-ink hover:border-line-firm"
      }`}
    >
      {label}
      <ChevronDown size={16} strokeWidth={1.75} aria-hidden="true" className={open === key ? "rotate-180" : ""} />
    </button>
  );

  return (
    <>
      {/* The strip: who this is for, and the two small links. */}
      <div className="hidden border-b border-line bg-lime-wash md:block">
        <div className="mx-auto flex h-9 w-full max-w-[1280px] items-center justify-between gap-6 px-6 text-[13px] leading-5">
          <p className="flex items-center gap-2.5">
            <SaFlag height={14} />
            <span>Made for South African buyers.<span className="hidden xl:inline"> Every price in rand, read from the vendor.</span></span>
          </p>
          <ul className="flex items-center gap-5 whitespace-nowrap">
            <li className="stamp hidden text-muted lg:block">{stamp[2]}</li>
            <li>
              <Link href={EXTRA.finder.href} className="font-medium underline-offset-4 hover:underline">
                {EXTRA.finder.label}
              </Link>
            </li>
            <li>
              <ShortlistLink className="inline-flex items-center font-medium underline-offset-4 hover:underline" />
            </li>
            {[EXTRA.method, EXTRA.alerts].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="font-medium underline-offset-4 hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <header
        ref={wrapRef}
        onMouseLeave={hideSoon}
        onMouseEnter={() => {
          if (leaveTimer.current) clearTimeout(leaveTimer.current);
        }}
        className="sticky top-0 z-40 border-b border-line-firm bg-surface"
      >
        <div className="mx-auto flex h-[68px] w-full max-w-[1280px] items-center gap-3 px-5 sm:gap-8 sm:px-6">
          <Logo size={30} className="flex-none" />

          <nav aria-label="Primary" className="hidden items-stretch xl:flex">
            {trigger("software", NAV.software.label, softwareActive)}
            {trigger("compare", NAV.compare.label, compareActive)}
            {trigger("resources", NAV.resources.label, resourcesActive)}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <SearchField id="search-desktop" className="mr-1 hidden w-[270px] xl:block" />
            <Link
              href={NAV.write.href}
              className={`hidden h-10 items-center rounded-[10px] px-3.5 text-[15px] font-medium whitespace-nowrap hover:bg-lime-wash xl:flex ${isActive(pathname, NAV.write.match) ? "bg-lime-wash font-semibold" : ""}`}
            >
              {NAV.write.label}
            </Link>
            <span className="hidden md:block">
              <Link href={NAV.add.href} className={ctaClass("primary", "min-h-10 px-4 whitespace-nowrap")}>
                {NAV.add.label}
              </Link>
            </span>
            <Link href={EXTRA.search.href} aria-label={EXTRA.search.label} className="flex h-10 w-10 items-center justify-center rounded-[10px] hover:bg-lime-wash xl:hidden">
              <Search size={20} strokeWidth={1.5} aria-hidden="true" />
            </Link>
            <button
              ref={sheetTriggerRef}
              type="button"
              onClick={() => setSheetFor(pathname)}
              aria-expanded={sheetOpen}
              aria-controls="mobile-menu"
              className="h-10 cursor-pointer rounded-[10px] border border-line-firm px-4 text-[15px] font-medium text-ink hover:bg-lime-wash xl:hidden"
            >
              Menu
            </button>
          </div>
        </div>

        {/* Software: categories, popular products, ways to filter. */}
        {open === "software" && (
          <div id="menu-software" className="absolute top-full right-0 left-0 hidden border-b border-line-firm bg-surface xl:block">
            <div className="mx-auto grid w-full max-w-[1280px] gap-12 px-6 py-8 xl:grid-cols-[1.15fr_1.45fr_1fr]">
              <div>
                <Eyebrow>Categories</Eyebrow>
                <ul>
                  {categories.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/sector/${c.slug}`} className="group flex items-start justify-between gap-4 rounded-[10px] px-3 py-2.5 hover:bg-lime-wash">
                        <span className="min-w-0">
                          <span className="block text-[15px] leading-5 font-semibold">{c.name}</span>
                          <span className="block truncate text-[13px] leading-5 text-muted">{c.description}</span>
                        </span>
                        <span className="stamp mt-0.5 flex-none text-muted">{c.count}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Eyebrow>Where to start</Eyebrow>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {popular.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/register/${p.slug}`} className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 hover:bg-lime-wash">
                        <LogoBadge slug={p.slug} name={p.name} size={40} />
                        <span className="min-w-0">
                          <span className="flex items-center gap-1.5 text-[15px] leading-5 font-semibold">
                            {p.name}
                            {p.local && <SaFlag height={11} />}
                          </span>
                          <span className="block text-[12px] leading-4 text-muted">{p.price}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Eyebrow>Find by need</Eyebrow>
                <ul className="space-y-0.5">
                  {NEEDS.map((n) => (
                    <li key={n.label}>
                      <Link href={n.href} className="flex items-center gap-2.5 rounded-[10px] px-3 py-2 text-[15px] hover:bg-lime-wash">
                        {"flag" in n && n.flag && <SaFlag height={13} />}
                        {n.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={CTA.compare.href} className={ctaClass("blue", "mt-5 w-full")}>
                  {CTA.compare.label}
                </Link>
              </div>
            </div>
            <div className="border-t border-line bg-paper">
              <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-6 py-3.5 text-[14px]">
                <Link href={CTA.browse.href} className="font-semibold underline underline-offset-4 hover:text-lime-text">
                  See all {total} products
                </Link>
                <span className="text-muted">Listed A to Z. No vendor can pay to move up.</span>
              </div>
            </div>
          </div>
        )}

        {/* Compare: the pairs people look up, and the selector. */}
        {open === "compare" && (
          <div id="menu-compare" className="absolute top-full right-0 left-0 hidden border-b border-line-firm bg-surface xl:block">
            <div className="mx-auto grid w-full max-w-[1280px] gap-12 px-6 py-8 xl:grid-cols-[2fr_1fr]">
              <div>
                <Eyebrow>Popular comparisons</Eyebrow>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {pairs.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/versus/${p.slug}`} className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 hover:bg-lime-wash">
                        <span className="flex flex-none -space-x-2.5">
                          <LogoBadge slug={p.a.slug} name={p.a.name} size={36} className="ring-2 ring-surface" />
                          <LogoBadge slug={p.b.slug} name={p.b.name} size={36} className="ring-2 ring-surface" />
                        </span>
                        <span className="min-w-0 text-[15px] leading-5 font-semibold">
                          {p.a.name} <span className="font-normal text-muted">vs</span> {p.b.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[16px] border border-line-firm bg-paper p-6">
                <p className="font-heading text-[22px] leading-7 font-bold tracking-[-0.02em]">Pick any two products.</p>
                <p className="mt-2 text-[14px] leading-5 text-muted">Prices in rand, plans, features and SARS filing side by side, with no winner picked for you.</p>
                <Link href={CTA.compare.href} className={ctaClass("blue", "mt-5")}>
                  Compare two products
                </Link>
              </div>
            </div>
            <div className="border-t border-line bg-paper">
              <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-6 py-3.5 text-[14px]">
                <Link href={CTA.compare.href} className="font-semibold underline underline-offset-4 hover:text-lime-text">
                  See all comparisons
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Resources: the blog, the guides, and the price alert. */}
        {open === "resources" && (
          <div id="menu-resources" className="absolute top-full right-0 left-0 hidden border-b border-line-firm bg-surface xl:block">
            <div className="mx-auto grid w-full max-w-[1280px] gap-12 px-6 py-8 xl:grid-cols-[1fr_1fr_0.9fr]">
              <div>
                <Eyebrow>From the blog</Eyebrow>
                <ul>
                  {posts.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/blog/${p.slug}`} className="block rounded-[10px] px-3 py-2.5 hover:bg-lime-wash">
                        <span className="stamp block text-muted">{p.category}</span>
                        <span className="mt-0.5 block text-[15px] leading-5 font-semibold">{p.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Eyebrow>Guides</Eyebrow>
                <ul>
                  {guides.map((g) => (
                    <li key={g.slug}>
                      <Link href={`/briefings/${g.slug}`} className="block rounded-[10px] px-3 py-2.5 hover:bg-lime-wash">
                        <span className="stamp block text-muted">{g.topic}</span>
                        <span className="mt-0.5 block text-[15px] leading-5 font-semibold">{g.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[16px] border border-line-firm bg-paper p-6">
                <p className="font-heading text-[22px] leading-7 font-bold tracking-[-0.02em]">Know when a price moves.</p>
                <p className="mt-2 text-[14px] leading-5 text-muted">One email when a price changes or a product is withdrawn. No sign up needed to read the register.</p>
                <Link href={EXTRA.alerts.href} className={ctaClass("primary", "mt-5")}>
                  Get price alerts
                </Link>
              </div>
            </div>
            <div className="border-t border-line bg-paper">
              <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-6 py-3.5 text-[14px]">
                <span className="flex flex-wrap gap-x-6 gap-y-1">
                  <Link href={NAV.blog.href} className="font-semibold underline underline-offset-4 hover:text-lime-text">
                    All blog posts
                  </Link>
                  <Link href={NAV.guides.href} className="font-semibold underline underline-offset-4 hover:text-lime-text">
                    All guides
                  </Link>
                  <Link href={EXTRA.method.href} className="font-semibold underline underline-offset-4 hover:text-lime-text">
                    How the register works
                  </Link>
                  <Link href={EXTRA.glossary.href} className="font-semibold underline underline-offset-4 hover:text-lime-text">
                    Glossary
                  </Link>
                  <Link href={EXTRA.faq.href} className="font-semibold underline underline-offset-4 hover:text-lime-text">
                    FAQ
                  </Link>
                  <Link href={EXTRA.lists.href} className="font-semibold underline underline-offset-4 hover:text-lime-text">
                    Lists
                  </Link>
                </span>
              </div>
            </div>
          </div>
        )}
      </header>

      {sheetOpen && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-paper">
          <div className="flex flex-none items-center justify-between px-5 pt-5 pb-4">
            <Logo size={30} />
            <button
              ref={closeRef}
              type="button"
              onClick={() => setSheetFor(null)}
              className="h-10 cursor-pointer rounded-[10px] border border-line-firm px-4 text-[15px] font-medium hover:bg-lime-wash"
            >
              Close
            </button>
          </div>

          <div className="px-5 pb-2">
            <SearchField id="search-mobile" onSubmit={() => setSheetFor(null)} />
          </div>

          <nav aria-label="Primary" className="px-5">
            <ul className="border-t border-line-firm">
              <li className="border-b border-line">
                <Link
                  href={NAV.software.href}
                  aria-current={softwareActive ? "page" : undefined}
                  className={`flex h-14 items-center px-2 font-heading text-[26px] font-bold tracking-[-0.02em] hover:bg-lime-wash ${softwareActive ? "bg-lime-wash" : ""}`}
                >
                  {NAV.software.label}
                </Link>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-1 px-2 pb-4">
                  {categories.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/sector/${c.slug}`} className="flex items-baseline justify-between gap-2 py-1.5 text-[15px] text-muted hover:text-ink">
                        {c.name}
                        <span className="stamp">{c.count}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {[NAV.compare, NAV.blog, NAV.guides, NAV.write, NAV.add].map((item) => {
                const active = isActive(pathname, item.match);
                return (
                  <li key={item.href} className="border-b border-line">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex h-14 items-center px-2 font-heading text-[26px] font-bold tracking-[-0.02em] hover:bg-lime-wash ${active ? "bg-lime-wash" : ""}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex flex-col gap-3 px-5 pt-6">
            <Link href={CTA.browse.href} className={ctaClass("primary", "min-h-12 self-start px-6 text-[16px]")}>
              {CTA.browse.label} <span aria-hidden="true">→</span>
            </Link>
            <Link href={CTA.compare.href} className={ctaClass("blue", "min-h-12 self-start px-6 text-[16px]")}>
              {CTA.compare.label}
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 px-5 text-[14px] text-muted">
            {[EXTRA.finder, EXTRA.shortlist, EXTRA.lists, EXTRA.glossary, EXTRA.faq, EXTRA.method, EXTRA.alerts].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="underline underline-offset-4 hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="stamp mt-auto px-5 py-8 text-muted">
            {stamp.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
