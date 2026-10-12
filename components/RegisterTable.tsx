import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { SECTORS } from "@/lib/data/sectors";
import { priceLabel } from "@/lib/format";
import type { SortKey } from "@/lib/registry";
import type { PricedSoftware } from "@/lib/types";
import { CheckedStamp } from "./primitives";
import { ProductLogo } from "./ProductLogo";

export type Col = "product" | "sector" | "from" | "basis" | "checked" | "go";

export const FULL_COLUMNS: Col[] = ["product", "sector", "from", "basis", "checked", "go"];

const HEAD: Record<Col, string> = {
  product: "Product",
  sector: "Category",
  from: "From",
  basis: "Basis",
  checked: "Price read",
  go: "",
};

const SORT_FOR: Partial<Record<Col, SortKey>> = {
  product: "name",
  sector: "sector",
  from: "price",
  checked: "checked",
};

const NUMERIC: Col[] = ["from"];

const sectorName = (slug: string) => SECTORS.find((s) => s.slug === slug)?.name ?? slug;

function PriceCell({ s }: { s: PricedSoftware }) {
  const p = priceLabel(s);
  if (p.kind === "quoted") return <span className="text-muted">On request</span>;
  return <span className="font-semibold whitespace-nowrap">{p.amount}</span>;
}

function Cell({ col, s, squeeze }: { col: Col; s: PricedSoftware; squeeze: boolean }) {
  switch (col) {
    case "product":
      return (
        <div className="flex min-w-[190px] items-center gap-3">
          {/* A fixed slot, so names line up whether or not a product has a logo. Bare, with no tile behind it. */}
          <span className={`flex h-10 w-14 flex-none items-center justify-center ${squeeze ? "hidden min-[1100px]:flex" : ""}`}>
            <ProductLogo slug={s.slug} name={s.name} height={36} maxWidth={56} fallback="none" decorative />
          </span>
          <div>
            <Link href={`/register/${s.slug}`} className="row-link block text-[15px] leading-5 font-semibold">
              {s.name}
            </Link>
            <div className="text-[12px] leading-4 text-muted">
              {s.vendor}
              {squeeze && <span className="min-[1240px]:hidden"> · {sectorName(s.sector)}</span>}
            </div>
          </div>
        </div>
      );
    case "sector":
      return <span>{sectorName(s.sector)}</span>;
    case "from":
      return (
        <>
          <PriceCell s={s} />
          {squeeze && priceLabel(s).basis && (
            <span className="block text-[12px] leading-4 font-normal whitespace-nowrap text-muted min-[1240px]:hidden">{priceLabel(s).basis}</span>
          )}
        </>
      );
    case "basis":
      return <span className="text-[12px] leading-4 whitespace-nowrap text-muted">{priceLabel(s).basis}</span>;
    case "checked":
      return s.starting_price === null ? null : <CheckedStamp date={s.price_checked_at} />;
    case "go":
      return <ChevronRight size={16} strokeWidth={1.5} aria-hidden="true" className="text-muted" />;
  }
}

export interface SortState {
  key: SortKey;
  dir: "asc" | "desc";
  /** Builds the link for a header. The page owns the other params. */
  href: (key: SortKey, dir: "asc" | "desc") => string;
}

interface Props {
  items: PricedSoftware[];
  columns?: Col[];
  sort?: SortState;
  caption: string;
  /** Skip the stacked mobile list, for tables that already fit a phone. */
  tableOnly?: boolean;
  /**
   * For a table that sits beside a filter column. Below 1360px the Basis column folds under the
   * price and the Sector column folds into the vendor line, so every fact stays and nothing clips.
   */
  squeeze?: boolean;
  className?: string;
}

/**
 * The register row, as a table. Name over vendor, category, price, basis,
 * date the price was read, chevron. The whole row is the link:
 * the product name carries a stretched ::after, so a click anywhere on the row
 * lands on the record. Hover washes the row and nothing moves.
 *
 * Below 768px the table is replaced by a stacked list: name and vendor, then
 * price, then the checked stamp.
 */
export function RegisterTable({ items, columns = FULL_COLUMNS, sort, caption, tableOnly = false, squeeze = false, className = "" }: Props) {
  const folds = (col: Col) => (squeeze && (col === "sector" || col === "basis") ? "hidden min-[1240px]:table-cell" : "");
  return (
    <div className={className}>
      <div className={`${tableOnly ? "" : "hidden md:block"} overflow-x-auto`}>
        <table className="register register-dense">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr>
              {columns.map((col) => {
                const key = SORT_FOR[col];
                const numeric = NUMERIC.includes(col);
                const active = sort && key === sort.key;
                const nextDir = active ? (sort.dir === "asc" ? "desc" : "asc") : key === "checked" ? "desc" : "asc";
                return (
                  <th
                    key={col}
                    scope="col"
                    className={`${numeric ? "num" : ""} ${folds(col)}`.trim()}
                    aria-sort={active ? (sort.dir === "asc" ? "ascending" : "descending") : undefined}
                  >
                    {sort && key ? (
                      <Link href={sort.href(key, nextDir)} className={active ? "text-ink" : ""}>
                        {HEAD[col]}
                        {active ? (sort.dir === "asc" ? " ↑" : " ↓") : ""}
                      </Link>
                    ) : (
                      HEAD[col] || <span className="sr-only">Open record</span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {items.map((s) => (
              <tr key={s.slug} className="row">
                {columns.map((col) => (
                  <td key={col} className={`${NUMERIC.includes(col) ? "num" : ""} ${folds(col)}`.trim()}>
                    <Cell col={col} s={s} squeeze={squeeze} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!tableOnly && (
        <ul className="border-t border-line-firm md:hidden">
          {items.map((s) => {
            const p = priceLabel(s);
            return (
              <li key={s.slug} className="border-b border-line">
                <Link href={`/register/${s.slug}`} className="block py-4 hover:bg-lime-wash">
                  <ProductLogo slug={s.slug} name={s.name} height={40} maxWidth={120} fallback="none" decorative className="mb-2" />
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[15px] leading-5 font-semibold">{s.name}</span>
                    <ChevronRight size={16} strokeWidth={1.5} aria-hidden="true" className="flex-none text-muted" />
                  </div>
                  <div className="text-[12px] leading-4 text-muted">
                    {s.vendor} · {sectorName(s.sector)}
                  </div>
                  <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[14px] leading-5">
                    <span className={p.kind === "quoted" ? "text-muted" : "font-semibold"}>
                      {p.amount}
                      {p.basis && <span className="ml-1 text-[12px] font-normal text-muted">{p.basis}</span>}
                    </span>
                  </div>
                  {s.price_checked_at && (
                    <div className="mt-2">
                      <CheckedStamp date={s.price_checked_at} />
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
