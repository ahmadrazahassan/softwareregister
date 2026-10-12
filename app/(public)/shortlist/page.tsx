import type { Metadata } from "next";
import Link from "next/link";
import { AffiliateCTAButton } from "@/components/AffiliateCTAButton";
import { ctaClass } from "@/components/CtaButton";
import { LogoBadge } from "@/components/LogoBadge";
import { ShortlistManager } from "@/components/ShortlistManager";
import { outboundLink } from "@/lib/affiliates";
import { SA_STATUS_LABEL, saAvailability } from "@/lib/data/availability";
import { SECTORS } from "@/lib/data/sectors";
import { formatDateLong, priceLabel } from "@/lib/format";
import { getRegistry } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Your shortlist",
  description: "The business software you saved, side by side: price in rand, what each states about SARS returns and bank feeds, and where it is sold.",
  robots: { index: false, follow: true },
};

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function ShortlistPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const reg = await getRegistry();
  const slugs = [...new Set(one(sp.s).split(",").map((x) => x.trim()).filter(Boolean))].filter((s) => reg.bySlug.has(s)).slice(0, 8);
  const items = slugs.map((s) => reg.bySlug.get(s)!);
  const names = Object.fromEntries(reg.items.map((s) => [s.slug, s.name]));

  const rows: { label: string; cell: (s: (typeof items)[number]) => React.ReactNode }[] = [
    { label: "Category", cell: (s) => SECTORS.find((x) => x.slug === s.sector)?.name ?? s.sector },
    {
      label: "From",
      cell: (s) => {
        const p = priceLabel(s);
        return p.kind === "quoted" ? "On request" : <span className="font-semibold">{p.amount}</span>;
      },
    },
    { label: "Price basis", cell: (s) => priceLabel(s).basis || "" },
    { label: "Free plan", cell: (s) => (s.free_plan === true || s.starting_price === 0 ? "Yes" : "") },
    { label: "Free trial", cell: (s) => (s.free_trial === true ? "Yes" : "") },
    { label: "Demo", cell: (s) => (s.demo === true ? "Yes" : "") },
    { label: "Sold in South Africa", cell: (s) => (saAvailability(s.slug).status === "local" ? SA_STATUS_LABEL.local : "") },
    { label: "SARS and legal items stated", cell: (s) => (s.compliance?.length ? s.compliance.join(", ") : "") },
    { label: "Bank feeds stated", cell: (s) => (s.bank_feeds?.length ? s.bank_feeds.join(", ") : "") },
    { label: "Price read", cell: (s) => (s.price_checked_at ? formatDateLong(s.price_checked_at) : "") },
  ];

  return (
    <>
      <header className="mx-auto w-full max-w-[1120px] px-6 pt-12 lg:pt-16">
        <p className="stamp mb-4 text-muted">Your shortlist</p>
        <h1 className="max-w-[860px] font-heading text-[38px] leading-[42px] font-bold tracking-[-0.03em] md:text-[60px] md:leading-[62px]">The products you saved, side by side.</h1>
        <p className="mt-6 max-w-[680px] text-[17px] leading-7 text-muted">
          Prices in rand with their basis, and only what each vendor&apos;s own pages state. A blank cell means the pages the register read do not say, which is not the same as no. The register does not rank what you save.
        </p>
      </header>

      <div className="mx-auto mt-10 w-full max-w-[1120px] px-6 pb-12 lg:pb-[72px]">
        <ShortlistManager urlSlugs={slugs} names={names} />

        {items.length > 0 && (
          <section aria-label="Side by side" className="mt-12">
            <div className="overflow-x-auto rounded-[20px] border border-line-firm bg-surface">
              <table className="w-full min-w-[640px] border-collapse text-left text-[14px] leading-5">
                <caption className="sr-only">Your shortlist, side by side</caption>
                <thead>
                  <tr className="border-b border-line-firm">
                    <th scope="col" className="w-[190px] p-4 align-bottom">
                      <span className="sr-only">Detail</span>
                    </th>
                    {items.map((s) => (
                      <th key={s.slug} scope="col" className="min-w-[170px] p-4 align-bottom">
                        <LogoBadge slug={s.slug} name={s.name} size={44} />
                        <Link href={`/register/${s.slug}/reviews`} className="mt-3 block font-heading text-[18px] leading-6 font-bold tracking-[-0.01em] hover:underline hover:underline-offset-4">
                          {s.name}
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.label} className="border-b border-line align-top">
                      <th scope="row" className="p-4 text-[13px] font-semibold text-muted">
                        {r.label}
                      </th>
                      {items.map((s) => (
                        <td key={s.slug} className="p-4">
                          {r.cell(s) || <span className="sr-only">Not recorded</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <th scope="row" className="p-4 text-[13px] font-semibold text-muted">
                      Go to
                    </th>
                    {items.map((s) => {
                      const link = outboundLink(s);
                      return (
                        <td key={s.slug} className="p-4">
                          <div className="flex flex-col items-start gap-2">
                            {link && (
                              <AffiliateCTAButton slug={s.slug} href={link.href} affiliate={link.affiliate} placement="shortlist" variant="primary" className="min-h-10 px-4 text-[14px]">
                                Visit website
                              </AffiliateCTAButton>
                            )}
                            <Link href={`/register/${s.slug}/reviews`} className={ctaClass("quiet", "min-h-10 px-4 text-[14px]")}>
                              Read the review
                            </Link>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 max-w-[80ch] text-[12px] leading-4 text-muted">
              Prices are the vendor&apos;s own, converted to rand where the vendor lists in another currency. A per user or per employee price is the price of one. Read <Link href="/briefings/including-and-excluding-vat" className="prose-link">including and excluding VAT</Link> before you set two prices side by side.
            </p>
          </section>
        )}
      </div>
    </>
  );
}
