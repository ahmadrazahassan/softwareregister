import Link from "next/link";
import { AffiliateCTAButton } from "@/components/AffiliateCTAButton";
import { ctaClass } from "@/components/CtaButton";
import { LogoBadge } from "@/components/LogoBadge";
import { AFFILIATE_DISCLOSURE_SHORT, type OutboundLink } from "@/lib/affiliates";
import { basisSentence, randLabel, toRand } from "@/lib/calc";
import type { FxRates } from "@/lib/fx";
import type { PricedSoftware, ProfileBand, ProfileBilling } from "@/lib/types";
import { VAT_RATE } from "@/lib/site";

/**
 * The buttons that take a reader to the vendor. Every plan has its own, going to
 * the vendor's pricing page, and a call to action closes each stretch of the
 * review. All of them are plain links that work with scripts off; a click is
 * counted by product and place, never by person. The wording follows what the
 * vendor offers: a free plan starts free, a quoted plan asks for a quote, a
 * demo is a demo. Where a link earns a commission the disclosure sits beside it.
 */

/** The first button's wording, from what the vendor offers. */
export function mainLabel(s: Pick<PricedSoftware, "name" | "free_plan" | "free_trial" | "demo" | "starting_price">): string {
  if (s.starting_price === null) return s.demo ? `Book a demo of ${s.name}` : `Ask ${s.name} for a quote`;
  if (s.free_plan) return `Start free with ${s.name}`;
  if (s.free_trial) return `Start the ${s.name} trial`;
  return `Visit ${s.name}`;
}

export function PlanCards({
  s,
  link,
  rates,
  billing,
  bands,
  basePlans,
}: {
  s: PricedSoftware;
  link: OutboundLink | null;
  rates: FxRates;
  billing?: ProfileBilling[];
  /** A product priced in bands by headcount, such as Sage Payroll, gets one card that says so. */
  bands?: ProfileBand[];
  /** For a product sold as a core plan plus modules: the plans that are the core. The rest are shown as add ons. */
  basePlans?: string[];
}) {
  const plans = s.pricing_plans;
  if (plans.length === 0) return null;
  const savings = new Map((billing ?? []).map((b) => [b.plan, b]));

  if (bands && bands.length > 0) {
    const priced = bands.filter((b) => b.monthly !== null) as (ProfileBand & { monthly: number })[];
    const first = priced[0];
    const top = priced[priced.length - 1];
    const open = bands.find((b) => b.upTo === null && b.perEmployee);
    return (
      <div>
        <div className="rounded-[20px] border border-line-firm bg-surface p-6 md:p-8">
          <p className="stamp text-muted">Priced in bands by number of employees</p>
          <h3 className="mt-1 font-heading text-[24px] leading-8 font-bold tracking-[-0.01em]">{s.name}</h3>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            <div>
              <p className="text-[13px] leading-5 text-muted">First band, {first.label} employees</p>
              <p className="font-heading text-[34px] leading-9 font-bold tracking-[-0.03em]">{randLabel(first.monthly)}</p>
              <p className="text-[13px] leading-5 text-muted">a month including VAT</p>
            </div>
            <div>
              <p className="text-[13px] leading-5 text-muted">Top band, {top.label} employees</p>
              <p className="font-heading text-[34px] leading-9 font-bold tracking-[-0.03em]">{randLabel(top.monthly)}</p>
              <p className="text-[13px] leading-5 text-muted">a month including VAT</p>
            </div>
            {open?.perEmployee && (
              <div>
                <p className="text-[13px] leading-5 text-muted">Above {top.upTo} employees</p>
                <p className="font-heading text-[34px] leading-9 font-bold tracking-[-0.03em]">{randLabel(open.perEmployee)}</p>
                <p className="text-[13px] leading-5 text-muted">per employee a month including VAT</p>
              </div>
            )}
          </div>
          <p className="mt-5 max-w-[68ch] text-[14px] leading-6 text-muted">{bands.length} bands in all, and every feature is in every band. The calculator below prices your own headcount, and the chart shows every band.</p>
          {link && (
            <div className="mt-5">
              <AffiliateCTAButton slug={s.slug} href={link.href} affiliate={link.affiliate} placement="review-plan-1" variant="primary">
                Get {s.name}
              </AffiliateCTAButton>
            </div>
          )}
        </div>
        {link?.affiliate && <p className="mt-3 text-[12px] leading-4 text-muted">{AFFILIATE_DISCLOSURE_SHORT}</p>}
      </div>
    );
  }

  return (
    <div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((p, i) => {
          const quoted = p.price === null;
          const free = p.price === 0;
          const rand = quoted ? null : toRand(p.price as number, p.currency, rates);
          const converted = Boolean(p.currency && p.currency !== "ZAR");
          const vat = p.basis === "mo_incl_vat" ? "incl" : p.basis === "mo_excl_vat" ? "excl" : null;
          const b = savings.get(p.name);
          const saving = b && b.monthly > b.yearly ? Math.round((1 - b.yearly / b.monthly) * 100) : 0;
          const addOn = Boolean(basePlans && !basePlans.includes(p.name));
          return (
            <li key={`${p.name}-${i}`} className="flex flex-col rounded-[20px] border border-line-firm bg-surface p-5">
              <p className="stamp text-muted">{addOn ? "Add on" : free ? "Free plan" : quoted ? "Quoted by the vendor" : "Plan"}</p>
              <h3 className="mt-1 font-heading text-[22px] leading-7 font-bold tracking-[-0.01em]">{quoted ? "Price on request" : p.name}</h3>
              {!quoted && (
                <p className="mt-4 font-heading text-[34px] leading-9 font-bold tracking-[-0.03em]">{free ? "R0" : randLabel(rand as number, converted)}</p>
              )}
              {!quoted && !free && <p className="mt-1 text-[13px] leading-5 text-muted">{basisSentence(p.basis)}</p>}
              {free && <p className="mt-1 text-[13px] leading-5 text-muted">Free to use, as the vendor lists it</p>}
              {vat && rand !== null && !free && (
                <p className="mt-1 text-[12px] leading-4 text-muted">
                  {vat === "incl"
                    ? `${randLabel(rand / (1 + VAT_RATE), converted)} excluding VAT`
                    : `${randLabel(rand * (1 + VAT_RATE), converted)} including VAT`}
                </p>
              )}
              {saving > 0 && <p className="mt-2 inline-flex w-fit rounded-full bg-lime-wash px-2.5 py-0.5 text-[12px] leading-4 font-semibold">Save {saving} percent paying for a year</p>}
              {p.adds && <p className="mt-3 flex-1 text-[14px] leading-5 text-muted">{p.adds}</p>}
              {!p.adds && <div className="flex-1" />}
              {link && (
                <div className="mt-5">
                  <AffiliateCTAButton slug={s.slug} href={link.href} affiliate={link.affiliate} placement={`review-plan-${i + 1}`} variant={free || quoted ? "quiet" : "primary"} className="w-full">
                    {quoted ? (s.demo ? "Book a demo" : "Ask for a quote") : free ? "Start free" : addOn ? `Add ${p.name}` : `Get ${p.name}`}
                  </AffiliateCTAButton>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      {link?.affiliate && <p className="mt-3 text-[12px] leading-4 text-muted">{AFFILIATE_DISCLOSURE_SHORT}</p>}
      <p className="mt-3 max-w-[70ch] text-[12px] leading-4 text-muted">
        Each button opens {s.vendor === s.name ? "the vendor's" : `${s.vendor}'s`} own page in a new tab, where you buy or sign up. Prices are the vendor&apos;s, shown in rand.
      </p>
    </div>
  );
}

/**
 * A call to action that closes a stretch of the review. It names the product and
 * what it costs to start, and offers the vendor first, a way to compare second
 * and a review third.
 */
export function CtaBand({
  s,
  link,
  id,
  title,
  text,
  placement,
  priceText,
}: {
  s: PricedSoftware;
  link: OutboundLink | null;
  id?: string;
  title: string;
  text: string;
  placement: string;
  priceText: string;
}) {
  return (
    <section id={id} aria-label={title} className="mt-12 rounded-[24px] border border-lime-deep/30 bg-lime-wash p-6 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-4">
          <LogoBadge slug={s.slug} name={s.name} size={56} />
          <div className="min-w-0">
            <h2 className="font-heading text-[24px] leading-8 font-bold tracking-[-0.02em]">{title}</h2>
            <p className="mt-1 max-w-[56ch] text-[15px] leading-6">{text}</p>
            <p className="mt-2 text-[13px] leading-5 font-semibold">{priceText}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {link && (
            <AffiliateCTAButton slug={s.slug} href={link.href} affiliate={link.affiliate} placement={placement} variant="primary">
              {mainLabel(s)}
            </AffiliateCTAButton>
          )}
          {link && s.demo === true && s.starting_price !== null && (
            <AffiliateCTAButton slug={s.slug} href={link.href} affiliate={link.affiliate} placement={`${placement}-demo`} variant="quiet">
              Request a demo
            </AffiliateCTAButton>
          )}
          <Link href={`/versus?a=${s.slug}`} className={ctaClass("blue")}>
            Compare with another
          </Link>
        </div>
      </div>
      {link?.affiliate && <p className="mt-4 text-[12px] leading-4 text-muted">{AFFILIATE_DISCLOSURE_SHORT}</p>}
    </section>
  );
}
