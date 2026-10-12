import { Check } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AffiliateCTAButton } from "@/components/AffiliateCTAButton";
import { CtaLink } from "@/components/CtaButton";
import { FxNote } from "@/components/FxNote";
import { CheckedStamp, Note, Section } from "@/components/primitives";
import { PriceContextCard, PriceSourceCard, PricingCard } from "@/components/PricingCard";
import { ProductLogo } from "@/components/ProductLogo";
import { ReviewRow } from "@/components/ReviewRow";
import { ShortlistButton } from "@/components/ShortlistButton";
import { AFFILIATE_DISCLOSURE_SHORT, outboundLink } from "@/lib/affiliates";
import { SCREENSHOTS } from "@/lib/data/assets.generated";
import { SaFlag } from "@/components/SaFlag";
import { saAvailability, SA_STATUS_LABEL } from "@/lib/data/availability";
import { priceLabel } from "@/lib/format";
import { getAllSoftware, getFxRates, getRegistry, getSoftwareBySlug, loadSectors } from "@/lib/queries";
import { getTopReviews } from "@/lib/queries/reviews";
import { alternativesFor, assessmentFor, sarsStatus, sectorOf } from "@/lib/registry";
import { JsonLd, breadcrumbLd, softwareLd } from "@/lib/seo";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getAllSoftware()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = await getSoftwareBySlug((await params).slug);
  if (!s) return {};
  const p = priceLabel(s);
  const price = p.kind === "quoted" ? "quoted on request" : p.kind === "free" ? "starts free" : `from ${p.amount} ${p.basis}`.trim();
  return {
    title: `${s.name}: price in rand and SARS filing`,
    description: `${s.name} by ${s.vendor}. ${price.charAt(0).toUpperCase()}${price.slice(1)}. ${s.summary}`,
    alternates: { canonical: `/register/${s.slug}` },
  };
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0 border-b border-line py-4 sm:pr-4">
      <dt className="stamp mb-1 text-muted">{label}</dt>
      <dd className="m-0 text-[15px] leading-6 font-semibold">{children}</dd>
    </div>
  );
}

const yesNo = (v: boolean) => (v ? "Yes" : "No");

export default async function RecordPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [s, reg, sectors, rates] = await Promise.all([getSoftwareBySlug(slug), getRegistry(), loadSectors(), getFxRates()]);
  if (!s) notFound();

  const [reviews] = await Promise.all([getTopReviews(s.slug, 10)]);
  const sector = sectorOf(s.sector, sectors);
  const price = priceLabel(s);
  const sars = sarsStatus(s);
  const link = outboundLink(s);
  const assessment = assessmentFor(s, reg, sectors);
  const alternatives = alternativesFor(s, reg, 4);
  const shots = SCREENSHOTS[s.slug] ?? [];
  const sa = saAvailability(s.slug);
  const hasCompliance = s.compliance !== null && s.compliance.length > 0;
  const hasBanks = s.bank_feeds !== null && s.bank_feeds.length > 0;

  return (
    <>
      <JsonLd
        data={[
          softwareLd(s),
          breadcrumbLd([
            { name: "Software", path: "/register" },
            { name: s.name, path: `/register/${s.slug}` },
          ]),
        ]}
      />

      {/* Masthead block. */}
      <header className="mx-auto w-full max-w-[1080px] px-6 pt-10 pb-8 lg:pt-14">
        <nav aria-label="Breadcrumb" className="stamp mb-6 text-muted">
          <Link href="/register" className="hover:text-ink">Register</Link>
          <span aria-hidden="true"> / </span>
          <Link href={`/sector/${s.sector}`} className="hover:text-ink">{sector?.name ?? s.sector}</Link>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
            {/* The logo is set large and bare. No tile, no circle, no background. */}
            <ProductLogo slug={s.slug} name={s.name} height={96} fallback="none" priority />
            <div>
              <h1 className="font-heading text-[32px] leading-9 font-bold tracking-[-0.02em] md:text-[44px] md:leading-[46px]">{s.name}</h1>
              <p className="mt-2 text-[13px] leading-5 text-muted">
                {s.vendor} · {sector?.label ?? s.sector}
              </p>
            </div>
          </div>

          <dl className="flex flex-wrap items-end gap-x-8 gap-y-4 border-b border-line-firm pb-4 lg:gap-x-10">
            <div>
              <dt className="stamp mb-1 text-muted">{price.kind === "free" || price.kind === "quoted" ? "Price" : "From"}</dt>
              <dd className={`m-0 font-heading text-[56px] leading-[56px] font-bold tracking-[-0.03em] ${price.kind === "quoted" ? "text-muted" : ""}`}>{price.amount}</dd>
              {price.basis && <p className="mt-1 text-[13px] leading-5 text-muted">{price.basis}</p>}
            </div>
            {s.price_checked_at && price.kind !== "quoted" && (
              <div>
                <dt className="stamp mb-2 text-muted">Price read</dt>
                <dd className="m-0">
                  <CheckedStamp date={s.price_checked_at} />
                </dd>
              </div>
            )}
          </dl>
        </div>

        {/* Fact strip. */}
        <dl className="mt-8 grid grid-cols-2 border-t border-line md:grid-cols-4">
          <Fact label={price.kind === "quoted" ? "Price" : "From"}>{price.kind === "quoted" ? <span className="text-muted">On request</span> : price.amount}</Fact>
          {price.kind !== "quoted" && <Fact label="Basis">{price.basis || <span className="font-normal text-muted">Free</span>}</Fact>}
          {s.free_trial !== null && <Fact label="Free trial">{yesNo(s.free_trial)}</Fact>}
          {s.free_plan !== null && <Fact label="Free plan">{yesNo(s.free_plan)}</Fact>}
          {s.founded && <Fact label="Founded">{s.founded}</Fact>}
          {s.price_checked_at && price.kind !== "quoted" && (
            <Fact label="Price read">
              <CheckedStamp date={s.price_checked_at} />
            </Fact>
          )}
          {sars === "files" && <Fact label="SARS">Files returns</Fact>}
        </dl>

        {/* How this product reaches a South African reader. */}
        <div className={`mt-6 flex flex-col gap-2 rounded-[12px] border px-4 py-3 sm:flex-row sm:items-start sm:gap-4 ${sa.status === "local" ? "border-lime-deep/30 bg-lime-wash" : "border-line-firm bg-surface"}`}>
          <span className={`stamp inline-flex flex-none items-center gap-2 sm:w-[210px] sm:pt-0.5 ${sa.status === "local" ? "text-lime-text" : "text-muted"}`}>
            <SaFlag height={14} />
            {SA_STATUS_LABEL[sa.status]}
          </span>
          <p className="min-w-0 flex-1 text-[14px] leading-5">{sa.note}</p>
        </div>

        <div className="mt-8 flex flex-wrap items-start gap-3">
          <div>
            {link ? (
              <AffiliateCTAButton slug={s.slug} href={link.href} affiliate={link.affiliate} placement="record-masthead">
                Visit {s.name}
              </AffiliateCTAButton>
            ) : (
              <span className="inline-flex min-h-11 items-center border border-line px-5 text-[14px] text-muted">No vendor link recorded</span>
            )}
            {link?.affiliate && <p className="mt-2 max-w-[260px] text-[12px] leading-4 text-muted">{AFFILIATE_DISCLOSURE_SHORT}</p>}
          </div>
          <CtaLink variant="blue" href={`/register/${s.slug}/reviews`}>
            Read the full review
          </CtaLink>
          <CtaLink variant="quiet" href={`/register/${s.slug}/reviews/new`}>
            Write a review
          </CtaLink>
          <ShortlistButton slug={s.slug} name={s.name} />
          <Link href={`/suggest-a-correction?product=${s.slug}`} className="inline-flex min-h-11 items-center text-[14px] underline underline-offset-4">
            Suggest a correction
          </Link>
        </div>
      </header>

      <Section title="Assessment" id="assessment">
        <div className="max-w-[68ch] space-y-4 text-[15px] leading-6">
          <p className="text-muted">{s.summary}</p>
          {assessment.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Section>

      {(hasCompliance || hasBanks) && (
        <Section title="Compliance and banking" id="compliance">
          <div className={`grid gap-10 ${hasCompliance && hasBanks ? "md:grid-cols-2" : ""}`}>
            {hasCompliance && (
              <div>
                <h3 className="stamp mb-3 text-muted">What it handles</h3>
                <ul className="border-t border-line">
                  {s.compliance!.map((c) => (
                    <li key={c} className="flex items-center gap-3 border-b border-line py-2 text-[15px]">
                      <Check size={18} strokeWidth={1.5} aria-hidden="true" className="text-lime-text" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {hasBanks && (
              <div>
                <h3 className="stamp mb-3 text-muted">Bank feeds</h3>
                <ul className="border-t border-line">
                  {s.bank_feeds!.map((b) => (
                    <li key={b} className="flex items-center gap-3 border-b border-line py-2 text-[15px]">
                      <Check size={18} strokeWidth={1.5} aria-hidden="true" className="text-lime-text" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Section>
      )}

      <Section title="Pricing" id="pricing">
        {/* A card per plan, then what the price means in context, then where it came from. */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {s.pricing_plans.map((plan, i) => (
            <PricingCard
              key={plan.name}
              s={s}
              plan={plan}
              tag={plan.name}
              highlight={i === 0}
              placement="record-pricing"
              second="alternatives"
            />
          ))}
          <PriceContextCard s={s} />
          <PriceSourceCard s={s} />
        </div>
        <FxNote rates={rates} className="mt-6 max-w-[760px]" />
        <Note className="mt-2 max-w-[760px]">
          Prices are the vendor&apos;s own published list price, read on the date shown. Price on request means the vendor gives its price after you contact it. Free means the starting price is zero.
        </Note>
      </Section>

      {s.features.length > 0 && (
        <Section title="Features" id="features">
          <ul className="grid gap-x-10 border-t border-line md:grid-cols-2">
            {s.features.map((f) => (
              <li key={f} className="flex items-center gap-3 border-b border-line py-2 text-[15px]">
                <Check size={18} strokeWidth={1.5} aria-hidden="true" className="text-lime-text" />
                {f}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {s.integrations.length > 0 && (
        <Section title="Integrations" id="integrations">
          <p className="max-w-[68ch] text-[15px] leading-6">{s.integrations.join(", ")}.</p>
        </Section>
      )}

      {shots.length > 0 && (
        <Section title="Screenshots" id="screenshots">
          {/* A scroll strip with no script and no timer. Swipe, or use the scroll bar. */}
          <ul className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-3">
            {shots.map((shot, i) => (
              <li key={shot.src} className="w-[88%] flex-none snap-start md:w-[560px]">
                <div className="overflow-hidden rounded-[12px] border border-line-firm bg-surface">
                  <Image
                    src={shot.src}
                    alt={`${s.name} screenshot ${i + 1} of ${shots.length}`}
                    width={shot.width}
                    height={shot.height}
                    sizes="(min-width: 768px) 560px, 88vw"
                    className="block h-auto w-full"
                  />
                </div>
                <p className="stamp mt-2 text-muted">
                  Screenshot {i + 1} of {shots.length}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Alternatives" id="alternatives" aside={<Link href={`/register/${s.slug}/alternatives`} className="text-[13px] text-lime-text underline underline-offset-4">All alternatives</Link>}>
        <div className="overflow-x-auto">
          <table className="register">
            <caption className="sr-only">Alternatives to {s.name}</caption>
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Why consider it</th>
              </tr>
            </thead>
            <tbody>
              {alternatives.map(({ software: alt, reason }) => (
                <tr key={alt.slug} className="row">
                  <td>
                    <Link href={`/register/${alt.slug}`} className="row-link block font-semibold">
                      {alt.name}
                    </Link>
                    <span className="text-[12px] text-muted">{alt.vendor}</span>
                  </td>
                  <td className="text-muted">{reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {reviews.length > 0 ? (
        <Section title="Reader reviews" id="reviews" aside={<Link href={`/register/${s.slug}/reviews`} className="text-[13px] text-lime-text underline underline-offset-4">Full review and all reader reviews</Link>}>
          <ul className="border-t border-line-firm">
            {reviews.map((r) => (
              <ReviewRow key={r.id} review={r} productNames={Object.fromEntries(reg.items.map((x) => [x.slug, x.name]))} />
            ))}
          </ul>
        </Section>
      ) : (
        <section id="reviews" aria-label={`More on ${s.name}`} className="mx-auto w-full max-w-[1120px] px-6 pt-12">
          <div className="flex flex-col gap-5 rounded-[24px] border border-lime-deep/30 bg-lime-wash p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <h2 className="font-heading text-[24px] leading-8 font-bold tracking-[-0.02em]">Use {s.name}? Tell other buyers.</h2>
              <p className="mt-1 max-w-[56ch] text-[15px] leading-6">Say what it does well, where it falls short and who it suits. An editor reads it first, and it is published as written.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <CtaLink variant="primary" href={`/register/${s.slug}/reviews/new`}>
                Write a review
              </CtaLink>
              <CtaLink variant="blue" href={`/register/${s.slug}/reviews`}>
                Read the full review
              </CtaLink>
            </div>
          </div>
        </section>
      )}

      <div className="pb-12" />
    </>
  );
}
