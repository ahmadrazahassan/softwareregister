import { ChevronRight, Info } from "lucide-react";
import Link from "next/link";
import { ctaClass } from "@/components/CtaButton";
import { FeaturedCard } from "@/components/FeaturedCard";
import { DispatchForm } from "@/components/forms/DispatchForm";
import { GuideCard } from "@/components/GuideCard";
import { BlogCard } from "@/components/BlogCard";
import { ProductDirectory, type DirectoryItem } from "@/components/ProductDirectory";
import { Section } from "@/components/primitives";
import { SaFlag } from "@/components/SaFlag";
import { SoftwareCard } from "@/components/SoftwareCard";
import { SponsoredBanner } from "@/components/SponsoredBanner";
import { StatTiles } from "@/components/StatTiles";
import { VersusCard } from "@/components/VersusCard";
import { saAvailability } from "@/lib/data/availability";
import { getBlogPosts } from "@/lib/data/blog";
import { FEATURED_SLUGS } from "@/lib/data/featured";
import { priceLabel } from "@/lib/format";
import {
  getLatestBriefings,
  getRegistry,
  getResolvedComparisons,
  getSiteStats,
  getTokens,
  loadSectors,
} from "@/lib/queries";
import { getLatestReviews } from "@/lib/queries/reviews";
import { buildSummary } from "@/lib/registry";
import type { PricedSoftware } from "@/lib/types";

export const revalidate = 3600;

/** The rules the register tracks, each linking to the briefing that explains it. */
const HERO_CHIPS = [
  { label: "VAT201", href: "/briefings/vat-and-the-vat201-return" },
  { label: "EMP501", href: "/briefings/payroll-returns-emp201-emp501-irp5" },
  { label: "BCEA leave", href: "/briefings/bcea-leave-what-hr-software-must-accrue" },
  { label: "SARS eFiling", href: "/method" },
  { label: "bank feeds", href: "/briefings/bank-feeds-by-bank" },
] as const;

export default async function FrontPage() {
  const [stats, reg, sectors, comparisons, briefings, tokens, latest] = await Promise.all([
    getSiteStats(),
    getRegistry(),
    loadSectors(),
    getResolvedComparisons(),
    getLatestBriefings(8),
    getTokens(),
    getLatestReviews(),
  ]);

  const versus = comparisons.slice(0, 3);
  // The editors' list, in its own order. A slug that is not on the register is skipped.
  const featured = FEATURED_SLUGS.map((slug) => reg.bySlug.get(slug)).filter((s): s is PricedSoftware => Boolean(s));
  // Products whose starting price is zero, in the register's alphabetical order.
  const free = reg.items.filter((s) => s.starting_price === 0);
  // Every product, as the compact tiles of the wide directory below the featured row.
  const directory: DirectoryItem[] = reg.items.map((s) => {
    const p = priceLabel(s);
    return {
      slug: s.slug,
      name: s.name,
      vendor: s.vendor,
      sector: s.sector,
      price: p.kind === "quoted" ? "Price on request" : p.kind === "free" ? "Free to start" : `From ${p.amount} ${p.basis}`.trim(),
      onRequest: p.kind === "quoted",
      local: saAvailability(s.slug).status === "local",
      plans: s.pricing_plans.filter((x) => x.price !== null).length,
    };
  });

  return (
    <>
      {/* 1. Hero. Centred, no image: a huge headline, a sentence with its rules set as chips, one big action. */}
      <section aria-labelledby="hero-title" className="mx-auto w-full max-w-[1120px] px-6 pt-14 pb-12 text-center lg:pt-[88px] lg:pb-[72px]">
        <p className="stamp mb-6 inline-flex items-center justify-center gap-2.5 text-muted">
          <SaFlag height={16} />
          South African business software
        </p>
        <h1
          id="hero-title"
          className="mx-auto max-w-[980px] font-heading text-[42px] leading-[44px] font-bold tracking-[-0.03em] md:text-[68px] md:leading-[68px] lg:text-[88px] lg:leading-[86px]"
        >
          What this software actually costs in rand.
        </h1>

        <p className="mx-auto mt-10 max-w-[880px] text-[18px] leading-[3rem] md:text-[20px]">
          We track {stats.products} products against{" "}
          {HERO_CHIPS.map((chip, i) => (
            <span key={chip.label}>
              <Link href={chip.href} className="chip">
                {chip.label}
              </Link>
              {i < HERO_CHIPS.length - 2 ? " " : i === HERO_CHIPS.length - 2 ? " and " : "."}
            </span>
          ))}
        </p>
        <p className="mx-auto mt-3 max-w-[560px] text-[15px] leading-6 text-muted">Every price is read from the vendor&apos;s own page and carries the date.</p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <span className="cta-halo">
              <Link href="/register" className={ctaClass("primary", "min-h-14 px-8 text-[17px]")}>
                Browse all software <span aria-hidden="true">→</span>
              </Link>
            </span>
            <Link href="/write-a-review" className={ctaClass("quiet", "min-h-14 px-7 text-[16px]")}>
              Write a review
            </Link>
          </div>
          <p className="font-mono text-[12px] leading-4 text-muted">(No sign up. No paywall. Prices in rand.)</p>
          <Link href="/versus" className="text-[14px] text-lime-text underline underline-offset-4">
            or compare two products head to head
          </Link>
        </div>
      </section>

      {/* 2. Featured software: five products in a row, each with one way out. */}
      {featured.length > 0 && (
        <section aria-labelledby="featured-title" className="mx-auto w-full max-w-[1120px] px-6 pb-12 lg:pb-[72px]">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h2 id="featured-title" className="font-heading text-[28px] leading-8 font-bold tracking-[-0.02em]">
              Featured software
            </h2>
            <Link href="/register" className="text-[13px] text-lime-text underline underline-offset-4">
              All {stats.products} products
            </Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {featured.map((s) => (
              <li key={s.slug}>
                <FeaturedCard s={s} />
              </li>
            ))}
          </ul>
          <div className="mt-5 flex gap-3 rounded-[12px] border border-line bg-surface px-4 py-3">
            <Info size={18} strokeWidth={1.5} aria-hidden="true" className="mt-0.5 flex-none text-muted" />
            <p className="text-[13px] leading-5 text-muted">
              Featured software is chosen by our editors, and a vendor cannot pay to be featured. Where a link is an affiliate link we say so, and we earn a commission if you buy. It does not change what we publish or the order of the register. Read the{" "}
              <Link href="/affiliate-disclosure" className="prose-link">affiliate disclosure</Link>.
            </p>
          </div>
        </section>
      )}

      {/* 2b. Every product on the register, as tiles with a chip per category. */}
      <section aria-labelledby="directory-title" className="mx-auto w-full max-w-[1120px] px-6 pb-12 lg:pb-[72px]">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h2 id="directory-title" className="font-heading text-[28px] leading-8 font-bold tracking-[-0.02em]">
            Browse all {stats.products} products
          </h2>
          <Link href="/register" className="text-[13px] text-lime-text underline underline-offset-4">
            Open the full register with filters
          </Link>
        </div>
        <p className="mb-6 max-w-[720px] text-[15px] leading-6 text-muted">
          Accounting, payroll, HR, CRM, ERP and project management software, each with what it starts at in rand. Open one to see every plan, its features and how it handles SARS.
        </p>
        <ProductDirectory items={directory} sectors={sectors.map((s) => ({ slug: s.slug, name: s.name }))} />
      </section>

      {/* 3. Four numbers, as tiles. */}
      <section aria-label="The register in numbers" className="mx-auto w-full max-w-[1080px] px-6 pb-12 lg:pb-[72px]">
        <StatTiles
          tiles={[
            { value: String(stats.products), label: "Products", note: "across six categories", href: "/register" },
            { value: String(stats.sectors), label: "Categories", note: "accounting to projects", href: "/sectors" },
            { value: String(stats.comparisons), label: "Comparisons", note: "two products at a time", href: "/versus" },
            { value: String(stats.briefings), label: "Guides", note: "prices, VAT and payroll", href: "/briefings" },
          ]}
        />
      </section>

      {/* 4. Categories, as a plain list of rows with a count and a chevron. */}
      <Section title="Discover software by category" aside={<Link href="/sectors" className="text-[13px] text-lime-text underline underline-offset-4">All categories</Link>}>
        <ul className="grid gap-x-12 border-t border-line-firm sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sec) => {
            const count = reg.items.filter((s) => s.sector === sec.slug).length;
            return (
              <li key={sec.slug} className="border-b border-line-firm">
                <Link href={`/sector/${sec.slug}`} className="flex items-center justify-between gap-4 py-5 hover:bg-lime-wash sm:px-1">
                  <span className="min-w-0">
                    <span className="block font-heading text-[19px] leading-6 font-bold tracking-[-0.01em]">{sec.label}</span>
                    <span className="block truncate text-[13px] leading-5 text-muted">{sec.description}</span>
                  </span>
                  <span className="flex flex-none items-center gap-2">
                    <span className="stamp text-muted">{count}</span>
                    <ChevronRight size={18} strokeWidth={1.5} aria-hidden="true" className="text-ink" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-8">
          <Link href="/register" className={ctaClass("blue", "min-h-12 px-7")}>
            Browse all software <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Section>

      {/* 5. Products that start free, as listings. A fact about the price, not a pick. */}
      <Section title="Start free" aside={<Link href="/register?price=free" className="text-[13px] text-lime-text underline underline-offset-4">All {free.length} that start free</Link>}>
        <p className="-mt-3 mb-6 max-w-[720px] text-[14px] leading-6 text-muted">
          Products whose starting price is zero, in alphabetical order. A free tier usually limits users, storage or features, so check what it leaves out.
        </p>
        <ul className="space-y-5">
          {free.slice(0, 4).map((s) => (
            <li key={s.slug}>
              <SoftwareCard s={s} placement="home-card" review={latest.get(s.slug)} />
            </li>
          ))}
        </ul>
      </Section>

      {/* 6. How the register works. Three claims, each one true of how the data is handled. */}
      <Section title="How the register works">
        <ol className="grid gap-x-10 gap-y-8 border-t border-line-firm pt-8 md:grid-cols-3">
          {[
            {
              n: "01",
              title: "Every price is read from the vendor",
              body: "We record the price on the vendor's own pricing page, whether VAT is inside it, and the date we read it. Where a vendor gives its price on request, we say so.",
            },
            {
              n: "02",
              title: "Every price in rand",
              body: "Prices are shown in rand for South African buyers, with VAT stated wherever the vendor states it. Where a vendor lists in another currency, we convert it at the day's rate and say which rate.",
            },
            {
              n: "03",
              title: "Listed A to Z, never by commission",
              body: "The register carries no ranking and no rating. Products are listed alphabetically, and you can sort by price or by the date the price was read. Affiliate links and sponsorships do not change the order.",
            },
          ].map((step) => (
            <li key={step.n}>
              <p className="font-heading text-[44px] leading-[44px] font-bold tracking-[-0.03em] text-line-firm">{step.n}</p>
              <h3 className="mt-4 font-heading text-[20px] leading-6 font-bold tracking-[-0.01em]">{step.title}</h3>
              <p className="mt-3 text-[14px] leading-6 text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <Link href="/method" className={ctaClass("quiet", "min-h-12 px-7")}>
            How it works
          </Link>
        </div>
      </Section>

      {/* 7. Head to head, as three compact cards. */}
      {versus.length > 0 && (
        <Section title="Head to head" aside={<Link href="/versus" className="text-[13px] text-lime-text underline underline-offset-4">All {stats.comparisons} comparisons</Link>}>
          <ul className="grid gap-5 md:grid-cols-3">
            {versus.map((c) => (
              <li key={c.slug}>
                <VersusCard slug={c.slug} a={c.a_software} b={c.b_software} summary={buildSummary(c.a_software, c.b_software)} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* 8. Sponsored. The label stays visible. */}
      <Section tight>
        <SponsoredBanner slot="leaderboard" />
      </Section>

      {/* 8b. The blog: the three latest posts, each with its own picture drawn from the register. */}
      <section aria-labelledby="blog-title" className="mx-auto w-full max-w-[1120px] px-6 pb-12 lg:pb-[72px]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-t border-line-firm pt-12 lg:pt-[72px]">
          <div>
            <p className="stamp mb-2 text-muted">The Software Register blog</p>
            <h2 id="blog-title" className="font-heading text-[32px] leading-9 font-bold tracking-[-0.02em] md:text-[40px] md:leading-[44px]">
              What changed, and what it costs.
            </h2>
          </div>
          <Link href="/blog" className={ctaClass("quiet", "min-h-11 px-5")}>
            All posts <span aria-hidden="true">→</span>
          </Link>
        </div>
        <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {getBlogPosts()
            .slice(0, 3)
            .map((p) => (
              <li key={p.slug}>
                <BlogCard post={p} reg={reg} />
              </li>
            ))}
        </ul>
      </section>

      {/* 9. Reviews and listings: the two things a reader or a vendor can do here. */}
      <Section title="Add to the register">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex flex-col rounded-[16px] border border-line-firm bg-surface p-6">
            <p className="stamp text-muted">Readers</p>
            <h3 className="mt-3 font-heading text-[24px] leading-7 font-bold tracking-[-0.01em]">Used one of these? Write a review.</h3>
            <p className="mt-3 max-w-[48ch] text-[14px] leading-6 text-muted">
              Anyone can review any product. Say what it did well, where it fell short and who it suits. An editor reads every review before it appears.
            </p>
            <div className="mt-6">
              <Link href="/write-a-review" className={ctaClass("primary", "min-h-12 px-7")}>
                Write a review
              </Link>
            </div>
          </div>
          <div className="flex flex-col rounded-[16px] border border-line-firm bg-surface p-6">
            <p className="stamp text-muted">Vendors</p>
            <h3 className="mt-3 font-heading text-[24px] leading-7 font-bold tracking-[-0.01em]">Not on the register? Add a product.</h3>
            <p className="mt-3 max-w-[48ch] text-[14px] leading-6 text-muted">
              A listing is free and does not buy a better position. We read the price from your own pages and date it.
            </p>
            <div className="mt-6">
              <Link href="/add-a-product" className={ctaClass("quiet", "min-h-12 px-7")}>
                Add a product
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* 10. Guides, as picture cards, the same shape as the blog's. */}
      <section aria-labelledby="guides-title" className="mx-auto w-full max-w-[1120px] px-6 pb-12 lg:pb-[72px]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-t border-line-firm pt-12 lg:pt-[72px]">
          <div>
            <p className="stamp mb-2 text-muted">The Software Register guides</p>
            <h2 id="guides-title" className="font-heading text-[32px] leading-9 font-bold tracking-[-0.02em] md:text-[40px] md:leading-[44px]">
              South African software, in plain words.
            </h2>
          </div>
          <Link href="/briefings" className={ctaClass("quiet", "min-h-11 px-5")}>
            All {stats.briefings} guides <span aria-hidden="true">→</span>
          </Link>
        </div>
        <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {briefings.slice(0, 3).map((b) => (
            <li key={b.slug}>
              <GuideCard b={b} tokens={tokens} reg={reg} />
            </li>
          ))}
        </ul>
      </section>

      {/* 11. Price alerts. The one inverted block. */}
      <section className="mx-auto w-full max-w-[1080px] px-6 pb-12 lg:pb-[72px]">
        <div className="grid gap-8 rounded-[20px] bg-panel p-6 text-panel-ink md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-center md:p-12">
          <div>
            <p className="stamp text-lime">Price alerts</p>
            <h2 className="mt-3 font-heading text-[28px] leading-8 font-bold tracking-[-0.02em] text-panel-ink md:text-[34px] md:leading-10">Know when a price moves.</h2>
            <p className="mt-3 max-w-[420px] text-[15px] leading-6 text-panel-ink/85">
              We send a note when a price changes or a product is withdrawn. Nothing else.
            </p>
          </div>
          <DispatchForm inverted />
        </div>
      </section>
    </>
  );
}
