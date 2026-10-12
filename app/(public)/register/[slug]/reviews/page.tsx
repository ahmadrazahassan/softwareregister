import { Check, X } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AffiliateCTAButton } from "@/components/AffiliateCTAButton";
import { slugifyHeading } from "@/components/BriefingBody";
import { BandCharts } from "@/components/charts/BandCharts";
import { AreaChart } from "@/components/charts/AreaChart";
import { BarList, type BarRow } from "@/components/charts/BarList";
import { GroupedBars, type BarGroup } from "@/components/charts/GroupedBars";
import { RangeChart } from "@/components/charts/RangeChart";
import { SegmentGauge } from "@/components/charts/SegmentGauge";
import { CostCalculator } from "@/components/CostCalculator";
import { GuideCard } from "@/components/GuideCard";
import { VideoGallery, type VideoItem } from "@/components/VideoGallery";
import { CtaLink, ctaClass } from "@/components/CtaButton";
import { FxNote } from "@/components/FxNote";
import { LogoBadge } from "@/components/LogoBadge";
import { Note } from "@/components/primitives";
import { ReviewRow } from "@/components/ReviewRow";
import { ShortlistButton } from "@/components/ShortlistButton";
import { SaFlag } from "@/components/SaFlag";
import { StickyCta } from "@/components/StickyCta";
import { Toc } from "@/components/Toc";
import { CtaBand, PlanCards, mainLabel } from "@/components/VendorCta";
import { outboundLink, pricingLink, AFFILIATE_DISCLOSURE_SHORT } from "@/lib/affiliates";
import { buildAutoFaqs, buildCalcConfig, buildGrowth, buildLadder, buildPeerRanges, buildPeers, buildPricingParagraphs, buildSavings, buildSeatCosts, needsSqrtScale, randLabel, toRand } from "@/lib/calc";
import { saAvailability, SA_STATUS_LABEL } from "@/lib/data/availability";
import { FX_SNAPSHOT } from "@/lib/data/fx";
import { GUIDES_BY_SECTOR } from "@/lib/data/guide-heroes";
import { KIND_LABEL, channelOf, durationLabel, videosFor } from "@/lib/data/videos";
import { getProfile, profileSections } from "@/lib/data/profiles";
import { formatDateLong, formatInt, formatDateStamp, priceLabel } from "@/lib/format";
import { getFxRates, getRegistry, getTokens, loadBriefings, loadSectors } from "@/lib/queries";
import { COMPANY_SIZES, INDUSTRIES, getReviews, type ReviewSort } from "@/lib/queries/reviews";
import { alternativesFor, sectorOf } from "@/lib/registry";
import { JsonLd, breadcrumbLd, faqLd, softwareLd, videoLd } from "@/lib/seo";
import type { ProfileStat } from "@/lib/types";

export const revalidate = 3600;

type SP = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
const SORTS: { value: ReviewSort; label: string }[] = [
  { value: "helpful", label: "Most helpful" },
  { value: "recent", label: "Most recent" },
];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const reg = await getRegistry();
  const s = reg.bySlug.get((await params).slug);
  if (!s) return {};
  const profile = getProfile(s.slug);
  return {
    title: `${s.name} review: pricing in rand, plans, features and SARS`,
    description: profile ? profile.summary.slice(0, 200) : `An in depth look at ${s.name}: what every plan costs in rand, what it includes, how it handles SARS and who it suits.`,
    alternates: { canonical: `/register/${s.slug}/reviews` },
  };
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-28 font-heading text-[28px] leading-8 font-bold tracking-[-0.02em] md:text-[34px] md:leading-10">
      {children}
    </h2>
  );
}

function Block({ id, title, lead, children }: { id: string; title: string; lead?: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-line-firm pt-12 pb-2">
      <H2 id={id}>{title}</H2>
      {lead && <p className="mt-3 max-w-[68ch] text-[16px] leading-7 text-muted">{lead}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default async function ReviewPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<SP> }) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  const [reg, rates, sectors, briefings, tokens] = await Promise.all([getRegistry(), getFxRates(), loadSectors(), loadBriefings(), getTokens()]);
  const s = reg.bySlug.get(slug);
  if (!s) notFound();

  const profile = getProfile(s.slug);
  const sections = profileSections(s.slug, profile);
  const sector = sectorOf(s.sector, sectors);
  const sa = saAvailability(s.slug);
  const link = outboundLink(s);

  /* ------------------------------------------------------------------ figures */
  const ladder = buildLadder(s, rates, profile?.vat);
  const seatCosts = profile?.rateByHeadcount ? [] : buildSeatCosts(s, rates, profile?.basePlans, profile?.seatRules);
  const peers = buildPeers(s, reg);
  const calc = buildCalcConfig(s, profile, rates);
  const pricingParas = buildPricingParagraphs(s, rates, profile?.vat);
  const faqs = [...(profile?.faqs ?? []), ...buildAutoFaqs(s, reg, rates, profile?.vat).filter((f) => !(profile?.faqs ?? []).some((p) => p.q === f.q))];
  const alternatives = alternativesFor(s, reg, 4);
  const videos: VideoItem[] = videosFor(s.slug).map((v) => ({
    id: v.id,
    label: v.label,
    channel: channelOf(v).name,
    channelUrl: `https://www.youtube.com/channel/${channelOf(v).id}`,
    duration: durationLabel(v.seconds),
    published: formatDateLong(v.published),
    kind: KIND_LABEL[v.kind],
    sa: Boolean(v.sa),
  }));
  const pricing = pricingLink(s);
  const pl = priceLabel(s);
  const priceText = pl.kind === "quoted" ? "Price on request" : pl.kind === "free" ? "Free to start" : `From ${pl.amount} ${pl.basis}`.trim();
  const ranges = buildPeerRanges(s, reg, rates);
  const growthSeries = profile?.rateByHeadcount ? [] : buildGrowth(s, rates, profile?.basePlans, profile?.seatRules);
  const savings = buildSavings(profile, rates, s.price_currency);
  const thisYear = new Date().getFullYear();
  const ageRows: BarRow[] = reg.items
    .filter((x) => x.sector === s.sector && x.founded)
    .sort((a, b) => (a.founded as number) - (b.founded as number) || a.name.localeCompare(b.name, "en-ZA"))
    .map((x) => ({ label: x.name, sub: x.vendor, value: thisYear - (x.founded as number), display: `Founded ${x.founded}`, tone: x.slug === s.slug ? ("lime" as const) : ("muted" as const) }));
  const showAge = ageRows.length >= 3 && reg.bySlug.get(s.slug)?.founded;
  const guides = (GUIDES_BY_SECTOR[s.sector] ?? [])
    .map((g) => briefings.find((b) => b.slug === g))
    .filter((b): b is NonNullable<typeof b> => Boolean(b))
    .slice(0, 3);
  const seatWord = s.pricing_plans.some((p) => p.basis === "employee_mo") ? "employees" : "users";
  const foreign =
    s.pricing_plans.some((p) => p.currency && p.currency !== "ZAR") ||
    (profile?.addOns ?? []).some((a) => a.currency && a.currency !== "ZAR") ||
    (profile?.billing ?? []).some((b) => b.currency && b.currency !== "ZAR");
  const seatNote = profile?.seatRules?.length
    ? "The price per head multiplied by the size of the team. Where the vendor sets a flat rate or a limit on seats for a plan, the chart follows it and leaves a plan out at a size it is not sold for. Volume discounts and add ons are not included."
    : "The price per head multiplied by the size of the team. Volume discounts, minimum seats and add ons are not included.";

  const ladderRows: BarRow[] = ladder.map((r) => ({ label: r.name, sub: r.split, value: r.rand, display: r.label, tone: "ink" }));

  const seatGroups: BarGroup[] = seatCosts.map((g) => ({
    label: `${formatInt(g.seats)} ${g.seats === 1 ? seatWord.replace(/s$/, "") : seatWord}`,
    bars: g.values.map((v) => ({ name: v.plan, value: v.rand, display: `${randLabel(v.rand, Boolean(s.fx))} a month` })),
  }));

  const addOns = profile?.addOns ?? [];
  const addOnsHaveYearly = addOns.some((a) => a.yearly !== undefined && a.yearly !== a.monthly);
  const addOnGroups: BarGroup[] = addOns.map((a) => {
    const monthly = toRand(a.monthly, a.currency, rates);
    const yearly = a.yearly !== undefined ? toRand(a.yearly, a.currency, rates) : null;
    const save = yearly !== null && yearly < monthly ? Math.round((1 - yearly / monthly) * 100) : 0;
    const bars = [{ name: "Paid monthly", value: monthly, display: randLabel(monthly) }];
    if (yearly !== null && yearly !== monthly) bars.push({ name: "Paid for a year, per month", value: yearly, display: randLabel(yearly) });
    return { label: a.name, bars, remark: save ? `Saves ${save} percent` : a.note };
  });
  const addOnRows: BarRow[] = [...addOns]
    .sort((a, b) => b.monthly - a.monthly)
    .map((a) => ({ label: a.name, sub: a.note, value: toRand(a.monthly, a.currency, rates), display: `${randLabel(toRand(a.monthly, a.currency, rates))}${a.kind === "seat" ? " per head" : ""}` }));

  const billingGroups: BarGroup[] = (profile?.billing ?? []).map((b) => {
    const monthly = toRand(b.monthly, b.currency, rates);
    const yearly = toRand(b.yearly, b.currency, rates);
    const save = yearly < monthly ? Math.round((1 - yearly / monthly) * 100) : 0;
    return {
      label: b.plan,
      bars: [
        { name: "Paid monthly", value: monthly, display: randLabel(monthly, true) },
        { name: "Paid for a year, per month", value: yearly, display: randLabel(yearly, true) },
      ],
      remark: save ? `Saves ${save} percent` : undefined,
    };
  });

  const peerRows: BarRow[] = peers.rows.map((r) => ({ label: r.name, value: r.rand, display: r.label, tone: r.self ? "lime" : "muted" }));

  /* ------------------------------------------------------------------- stats */
  const stats: ProfileStat[] =
    profile?.stats ??
    [
      ladder[0] ? { label: "Starting price", value: ladder[0].free ? "Free" : ladder[0].label, note: s.price_checked_at ? `Read ${formatDateStamp(s.price_checked_at)}` : undefined } : { label: "Price", value: "On request" },
      { label: "Plans", value: String(Math.max(ladder.length, s.pricing_plans.length)) },
      ...(s.free_trial !== null ? [{ label: "Free trial", value: s.free_trial ? "Yes" : "No" }] : []),
      ...(s.free_plan !== null ? [{ label: "Free plan", value: s.free_plan ? "Yes" : "No" }] : []),
      ...(s.compliance && s.compliance.length ? [{ label: "SARS items listed", value: String(s.compliance.length) }] : []),
      ...(s.bank_feeds && s.bank_feeds.length ? [{ label: "Banks listed", value: String(s.bank_feeds.length) }] : []),
      ...(s.founded ? [{ label: "Founded", value: String(s.founded) }] : []),
    ];

  /* ----------------------------------------------------------- reader reviews */
  const size = first(sp.size);
  const industry = first(sp.industry);
  const sort = (SORTS.find((x) => x.value === first(sp.sort))?.value ?? "helpful") as ReviewSort;
  const page = Math.max(1, Math.floor(Number(first(sp.page))) || 1);
  const result = await getReviews(s.slug, {
    size: (COMPANY_SIZES as readonly string[]).includes(size) ? size : undefined,
    industry: (INDUSTRIES as readonly string[]).includes(industry) ? industry : undefined,
    sort,
    page,
  });
  const filtered = Boolean(size || industry);
  const href = (p: number) => {
    const q = new URLSearchParams();
    if (size) q.set("size", size);
    if (industry) q.set("industry", industry);
    if (sort !== "helpful") q.set("sort", sort);
    if (p > 1) q.set("page", String(p));
    const qs = q.toString();
    return `/register/${s.slug}/reviews${qs ? `?${qs}` : ""}#reader-reviews`;
  };

  /* --------------------------------------------------------------------- toc */
  const toc: { id: string; text: string }[] = [
    { id: "at-a-glance", text: "At a glance" },
    ...(pricing ? [{ id: "plans", text: "Plans and prices" }] : []),
    { id: "pricing", text: "Pricing in rand" },
    ...(calc ? [{ id: "calculator", text: "Your own bill" }] : []),
    { id: "peers", text: "Against the category" },
    ...(videos.length ? [{ id: "videos", text: "Videos" }] : []),
    ...sections.map((x) => ({ id: slugifyHeading(x.heading), text: x.heading })),
    { id: "strengths", text: "Strengths and limits" },
    { id: "fit", text: "Who it suits" },
    { id: "faq", text: "Questions" },
    ...(guides.length ? [{ id: "guides", text: "Guides to read next" }] : []),
    { id: "sources", text: "Sources" },
    { id: "reader-reviews", text: result.rows.length > 0 || filtered ? "Reader reviews" : "Share your experience" },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Software", path: "/register" }, { name: s.name, path: `/register/${s.slug}` }, { name: "Review", path: `/register/${s.slug}/reviews` }]), softwareLd(s), faqLd(faqs), ...videosFor(s.slug).map((v) => videoLd({ id: v.id, name: `${s.name}: ${v.label}`, description: `${KIND_LABEL[v.kind]} video about ${s.name} from the ${channelOf(v).name} channel on YouTube.`, uploadDate: v.published, seconds: v.seconds }))]} />

      <header className="mx-auto w-full max-w-[1120px] px-6 pt-10 lg:pt-14">
        <nav aria-label="Breadcrumb" className="stamp mb-6 text-muted">
          <Link href="/register" className="hover:text-ink">Register</Link>
          <span aria-hidden="true"> / </span>
          <Link href={`/sector/${s.sector}`} className="hover:text-ink">{sector?.name ?? s.sector}</Link>
          <span aria-hidden="true"> / </span>
          <Link href={`/register/${s.slug}`} className="hover:text-ink">{s.name}</Link>
        </nav>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
          <LogoBadge slug={s.slug} name={s.name} size={96} />
          <div>
            <p className="stamp mb-2 text-muted">In depth review</p>
            <h1 className="font-heading text-[34px] leading-[38px] font-bold tracking-[-0.03em] md:text-[54px] md:leading-[56px]">{s.name} review</h1>
            <p className="mt-3 text-[13px] leading-5 text-muted">
              {s.vendor} · {sector?.label ?? s.sector}
            </p>
          </div>
        </div>
        <p className="mt-8 max-w-[760px] text-[19px] leading-8">{profile?.headline ?? s.summary}</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
          {sa.status === "local" && (
            <span className="inline-flex items-center gap-2 rounded-full border border-lime-deep/30 bg-lime-wash px-3 py-1 text-[13px] leading-5 font-semibold">
              <SaFlag height={14} />
              {SA_STATUS_LABEL.local}
            </span>
          )}
          {s.price_checked_at && s.starting_price !== null && (
            <span className="rounded-full border border-line-firm px-3 py-1 text-[13px] leading-5">Price read {formatDateLong(s.price_checked_at)}</span>
          )}
          {profile && <span className="rounded-full border border-line-firm px-3 py-1 text-[13px] leading-5">Researched {formatDateLong(profile.researchedAt)}</span>}
          {videos.length > 0 && (
            <a href="#videos" className="rounded-full border border-line-firm px-3 py-1 text-[13px] leading-5 hover:bg-lime-wash">
              {videos.length === 1 ? "1 official video" : `${videos.length} official videos`}
            </a>
          )}
          <span className="rounded-full border border-line-firm px-3 py-1 text-[13px] leading-5">No score, no ranking</span>
        </div>

        <div id="review-hero-actions" className="mt-8 flex flex-wrap items-start gap-3">
          {link && (
            <div>
              <AffiliateCTAButton slug={s.slug} href={link.href} affiliate={link.affiliate} placement="review-header" variant="primary">
                {mainLabel(s)}
              </AffiliateCTAButton>
              {link.affiliate && <p className="mt-2 max-w-[260px] text-[12px] leading-4 text-muted">{AFFILIATE_DISCLOSURE_SHORT}</p>}
            </div>
          )}
          {link && s.demo === true && s.starting_price !== null && (
            <AffiliateCTAButton slug={s.slug} href={link.href} affiliate={link.affiliate} placement="review-header-demo" variant="quiet">
              Request a demo
            </AffiliateCTAButton>
          )}
          {pricing && (
            <a href="#plans" className={ctaClass("quiet")}>
              See the plans
            </a>
          )}
          <Link href={`/versus?a=${s.slug}`} className={ctaClass("blue")}>
            Compare with another
          </Link>
          <CtaLink variant="quiet" href={`/register/${s.slug}/reviews/new`}>
            Write a review
          </CtaLink>
          <ShortlistButton slug={s.slug} name={s.name} />
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1120px] px-6 pt-14 pb-12 lg:pb-[72px] xl:grid xl:grid-cols-[minmax(0,1fr)_180px] xl:justify-between xl:gap-x-14">
        <div className="min-w-0">
          {/* ---------------------------------------------------------- at a glance */}
          <section aria-labelledby="at-a-glance" className="pb-2">
            <H2 id="at-a-glance">At a glance</H2>
            {profile && <p className="mt-4 max-w-[70ch] text-[16px] leading-7 text-muted">{profile.summary}</p>}
            <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
              {stats.map((t) => (
                <li key={t.label} className="flex flex-col rounded-[16px] border border-line-firm bg-surface p-4">
                  <p className="text-[12px] leading-4 text-muted">{t.label}</p>
                  <p className="mt-1.5 font-heading text-[22px] leading-7 font-bold tracking-[-0.02em]">{t.value}</p>
                  {t.note && <p className="mt-1 text-[12px] leading-4 text-muted">{t.note}</p>}
                </li>
              ))}
            </ul>
            <Note className="mt-4">Figures marked as a vendor&apos;s own are that vendor&apos;s claims about itself and are not tested here.</Note>
          </section>

          {/* ------------------------------------------------------ plans, with buttons */}
          {pricing && (
            <Block id="plans" title="Plans and prices" lead={`Every plan ${s.name} lists, in rand, with a button to ${s.vendor === s.name ? "its" : `${s.vendor}'s`} own pricing page.`}>
              <PlanCards s={s} link={pricing} rates={rates} billing={profile?.billing} bands={profile?.bands} basePlans={profile?.basePlans} />
            </Block>
          )}

          {/* --------------------------------------------------------------- pricing */}
          <Block id="pricing" title="Pricing in rand" lead={pricingParas[0]}>
            <div className="space-y-4 text-[16px] leading-7">
              {pricingParas.slice(1).map((p, i) => (
                <p key={i} className="max-w-[70ch]">{p}</p>
              ))}
            </div>

            {ladderRows.length > 0 && (
              <div className="mt-10 rounded-[20px] border border-line-firm bg-surface p-6 md:p-8">
                <BarList rows={ladderRows} caption="What each plan costs a month, in rand" note="A plan priced per user or per employee shows the price of one. Both VAT footings are shown where the vendor states its basis." />
              </div>
            )}

            {seatGroups.length > 0 && (
              <div className="mt-8 rounded-[20px] border border-line-firm bg-surface p-6 md:p-8">
                <GroupedBars groups={seatGroups} caption={`What a team pays a month, by number of ${seatWord}`} note={seatNote} />
              </div>
            )}

            {growthSeries.some((g) => g.points.length > 1) && (
              <div className="mt-8 rounded-[20px] border border-line-firm bg-surface p-6 md:p-8">
                <AreaChart
                  series={growthSeries}
                  caption={`The monthly bill as the team grows, by number of ${seatWord}`}
                  xTicks={[1, 10, 20, 30, 40, 50]}
                  xFormat={(n) => String(n)}
                  yFormat={(n) => randLabel(n, true)}
                  xHeading={seatWord === "employees" ? "Employees" : "Users"}
                  note={seatNote}
                />
              </div>
            )}

            {profile?.bands && profile.bands.length > 0 && (
              <div className="mt-8 rounded-[20px] border border-line-firm bg-surface p-6 md:p-8">
                <BandCharts
                  caption="Price by number of employees, including VAT"
                  bands={profile.bands.map((b) => ({ label: b.label, upTo: b.upTo, monthly: b.monthly, perEmployee: b.perEmployee ?? null }))}
                />
              </div>
            )}

            {addOns.length > 0 && (
              <div className="mt-8 rounded-[20px] border border-line-firm bg-surface p-6 md:p-8">
                {addOnsHaveYearly ? (
                  <GroupedBars groups={addOnGroups} caption="Add ons, paid monthly against paid for a year" note="The yearly bars are the per month price when the add on is bought for a year, from the vendor's own page." />
                ) : (
                  <BarList rows={addOnRows} caption="What each extra costs a month, in rand" note="Added to the plan price. A bill with several extras can be a multiple of the headline." />
                )}
              </div>
            )}

            {billingGroups.length > 0 && (
              <div className="mt-8 rounded-[20px] border border-line-firm bg-surface p-6 md:p-8">
                <GroupedBars groups={billingGroups} caption="Pay monthly or pay for a year, per month" note="Prices in rand, converted at the day's reference rate where the vendor lists in another currency." />
              </div>
            )}

            {savings.length > 0 && (
              <div className="mt-8 rounded-[20px] border border-line-firm bg-surface p-6 md:p-8">
                <p className="stamp mb-6 text-muted">How much paying for a year takes off the monthly price</p>
                <div className={`grid gap-8 sm:grid-cols-2 ${savings.length >= 3 ? "lg:grid-cols-3" : ""}`}>
                  {savings.map((g) => (
                    <SegmentGauge
                      key={g.plan}
                      value={g.percent}
                      centre={`${g.percent}%`}
                      title={g.plan}
                      caption="Taken off the monthly price when the year is paid at once."
                      pill={`${randLabel(g.monthly, true)} a month, ${randLabel(g.yearly, true)} paid yearly`}
                    />
                  ))}
                </div>
              </div>
            )}

            {foreign && (
              <div className="mt-6 space-y-2">
                <FxNote rates={rates} />
                {profile && rates.asOf !== FX_SNAPSHOT.asOf && (
                  <p className="text-[13px] leading-5 text-muted">
                    Amounts written out in the text of this review are at the reference rate of {formatDateLong(FX_SNAPSHOT.asOf)}. The charts and the calculator use the rates above, so a figure can differ by a rand or two.
                  </p>
                )}
              </div>
            )}
          </Block>

          {calc && (
            <Block id="calculator" title="Work out your own bill" lead={`Pick a plan, your team size and any extras. It adds ${s.name}'s own prices in rand and shows the month and the year, with VAT in and out where the vendor states its basis.`}>
              <CostCalculator config={calc} cta={pricing ? { slug: s.slug, href: pricing.href, affiliate: pricing.affiliate, vendor: s.name, disclosure: AFFILIATE_DISCLOSURE_SHORT } : undefined} />
            </Block>
          )}

          {link && (
            <CtaBand
              s={s}
              link={pricing ?? link}
              title={`Seen the prices? Go and see ${s.name}.`}
              text={`Opens ${s.vendor === s.name ? "the vendor's" : `${s.vendor}'s`} own page in a new tab. Nothing is bought on this site.`}
              placement="review-after-pricing"
              priceText={priceText}
            />
          )}

          <Block
            id="peers"
            title={`Against other ${sector?.label.toLowerCase() ?? "products"}`}
            lead={`Starting prices of the priced products in the same category, cheapest first. This is a price sort, not a ranking: the cheapest product is not the best one, and some are priced per user, some per month and some excluding VAT.`}
          >
            <div className="rounded-[20px] border border-line-firm bg-surface p-6 md:p-8">
              <BarList rows={peerRows} scale="sqrt" caption="Starting price of each product, in rand" note={peers.median !== null ? `The middle starting price of the paid products here is ${randLabel(peers.median, true)}.` : undefined} />
              {peers.onRequest.length > 0 && (
                <p className="mt-5 text-[13px] leading-5 text-muted">Price on request, so not charted: {peers.onRequest.join(", ")}.</p>
              )}
            </div>
            {ranges.length > 1 && (
              <div className="mt-8 rounded-[20px] border border-line-firm bg-surface p-6 md:p-8">
                <RangeChart
                  rows={ranges.map((r) => ({ label: r.name, prices: r.prices, display: r.display, self: r.self }))}
                  caption="How far each product's paid plans stretch, cheapest plan to dearest, in rand"
                  scale={needsSqrtScale(ranges) ? "sqrt" : "linear"}
                  note="A dot is one plan. Free plans and plans on request have no price to place. A per user price is the price of one user."
                />
              </div>
            )}
            {showAge && (
              <div className="mt-8 rounded-[20px] border border-line-firm bg-surface p-6 md:p-8">
                <BarList rows={ageRows} caption="How long each vendor has been going, by the year it was founded" note="A founding year says how long a company has existed. It says nothing about how good the product is." />
              </div>
            )}
          </Block>

          {videos.length > 0 && (
            <Block
              id="videos"
              title={`${s.name} in the vendor's own videos`}
              lead={`${videos.length === 1 ? "An official video" : `${videos.length} official videos`} from ${[...new Set(videos.map((v) => v.channel))].join(" and ")} on YouTube. Software Register did not make or edit them. They are the vendor's own account of the product, so read them beside the prices and limits on this page.`}
            >
              <VideoGallery items={videos} productName={s.name} />
              <p className="mt-5 max-w-[70ch] text-[13px] leading-5 text-muted">A video loads from YouTube only when you press play. The still picture before that comes from YouTube&apos;s image servers.</p>
              {link && (
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <AffiliateCTAButton slug={s.slug} href={link.href} affiliate={link.affiliate} placement="review-videos" variant="primary">
                    {mainLabel(s)}
                  </AffiliateCTAButton>
                  <a href="#plans" className={ctaClass("quiet")}>
                    See the plans
                  </a>
                </div>
              )}
            </Block>
          )}

          {/* ---------------------------------------------------- the written review */}
          {sections.map((sec) => (
            <Block key={sec.heading} id={slugifyHeading(sec.heading)} title={sec.heading}>
              <div className="space-y-4 text-[16px] leading-7">
                {sec.paragraphs.map((p, i) => (
                  <p key={i} className="max-w-[70ch]">{p}</p>
                ))}
                {sec.bullets && sec.bullets.length > 0 && (
                  <ul className="max-w-[70ch] space-y-2.5">
                    {sec.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <Check size={18} strokeWidth={1.75} aria-hidden="true" className="mt-1 flex-none text-lime-text" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Block>
          ))}

          {profile && (
            <>
              <Block id="strengths" title="Strengths and limits">
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="rounded-[20px] border border-line-firm bg-surface p-6">
                    <p className="stamp text-lime-text">Strengths</p>
                    <ul className="mt-4 space-y-3">
                      {profile.pros.map((t) => (
                        <li key={t} className="flex gap-3 text-[15px] leading-6">
                          <Check size={18} strokeWidth={1.75} aria-hidden="true" className="mt-0.5 flex-none text-lime-text" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-[20px] border border-line-firm bg-surface p-6">
                    <p className="stamp text-muted">Limits</p>
                    <ul className="mt-4 space-y-3">
                      {profile.cons.map((t) => (
                        <li key={t} className="flex gap-3 text-[15px] leading-6">
                          <X size={18} strokeWidth={1.75} aria-hidden="true" className="mt-0.5 flex-none text-muted" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Block>

              <Block id="fit" title="Who it suits">
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="rounded-[20px] bg-lime-wash p-6">
                    <p className="stamp text-lime-text">Best for</p>
                    <ul className="mt-4 space-y-3">
                      {profile.bestFor.map((t) => (
                        <li key={t} className="flex gap-3 text-[15px] leading-6">
                          <Check size={18} strokeWidth={1.75} aria-hidden="true" className="mt-0.5 flex-none text-lime-text" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-[20px] border border-line-firm bg-surface p-6">
                    <p className="stamp text-muted">Think twice if</p>
                    <ul className="mt-4 space-y-3">
                      {profile.thinkTwice.map((t) => (
                        <li key={t} className="flex gap-3 text-[15px] leading-6">
                          <X size={18} strokeWidth={1.75} aria-hidden="true" className="mt-0.5 flex-none text-muted" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6 max-w-[70ch] rounded-[20px] border border-lime-deep/30 bg-lime-wash p-6">
                  <p className="stamp text-lime-text">In short</p>
                  <p className="mt-3 text-[16px] leading-7">{profile.verdict}</p>
                </div>
              </Block>

              {link && (
                <CtaBand
                  s={s}
                  link={link}
                  title={`Think ${s.name} fits? Try it.`}
                  text={`Start where the vendor sells it, and keep this page open beside you for the limits.`}
                  placement="review-after-verdict"
                  priceText={priceText}
                />
              )}
            </>
          )}

          {alternatives.length > 0 && (
            <section className="border-t border-line-firm pt-12 pb-2">
              <h2 className="font-heading text-[24px] leading-7 font-bold tracking-[-0.01em]">Alternatives on the register</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {alternatives.map(({ software: alt, reason }) => (
                  <li key={alt.slug}>
                    <Link href={`/register/${alt.slug}/reviews`} className="flex items-center gap-4 rounded-[16px] border border-line-firm bg-surface p-4 hover:border-ink">
                      <LogoBadge slug={alt.slug} name={alt.name} size={44} />
                      <span className="min-w-0">
                        <span className="block text-[15px] leading-5 font-semibold">{alt.name} review</span>
                        <span className="block truncate text-[12px] leading-4 text-muted">{reason}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <Block id="faq" title={`Questions about ${s.name}`}>
            <div className="border-t border-line-firm">
              {faqs.map((f) => (
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
          </Block>

          {guides.length > 0 && (
            <Block id="guides" title="Guides to read next" lead={`South African guides that help you weigh ${s.name}: what the rules ask, what to test and what to put in writing.`}>
              <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {guides.map((g) => (
                  <li key={g.slug}>
                    <GuideCard b={g} tokens={tokens} reg={reg} />
                  </li>
                ))}
              </ul>
            </Block>
          )}

          <Block id="sources" title="Sources and method">
            <div className="max-w-[70ch] space-y-4 text-[15px] leading-7">
              <p>
                Every price and fact on this page was read from {s.vendor === s.name ? "the vendor's" : `${s.vendor}'s`} own pages
                {profile ? `, researched on ${formatDateLong(profile.researchedAt)}` : ""}. A figure the vendor states about itself is marked as the vendor&apos;s. This review gives no score and no rank, and a vendor cannot pay to change it. Read <Link href="/method" className="prose-link">how the register works</Link>.
              </p>
              {profile?.sources && profile.sources.length > 0 && (
                <ul className="space-y-1.5">
                  {profile.sources.map((src) => (
                    <li key={src.url}>
                      <a href={src.url} rel="noopener noreferrer" target="_blank" className="prose-link">
                        {src.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              {s.vendor_website && !profile?.sources?.length && <p>Pricing page: {s.vendor_website}</p>}
              <p>
                Something wrong on this page? <Link href={`/suggest-a-correction?product=${s.slug}`} className="prose-link">Suggest a correction</Link>, with a link to the vendor&apos;s page that shows it.
              </p>
            </div>
          </Block>

          {link && (
            <CtaBand
              id="closing-cta"
              s={s}
              link={link}
              title={`Ready to look at ${s.name}?`}
              text={`${s.name} is ${pl.kind === "quoted" ? "priced on request" : pl.kind === "free" ? "free to start" : "priced as above"}. Go to the vendor to buy or to ask, or compare it with another product first.`}
              placement="review-closing"
              priceText={priceText}
            />
          )}

          {/* -------------------------------------------------------- reader reviews */}
          <section id="reader-reviews" aria-labelledby="reader-title" className="scroll-mt-28 border-t border-line-firm pt-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 id="reader-title" className="font-heading text-[28px] leading-8 font-bold tracking-[-0.02em] md:text-[34px] md:leading-10">
                  {result.rows.length > 0 || filtered ? "Reader reviews" : "Share your experience"}
                </h2>
                <p className="mt-2 max-w-[60ch] text-[15px] leading-6 text-muted">
                  {result.rows.length > 0 || filtered
                    ? `Written by people who use ${s.name}. An editor reads each one before it appears and it is published as written. Reviews are never averaged into a score.`
                    : `Use ${s.name}? Tell other South African buyers what it does well, where it falls short and who it suits. An editor reads each review before it appears, and it is published as written.`}
                </p>
              </div>
              <CtaLink variant="primary" href={`/register/${s.slug}/reviews/new`}>
                Write a review of {s.name}
              </CtaLink>
            </div>

            {(result.total > 0 || filtered) && (
              <form method="get" action={`/register/${s.slug}/reviews#reader-reviews`} className="mt-6 flex flex-wrap items-end gap-x-6 gap-y-4 border-y border-line py-4" aria-label="Filter reviews">
                {[
                  { name: "size", label: "Company size", value: size, options: COMPANY_SIZES.map((v) => ({ v, l: `${v} employees` })) },
                  { name: "industry", label: "Industry", value: industry, options: INDUSTRIES.map((v) => ({ v, l: v })) },
                ].map((f) => (
                  <div key={f.name} className="min-w-[140px]">
                    <label htmlFor={`f-${f.name}`} className="stamp mb-1 block text-muted">{f.label}</label>
                    <select id={`f-${f.name}`} name={f.name} defaultValue={f.value} className="field">
                      <option value="">Any</option>
                      {f.options.map((o) => (
                        <option key={o.v} value={o.v}>{o.l}</option>
                      ))}
                    </select>
                  </div>
                ))}
                <div className="min-w-[140px]">
                  <label htmlFor="f-sort" className="stamp mb-1 block text-muted">Sort</label>
                  <select id="f-sort" name="sort" defaultValue={sort} className="field">
                    {SORTS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="h-11 cursor-pointer border border-line-firm px-4 text-[15px] font-semibold hover:bg-lime-wash">
                  Apply
                </button>
              </form>
            )}

            {result.rows.length > 0 ? (
              <>
                <h3 className="mt-8 mb-2 font-heading text-[20px] leading-6 font-bold tracking-[-0.01em]">What readers wrote</h3>
                <ul>
                  {result.rows.map((r) => (
                    <ReviewRow key={r.id} review={r} productNames={Object.fromEntries(reg.items.map((x) => [x.slug, x.name]))} />
                  ))}
                </ul>
              </>
            ) : filtered ? (
              <div className="mt-6 rounded-[16px] border border-line-firm bg-surface p-6">
                <h3 className="font-heading text-[20px] leading-6 font-bold tracking-[-0.01em]">No reviews match those filters</h3>
                <p className="mt-2 max-w-[60ch] text-[14px] leading-6 text-muted">Clear a filter to see more.</p>
                <div className="mt-5">
                  <CtaLink variant="quiet" href={`/register/${s.slug}/reviews`}>
                    Clear filters
                  </CtaLink>
                </div>
              </div>
            ) : null}

            {result.pages > 1 && (
              <nav aria-label="Pagination" className="mt-8 flex flex-wrap gap-4 text-[15px]">
                {Array.from({ length: result.pages }, (_, i) => i + 1).map((p) => (
                  <Link key={p} href={href(p)} aria-current={p === page ? "page" : undefined} className={p === page ? "font-bold underline underline-offset-4" : "text-lime-text underline underline-offset-4"}>
                    {p}
                  </Link>
                ))}
              </nav>
            )}

            <Note className="mt-10">
              <Link href={`/register/${s.slug}`} className="prose-link">Back to the {s.name} record</Link>
            </Note>
          </section>
        </div>

        <Toc items={toc} />
      </div>

      {link && <StickyCta slug={s.slug} name={s.name} priceText={priceText} href={link.href} affiliate={link.affiliate} label={mainLabel(s)} afterId="review-hero-actions" untilId="closing-cta" />}
    </>
  );
}
