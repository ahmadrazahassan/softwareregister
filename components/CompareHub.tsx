"use client";

import Link from "next/link";
import { useState } from "react";
import { ctaClass } from "./CtaButton";
import { LogoBadge } from "./LogoBadge";
import { SaFlag } from "./SaFlag";

export interface HubItem {
  slug: string;
  name: string;
  vendor: string;
  sector: string;
  /** The price in rand with its basis, already formatted. */
  price: string;
  local: boolean;
}

export interface HubSector {
  slug: string;
  name: string;
}

function Picker({
  name,
  label,
  items,
  sectors,
  value,
  onChange,
  clash,
}: {
  name: "a" | "b";
  label: string;
  items: HubItem[];
  sectors: HubSector[];
  value: string;
  onChange: (v: string) => void;
  clash: boolean;
}) {
  const chosen = items.find((i) => i.slug === value);
  return (
    <div className={`flex flex-col rounded-[20px] border bg-paper p-5 ${clash ? "border-alert" : "border-line-firm"}`}>
      <label htmlFor={`pick-${name}`} className="stamp mb-4 block text-muted">
        {label}
      </label>
      <div className="flex min-h-[84px] items-center gap-4">
        {chosen ? (
          <>
            <LogoBadge slug={chosen.slug} name={chosen.name} size={72} />
            <div className="min-w-0">
              <p className="flex items-center gap-2 font-heading text-[22px] leading-7 font-bold tracking-[-0.02em]">
                <span className="truncate">{chosen.name}</span>
                {chosen.local && <SaFlag height={13} />}
              </p>
              <p className="truncate text-[13px] leading-5 text-muted">{chosen.vendor}</p>
              <p className="text-[14px] leading-5 font-semibold">{chosen.price}</p>
            </div>
          </>
        ) : (
          <>
            <span aria-hidden="true" className="grid h-[72px] w-[72px] flex-none place-items-center rounded-full border border-dashed border-line-firm font-heading text-[28px] text-muted">
              ?
            </span>
            <p className="text-[15px] leading-6 text-muted">Choose a product to see what it costs.</p>
          </>
        )}
      </div>
      <select id={`pick-${name}`} name={name} required value={value} onChange={(e) => onChange(e.target.value)} className="field mt-5 bg-surface">
        <option value="" disabled>
          Choose a product
        </option>
        {sectors.map((sec) => (
          <optgroup key={sec.slug} label={sec.name}>
            {items
              .filter((s) => s.sector === sec.slug)
              .map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}

/**
 * The compare tool: two pickers that each show the chosen product, its vendor
 * and its starting price in rand as soon as it is picked, a VS mark between
 * them, and one blue action. It is a plain GET form, so with scripts off it
 * still works: /versus reads a and b and redirects to the pair page.
 */
export function CompareHub({ items, sectors, a = "", b = "", compact = false }: { items: HubItem[]; sectors: HubSector[]; a?: string; b?: string; compact?: boolean }) {
  const [first, setFirst] = useState(a);
  const [second, setSecond] = useState(b);
  const clash = Boolean(first) && first === second;

  return (
    <form action="/versus" method="get" aria-label="Compare two products" className={`rounded-[28px] border border-line-firm bg-surface ${compact ? "p-5 md:p-7" : "p-5 md:p-8"}`}>
      <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <Picker name="a" label="First product" items={items} sectors={sectors} value={first} onChange={setFirst} clash={clash} />
        <span aria-hidden="true" className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-lime font-heading text-[15px] font-bold tracking-[0.02em] text-lime-ink">
          VS
        </span>
        <Picker name="b" label="Second product" items={items} sectors={sectors} value={second} onChange={setSecond} clash={clash} />
      </div>

      <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p role={clash ? "alert" : undefined} className={`text-[14px] leading-5 ${clash ? "text-alert" : "text-muted"}`}>
          {clash ? "Pick two different products." : "Prices in rand, plans, features and SARS filing side by side. No winner is picked for you."}
        </p>
        <button type="submit" disabled={clash} className={ctaClass("blue", "min-h-12 flex-none px-8 text-[16px] disabled:opacity-60")}>
          Compare these two <span aria-hidden="true">→</span>
        </button>
      </div>
      {!compact && (
        <p className="mt-4 text-[13px] leading-5 text-muted">
          Or start from a pair we have written up in full below. Each one carries our own notes on who should pick which.{" "}
          <Link href="#pairs" className="prose-link">
            See the pairs
          </Link>
          .
        </p>
      )}
    </form>
  );
}
