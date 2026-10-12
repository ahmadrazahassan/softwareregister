import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CompareHub } from "@/components/CompareHub";
import { VersusCard } from "@/components/VersusCard";
import { toHubItems } from "@/lib/hub";
import { getAllSoftware, getResolvedComparisons, getSiteStats, loadSectors } from "@/lib/queries";
import { buildSummary, sectorOf } from "@/lib/registry";
import { JsonLd, breadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Compare software",
  description: "Head to head comparisons of South African business software: price in rand, features and SARS filing.",
  alternates: { canonical: "/versus" },
};

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

const SHOWS = [
  { n: "01", title: "Plans and prices in rand", body: "Every plan the vendor lists, with the VAT basis stated wherever the vendor states it, and the date the price was read." },
  { n: "02", title: "SARS and your bank", body: "VAT201, payroll returns and bank feeds, only where each vendor's own page lists them. A row appears only when there is something to show." },
  { n: "03", title: "Features side by side", body: "The features each vendor lists, in one table, with a tick where a product has it. The stronger cell in a row is set darker." },
  { n: "04", title: "Our notes, where we have them", body: "For the pairs written up below, who should pick which and where each falls short, researched from both vendors' pages." },
];

export default async function VersusIndex({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const a = one(sp.a);
  const b = one(sp.b);
  const [items, comparisons, stats, sectors] = await Promise.all([getAllSoftware(), getResolvedComparisons(), getSiteStats(), loadSectors()]);

  // The tool is a GET form. A valid pair goes straight to its page.
  if (a && b && a !== b && items.some((s) => s.slug === a) && items.some((s) => s.slug === b)) {
    redirect(`/versus/${a}-vs-${b}`);
  }

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Compare", path: "/versus" }])} />

      <header className="mx-auto w-full max-w-[1120px] px-6 pt-14 pb-10 lg:pt-20">
        <p className="stamp mb-4 text-muted">Head to head</p>
        <h1 className="max-w-[900px] font-heading text-[40px] leading-[42px] font-bold tracking-[-0.03em] md:text-[72px] md:leading-[72px]">Compare any two products.</h1>
        <p className="mt-6 max-w-[620px] text-[17px] leading-7 text-muted">
          Pick two of the {stats.products} products on the register and see what each costs in rand, what each plan adds and how each handles SARS, side by side.
        </p>
      </header>

      <section aria-label="Compare two products" className="mx-auto w-full max-w-[1120px] px-6 pb-14 lg:pb-[72px]">
        <CompareHub items={toHubItems(items)} sectors={sectors.map((s) => ({ slug: s.slug, name: s.name }))} a={a} b={b} />
      </section>

      <section aria-labelledby="shows-title" className="mx-auto w-full max-w-[1120px] px-6 pb-14 lg:pb-[72px]">
        <h2 id="shows-title" className="mb-8 border-t border-line-firm pt-12 font-heading text-[28px] leading-8 font-bold tracking-[-0.02em] lg:pt-[72px]">
          What every comparison shows
        </h2>
        <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {SHOWS.map((s) => (
            <li key={s.n}>
              <p className="font-heading text-[40px] leading-[40px] font-bold tracking-[-0.03em] text-line-firm">{s.n}</p>
              <span aria-hidden="true" className="mt-4 block h-px w-8 bg-ink" />
              <h3 className="mt-4 font-heading text-[19px] leading-6 font-bold tracking-[-0.01em]">{s.title}</h3>
              <p className="mt-2 text-[14px] leading-6 text-muted">{s.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="pairs" aria-labelledby="pairs-title" className="mx-auto w-full max-w-[1120px] px-6 pb-12 lg:pb-[72px]">
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-line-firm pt-12 lg:pt-[72px]">
          <h2 id="pairs-title" className="font-heading text-[28px] leading-8 font-bold tracking-[-0.02em]">
            {stats.comparisons} pairs written up in full
          </h2>
          <p className="text-[14px] leading-5 text-muted">The tool above compares any two. These carry our own notes.</p>
        </div>
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {comparisons.map((c) => (
            <li key={c.slug}>
              <VersusCard slug={c.slug} a={c.a_software} b={c.b_software} summary={buildSummary(c.a_software, c.b_software)} category={sectorOf(c.a_software.sector, sectors)?.name} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
