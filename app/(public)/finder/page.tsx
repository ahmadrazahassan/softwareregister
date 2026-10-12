import type { Metadata } from "next";
import Link from "next/link";
import { AffiliateCTAButton } from "@/components/AffiliateCTAButton";
import { ctaClass } from "@/components/CtaButton";
import { LogoBadge } from "@/components/LogoBadge";
import { ShortlistButton } from "@/components/ShortlistButton";
import { outboundLink } from "@/lib/affiliates";
import { SA_STATUS_LABEL, saAvailability } from "@/lib/data/availability";
import { BANKS, SECTORS } from "@/lib/data/sectors";
import { BUDGETS, SIZES, VAT_ANSWERS, parseAnswers, runFinder, type FinderRow } from "@/lib/finder";
import { randLabel } from "@/lib/calc";
import { getFxRates, getRegistry } from "@/lib/queries";
import { JsonLd, breadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Build a software shortlist",
  description: "Five questions: what you need, how many people, VAT, your bank and your budget. Then every South African relevant product that fits, with prices in rand, in alphabetical order and not ranked.",
  alternates: { canonical: "/finder" },
};

export const revalidate = 3600;

function Row({ row, seats }: { row: FinderRow; seats: number }) {
  const { s, est, reasons } = row;
  const link = outboundLink(s);
  const sa = saAvailability(s.slug);
  const money =
    est.kind === "quoted"
      ? "Price on request"
      : est.kind === "headcount"
        ? "Quoted by headcount"
        : est.amount === null
          ? "See the review"
          : `${randLabel(est.amount, Boolean(s.fx))} a month`;
  const footing = est.amount !== null && est.basis !== "unstated" ? (est.basis === "incl" ? "including VAT" : "excluding VAT") : est.amount !== null ? "VAT basis not stated" : "";

  return (
    <li className="rounded-[20px] border border-line-firm bg-surface p-5 md:p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <LogoBadge slug={s.slug} name={s.name} size={56} />
          <div className="min-w-0">
            <h3 className="font-heading text-[22px] leading-7 font-bold tracking-[-0.01em]">
              <Link href={`/register/${s.slug}/reviews`} className="hover:underline hover:underline-offset-4">
                {s.name}
              </Link>
            </h3>
            <p className="text-[13px] leading-5 text-muted">
              {s.vendor === s.name ? SA_STATUS_LABEL[sa.status] : `${s.vendor} · ${SA_STATUS_LABEL[sa.status]}`}
            </p>
            <p className="mt-3 max-w-[60ch] text-[14px] leading-6 text-muted">{s.summary}</p>
            {reasons.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-2" aria-label="Why it is here">
                {reasons.map((r) => (
                  <li key={r} className="rounded-full border border-lime-deep/30 bg-lime-wash px-3 py-1 text-[12px] leading-4 font-semibold">
                    {r}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex-none md:w-[260px] md:text-right">
          <p className="font-heading text-[26px] leading-8 font-bold tracking-[-0.02em]">{money}</p>
          {footing && <p className="text-[13px] leading-5 text-muted">{footing}</p>}
          {est.kind !== "quoted" && <p className="mt-1 text-[12px] leading-4 text-muted">{est.how}</p>}
          {est.kind === "seats" || est.kind === "bands" ? <p className="text-[12px] leading-4 text-muted">For {seats} people.</p> : null}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-2.5 border-t border-line pt-4">
        {link && (
          <AffiliateCTAButton slug={s.slug} href={link.href} affiliate={link.affiliate} placement="finder" variant="primary" className="min-h-10 px-4 text-[14px]">
            Visit {s.name}
          </AffiliateCTAButton>
        )}
        <Link href={`/register/${s.slug}/reviews`} className={ctaClass("blue", "min-h-10 px-4 text-[14px]")}>
          Read the review
        </Link>
        <ShortlistButton slug={s.slug} name={s.name} />
      </div>
    </li>
  );
}

export default async function FinderPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const answers = parseAnswers(sp);
  const [reg, rates] = await Promise.all([getRegistry(), getFxRates()]);
  const result = answers ? runFinder(reg.items, answers, rates) : null;
  const sectorName = answers ? SECTORS.find((s) => s.slug === answers.sector)?.label.toLowerCase() : "";

  const val = (k: string, fallback: string) => (answers ? String((answers as unknown as Record<string, string>)[k] ?? fallback) : fallback);
  const sortHref = (sort: string) => {
    const q = new URLSearchParams();
    if (answers) {
      q.set("sector", answers.sector);
      q.set("size", answers.size);
      q.set("vat", answers.vat);
      if (answers.bank) q.set("bank", answers.bank);
      q.set("budget", answers.budget);
    }
    if (sort !== "name") q.set("sort", sort);
    return `/finder?${q.toString()}#results`;
  };

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Build a shortlist", path: "/finder" }])} />
      <header className="mx-auto w-full max-w-[1120px] px-6 pt-12 lg:pt-16">
        <p className="stamp mb-4 text-muted">The shortlist finder</p>
        <h1 className="max-w-[900px] font-heading text-[38px] leading-[42px] font-bold tracking-[-0.03em] md:text-[64px] md:leading-[66px]">Five questions, then software that fits.</h1>
        <p className="mt-6 max-w-[680px] text-[17px] leading-7 text-muted">
          Tell the register what you need and it lists every product that meets it, with the price worked out for your size, in rand. Products are in alphabetical order, or by price if you ask. Nothing is ranked, and nothing is hidden without a reason.
        </p>
      </header>

      <section aria-label="Your answers" className="mx-auto mt-10 w-full max-w-[1120px] px-6">
        <form method="get" action="/finder#results" className="rounded-[24px] border border-line-firm bg-surface p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <label htmlFor="f-sector" className="mb-1.5 block text-[14px] leading-5 font-semibold">
                1. What do you need?
              </label>
              <select id="f-sector" name="sector" required defaultValue={answers?.sector ?? ""} className="field">
                <option value="" disabled>
                  Choose
                </option>
                {SECTORS.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="f-size" className="mb-1.5 block text-[14px] leading-5 font-semibold">
                2. How many people will use it, or be paid through it?
              </label>
              <select id="f-size" name="size" defaultValue={val("size", "small")} className="field">
                {SIZES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="f-vat" className="mb-1.5 block text-[14px] leading-5 font-semibold">
                3. Are you registered for VAT?
              </label>
              <select id="f-vat" name="vat" defaultValue={val("vat", "unsure")} className="field">
                {VAT_ANSWERS.map((v) => (
                  <option key={v.value} value={v.value}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="f-bank" className="mb-1.5 block text-[14px] leading-5 font-semibold">
                4. Which bank holds the business account?
              </label>
              <select id="f-bank" name="bank" defaultValue={val("bank", "")} className="field">
                <option value="">Another bank, or not sure</option>
                {BANKS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="f-budget" className="mb-1.5 block text-[14px] leading-5 font-semibold">
                5. What can you spend a month, including VAT?
              </label>
              <select id="f-budget" name="budget" defaultValue={val("budget", "any")} className="field">
                {BUDGETS.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end gap-3">
              <button type="submit" className={ctaClass("primary", "min-h-12 px-7 text-[16px]")}>
                Show matching software
              </button>
              {answers && (
                <Link href="/finder" className="pb-3 text-[14px] underline underline-offset-4">
                  Start again
                </Link>
              )}
            </div>
          </div>
          <p className="mt-5 max-w-[80ch] text-[12px] leading-4 text-muted">
            The bank question applies to accounting and ERP, and the VAT question to the products that keep a ledger. Nothing you choose here is stored or sent anywhere: the answers sit in the address of this page.
          </p>
        </form>
      </section>

      {result && answers && (
        <section id="results" aria-labelledby="results-title" className="mx-auto mt-14 w-full max-w-[1120px] scroll-mt-28 px-6 pb-12 lg:pb-[72px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="results-title" className="font-heading text-[30px] leading-9 font-bold tracking-[-0.02em] md:text-[40px] md:leading-[44px]">
                {result.fits.length + result.quoted.length} {result.fits.length + result.quoted.length === 1 ? "product fits" : "products fit"}
              </h2>
              <p className="mt-2 max-w-[70ch] text-[15px] leading-6 text-muted">
                {sectorName} for {SIZES.find((s) => s.value === answers.size)?.label}, priced for about {result.seats} people. {answers.sort === "price" ? "Cheapest first, which is a price sort and not a ranking." : "Alphabetical, which is not a ranking."}
              </p>
            </div>
            <div role="group" aria-label="Sort" className="flex gap-2">
              <Link href={sortHref("name")} className={`inline-flex min-h-10 items-center rounded-full border px-4 text-[14px] ${answers.sort === "name" ? "border-lime bg-lime font-semibold text-lime-ink" : "border-line-firm bg-surface hover:bg-lime-wash"}`}>
                A to Z
              </Link>
              <Link href={sortHref("price")} className={`inline-flex min-h-10 items-center rounded-full border px-4 text-[14px] ${answers.sort === "price" ? "border-lime bg-lime font-semibold text-lime-ink" : "border-line-firm bg-surface hover:bg-lime-wash"}`}>
                Cheapest first
              </Link>
            </div>
          </div>

          {result.notes.length > 0 && (
            <ul className="mt-5 space-y-1.5 text-[13px] leading-5 text-muted">
              {result.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          )}

          {result.fits.length > 0 ? (
            <ul className="mt-8 space-y-4">
              {result.fits.map((r) => (
                <Row key={r.s.slug} row={r} seats={result.seats} />
              ))}
            </ul>
          ) : (
            <p className="mt-8 rounded-[16px] border border-line-firm bg-surface p-6 text-[15px] leading-6">
              No product with a published price fits all five answers. Loosen the budget, or read why products were left out below, then ask the vendors whose pages do not say.
            </p>
          )}

          {result.quoted.length > 0 && (
            <div className="mt-12">
              <h3 className="font-heading text-[24px] leading-8 font-bold tracking-[-0.02em]">Priced on request</h3>
              <p className="mt-2 max-w-[70ch] text-[14px] leading-6 text-muted">
                These vendors give no price, so a budget cannot rule them in or out. Ask each for twelve months in rand with VAT on its own line: <Link href="/briefings/how-to-ask-for-a-quote" className="prose-link">how to ask for a quote</Link>.
              </p>
              <ul className="mt-6 space-y-4">
                {result.quoted.map((r) => (
                  <Row key={r.s.slug} row={r} seats={result.seats} />
                ))}
              </ul>
            </div>
          )}

          {result.left.length > 0 && (
            <details className="mt-12 rounded-[16px] border border-line-firm bg-surface p-5">
              <summary className="cursor-pointer text-[15px] font-semibold">Why {result.left.length} {result.left.length === 1 ? "product is" : "products are"} not shown</summary>
              <ul className="mt-4 space-y-2 text-[14px] leading-6">
                {result.left.map(({ s, why }) => (
                  <li key={s.slug}>
                    <Link href={`/register/${s.slug}`} className="prose-link font-semibold">
                      {s.name}
                    </Link>
                    : {why}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[13px] leading-5 text-muted">A product left out because its pages do not state something may still do it. The register records only what a vendor&apos;s own page says, so ask the vendor.</p>
            </details>
          )}

          <div className="mt-12 flex flex-col gap-4 rounded-[20px] bg-lime-wash p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-heading text-[22px] leading-7 font-bold tracking-[-0.02em]">Saved a few? Put them side by side.</p>
              <p className="mt-1 text-[14px] leading-5 text-muted">Your shortlist stays in your browser, and you can share it as a link.</p>
            </div>
            <Link href="/shortlist" className={ctaClass("primary", "flex-none")}>
              Open my shortlist
            </Link>
          </div>
          <p className="mt-6 max-w-[80ch] text-[12px] leading-4 text-muted">
            Prices are the vendor&apos;s own, in rand, worked out for about {result.seats} people on the cheapest plan sold at that size. A budget compares the figure with VAT in where the vendor states its basis, so 15 percent is added to a price excluding VAT. A product with a free plan counts as within any budget, since you can start free, so read its limits.
          </p>
        </section>
      )}
    </>
  );
}
