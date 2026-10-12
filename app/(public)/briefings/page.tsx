import type { Metadata } from "next";
import Link from "next/link";
import { BlogHero } from "@/components/BlogHero";
import { ctaClass } from "@/components/CtaButton";
import { GuideCard } from "@/components/GuideCard";
import { guideHero } from "@/lib/data/guide-heroes";
import { formatDateStamp } from "@/lib/format";
import { getRegistry, getTokens, loadBriefings } from "@/lib/queries";
import { fillTokens } from "@/lib/registry";
import { JsonLd, breadcrumbLd } from "@/lib/seo";
import type { BriefingTopic } from "@/lib/types";

export const metadata: Metadata = {
  title: "Guides",
  description: "Plain guides for South African buyers: what business software costs in rand, how to choose and test it, and what SARS, VAT, payroll law and POPIA ask of it.",
  alternates: { canonical: "/briefings" },
};

const TOPICS: { value: BriefingTopic; label: string }[] = [
  { value: "Pricing", label: "Pricing" },
  { value: "Buying", label: "Buying guides" },
  { value: "Compliance", label: "Compliance" },
];

export default async function BriefingsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.topic) ? sp.topic[0] : sp.topic;
  const topic = TOPICS.find((t) => t.value === raw)?.value;
  const [all, tokens, reg] = await Promise.all([loadBriefings(), getTokens(), getRegistry()]);
  const items = topic ? all.filter((b) => b.topic === topic) : all;
  const [lead, ...rest] = items;

  const chip = (on: boolean) =>
    `inline-flex min-h-10 items-center rounded-full border px-4 text-[14px] leading-5 font-medium ${on ? "border-lime bg-lime font-semibold text-lime-ink" : "border-line-firm bg-surface hover:bg-lime-wash"}`;

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Guides", path: "/briefings" }])} />
      <header className="mx-auto w-full max-w-[1280px] px-6 pt-14 pb-10 lg:pt-20">
        <p className="stamp mb-4 text-muted">The Software Register guides · {all.length} guides</p>
        <h1 className="max-w-[900px] font-heading text-[40px] leading-[42px] font-bold tracking-[-0.03em] md:text-[72px] md:leading-[72px]">
          South African software, in plain words.
        </h1>
        <p className="mt-6 max-w-[660px] text-[17px] leading-7 text-muted">
          What business software costs in rand, how to choose and test it, and what SARS, POPIA and the BCEA ask of it. Written for South African buyers, from the vendors&apos; own pages, and none of it paid for.
        </p>
        <div role="group" aria-label="Filter by topic" className="mt-8 flex flex-wrap gap-2">
          <Link href="/briefings" className={chip(!topic)}>
            All guides
          </Link>
          {TOPICS.map((t) => (
            <Link key={t.value} href={`/briefings?topic=${t.value}`} className={chip(topic === t.value)} aria-current={topic === t.value ? "true" : undefined}>
              {t.label}
            </Link>
          ))}
        </div>
      </header>

      <section aria-label="Guides" className="mx-auto w-full max-w-[1280px] px-6 pb-12 lg:pb-[72px]">
        {lead ? (
          <>
            <article className="group relative grid gap-8 border-t border-line-firm pt-10 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-14">
              <BlogHero hero={guideHero(lead.slug, lead.topic)} reg={reg} />
              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="rounded-full border border-line-firm px-2.5 py-1 text-[12px] leading-4 font-semibold">{lead.topic === "Buying" ? "Buying guide" : lead.topic}</span>
                  <span className="stamp text-muted">{formatDateStamp(lead.published_at)}</span>
                  <span className="stamp text-muted">{lead.read_minutes} min read</span>
                </div>
                <h2 className="mt-4 font-heading text-[30px] leading-9 font-bold tracking-[-0.02em] md:text-[40px] md:leading-[44px]">
                  <Link href={`/briefings/${lead.slug}`} className="after:absolute after:inset-0 group-hover:underline group-hover:underline-offset-4">
                    {lead.title}
                  </Link>
                </h2>
                <p className="mt-4 text-[16px] leading-7 text-muted">{fillTokens(lead.standfirst, tokens)}</p>
                <span className={ctaClass("blue", "mt-6")}>
                  Read the guide <span aria-hidden="true">→</span>
                </span>
              </div>
            </article>

            {rest.length > 0 && (
              <ul className="mt-16 grid gap-x-8 gap-y-14 border-t border-line-firm pt-12 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((b) => (
                  <li key={b.slug}>
                    <GuideCard b={b} tokens={tokens} reg={reg} />
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p className="border-t border-line-firm pt-10 text-[15px] leading-6 text-muted">No guides under this topic yet.</p>
        )}

        <p className="mt-14 max-w-[70ch] border-t border-line-firm pt-6 text-[13px] leading-5 text-muted">
          The guides explain rules in plain words. They have not been reviewed by a registered tax practitioner or a labour lawyer, and they are not tax, legal or financial advice. Check SARS, the Department of Employment and Labour and the Information Regulator for the rule that applies to you.
        </p>
      </section>

      <section aria-label="Price alerts" className="mx-auto w-full max-w-[1280px] px-6 pb-4">
        <div className="flex flex-col gap-6 rounded-[24px] bg-lime-wash p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <div className="max-w-[560px]">
            <h2 className="font-heading text-[28px] leading-8 font-bold tracking-[-0.02em] md:text-[36px] md:leading-10">Know when a price moves.</h2>
            <p className="mt-3 text-[15px] leading-6 text-muted">One short email when a price changes or a product is withdrawn. Nothing else, and no sign up to read the register.</p>
          </div>
          <Link href="/dispatch" className={ctaClass("primary", "min-h-12 flex-none px-7 text-[16px]")}>
            Get price alerts
          </Link>
        </div>
      </section>
    </>
  );
}
