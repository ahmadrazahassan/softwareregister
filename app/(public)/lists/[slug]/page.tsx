import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ctaClass } from "@/components/CtaButton";
import { GuideCard } from "@/components/GuideCard";
import { RegisterTable } from "@/components/RegisterTable";
import { buildListDefs, nameList, resolveLists } from "@/lib/lists";
import { getRegistry, getTokens, loadBriefings } from "@/lib/queries";
import { registerHref, sectorOf } from "@/lib/registry";
import { JsonLd, breadcrumbLd, faqLd, itemListLd } from "@/lib/seo";

export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  // Lists are resolved against the bundled data here, so every list that can exist is built ahead. A list that is empty at request time is a 404.
  return buildListDefs().map((d) => ({ slug: d.slug }));
}

async function load(slug: string) {
  const reg = await getRegistry();
  const found = resolveLists(reg.items).find((l) => l.def.slug === slug);
  return { reg, found };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { found } = await load((await params).slug);
  if (!found) return {};
  return {
    title: found.def.title,
    description: found.def.description,
    alternates: { canonical: `/lists/${found.def.slug}` },
  };
}

export default async function ListPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { reg, found } = await load(slug);
  if (!found) notFound();
  const { def, items, query } = found;

  const [briefings, tokens] = await Promise.all([loadBriefings(), getTokens()]);
  const guides = def.guides.map((g) => briefings.find((b) => b.slug === g)).filter((b): b is NonNullable<typeof b> => Boolean(b)).slice(0, 3);
  const sector = sectorOf(def.sector);
  const siblings = resolveLists(reg.items).filter((l) => l.def.slug !== def.slug && (l.def.sector === def.sector || l.def.group === def.group)).slice(0, 10);
  const names = items.map((s) => s.name);
  const checked = items.map((s) => s.price_checked_at).filter((d): d is string => Boolean(d)).sort().reverse()[0];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([{ name: "Lists", path: "/lists" }, { name: def.title, path: `/lists/${def.slug}` }]),
          itemListLd(def.title, items.map((s) => ({ name: s.name, path: `/register/${s.slug}` }))),
          faqLd(def.faqs),
        ]}
      />

      <header className="mx-auto w-full max-w-[1120px] px-6 pt-10 lg:pt-14">
        <Link href="/lists" className="inline-flex items-center gap-2 text-[14px] leading-5 font-medium text-muted hover:text-ink">
          <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
          All lists
        </Link>
        <p className="stamp mt-8 mb-3 text-muted">
          {def.group}
          {sector ? ` · ${sector.name}` : ""}
        </p>
        <h1 className="max-w-[900px] font-heading text-[36px] leading-[40px] font-bold tracking-[-0.03em] md:text-[60px] md:leading-[62px]">{def.title}</h1>
        <p className="mt-6 max-w-[720px] text-[18px] leading-8 text-muted">
          {items.length === 1
            ? `One product on the register meets this rule: ${names[0]}.`
            : `${items.length} products on the register meet this rule: ${nameList(names)}.`}{" "}
          {def.rule}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href={registerHref(query)} className={ctaClass("primary")}>
            Open as a filter on the register
          </Link>
          {items.length >= 2 && (
            <Link href={`/versus?a=${items[0].slug}&b=${items[1].slug}`} className={ctaClass("blue")}>
              Compare {items[0].name} with {items[1].name}
            </Link>
          )}
          <Link href="/finder" className={ctaClass("quiet")}>
            Build a shortlist
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1120px] px-6 pt-12 pb-12 lg:pb-[72px]">
        <section aria-labelledby="products-title">
          <h2 id="products-title" className="font-heading text-[28px] leading-8 font-bold tracking-[-0.02em] md:text-[34px] md:leading-10">
            {items.length === 1 ? "The product" : "The products"}
          </h2>
          <p className="mt-3 max-w-[68ch] text-[15px] leading-6 text-muted">
            Every price is the vendor&apos;s own, in rand, with the date it was read{checked ? `, the latest on this list being ${new Date(checked).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })}` : ""}. A product is here only where its own pages state it. A product that is not here may still do it: the pages the register read do not say, so ask the vendor and ask to see it work.
          </p>
          <div className="mt-6">
            <RegisterTable items={items} caption={def.title} />
          </div>
        </section>

        <section aria-labelledby="ask-title" className="mt-16 border-t border-line-firm pt-12">
          <h2 id="ask-title" className="font-heading text-[28px] leading-8 font-bold tracking-[-0.02em] md:text-[34px] md:leading-10">
            Questions to put to the vendor
          </h2>
          <ul className="mt-6 grid max-w-[900px] gap-3 md:grid-cols-2">
            {def.asks.map((a) => (
              <li key={a} className="rounded-[16px] border border-line-firm bg-surface p-5 text-[15px] leading-6">
                {a}
              </li>
            ))}
          </ul>
        </section>

        {guides.length > 0 && (
          <section aria-labelledby="guides-title" className="mt-16 border-t border-line-firm pt-12">
            <h2 id="guides-title" className="font-heading text-[28px] leading-8 font-bold tracking-[-0.02em] md:text-[34px] md:leading-10">
              Guides that help
            </h2>
            <ul className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map((g) => (
                <li key={g.slug}>
                  <GuideCard b={g} tokens={tokens} reg={reg} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="faq-title" className="mt-16 border-t border-line-firm pt-12">
          <h2 id="faq-title" className="font-heading text-[28px] leading-8 font-bold tracking-[-0.02em] md:text-[34px] md:leading-10">
            Questions
          </h2>
          <div className="mt-6 max-w-[860px] border-t border-line-firm">
            {def.faqs.map((f) => (
              <details key={f.q} className="group border-b border-line-firm py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-heading text-[18px] leading-6 font-bold tracking-[-0.01em] marker:content-none">
                  {f.q}
                  <span aria-hidden="true" className="grid h-8 w-8 flex-none place-items-center rounded-full border border-line-firm text-[18px] leading-none group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-[70ch] text-[15px] leading-7 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {siblings.length > 0 && (
          <section aria-labelledby="more-title" className="mt-16 border-t border-line-firm pt-12">
            <h2 id="more-title" className="font-heading text-[28px] leading-8 font-bold tracking-[-0.02em] md:text-[34px] md:leading-10">
              More lists
            </h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {siblings.map((l) => (
                <li key={l.def.slug}>
                  <Link href={`/lists/${l.def.slug}`} className="inline-flex min-h-10 items-center rounded-full border border-line-firm bg-surface px-4 text-[14px] leading-5 font-medium hover:bg-lime-wash">
                    {l.def.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="mt-12 max-w-[70ch] text-[13px] leading-5 text-muted">
          The register publishes no rating and no ranking. This list is in alphabetical order and is a filter of the register written out as a page, not a recommendation. Read <Link href="/method" className="prose-link">how the register works</Link>.
        </p>
      </div>
    </>
  );
}
