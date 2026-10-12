import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogHero } from "@/components/BlogHero";
import { BrandMark } from "@/components/BrandMark";
import { BriefingBody, slugifyHeading } from "@/components/BriefingBody";
import { ctaClass } from "@/components/CtaButton";
import { GuideCard } from "@/components/GuideCard";
import { RegisterTable } from "@/components/RegisterTable";
import { guideHero } from "@/lib/data/guide-heroes";
import { formatDateLong } from "@/lib/format";
import { getBriefing, getRegistry, getTokens, loadBriefings } from "@/lib/queries";
import { fillTokens } from "@/lib/registry";
import { JsonLd, articleLd, breadcrumbLd } from "@/lib/seo";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await loadBriefings()).map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const [b, tokens] = await Promise.all([getBriefing((await params).slug), getTokens()]);
  if (!b) return {};
  return {
    title: b.title,
    description: fillTokens(b.standfirst, tokens),
    alternates: { canonical: `/briefings/${b.slug}` },
    openGraph: { type: "article", publishedTime: b.published_at },
  };
}

export default async function BriefingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [b, reg, tokens, all] = await Promise.all([getBriefing(slug), getRegistry(), getTokens(), loadBriefings()]);
  if (!b) notFound();

  const contents = b.body.filter((x) => x.type === "h2").map((x) => ({ id: slugifyHeading(x.text), text: fillTokens(x.text, tokens) }));
  const named = b.product_slugs.map((s) => reg.bySlug.get(s)).filter((s): s is NonNullable<typeof s> => Boolean(s));
  const more = [...all.filter((x) => x.slug !== b.slug && x.topic === b.topic), ...all.filter((x) => x.slug !== b.slug && x.topic !== b.topic)].slice(0, 3);
  const topicLabel = b.topic === "Buying" ? "Buying guide" : b.topic;

  return (
    <>
      <JsonLd data={[articleLd(b), breadcrumbLd([{ name: "Guides", path: "/briefings" }, { name: b.title, path: `/briefings/${b.slug}` }])]} />

      <article>
        <header className="mx-auto w-full max-w-[1100px] px-6 pt-10 lg:pt-14">
          <Link href="/briefings" className="inline-flex items-center gap-2 text-[14px] leading-5 font-medium text-muted hover:text-ink">
            <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
            Back to the guides
          </Link>

          <h1 className="mt-8 max-w-[820px] font-heading text-[34px] leading-[38px] font-bold tracking-[-0.03em] md:text-[56px] md:leading-[58px]">{b.title}</h1>
          <p className="mt-6 max-w-[720px] text-[18px] leading-8 text-muted">{fillTokens(b.standfirst, tokens)}</p>

          <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-y border-line py-5 sm:grid-cols-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 flex-none place-items-center rounded-full border border-line-firm bg-surface">
                <BrandMark size={22} className="text-ink" />
              </span>
              <div>
                <dt className="sr-only">Author</dt>
                <dd className="m-0 text-[14px] leading-5 font-semibold">{b.author}</dd>
              </div>
            </div>
            <div>
              <dt className="stamp text-muted">Topic</dt>
              <dd className="m-0 mt-0.5 text-[14px] leading-5 font-semibold">{topicLabel}</dd>
            </div>
            <div>
              <dt className="stamp text-muted">Date</dt>
              <dd className="m-0 mt-0.5 text-[14px] leading-5 font-semibold">{formatDateLong(b.published_at)}</dd>
            </div>
            <div>
              <dt className="stamp text-muted">Reading time</dt>
              <dd className="m-0 mt-0.5 text-[14px] leading-5 font-semibold">{b.read_minutes} minutes</dd>
            </div>
          </dl>
        </header>

        <div className="mx-auto mt-10 w-full max-w-[1100px] px-6">
          <BlogHero hero={guideHero(b.slug, b.topic)} reg={reg} />
        </div>

        <div className="mx-auto mt-12 w-full max-w-[720px] px-6">
          {contents.length >= 3 && (
            <nav aria-label="In this guide" className="mb-10 rounded-[20px] border border-line-firm bg-surface p-6">
              <p className="stamp text-muted">In this guide</p>
              <ol className="mt-4 space-y-2.5">
                {contents.map((c, i) => (
                  <li key={c.id} className="flex gap-3 text-[15px] leading-6">
                    {!/^\d/.test(c.text) && (
                      <span aria-hidden="true" className="w-6 flex-none text-muted tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    )}
                    <a href={`#${c.id}`} className="font-medium hover:underline hover:underline-offset-4">
                      {c.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <BriefingBody blocks={b.body} reg={reg} tokens={tokens} />

          <p className="mt-10 border-t border-line pt-5 text-[13px] leading-5 text-muted">
            This guide explains rules in plain words for South African buyers. It is not tax, legal or financial advice, and it has not been reviewed by a registered tax practitioner or an attorney. Check SARS or the regulator named above for the rule that applies to you.
          </p>

          <div className="mt-10 flex flex-col gap-4 rounded-[20px] bg-lime-wash p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-heading text-[22px] leading-7 font-bold tracking-[-0.02em]">Know when a price moves.</p>
              <p className="mt-1 text-[14px] leading-5 text-muted">One short email when a price changes or a product is withdrawn.</p>
            </div>
            <Link href="/dispatch" className={ctaClass("primary", "flex-none")}>
              Get price alerts
            </Link>
          </div>
        </div>
      </article>

      {named.length > 0 && (
        <section aria-labelledby="named-title" className="mx-auto mt-16 w-full max-w-[1100px] px-6">
          <h2 id="named-title" className="mb-6 font-heading text-[26px] leading-8 font-bold tracking-[-0.02em]">
            Products named in this guide
          </h2>
          <RegisterTable items={named} caption="Products named in this guide" />
        </section>
      )}

      {more.length > 0 && (
        <section aria-labelledby="more-title" className="mx-auto mt-20 w-full max-w-[1280px] px-6 pb-12 lg:pb-[72px]">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-line-firm pt-12">
            <h2 id="more-title" className="font-heading text-[30px] leading-9 font-bold tracking-[-0.02em]">
              Keep reading
            </h2>
            <Link href="/briefings" className="text-[14px] text-lime-text underline underline-offset-4">
              All guides
            </Link>
          </div>
          <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {more.map((g) => (
              <li key={g.slug}>
                <GuideCard b={g} tokens={tokens} reg={reg} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
