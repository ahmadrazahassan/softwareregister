"use client";

import Link from "next/link";
import { useState } from "react";
import { LogoBadge } from "./LogoBadge";
import { SaFlag } from "./SaFlag";

export interface DirectoryItem {
  slug: string;
  name: string;
  vendor: string;
  sector: string;
  /** The price in rand with its basis, already formatted. */
  price: string;
  /** True when the vendor gives its price on request. */
  onRequest: boolean;
  local: boolean;
  /** How many plans the vendor lists. */
  plans: number;
}

export interface DirectorySector {
  slug: string;
  name: string;
}

/**
 * Every product on the register as a compact tile, with one chip per category
 * to narrow the grid. It is the home page's wide view of the whole register:
 * a reader sees how much is listed, what each starts at, and which are sold in
 * South Africa, then opens the one they want. The grid is alphabetical and
 * carries no ranking. With scripts off the chips are plain links to the
 * category pages, and the grid shows every product.
 */
export function ProductDirectory({ items, sectors }: { items: DirectoryItem[]; sectors: DirectorySector[] }) {
  const [active, setActive] = useState<string>("all");
  const shown = active === "all" ? items : items.filter((i) => i.sector === active);
  const sectorName = (slug: string) => sectors.find((s) => s.slug === slug)?.name ?? slug;

  const chip = (on: boolean) =>
    `inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full border px-4 text-[14px] leading-5 font-medium whitespace-nowrap ${
      on ? "border-lime bg-lime font-semibold text-lime-ink" : "border-line-firm bg-surface hover:bg-lime-wash"
    }`;

  return (
    <div>
      <div role="group" aria-label="Filter by category" className="-mx-1 flex flex-wrap gap-2 px-1">
        <button type="button" onClick={() => setActive("all")} aria-pressed={active === "all"} className={chip(active === "all")}>
          All <span className="stamp opacity-70">{items.length}</span>
        </button>
        {sectors.map((s) => (
          <button key={s.slug} type="button" onClick={() => setActive(s.slug)} aria-pressed={active === s.slug} className={chip(active === s.slug)}>
            {s.name} <span className="stamp opacity-70">{items.filter((i) => i.sector === s.slug).length}</span>
          </button>
        ))}
      </div>

      <p className="mt-4 text-[13px] leading-5 text-muted" aria-live="polite">
        Showing {shown.length} of {items.length} products, A to Z
      </p>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shown.map((p) => (
          <li key={p.slug}>
            <Link href={`/register/${p.slug}`} className="flex h-full flex-col gap-3 rounded-[14px] border border-line-firm bg-surface p-4 transition-colors hover:border-ink">
              <span className="flex items-center gap-3">
                <LogoBadge slug={p.slug} name={p.name} size={48} />
                <span className="min-w-0">
                  <span className="block truncate text-[16px] leading-5 font-semibold">{p.name}</span>
                  <span className="block truncate text-[12px] leading-4 text-muted">{p.vendor}</span>
                </span>
              </span>
              <span className={`text-[14px] leading-5 ${p.onRequest ? "text-muted" : "font-semibold"}`}>{p.price}</span>
              <span className="mt-auto flex items-center justify-between gap-2 text-[12px] leading-4 text-muted">
                <span>
                  {sectorName(p.sector)}
                  {p.plans > 1 ? ` · ${p.plans} plans` : ""}
                </span>
                {p.local && (
                  <span className="inline-flex items-center gap-1.5 font-medium text-ink">
                    <SaFlag height={11} />
                    <span className="sr-only">Sold in South Africa</span>
                  </span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
