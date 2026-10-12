import { ChevronRight, Search } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/primitives";
import { RegisterTable } from "@/components/RegisterTable";
import { BriefingRows } from "@/components/BriefingRows";
import { getSiteStats, getTokens } from "@/lib/queries";
import { siteSearch } from "@/lib/queries/search";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the register for a product, sector, comparison or briefing.",
  robots: { index: false, follow: true },
};

function Heading({ children, count }: { children: string; count: number }) {
  return (
    <h2 className="stamp mt-10 mb-3 flex items-baseline justify-between border-b border-line-firm pb-2 text-muted">
      <span>{children}</span>
      <span>{count}</span>
    </h2>
  );
}

export default async function LookupPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.q) ? sp.q[0] : sp.q;
  const q = (raw ?? "").trim().slice(0, 100);
  const [results, stats, tokens] = await Promise.all([siteSearch(q), getSiteStats(), getTokens()]);

  return (
    <>
      <PageHeader title="Search" />
      <Container className="pb-12 lg:pb-[72px]">
        <form action="/lookup" method="get" role="search" className="relative">
          <Search size={20} strokeWidth={1.5} aria-hidden="true" className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 text-muted" />
          <label htmlFor="lookup-q" className="sr-only">
            Search the register
          </label>
          <input
            id="lookup-q"
            name="q"
            type="search"
            defaultValue={q}
            autoFocus
            autoComplete="off"
            placeholder="Search for a product, a category or a guide"
            className="block h-14 w-full border-0 border-b border-line-firm bg-transparent pl-8 text-[24px] outline-none placeholder:text-muted hover:border-ink focus:border-ink"
            style={{ borderRadius: 0 }}
          />
        </form>

        {q && results.total === 0 && (
          <div className="mt-10">
            <p className="text-[15px] leading-6">
              Nothing matched &ldquo;{q}&rdquo;. The register holds {stats.products} products across {stats.sectors} categories.
            </p>
            <p className="mt-3">
              <Link href="/register" className="prose-link">Browse all software</Link>
            </p>
          </div>
        )}

        {results.products.length > 0 && (
          <>
            <Heading count={results.products.length}>Products</Heading>
            <RegisterTable items={results.products} columns={["product", "sector", "from", "go"]} caption="Products matching your search" />
          </>
        )}

        {results.sectors.length > 0 && (
          <>
            <Heading count={results.sectors.length}>Categories</Heading>
            <ul className="border-t border-line-firm">
              {results.sectors.map((s) => (
                <li key={s.slug} className="border-b border-line">
                  <Link href={`/sector/${s.slug}`} className="flex items-center justify-between gap-4 py-4 pl-1 hover:bg-lime-wash">
                    <span>
                      <span className="block text-[16px] leading-6 font-semibold">{s.label}</span>
                      <span className="block text-[13px] leading-5 text-muted">{s.description}</span>
                    </span>
                    <ChevronRight size={16} strokeWidth={1.5} aria-hidden="true" className="mr-1 flex-none text-muted" />
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        {results.comparisons.length > 0 && (
          <>
            <Heading count={results.comparisons.length}>Comparisons</Heading>
            <ul className="border-t border-line-firm">
              {results.comparisons.map((c) => (
                <li key={c.slug} className="border-b border-line">
                  <Link href={`/versus/${c.slug}`} className="flex items-center justify-between gap-4 py-4 pl-1 hover:bg-lime-wash">
                    <span className="text-[16px] leading-6 font-semibold">
                      {c.a_software.name} <span className="stamp mx-1 text-muted">vs</span> {c.b_software.name}
                    </span>
                    <ChevronRight size={16} strokeWidth={1.5} aria-hidden="true" className="mr-1 flex-none text-muted" />
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        {results.briefings.length > 0 && (
          <>
            <Heading count={results.briefings.length}>Guides</Heading>
            <BriefingRows items={results.briefings} tokens={tokens} />
          </>
        )}
      </Container>
    </>
  );
}
