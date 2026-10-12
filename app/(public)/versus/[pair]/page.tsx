import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AffiliateCTAButton } from "@/components/AffiliateCTAButton";
import { CompareHub } from "@/components/CompareHub";
import { EditorialComparisonBlock } from "@/components/EditorialComparisonBlock";
import { FxNote } from "@/components/FxNote";
import { LogoBadge } from "@/components/LogoBadge";
import { PricingCard } from "@/components/PricingCard";
import { ComplianceMark, Note, Section } from "@/components/primitives";
import { VersusCard } from "@/components/VersusCard";
import { outboundLink } from "@/lib/affiliates";
import { parsePairSlug } from "@/lib/data/comparisons";
import { getEditorialComparison } from "@/lib/data/editorial";
import { firstSentences, formatDateStamp } from "@/lib/format";
import { toHubItems } from "@/lib/hub";
import { getFxRates, getRegistry, getResolvedComparisons, loadComparisons, loadSectors } from "@/lib/queries";
import { buildSummary, sectorOf } from "@/lib/registry";
import { JsonLd, breadcrumbLd } from "@/lib/seo";
import { buildMatrix, type VCell } from "@/lib/versus";
import type { PricedSoftware } from "@/lib/types";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await loadComparisons()).map((c) => ({ pair: c.slug }));
}

async function resolve(pair: string): Promise<{ a: PricedSoftware; b: PricedSoftware } | null> {
  const parsed = parsePairSlug(pair);
  if (!parsed) return null;
  const reg = await getRegistry();
  const a = reg.bySlug.get(parsed.a);
  const b = reg.bySlug.get(parsed.b);
  return a && b ? { a, b } : null;
}

export async function generateMetadata({ params }: { params: Promise<{ pair: string }> }): Promise<Metadata> {
  const { pair } = await params;
  const r = await resolve(pair);
  if (!r) return {};
  const v = buildSummary(r.a, r.b);
  return {
    title: `${r.a.name} vs ${r.b.name}`,
    description: `${r.a.name} against ${r.b.name} on price in rand, features and SARS filing. ${firstSentences(v.paragraphs[0], 1)}`,
    alternates: { canonical: `/versus/${pair}` },
  };
}

function Cell({ cell, winner }: { cell: VCell; winner: boolean }) {
  if (cell.type === "mark") return <ComplianceMark cell={cell.cell} />;
  return <span className={winner ? "font-semibold text-ink" : cell.muted ? "text-muted" : "font-normal text-muted"}>{cell.text}</span>;
}

export default async function VersusPage({ params }: { params: Promise<{ pair: string }> }) {
  const { pair } = await params;
  const r = await resolve(pair);
  if (!r) notFound();
  const { a, b } = r;
  const editorial = getEditorialComparison(pair);
  const [rates, reg, sectors, curated] = await Promise.all([getFxRates(), getRegistry(), loadSectors(), getResolvedComparisons()]);

  const summary = buildSummary(a, b);
  const matrix = buildMatrix(a, b);
  const la = outboundLink(a);
  const lb = outboundLink(b);

  const read = [a, b].filter((s) => s.price_checked_at && s.starting_price !== null).map((s) => `${s.name} price read ${formatDateStamp(s.price_checked_at!)}`);
  const more = [...curated.filter((c) => c.slug !== pair && c.a_software.sector === a.sector), ...curated.filter((c) => c.slug !== pair && c.a_software.sector !== a.sector)].slice(0, 3);

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Compare", path: "/versus" }, { name: `${a.name} vs ${b.name}`, path: `/versus/${pair}` }])} />

      {/* The opening band: both products, the title, and the register's one sentence on price. */}
      <header className="mx-auto w-full max-w-[1120px] px-6 pt-8 lg:pt-12">
        <Link href="/versus" className="inline-flex items-center gap-2 text-[14px] leading-5 font-medium text-muted hover:text-ink">
          <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
          All comparisons
        </Link>
        <div className="mt-6 rounded-[28px] bg-lime-wash p-7 md:p-12">
          <div className="flex items-center gap-4">
            <LogoBadge slug={a.slug} name={a.name} size={72} />
            <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full bg-lime font-heading text-[14px] font-bold text-lime-ink">
              VS
            </span>
            <LogoBadge slug={b.slug} name={b.name} size={72} />
          </div>
          <h1 className="mt-8 max-w-[900px] font-heading text-[36px] leading-[40px] font-bold tracking-[-0.03em] md:text-[64px] md:leading-[64px]">
            {a.name} vs {b.name}
          </h1>
          <p className="mt-5 max-w-[680px] text-[18px] leading-8">{firstSentences(summary.paragraphs[0], 1)}</p>
          {summary.paragraphs[1] && <p className="mt-2 max-w-[680px] text-[15px] leading-6 text-muted">{summary.paragraphs[1]}</p>}
          <p className="stamp mt-6 text-muted">{read.length ? read.join(" · ") : "Prices in rand"}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#matrix" className="inline-flex min-h-11 items-center rounded-[10px] border border-line-firm bg-surface px-5 text-[15px] font-semibold hover:bg-lime-wash">
              Side by side
            </a>
            {editorial && (
              <a href="#detailed" className="inline-flex min-h-11 items-center rounded-[10px] border border-line-firm bg-surface px-5 text-[15px] font-semibold hover:bg-lime-wash">
                Our notes
              </a>
            )}
          </div>
        </div>
      </header>

      {/* The two contenders, as pricing cards. */}
      <Section first tight id="contenders" title="The contenders">
        <div className="relative grid gap-6 md:grid-cols-2">
          <PricingCard s={a} placement="versus-card" logoHeight={64} />
          <PricingCard s={b} placement="versus-card" logoHeight={64} />
          <span aria-hidden="true" className="absolute top-[58px] left-1/2 hidden h-10 w-10 -translate-x-1/2 place-items-center rounded-full bg-lime font-heading text-[13px] font-bold text-lime-ink md:grid">
            VS
          </span>
        </div>
        <Note className="mt-4">Prices are compared only when both are on the same VAT footing.</Note>
        <FxNote rates={rates} className="mt-2 max-w-[760px]" />
      </Section>

      {/* The matrix: logos in the header, grouped rows under it. */}
      <Section wide title="Side by side" id="matrix">
        <div className="overflow-hidden rounded-[20px] border border-line-firm">
          <div className="overflow-x-auto">
            <table className="register register-compare">
              <caption className="sr-only">
                {a.name} compared with {b.name}
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[34%]">
                    Measure
                  </th>
                  {[a, b].map((s) => (
                    <th key={s.slug} scope="col" className="w-[33%]">
                      <Link href={`/register/${s.slug}`} className="flex items-center gap-3 hover:underline">
                        <LogoBadge slug={s.slug} name={s.name} size={36} />
                        <span className="min-w-0">
                          <span className="block text-[15px] leading-5 font-semibold normal-case tracking-normal">{s.name}</span>
                          <span className="block text-[11px] leading-4 font-normal normal-case tracking-normal opacity-80">{s.vendor}</span>
                        </span>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              {matrix.map((group) => (
                <tbody key={group.title}>
                  <tr>
                    <th colSpan={3} scope="colgroup" className="group-row">
                      {group.title}
                    </th>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={`${group.title}-${row.label}`}>
                      <td className="text-muted">{row.label}</td>
                      <td>
                        <Cell cell={row.a} winner={row.win === "a"} />
                      </td>
                      <td>
                        <Cell cell={row.b} winner={row.win === "b"} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </div>
        <Note className="mt-3">In each row the stronger cell is dark and the weaker is grey. A row of ticks appears only where a vendor&apos;s page lists the item.</Note>
      </Section>

      {/* Our notes, then the way out to each vendor. */}
      {editorial && (
        <Section title="Our detailed comparison" id="detailed">
          <EditorialComparisonBlock c={editorial} aName={a.name} bName={b.name} />
        </Section>
      )}

      <Section title="Ready to try one?">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { s: a, link: la },
            { s: b, link: lb },
          ].map(({ s, link }) => (
            <div key={s.slug} className="flex flex-col rounded-[20px] border border-line-firm bg-surface p-6">
              <div className="flex items-center gap-4">
                <LogoBadge slug={s.slug} name={s.name} size={56} />
                <div className="min-w-0">
                  <p className="font-heading text-[20px] leading-6 font-bold tracking-[-0.01em]">{s.name}</p>
                  <p className="text-[13px] leading-5 text-muted">{s.vendor}</p>
                </div>
              </div>
              <div className="mt-6">
                {link ? (
                  <AffiliateCTAButton slug={s.slug} href={link.href} affiliate={link.affiliate} placement="versus-verdict" variant="primary" className="min-h-12 w-full">
                    Visit {s.name}
                  </AffiliateCTAButton>
                ) : (
                  <Link href={`/register/${s.slug}`} className="inline-flex min-h-12 w-full items-center justify-center rounded-[10px] border border-line-firm text-[15px] font-semibold hover:bg-lime-wash">
                    View {s.name} on the register
                  </Link>
                )}
                {link?.affiliate && <p className="mt-2 text-[12px] leading-4 text-muted">Affiliate link. We earn if you buy. It does not change what we publish.</p>}
              </div>
            </div>
          ))}
        </div>
        <Note className="mt-6">
          Prices are read from each vendor&apos;s own pages and dated. <Link href="/method" className="prose-link">How we read prices.</Link>
        </Note>
      </Section>

      {/* Another pair, and the related write ups. */}
      <section aria-labelledby="another-title" className="mx-auto w-full max-w-[1120px] px-6 pb-12 lg:pb-[72px]">
        <div className="border-t border-line-firm pt-12 lg:pt-[72px]">
          <h2 id="another-title" className="mb-6 font-heading text-[28px] leading-8 font-bold tracking-[-0.02em]">
            Compare another pair
          </h2>
          <CompareHub items={toHubItems([...reg.items])} sectors={sectors.map((s) => ({ slug: s.slug, name: s.name }))} a={a.slug} b={b.slug} compact />
        </div>
        {more.length > 0 && (
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {more.map((c) => (
              <li key={c.slug}>
                <VersusCard slug={c.slug} a={c.a_software} b={c.b_software} summary={buildSummary(c.a_software, c.b_software)} category={sectorOf(c.a_software.sector, sectors)?.name} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
