import type { Metadata } from "next";
import Link from "next/link";
import { FilterPanel } from "@/components/FilterPanel";
import { FxNote } from "@/components/FxNote";
import { Container, Note, PageHeader } from "@/components/primitives";
import { LocalToggle } from "@/components/LocalToggle";
import { RegisterTable } from "@/components/RegisterTable";
import { SoftwareCard } from "@/components/SoftwareCard";
import { formatDateLong } from "@/lib/format";
import { getFxRates, getRegistry, getSiteStats, loadSectors } from "@/lib/queries";
import { getLatestReviews } from "@/lib/queries/reviews";
import {
  buildFacets,
  filterSoftware,
  isFiltered,
  parseRegisterQuery,
  registerHref,
  sortSoftware,
  type SortKey,
} from "@/lib/registry";

export const metadata: Metadata = {
  title: "All software",
  description:
    "Every business software product on the register, with its price in rand and the date the price was read. Filter by sector, price, SARS filing and bank feed.",
  alternates: { canonical: "/register" },
};

const SORTS: { key: SortKey; label: string; dir: "asc" | "desc" }[] = [
  { key: "name", label: "Name", dir: "asc" },
  { key: "price", label: "Lowest price", dir: "asc" },
  { key: "checked", label: "Recently checked", dir: "desc" },
];

const chip = (on: boolean) =>
  `inline-flex min-h-9 items-center rounded-full border px-3.5 text-[13px] leading-5 font-semibold whitespace-nowrap ${
    on ? "border-lime-deep bg-lime text-lime-ink" : "border-line-firm bg-surface text-ink hover:bg-lime-wash"
  }`;

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = parseRegisterQuery(await searchParams);
  const [reg, stats, sectors, rates, latest] = await Promise.all([getRegistry(), getSiteStats(), loadSectors(), getFxRates(), getLatestReviews()]);

  const facets = buildFacets(reg.items, sectors);
  const filtered = isFiltered(query);
  const rows = sortSoftware(filterSoftware(reg.items, query), query);
  const cards = query.view === "cards";

  return (
    <>
      <PageHeader
        wide
        title="All software"
        stamp={`${stats.products} products · Last checked ${stats.lastChecked ? formatDateLong(stats.lastChecked) : "never"}`}
      />
      <Container wide className="pb-12 lg:pb-[72px]">
        <div className="border-t border-line-firm pt-8 md:grid md:grid-cols-[200px_minmax(0,1fr)] md:gap-8">
          <FilterPanel facets={facets} query={query} filtered={filtered} shown={rows.length} total={reg.items.length} />

          <div className="min-w-0">
            {/* Toolbar: how many, how to sort, and cards or table. */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <p className="stamp text-muted">
                  {filtered ? `Showing ${rows.length} of ${reg.items.length}` : `${reg.items.length} products`}
                </p>
                <LocalToggle on={query.local} href={registerHref(query, { local: !query.local })} />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {cards && (
                  <>
                    <span className="stamp mr-1 text-muted">Sort</span>
                    {SORTS.map((o) => (
                      <Link key={o.key} href={registerHref(query, { sort: o.key, dir: o.dir })} className={chip(query.sort === o.key)} aria-current={query.sort === o.key ? "true" : undefined}>
                        {o.label}
                      </Link>
                    ))}
                    <span aria-hidden="true" className="mx-1 hidden h-5 w-px bg-line-firm sm:block" />
                  </>
                )}
                <Link href={registerHref(query, { view: "cards" })} className={chip(cards)} aria-current={cards ? "true" : undefined}>
                  Cards
                </Link>
                <Link href={registerHref(query, { view: "table" })} className={chip(!cards)} aria-current={!cards ? "true" : undefined}>
                  Table
                </Link>
              </div>
            </div>

            {rows.length === 0 ? (
              <div className="rounded-[16px] border border-line-firm bg-surface p-6">
                <p className="text-[15px] leading-6">No product matches every filter you set. The register holds {reg.items.length} products.</p>
                <p className="mt-2 text-[14px] leading-5 text-muted">
                  SARS filing, compliance and bank feed filters match only products whose vendor pages list those items. Try removing one filter.
                </p>
              </div>
            ) : cards ? (
              <ul className="space-y-5">
                {rows.map((s) => (
                  <li key={s.slug}>
                    <SoftwareCard s={s} placement="register-card" review={latest.get(s.slug)} />
                  </li>
                ))}
              </ul>
            ) : (
              <RegisterTable
                items={rows}
                caption="Business software register"
                squeeze
                sort={{
                  key: query.sort,
                  dir: query.dir,
                  href: (key, dir) => registerHref(query, { sort: key, dir }),
                }}
              />
            )}

            <FxNote rates={rates} className="mt-8 max-w-[760px]" />
            <Note className="mt-2 max-w-[760px]">
              Prices are the vendor&apos;s own published list price, read on the date shown. Sage quotes cloud products including VAT and Pastel products excluding it, so the basis is not cosmetic. Price on request means the vendor gives its price after you contact it. Free means the starting price is zero.
            </Note>
          </div>
        </div>
      </Container>
    </>
  );
}
