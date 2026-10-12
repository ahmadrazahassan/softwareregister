"use client";

import Link from "next/link";
import { useState } from "react";
import { PRICE_BAND_LABEL, type Facet, type Facets, type PriceBand, type RegisterQuery } from "@/lib/registry";

interface Props {
  facets: Facets;
  query: RegisterQuery;
  filtered: boolean;
  shown: number;
  total: number;
}

const PRICE_ORDER: PriceBand[] = ["free", "under300", "300to1000", "quoted"];

function Group({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <fieldset className="m-0 min-w-0 border-0 border-t border-line p-0 py-4 first:border-t-0 first:pt-0">
      <legend className="stamp mb-3 w-full p-0 text-muted">{title}</legend>
      {children}
      {note && <p className="mt-2 text-[12px] leading-4 text-muted">{note}</p>}
    </fieldset>
  );
}

function Checks({ name, options, selected }: { name: string; options: Facet[]; selected: string[] }) {
  return (
    <ul className="space-y-1">
      {options.map((o) => (
        <li key={o.value}>
          <label className={`flex min-h-7 items-center gap-2 text-[14px] leading-5 ${o.count === 0 ? "cursor-not-allowed text-muted" : "cursor-pointer"}`}>
            <input
              type="checkbox"
              name={name}
              value={o.value}
              defaultChecked={selected.includes(o.value)}
              disabled={o.count === 0 && !selected.includes(o.value)}
              className="check"
            />
            <span className="flex-1">{o.label}</span>
            <span className="text-[12px] text-muted">{o.count}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}

/**
 * The filter column. Bare controls, no cards, each group split by a hairline.
 * All state lives in the URL: this is a plain GET form that submits on change,
 * so a filtered view is shareable, server rendered, and works with scripts off
 * (the Apply button is shown only when scripts are off).
 */
export function FilterPanel({ facets, query, filtered, shown, total }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mb-4 flex items-center justify-between md:hidden">
        <button type="button" onClick={() => setOpen(true)} className="h-11 text-[15px] font-medium underline underline-offset-4">
          Filters{filtered ? " (on)" : ""}
        </button>
        <span className="stamp text-muted">
          {shown} OF {total}
        </span>
      </div>

      <aside
        aria-label="Filters"
        className={open ? "fixed inset-0 z-50 overflow-y-auto bg-paper p-4" : "hidden md:block"}
      >
        {open && (
          <div className="mb-4 flex items-center justify-between border-b border-line pb-3 md:hidden">
            <span className="font-heading text-[20px] font-bold">Filters</span>
            <button type="button" onClick={() => setOpen(false)} className="h-11 px-2 text-[15px] font-medium">
              Close
            </button>
          </div>
        )}

        <form
          method="get"
          action="/register"
          onChange={(e) => {
            if (!open) e.currentTarget.requestSubmit();
          }}
          onSubmit={() => setOpen(false)}
        >
          {query.sort !== "name" && <input type="hidden" name="sort" value={query.sort} />}
          {(query.sort !== "name" || query.dir === "desc") && <input type="hidden" name="dir" value={query.dir} />}
          {query.view === "table" && <input type="hidden" name="view" value="table" />}
          {query.local && <input type="hidden" name="local" value="1" />}

          <Group title="Category">
            <Checks name="sector" options={facets.sector} selected={query.sector} />
          </Group>

          <Group title="Price" note="Monthly, in rand.">
            <ul className="space-y-1">
              <li>
                <label className="flex min-h-7 cursor-pointer items-center gap-2 text-[14px] leading-5">
                  <input type="radio" name="price" value="" defaultChecked={query.price === null} className="check" />
                  Any
                </label>
              </li>
              {PRICE_ORDER.map((band) => (
                <li key={band}>
                  <label className="flex min-h-7 cursor-pointer items-center gap-2 text-[14px] leading-5">
                    <input type="radio" name="price" value={band} defaultChecked={query.price === band} className="check" />
                    {PRICE_BAND_LABEL[band]}
                  </label>
                </li>
              ))}
            </ul>
          </Group>

          {facets.sars.length > 0 && (
            <Group title="SARS filing" note="Must match every item ticked.">
              <Checks name="sars" options={facets.sars} selected={query.sars} />
            </Group>
          )}

          {facets.legal.length > 0 && (
            <Group title="Compliance">
              <Checks name="legal" options={facets.legal} selected={query.legal} />
            </Group>
          )}

          {facets.bank.length > 0 && (
            <Group title="Bank feed">
              <Checks name="bank" options={facets.bank} selected={query.bank} />
            </Group>
          )}

          <Group title="Availability">
            <Checks name="avail" options={facets.avail} selected={query.avail} />
          </Group>

          {/* Only visible when scripts are off, because with scripts on the form submits on change. */}
          <noscript>
            <button type="submit" className="mt-2 h-11 border border-line-firm px-4 text-[15px] font-semibold">
              Apply filters
            </button>
          </noscript>

          {open && (
            <button
              type="submit"
              className="mt-6 flex h-11 w-full cursor-pointer items-center justify-center rounded-[10px] border border-lime bg-lime text-[15px] font-semibold text-lime-ink"
            >
              Show results
            </button>
          )}
        </form>

        {filtered && (
          <Link href="/register" className="mt-4 inline-block text-[13px] text-lime-text underline underline-offset-4">
            Clear every filter
          </Link>
        )}
      </aside>
    </>
  );
}
