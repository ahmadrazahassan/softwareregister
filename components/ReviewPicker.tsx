"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { LogoBadge } from "./LogoBadge";

export interface PickerItem {
  slug: string;
  name: string;
  vendor: string;
  sector: string;
}

export interface PickerSector {
  slug: string;
  name: string;
}

/**
 * Choose the product to review: a search field, one chip per category and a
 * grid of products with their logos. Every tile is a plain link to that
 * product's review form, so with scripts off the grid still works and shows
 * every product.
 */
export function ReviewPicker({ items, sectors }: { items: PickerItem[]; sectors: PickerSector[] }) {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("all");
  const q = query.trim().toLowerCase();
  const shown = items.filter((i) => (sector === "all" || i.sector === sector) && (!q || `${i.name} ${i.vendor}`.toLowerCase().includes(q)));

  const chip = (on: boolean) =>
    `inline-flex min-h-9 cursor-pointer items-center rounded-full border px-3.5 text-[13px] leading-5 font-medium whitespace-nowrap ${on ? "border-lime bg-lime font-semibold text-lime-ink" : "border-line-firm bg-surface hover:bg-lime-wash"}`;

  return (
    <div>
      <div className="relative">
        <Search size={18} strokeWidth={1.5} aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted" />
        <label htmlFor="picker-search" className="sr-only">
          Search for the software you have used
        </label>
        <input
          id="picker-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for the software you have used"
          autoComplete="off"
          className="block h-12 w-full rounded-[12px] border border-line-firm bg-paper pr-4 pl-11 text-[15px] outline-none placeholder:text-muted hover:border-ink focus:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-deep"
        />
      </div>

      <div role="group" aria-label="Filter by category" className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => setSector("all")} aria-pressed={sector === "all"} className={chip(sector === "all")}>
          All
        </button>
        {sectors.map((s) => (
          <button key={s.slug} type="button" onClick={() => setSector(s.slug)} aria-pressed={sector === s.slug} className={chip(sector === s.slug)}>
            {s.name}
          </button>
        ))}
      </div>

      <p className="mt-4 text-[13px] leading-5 text-muted" aria-live="polite">
        {shown.length} {shown.length === 1 ? "product" : "products"}
      </p>

      <ul className="mt-3 grid max-h-[520px] grid-cols-1 gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
        {shown.map((p) => (
          <li key={p.slug}>
            <Link href={`/register/${p.slug}/reviews/new`} className="flex items-center gap-3 rounded-[12px] border border-line-firm bg-surface p-3 transition-colors hover:border-ink hover:bg-lime-wash">
              <LogoBadge slug={p.slug} name={p.name} size={40} />
              <span className="min-w-0">
                <span className="block truncate text-[15px] leading-5 font-semibold">{p.name}</span>
                <span className="block truncate text-[12px] leading-4 text-muted">{p.vendor}</span>
              </span>
            </Link>
          </li>
        ))}
        {shown.length === 0 && (
          <li className="col-span-full rounded-[12px] border border-dashed border-line-firm p-5 text-[14px] leading-5 text-muted">
            Nothing on the register matches that. If it is missing, ask us to <Link href="/add-a-product" className="prose-link">add the product</Link>.
          </li>
        )}
      </ul>
    </div>
  );
}
