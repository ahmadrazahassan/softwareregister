import type { Metadata } from "next";
import Link from "next/link";
import { BlogCard } from "@/components/BlogCard";
import { BlogHero } from "@/components/BlogHero";
import { ctaClass } from "@/components/CtaButton";
import { BLOG_CATEGORIES, getBlogPosts, readMinutes } from "@/lib/data/blog";
import { formatDateStamp } from "@/lib/format";
import { getRegistry } from "@/lib/queries";
import { JsonLd, breadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on what business software costs in South Africa: prices read from the vendors, what changed, and how to read a quote. Written for South African buyers.",
  alternates: { canonical: "/blog" },
};

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function BlogIndex({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const category = one(sp.category);
  const reg = await getRegistry();
  const all = getBlogPosts();
  const posts = category && (BLOG_CATEGORIES as readonly string[]).includes(category) ? all.filter((p) => p.category === category) : all;
  const [lead, ...rest] = posts;

  const chip = (on: boolean) =>
    `inline-flex min-h-10 items-center rounded-full border px-4 text-[14px] leading-5 font-medium ${on ? "border-lime bg-lime font-semibold text-lime-ink" : "border-line-firm bg-surface hover:bg-lime-wash"}`;

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Blog", path: "/blog" }])} />
      <header className="mx-auto w-full max-w-[1280px] px-6 pt-14 pb-10 lg:pt-20">
        <p className="stamp mb-4 text-muted">The Software Register blog</p>
        <h1 className="max-w-[900px] font-heading text-[40px] leading-[42px] font-bold tracking-[-0.03em] md:text-[72px] md:leading-[72px]">
          What changed, and what it costs in rand.
        </h1>
        <p className="mt-6 max-w-[620px] text-[17px] leading-7 text-muted">
          Dated notes on business software prices in South Africa, written from the vendors&apos; own pages. No ratings, no rankings, and nothing here is paid for.
        </p>
        <div role="group" aria-label="Filter by category" className="mt-8 flex flex-wrap gap-2">
          <Link href="/blog" className={chip(!category)}>
            All posts
          </Link>
          {BLOG_CATEGORIES.map((c) => (
            <Link key={c} href={`/blog?category=${encodeURIComponent(c)}`} className={chip(category === c)} aria-current={category === c ? "true" : undefined}>
              {c}
            </Link>
          ))}
        </div>
      </header>

      <section aria-label="Posts" className="mx-auto w-full max-w-[1280px] px-6 pb-12 lg:pb-[72px]">
        {lead ? (
          <>
            <article className="group relative grid gap-8 border-t border-line-firm pt-10 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-14">
              <BlogHero hero={lead.hero} reg={reg} />
              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="rounded-full border border-line-firm px-2.5 py-1 text-[12px] leading-4 font-semibold">{lead.category}</span>
                  <span className="stamp text-muted">{formatDateStamp(lead.published_at)}</span>
                  <span className="stamp text-muted">{readMinutes(lead)} min read</span>
                </div>
                <h2 className="mt-4 font-heading text-[30px] leading-9 font-bold tracking-[-0.02em] md:text-[40px] md:leading-[44px]">
                  <Link href={`/blog/${lead.slug}`} className="after:absolute after:inset-0 group-hover:underline group-hover:underline-offset-4">
                    {lead.title}
                  </Link>
                </h2>
                <p className="mt-4 text-[16px] leading-7 text-muted">{lead.standfirst}</p>
                <span className={ctaClass("blue", "mt-6")}>
                  Read the post <span aria-hidden="true">→</span>
                </span>
              </div>
            </article>

            {rest.length > 0 && (
              <ul className="mt-16 grid gap-x-8 gap-y-14 border-t border-line-firm pt-12 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((p) => (
                  <li key={p.slug}>
                    <BlogCard post={p} reg={reg} />
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p className="border-t border-line-firm pt-10 text-[15px] leading-6 text-muted">No posts in this category yet.</p>
        )}
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
