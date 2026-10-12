import type { Metadata } from "next";
import Link from "next/link";
import { ctaClass } from "@/components/CtaButton";
import { SECTORS } from "@/lib/data/sectors";
import { resolveLists, type ListGroup } from "@/lib/lists";
import { getRegistry } from "@/lib/queries";
import { JsonLd, breadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Lists of business software for South Africa",
  description: "Free accounting software, payroll software with e@syFile, accounting software with a Capitec or FNB bank feed and more: each a page of products with prices in rand.",
  alternates: { canonical: "/lists" },
};

const GROUPS: { group: ListGroup; blurb: string }[] = [
  { group: "Price and plans", blurb: "Free plans, free trials, prices on request and entry prices, each in rand." },
  { group: "SARS and the law", blurb: "Products whose own pages state the VAT201, EMP201, EMP501, IRP5, IT3(a), e@syFile, UIF, SDL or BCEA leave." },
  { group: "Bank feeds", blurb: "Accounting software whose own pages list a feed with each South African bank the register asks about." },
  { group: "Sold in South Africa", blurb: "Products with a South African site, rand pricing, a local phone line or South African origin." },
];

export default async function ListsIndex() {
  const reg = await getRegistry();
  const lists = resolveLists(reg.items);

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Lists", path: "/lists" }])} />
      <header className="mx-auto w-full max-w-[1280px] px-6 pt-14 pb-10 lg:pt-20">
        <p className="stamp mb-4 text-muted">The Software Register lists · {lists.length} lists</p>
        <h1 className="max-w-[900px] font-heading text-[40px] leading-[42px] font-bold tracking-[-0.03em] md:text-[72px] md:leading-[72px]">
          The question you asked, answered from the register.
        </h1>
        <p className="mt-6 max-w-[660px] text-[17px] leading-7 text-muted">
          Each list is a filter of the register written out as a page: the products that state a free plan, a bank feed or a SARS return on their own pages, with prices in rand and the date each was read. They change when the register does.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/finder" className={ctaClass("primary", "min-h-12 px-7 text-[16px]")}>
            Build a shortlist
          </Link>
          <Link href="/register" className={ctaClass("quiet", "min-h-12 px-7 text-[16px]")}>
            Browse all software
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1280px] space-y-14 px-6 pb-12 lg:pb-[72px]">
        {GROUPS.map(({ group, blurb }) => {
          const inGroup = lists.filter((l) => l.def.group === group);
          if (inGroup.length === 0) return null;
          return (
            <section key={group} aria-labelledby={`g-${group}`} className="border-t border-line-firm pt-10">
              <h2 id={`g-${group}`} className="font-heading text-[30px] leading-9 font-bold tracking-[-0.02em]">
                {group}
              </h2>
              <p className="mt-2 max-w-[68ch] text-[15px] leading-6 text-muted">{blurb}</p>
              <div className="mt-8 space-y-8">
                {SECTORS.map((s) => {
                  const rows = inGroup.filter((l) => l.def.sector === s.slug);
                  if (rows.length === 0) return null;
                  return (
                    <div key={s.slug}>
                      <h3 className="stamp text-muted">{s.name}</h3>
                      <ul className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {rows.map((l) => (
                          <li key={l.def.slug}>
                            <Link href={`/lists/${l.def.slug}`} className="flex h-full flex-col rounded-[16px] border border-line-firm bg-surface p-5 transition-colors hover:border-ink">
                              <span className="font-heading text-[19px] leading-6 font-bold tracking-[-0.01em]">{l.def.title}</span>
                              <span className="mt-2 text-[13px] leading-5 text-muted">
                                {l.items.length} {l.items.length === 1 ? "product" : "products"}: {l.items.map((i) => i.name).join(", ")}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
